// user.controller.js 用户域控制器
import {
    registerUser,
    loginUser,
    updateUserInfo as updateUserInfoService,
    refreshUserToken,
    sendResetCode as sendResetCodeService,
    verifyResetCode as verifyResetCodeService,
    resetPassword as resetPasswordService
} from '../services/user.service.js';
import {
    buildLoginKey,
    checkLoginLock,
    recordLoginFail,
    clearLoginFail
} from '../utils/loginRateLimiter.js';
import {
    checkSendAllowed,
    recordSend,
    releaseSend,
    checkVerifyLock,
    recordVerifyFail,
    clearVerifyFail
} from '../utils/resetCodeLimiter.js';

// 验证码状态 -> HTTP 响应（error=true 表示需要展示为错误并计入错误次数）
const RESET_CODE_ISSUES = {
    NOT_SENT: { code: 'RESET_CODE_NOT_SENT', message: '请先获取邮箱验证码', error: false },
    USED: { code: 'RESET_CODE_USED', message: '验证码已使用，请重新获取', error: false },
    EXPIRED: { code: 'RESET_CODE_EXPIRED', message: '验证码已过期，请重新获取', error: false },
    MISMATCH: { code: 'RESET_CODE_INVALID', message: '验证码错误，请检查后重新输入', error: true }
};

// 统一输出验证码失败原因：只有“验证码错误”才计入失败次数，过期/已用/未获取不计
const replyResetCodeIssue = (req, res, account, status) => {
    const issue = RESET_CODE_ISSUES[status] || RESET_CODE_ISSUES.EXPIRED;
    if (issue.error) {
        recordVerifyFail(req, account);
    }
    return res.status(400).json({ code: issue.code, message: issue.message, status });
};

// 用户注册接口
export const register = async (req, res) => {
    const { userId, userName, userEmail, userPassword } = req.body;
    // 兼容前端历史字段名 avatar_url 与后端驼峰 avatarUrl
    const avatarUrl = req.body.avatarUrl || req.body.avatar_url || '';
    try {
        const result = await registerUser({ userId, userName, userEmail, userPassword, avatarUrl });

        if (result.emailExists) {
            return res.status(409).json({ message: '邮箱已被注册' });
        }

        res.status(200).json({ message: '注册成功' });

    } catch (error) {
        console.error('注册失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
};

// 登录失败统一处理：累计失败次数并返回统一文案，避免账号被枚举
const replyLoginFail = (res, lockKey) => {
    recordLoginFail(lockKey);
    return res.status(401).json({ code: 'LOGIN_FAILED', message: '账号或密码错误' });
};

// 用户登录接口（图形验证码已由 validateCaptcha 中间件校验并消费）
export const login = async (req, res) => {
    const { loginEmail, loginPassword } = req.body;
    const lockKey = buildLoginKey(req, loginEmail);
    const lock = checkLoginLock(lockKey);
    if (lock.locked) {
        return res.status(429).json({
            code: 'LOGIN_LOCKED',
            message: `尝试次数过多，请${Math.ceil(lock.retryAfter / 60)}分钟后再试`
        });
    }

    try {
        const result = await loginUser(loginEmail, loginPassword);
        if (result.notFound || result.passwordWrong) return replyLoginFail(res, lockKey);

        clearLoginFail(lockKey);
        res.status(200).json({
            token: result.token,
            user: result.user
        });
    } catch (error) {
        console.error('登录失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
};

// 用户信息更新接口
export const updateUserInfo = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: '未提供认证令牌' });

    try {
        const result = await updateUserInfoService(token, req.body);

        if (result.emailTaken) {
            return res.status(409).json({ message: '邮箱已被其他用户使用' });
        }

        res.status(200).json({
            message: '用户信息更新成功',
            user: result.user
        });

    } catch (error) {
        console.error('更新失败:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: '会话已过期，请重新登录' });
        }
        res.status(500).json({ message: '更新用户信息失败' });
    }
};

// 刷新令牌接口（增强版）
export const refresh = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: '未提供认证令牌' });

    try {
        const result = await refreshUserToken(token);

        if (result.expired) { // 令牌已过期，不再续期
            return res.status(401).json({ message: '会话已过期，请重新登录' });
        }
        if (result.tooEarly) { // 剩余有效期超过5分钟
            return res.status(400).json({ message: '无需刷新令牌' });
        }

        res.status(200).json({
            token: result.token,
            expiresInMs: result.expiresInMs
        });

    } catch (error) {
        console.error('刷新令牌失败:', error);
        res.status(401).json({ message: '无效或过期令牌' });
    }
};

