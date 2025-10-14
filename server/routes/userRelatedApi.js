//用户信息、操作接口
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validateRegister from '../middleware/validateRegisterNotnull.js';
import validateLoginNotnull from '../middleware/validateLoginNotnull.js';
import validateUpdateInfo from '../middleware/validateUpdateInfo.js';
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
            'INSERT INTO users (user_id, username, email, password_hash, avatarUrl, created_at, updated_at) VALUES (?,?, ?, ?, ?, NOW(), NOW())',
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
                iat: Math.floor(Date.now() / 1000), // 签发时间
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
            'SELECT user_id, username, email, avatarUrl, sex, introduce FROM users WHERE user_id = ?',
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

export default router;