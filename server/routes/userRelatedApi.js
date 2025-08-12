import bcrypt from 'bcrypt';
import express from 'express';
import { conn } from '../app.js';
import jwt from 'jsonwebtoken';
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10; // 从环境变量读取盐值轮数

// 工具函数：数据库查询
const query = (sql, params) => new Promise((resolve, reject) => {
    conn.query(sql, params, (err, results) => {
        if (err) reject({ code: 'DB_ERROR', message: 'Database error' });
        resolve(results);
    });
});

// 工具函数：密码加密
const hashPassword = async (plainText) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainText, salt);
};

// 工具函数：检查用户名和邮箱唯一性
const checkUserExistence = async (email, username) => {
    const emailQuery = 'SELECT 1 FROM users WHERE email = ? LIMIT 1';
    const usernameQuery = 'SELECT 1 FROM users WHERE username = ? LIMIT 1';
    return Promise.all([
        query(emailQuery, [email]),
        query(usernameQuery, [username])
    ]);
};


// 注册接口
router.post('/register', async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;

    try {
        // 检查用户名和邮箱唯一性
        const [emailExists, usernameExists] = await checkUserExistence(userEmail, userName);

        if (emailExists) throw new Error('邮箱已存在');
        if (usernameExists) throw new Error('用户名已存在');

        // 加密密码
        const hashedPassword = await hashPassword(userPassword);

        // 插入新用户
        const insertSql = `
      INSERT INTO users 
      (username, email, password_hash, created_at, updated_at) 
      VALUES (?, ?, ?, NOW(), NOW())
    `;
        await query(insertSql, [userName, userEmail, hashedPassword]);

        // 生成并返回 Token
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        res.status(201).json({ token });
    } catch (error) {
        console.error('注册失败:', error.message);
        res.status(400).json({ msg: error.message });
    }
});

// 登录接口
router.post('/login', async (req, res) => {
    const { loginEmail, loginPassword } = req.body;

    try {
        // 查询用户
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [user] = await query(sql, [loginEmail]);

        if (!user) throw new Error('用户不存在', 404);
        if (!user.password_hash) throw new Error('密码哈希异常');

        // 验证密码
        const match = await bcrypt.compare(loginPassword, user.password_hash);
        if (!match) throw new Error('密码错误', 401);

        // 登录成功生成并返回 Token
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({ token, user: { id: user.id, username: user.username } });
    } catch (error) {
        console.error('登录失败:', error.message);
        res.status(400).json({ msg: error.message });
    }
});

// 获取用户信息接口
router.get('/getUserInfo', authenticateToken, async (req, res) => {
    try {
        const { userId, username } = req.user;
        const sql = 'SELECT * FROM users WHERE username = ?';
        const [user] = await query(sql, [username]);
        res.json({
            code: 0, data: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatarUrl: user.avatarUrl,
                createTime: user.created_at,
            }
        });
    } catch (error) {
        console.error('获取用户信息失败:', error.message);
        res.status(500).json({ msg: '服务器内部错误' });
    }

});
export default router;