// 发送重置密码验证码
export const sendResetCode = async (req, res) => {
    const { account } = req.body;

    if (!account) {
        return res.status(400).json({ message: '请输入邮箱地址' });
    }

    // 简易邮箱格式校验
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(account);
    if (!isEmail) {
        return res.status(400).json({ message: '请输入有效的邮箱地址' });
    }

    // 发码频控（防邮件轰炸）：图形码之后再加一层，冷却 60 秒 + 邮箱日上限 + IP 时上限
    const sendLimit = checkSendAllowed(req, account);
    if (!sendLimit.allowed) {
        if (sendLimit.dailyLimited) {
            return res.status(429).json({ code: 'SEND_DAILY_LIMIT', message: '该邮箱今日获取验证码已达上限，请明日再试' });
        }
        if (sendLimit.ipLimited) {
            return res.status(429).json({ code: 'SEND_IP_LIMIT', message: '请求过于频繁，请稍后再试' });
        }
        return res.status(429).json({
            code: 'SEND_TOO_FAST',
            message: `请${sendLimit.retryAfter}秒后再获取验证码`
        });
    }
    // 先占用配额，避免并发请求同时通过检查
    recordSend(req, account);

    try {
        const result = await sendResetCodeService(account);

        if (result.notFound) {
            releaseSend(req, account);
            return res.status(404).json({ message: '该账号未注册' });
        }

        res.status(200).json({
            code: 'RESET_CODE_SENT',
            status: 'SENT',
            message: '验证码已发送',
            expiresIn: result.expiresIn || 300
        });

    } catch (error) {
        // 发送失败回滚配额，不让用户被一次失败请求锁住
        releaseSend(req, account);
        console.error('发送验证码失败:', error);
        res.status(500).json({ message: '发送验证码失败，请稍后重试' });
    }
};

// 校验重置密码验证码（仅校验真伪，不落库、不改密码）
export const verifyResetCode = async (req, res) => {
    const { account, code } = req.body;

    if (!account || !code) {
        return res.status(400).json({ message: '请填写完整信息' });
    }
    if (!/^\d{6}$/.test(code)) {
        return res.status(400).json({ message: '验证码格式错误' });
    }

    // 连续错误锁定（防 6 位码暴力枚举）
    const lock = checkVerifyLock(req, account);
    if (lock.locked) {
        return res.status(429).json({
            code: 'VERIFY_LOCKED',
            message: `验证码错误次数过多，请${Math.ceil(lock.retryAfter / 60)}分钟后再试`
        });
    }

    try {
        const result = await verifyResetCodeService(account, code);
        if (result.status !== 'OK') {
            return replyResetCodeIssue(req, res, account, result.status);
        }
        clearVerifyFail(req, account);
        res.status(200).json({ code: 'RESET_CODE_OK', status: 'OK', message: '验证码正确' });
    } catch (error) {
        console.error('校验验证码失败:', error);
        res.status(500).json({ message: '校验验证码失败，请稍后重试' });
    }
};

// 重置密码
export const resetPassword = async (req, res) => {
    const { account, code, newPassword } = req.body;

    if (!account || !code || !newPassword) {
        return res.status(400).json({ message: '请填写完整信息' });
    }

    if (!/^\d{6}$/.test(code)) {
        return res.status(400).json({ message: '验证码格式错误' });
    }

    if (newPassword.length < 6) {
        return res.status(400).json({ message: '新密码至少6位' });
    }

    // 与校验接口共用同一份失败计数，避免绕过 verify 直接打 reset 接口枚举
    const lock = checkVerifyLock(req, account);
    if (lock.locked) {
        return res.status(429).json({
            code: 'VERIFY_LOCKED',
            message: `验证码错误次数过多，请${Math.ceil(lock.retryAfter / 60)}分钟后再试`
        });
    }

    try {
        const result = await resetPasswordService(account, code, newPassword);

        if (result.status !== 'OK') {
            return replyResetCodeIssue(req, res, account, result.status);
        }

        clearVerifyFail(req, account);
        res.status(200).json({ code: 'RESET_PASSWORD_OK', status: 'OK', message: '密码重置成功' });

    } catch (error) {
        console.error('重置密码失败:', error);
        res.status(500).json({ message: '重置密码失败，请稍后重试' });
    }
};
