//用户信息、操作接口
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import validateRegister from '../middleware/validateRegisterNotnull.js';
import validateLoginNotnull from '../middleware/validateLoginNotnull.js';
import validateUpdateInfo from '../middleware/validateUpdateInfo.js';
import { sendResetCodeEmail } from '../utils/email.js';
const router = express.Router();
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
const JWT_SECRET = process.env.JWT_SECRET;
import sqlQuery from '../db/sqlQuery.js';

// 用户注册接口
router.post('/register', validateRegister, async (req, res) => {
    const { userId, userName, userEmail, userPassword, avatarUrl = '' } = req.body;
    try {
        // 检查邮箱是否已注册
        const [existingUser] = await sqlQuery(
            'SELECT 1 FROM users WHERE email = ?',
            [userEmail]
        );
        if (existingUser) {
            return res.status(409).json({ message: '邮箱已被注册' });
        }

        // 密码哈希
        const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

        // 插入新用户
        await sqlQuery(
            'INSERT INTO users (user_id, username, email, password_hash, avatar_url, created_at, updated_at) VALUES (?,?, ?, ?, ?, NOW(), NOW())',
            [userId, userName, userEmail, hashedPassword, avatarUrl]
        );

        res.status(200).json({ message: '注册成功' });

    } catch (error) {
        console.error('注册失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

// 用户登录接口
router.post('/login', validateLoginNotnull, async (req, res) => {
    const { loginEmail, loginPassword } = req.body;
    try {
        // 查询用户信息
        const [user] = await sqlQuery(
            'SELECT * FROM users WHERE email = ?',
            [loginEmail]
        );
        if (!user) return res.status(404).json({ message: '用户不存在' });

        // 验证密码
        const match = await bcrypt.compare(loginPassword, user.password_hash);
        if (!match) return res.status(401).json({ message: '密码错误' });

        // 生成Token（固定2小时有效期）
        const token = jwt.sign(
            {
                userId: user.user_id,
                userEmail: user.email,
                iat: Math.floor(Date.now() / 1000), // 签发时间
                nbf: Math.floor(Date.now() / 1000)   // 生效时间
            },
            JWT_SECRET,
            { algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRES_IN_MS || 7200000 }
        );


        res.status(200).json({
            token,
            user: {
                userId: user.user_id,
                username: user.username,
                email: user.email,
                avatarUrl: user.avatar_url,
                sex: user.sex,
                introduce: user.introduce,
                registerTime: user.created_at,
                vipLevel: user.vip_level,
                //iat: Math.floor(Date.now() / 1000), // 签发时间
            }
        });
    } catch (error) {
        console.error('登录失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

// 用户信息更新接口
router.post('/updateUserInfo', validateUpdateInfo, async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: '未提供认证令牌' });

    try {
        // 验证JWT令牌（包含nbf和iat校验）
        const decoded = jwt.verify(token, JWT_SECRET, {
            algorithms: ['HS256'],
            clockTolerance: 5 * 60 // 时钟偏差容忍5分钟
        });
        const userId = decoded.userId;
        // 检查邮箱是否已被其他用户使用
        if (req.body.email) {
            const [existingEmail] = await sqlQuery(
                'SELECT user_id FROM users WHERE email = ? AND user_id != ?',
                [req.body.email, userId]
            );
            if (existingEmail) {
                return res.status(409).json({ message: '邮箱已被其他用户使用' });
            }
        }

        // 构建更新字段
        const updateData = { updated_at: new Date() };
        if (req.body.username) updateData.username = req.body.username;
        if (req.body.email) updateData.email = req.body.email;
        if (req.body.sex) updateData.sex = req.body.sex;
        if (req.body.introduce !== undefined) updateData.introduce = req.body.introduce;

        // 执行更新
        await sqlQuery(
            'UPDATE users SET ? WHERE user_id = ?',
            [updateData, userId]
        );

        // 返回更新后的用户信息
        const [updatedUser] = await sqlQuery(
            'SELECT user_id AS userId, username, email, avatar_url as avatarUrl, sex, introduce, ' +
            'vip_level AS vipLevel, created_at AS registerTime ' +
            'FROM users WHERE user_id = ?',
            [userId]
        );

        res.status(200).json({
            message: '用户信息更新成功',
            user: updatedUser
        });

    } catch (error) {
        console.error('更新失败:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: '会话已过期，请重新登录' });
        }
        res.status(500).json({ message: '更新用户信息失败' });
    }
});

// 刷新令牌接口（增强版）
router.post('/refresh', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: '未提供认证令牌' });

    try {
        // 验证令牌（强制忽略过期时间）
        const decoded = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });

        // 检查令牌是否在有效期内窗口
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp - currentTime > 60 * 5) { // 剩余有效期超过5分钟
            return res.status(400).json({ message: '无需刷新令牌' });
        }
        // 生成新令牌（固定2小时有效期）
        const newToken = jwt.sign(
            {
                userId: decoded.userId,
                userEmail: decoded.userEmail,
                iat: currentTime,
                nbf: currentTime
            },
            JWT_SECRET,
            { algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRES_IN_MS || 7200000 }
        );

        res.status(200).json({
            token: newToken,
            expiresInMs: process.env.JWT_EXPIRES_IN_MS || 7200000
        });

    } catch (error) {
        console.error('刷新令牌失败:', error);
        res.status(401).json({ message: '无效或过期令牌' });
    }
});

