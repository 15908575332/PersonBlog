import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db/db.js';
import validateRegister from '../middleware/validateRegisterNotnull.js';
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

        const insertResult = await sqlQuery(insertQuery, insertValues);
        const userId = insertResult.insertId;

        // // 5. 查询新用户信息（排除密码）
        const [user] = await sqlQuery(
            `SELECT 
        id,
        username,
        email,
        avatarUrl, 
        created_at 
     FROM users 
     WHERE id = ?`,
            [userId]
        );

        // 6. 生成 JWT Token
        const token = jwt.sign(
            { userId: user.id, userEmail: user.userEmail },
            JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }

        );

        // 7. 返回成功响应
        res.status(201).json({
            token,
            message: '注册成功！正在跳转登录页面...',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatarUrl: user.avatarUrl,
                createdAt: user.created_at
            }
        });

    } catch (err) {
        console.error('注册失败:', err);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

export default router;