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

// 用户注册接口
export const register = async (req, res) => {
    const { userId, userName, userEmail, userPassword, avatarUrl = '' } = req.body;
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

// 用户登录接口
export const login = async (req, res) => {
    const { loginEmail, loginPassword } = req.body;
    try {
        const result = await loginUser(loginEmail, loginPassword);

        if (result.notFound) return res.status(404).json({ message: '用户不存在' });
        if (result.passwordWrong) return res.status(401).json({ message: '密码错误' });

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

    try {
        const result = await sendResetCodeService(account);

        if (result.notFound) {
            return res.status(404).json({ message: '该账号未注册' });
        }

        res.status(200).json({ message: '验证码已发送' });

    } catch (error) {
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

    try {
        const result = await verifyResetCodeService(account, code);
        if (!result.valid) {
            return res.status(400).json({ message: '验证码错误或已过期' });
        }
        res.status(200).json({ message: '验证码正确' });
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

    try {
        const result = await resetPasswordService(account, code, newPassword);

        if (!result.valid) {
            return res.status(400).json({ message: '验证码错误或已过期' });
        }

        res.status(200).json({ message: '密码重置成功' });

    } catch (error) {
        console.error('重置密码失败:', error);
        res.status(500).json({ message: '重置密码失败，请稍后重试' });
    }
};
