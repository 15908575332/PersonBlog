// user.service.js 用户域数据服务层
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import sqlQuery from '../utils/sqlQuery.js';
import { sendResetCodeEmail } from '../utils/email.js';

const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
const JWT_SECRET = process.env.JWT_SECRET;

// 注册：查重 + 密码哈希 + 插入
export const registerUser = async ({ userId, userName, userEmail, userPassword, avatarUrl = '' }) => {
    // 检查邮箱是否已注册
    const [existingUser] = await sqlQuery(
        'SELECT 1 FROM users WHERE email = ?',
        [userEmail]
    );
    if (existingUser) {
        return { emailExists: true };
    }

    // 密码哈希
    const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

    // 插入新用户
    await sqlQuery(
        'INSERT INTO users (user_id, username, email, password_hash, avatar_url, created_at, updated_at) VALUES (?,?, ?, ?, ?, NOW(), NOW())',
        [userId, userName, userEmail, hashedPassword, avatarUrl]
    );

    return { emailExists: false };
};

// 登录：查用户 + 校验密码 + 签发 Token
export const loginUser = async (loginEmail, loginPassword) => {
    // 查询用户信息
    const [user] = await sqlQuery(
        'SELECT * FROM users WHERE email = ?',
        [loginEmail]
    );
    if (!user) return { notFound: true };

    // 验证密码
    const match = await bcrypt.compare(loginPassword, user.password_hash);
    if (!match) return { passwordWrong: true };

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

    return {
        token,
        user: {
            userId: user.user_id,
            username: user.username,
            email: user.email,
            avatarUrl: user.avatar_url,
            sex: user.sex,
            introduce: user.introduce,
            registerTime: user.created_at,
            vipLevel: user.vip_level
        }
    };
};

// 更新用户信息：验签 + 邮箱冲突检查 + 更新 + 回查
export const updateUserInfo = async (token, body) => {
    // 验证JWT令牌（包含nbf和iat校验）
    const decoded = jwt.verify(token, JWT_SECRET, {
        algorithms: ['HS256'],
        clockTolerance: 5 * 60 // 时钟偏差容忍5分钟
    });
    const userId = decoded.userId;
    // 检查邮箱是否已被其他用户使用
    if (body.email) {
        const [existingEmail] = await sqlQuery(
            'SELECT user_id FROM users WHERE email = ? AND user_id != ?',
            [body.email, userId]
        );
        if (existingEmail) {
            return { emailTaken: true };
        }
    }

    // 构建更新字段
    const updateData = { updated_at: new Date() };
    if (body.username) updateData.username = body.username;
    if (body.email) updateData.email = body.email;
    if (body.sex) updateData.sex = body.sex;
    if (body.introduce !== undefined) updateData.introduce = body.introduce;

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

    return { user: updatedUser };
};

// 刷新令牌（增强版）
export const refreshUserToken = async (token) => {
    // 验证令牌（强制忽略过期时间）
    const decoded = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });

    // 检查令牌是否在有效期内窗口
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp - currentTime > 60 * 5) { // 剩余有效期超过5分钟
        return { tooEarly: true };
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

    return {
        token: newToken,
        expiresInMs: process.env.JWT_EXPIRES_IN_MS || 7200000
    };
};

// 发送重置密码验证码：用户校验 + 旧码失效 + 生成入库 + 发信
export const sendResetCode = async (account) => {
    // 查询用户是否存在
    const [user] = await sqlQuery(
        'SELECT user_id FROM users WHERE email = ?',
        [account]
    );
    if (!user) {
        return { notFound: true };
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

    return { notFound: false };
};

// 校验重置密码验证码（仅校验真伪，不落库、不改密码）
export const verifyResetCode = async (account, code) => {
    const [record] = await sqlQuery(
        'SELECT id FROM reset_codes WHERE account = ? AND code = ? AND used = 0 AND expires_at > NOW()',
        [account, code]
    );
    return { valid: !!record };
};

// 重置密码：验码 + 标记已用 + 更新密码
export const resetPassword = async (account, code, newPassword) => {
    // 验证验证码
    const [record] = await sqlQuery(
        'SELECT * FROM reset_codes WHERE account = ? AND code = ? AND used = 0 AND expires_at > NOW()',
        [account, code]
    );
    if (!record) {
        return { valid: false };
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

    return { valid: true };
};
