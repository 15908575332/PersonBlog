import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db/db.js';
import validateRegister from '../middleware/validateRegisterNotnull.js';
import validateLoginNotnull from '../middleware/validateLoginNotnull.js';
import validateUpdateInfo from '../middleware/validateUpdateInfo.js';
const router = express.Router();
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
const JWT_SECRET = process.env.JWT_SECRET;


// 工具函数：数据库查询（增强版）
// 修改后的 sqlQuery 函数
const sqlQuery = (sql, params) => new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results) => {
        if (error) {
            // 增强错误日志
            console.error('[DB ERROR]', {
                sql,
                params,
                errorCode: error.code,
                errorMessage: error.message
            });
            reject({ code: 'DB_ERROR', ...error });
        } else {
            // 安全处理 results 为 undefined 的情况
            resolve(results);
        }
    });
});
// 用户注册接口
router.post('/register', validateRegister, async (req, res) => {
    const { userName, userEmail, userPassword, avatarUrl = '' } = req.body;
    let hashedPassword;
    try {
        // 2. 检查邮箱是否已注册
        const existingUser = await sqlQuery(
            'SELECT 1 FROM users WHERE email = ?',
            [userEmail]
        );
        if (existingUser.length > 0) {
            return res.status(409).json({ message: '邮箱已被注册' });
        }
        // 3. 密码哈希
        hashedPassword = await bcrypt.hash(userPassword, saltRounds);
        // 4. 插入新用户
        const insertQuery = `
      INSERT INTO users (username, email, password_hash, avatarUrl, created_at, updated_at)
      VALUES (?, ?, ?, ?, NOW(), NOW())
    `;
        const insertValues = [userName, userEmail, hashedPassword, avatarUrl];
        await sqlQuery(insertQuery, insertValues);

        // 7. 返回成功响应
        res.status(201).json({
            message: '注册成功！正在跳转登录页面...',
        });

    } catch (err) {
        console.error('注册失败:', err);
        res.status(500).json({ message: '服务器内部错误' });
    }
});
// 用户登录接口
router.post('/login', validateLoginNotnull, async (req, res) => {
    const { loginEmail, loginPassword } = req.body;
    try {
        // 使用参数化查询防止SQL注入
        const [user] = await sqlQuery(
            `SELECT 
                id,
                username,
                email,
                avatarUrl,
                created_at AS createdAt,
                sex,
                introduce
             FROM users 
             WHERE email = ?`,
            [loginEmail]
        );

        if (!user) {
            return res.status(404).json({ message: '用户不存在' });
        }

        // 获取密码哈希单独查询（增强安全性）
        const [pwdResult] = await sqlQuery(
            'SELECT password_hash FROM users WHERE id = ?',
            [user.id]
        );

        if (!pwdResult?.password_hash) {
            return res.status(500).json({ message: '服务器数据异常' });
        }

        // 密码验证
        const match = await bcrypt.compare(loginPassword, pwdResult.password_hash);
        if (!match) {
            return res.status(401).json({ message: '密码错误' });
        }

        //计算token过期时间点
        const expiresInMs = 2 * 60 * 60 * 1000;
        const expiresAt = new Date(Date.now() + expiresInMs).toISOString();

        // 6. 生成 JWT Token
        const token = jwt.sign(
            { userId: user.id, userEmail: user.userEmail },
            JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }

        );

        // 7. 返回成功响应
        res.status(201).json({
            token,
            message: '登录成功，正在跳转首页...',
            expiresInMs, // 过期时间毫秒数
            expiresAt, //过期时间点
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatarUrl: user.avatarUrl,
                createdAt: user.createdAt,
                sex: user.sex,
                introduce: user.introduce,
            }
        });
    } catch (error) {
        console.error('登录失败:', error.message);
        res.status(500).json({ message: '服务器内部错误' });
    }
});
// 用户信息更新接口
router.post('/updateUserInfo', validateUpdateInfo, async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: '未提供认证令牌' });
    }

    try {
        // 验证JWT令牌
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        // 获取更新数据
        const { username, email, sex, introduce } = req.body;

        // 检查邮箱是否已被其他用户使用
        if (email) {
            const existingEmail = await sqlQuery(
                'SELECT id FROM users WHERE email = ? AND id != ?',
                [email, userId]
            );
            if (existingEmail.length > 0) {
                return res.status(409).json({ message: '邮箱已被其他用户使用' });
            }
        }

        // 构建更新字段
        const updateFields = [];
        const updateValues = [];

        if (username) {
            updateFields.push('username = ?');
            updateValues.push(username);
        }
        if (email) {
            updateFields.push('email = ?');
            updateValues.push(email);
        }
        if (sex) {
            updateFields.push('sex = ?');
            updateValues.push(sex);
        }
        if (introduce !== undefined) {
            updateFields.push('introduce = ?');
            updateValues.push(introduce);
        }

        // 添加更新时间
        updateFields.push('updated_at = NOW()');

        // 执行更新
        if (updateFields.length > 0) {
            const updateQuery = `
        UPDATE users 
        SET ${updateFields.join(', ')}
        WHERE id = ?
      `;
            await sqlQuery(updateQuery, [...updateValues, userId]);
        }

        // 返回更新后的用户信息
        const [updatedUser] = await sqlQuery(
            `SELECT 
          id,
          username,
          email,
          avatarUrl,
          sex,
          introduce,
          created_at AS createdAt
       FROM users 
       WHERE id = ?`,
            [userId]
        );

        res.status(200).json({
            message: '用户信息更新成功',
            user: updatedUser
        });

    } catch (error) {
        console.error('更新失败:', error.message);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: '会话已过期，请重新登录' });
        }

        res.status(500).json({ message: '更新用户信息失败' });
    }
});

