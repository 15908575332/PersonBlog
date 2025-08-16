import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db/db.js';
import validateRegister from '../middleware/validateRegisterNotnull.js';
import validateLoginNotnull from '../middleware/validateLoginNotnull.js';
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
                created_at AS createdAt
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
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error('登录失败:', error.message);
        res.status(500).json({ message: '服务器内部错误' });
    }
});
export default router;