// 发送重置密码验证码
router.post('/send-reset-code', async (req, res) => {
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
        // 查询用户是否存在
        const [user] = await sqlQuery(
            'SELECT user_id FROM users WHERE email = ?',
            [account]
        );
        if (!user) {
            return res.status(404).json({ message: '该账号未注册' });
        }

        // 使旧验证码失效
        await sqlQuery(
            'UPDATE reset_codes SET used = 1 WHERE account = ? AND used = 0',
            [account]
        );

        // 生成6位验证码
        const code = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5分钟有效

        // 存储验证码
        await sqlQuery(
            'INSERT INTO reset_codes (account, code, expires_at) VALUES (?, ?, ?)',
            [account, code, expiresAt]
        );

        // 发送邮件
        await sendResetCodeEmail(account, code);

        res.status(200).json({ message: '验证码已发送' });

    } catch (error) {
        console.error('发送验证码失败:', error);
        res.status(500).json({ message: '发送验证码失败，请稍后重试' });
    }
});

// 校验重置密码验证码（仅校验真伪，不落库、不改密码）
router.post('/verify-reset-code', async (req, res) => {
    const { account, code } = req.body;

    if (!account || !code) {
        return res.status(400).json({ message: '请填写完整信息' });
    }
    if (!/^\d{6}$/.test(code)) {
        return res.status(400).json({ message: '验证码格式错误' });
    }

    try {
        const [record] = await sqlQuery(
            'SELECT id FROM reset_codes WHERE account = ? AND code = ? AND used = 0 AND expires_at > NOW()',
            [account, code]
        );
        if (!record) {
            return res.status(400).json({ message: '验证码错误或已过期' });
        }
        res.status(200).json({ message: '验证码正确' });
    } catch (error) {
        console.error('校验验证码失败:', error);
        res.status(500).json({ message: '校验验证码失败，请稍后重试' });
    }
});

// 重置密码
router.post('/reset-password', async (req, res) => {
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
        // 验证验证码
        const [record] = await sqlQuery(
            'SELECT * FROM reset_codes WHERE account = ? AND code = ? AND used = 0 AND expires_at > NOW()',
            [account, code]
        );
        if (!record) {
            return res.status(400).json({ message: '验证码错误或已过期' });
        }

        // 标记验证码已使用
        await sqlQuery(
            'UPDATE reset_codes SET used = 1 WHERE id = ?',
            [record.id]
        );

        // 更新密码
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        await sqlQuery(
            'UPDATE users SET password_hash = ?, updated_at = NOW() WHERE email = ?',
            [hashedPassword, account]
        );

        res.status(200).json({ message: '密码重置成功' });

    } catch (error) {
        console.error('重置密码失败:', error);
        res.status(500).json({ message: '重置密码失败，请稍后重试' });
    }
});

export default router;