// 新增：解析JWT过期时间字符串为毫秒数的辅助函数
function parseJwtExpiresIn(expiresIn) {
    if (!expiresIn) return 2 * 60 * 60 * 1000; // 默认2小时

    // 解析类似'2h'、'30m'的字符串
    const unit = expiresIn.slice(-1);
    const value = parseInt(expiresIn);

    if (unit === 's') return value * 1000;
    if (unit === 'm') return value * 60 * 1000;
    if (unit === 'h') return value * 60 * 60 * 1000;
    if (unit === 'd') return value * 24 * 60 * 60 * 1000;

    return value * 60 * 60 * 1000; // 默认按小时处理
}

// 新增：刷新令牌接口
router.post('/refresh', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: '未提供认证令牌' });
    }

    try {
        // 验证令牌（忽略过期时间）
        const decoded = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });

        // 获取令牌原始过期时间
        const originalExp = decoded.exp * 1000; // 转换为毫秒
        const currentTime = Date.now();

        // 检查令牌是否在可刷新窗口内（过期后5分钟内）
        const isInRefreshWindow = (currentTime - originalExp) <= 5 * 60 * 1000;

        if (!isInRefreshWindow) {
            return res.status(401).json({
                message: '令牌已过期，请重新登录',
                code: 'TOKEN_EXPIRED'
            });
        }

        // 获取新的过期时间设置
        const expiresIn = process.env.JWT_EXPIRES_IN || '2h';
        const expiresInMs = parseJwtExpiresIn(expiresIn);
        const newExpiresAt = new Date(Date.now() + expiresInMs).toISOString();

        // 生成新令牌（使用相同的用户信息）
        const newToken = jwt.sign(
            { userId: decoded.userId, userEmail: decoded.userEmail },
            JWT_SECRET,
            { expiresIn }
        );

        // 返回新令牌和过期信息
        res.status(200).json({
            token: newToken,
            expiresInMs,
            expiresAt: newExpiresAt,
            message: '令牌已刷新'
        });

    } catch (error) {
        console.error('刷新令牌失败:', error.message);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: '无效的令牌',
                code: 'INVALID_TOKEN'
            });
        }

        res.status(500).json({
            message: '刷新令牌失败',
            code: 'REFRESH_FAILED'
        });
    }
});
export default router;