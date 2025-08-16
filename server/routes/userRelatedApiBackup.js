import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../db/db.js';
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

// 工具函数：数据库查询（参数化）
const query = (sql, params) => new Promise((resolve, reject) => {
    pool.query(sql, params, (err, results) => {
        if (err) reject({ code: 'DB_ERROR', message: 'Database error' });
        resolve(results);
    });
});

// 工具函数：密码加密
const hashPassword = async (plainText) =>
    bcrypt.hash(plainText, await bcrypt.genSalt(saltRounds));

// 注册接口
router.post('/register', async (req, res) => {
    const { userName, userEmail, userPassword, avatarUrl } = req.body;

    try {
        // 检查邮箱是否已存在
        const [existingUser] = await query(
            'SELECT 1 FROM users WHERE email = ?',
            [userEmail]
        );
        if (existingUser) {
            throw new Error('邮箱已被注册');
        }

        // 加密密码
        const hashedPassword = await hashPassword(userPassword);
        console.log(req.body)

        // 插入用户
        const [insertResult] = await query(
            'INSERT INTO users SET ?',
            {
                username: userName,
                email: userEmail,
                password_hash: hashedPassword,
                avatarUrl,
                created_at: new Date(),
                updated_at: new Date()
            },
        );
        // 4. 获取新用户ID
        const userId = insertResult.id;

        // 5. 根据ID查询用户数据（正确解构方式）
        const [user] = await query(
            'SELECT * FROM users WHERE id = ?',
            [userId]
        );


        // 生成 Token
        const token = jwt.sign(
            {
                userId: user.insertId,
                userEmail: bcrypt.hashSync(userEmail, saltRounds)
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        res.status(201).json({ token });

    } catch (error) {
        console.error('注册失败:', error);
        res.status(400).json({ code: 'REGISTRATION_FAILED', message: error.message });
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
        const { email } = req.user;
        console.log(req.user);

        const sql = 'SELECT * FROM users WHERE email = ?';
        const [user] = await query(sql, [email]);
        res.json({
            code: 0, data: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatarUrl: user.avatarUrl,
                createTime: user.created_at,
                sex: user.sex,
                vipLevel: user.vipLevel,
                introduce: user.introduce
            }
        });
    } catch (error) {
        console.error('获取用户信息失败:', error.message);
        res.status(500).json({ msg: '服务器内部错误' });
    }

});
router.post('/updateUserInfo', async (req, res) => {
    const allowedFields = ['username', 'email', 'sex', 'introduce'];
    const updates = Object.fromEntries(
        Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
    );

    // 若未修改邮箱，跳过校验
    if (!updates.email) {
        delete updates.email;
    }

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ msg: 'No valid fields provided' });
    }

    try {
        // 1. 获取当前用户信息（通过原用户id定位）
        const [currentUser] = await query(
            'SELECT * FROM users WHERE id = ?',
            [req.body.id] // 假设原用户名]通过请求体传递
        );

        if (!currentUser) {
            return res.status(404).json({ msg: '用户不存在' });
        }

        // 校验邮箱唯一性（排除当前用户）
        if (updates.email) {
            const [existingEmail] = await query(
                'SELECT * FROM users WHERE email = ? AND id != ?',
                [updates.email, currentUser.id]
            );
            if (existingEmail) {
                return res.status(400).json({ msg: '邮箱已被占用' });
            }
        }

        // 3. 构造安全更新语句
        const setClause = allowedFields.map(field => `${field} = ?`).join(', ');
        const params = [...Object.values(updates), currentUser.username]; // 用原用户名定位用户

        const sql = `UPDATE users SET ${setClause} WHERE username = ?`;
        await query(sql, params);

        // 4. 返回更新后数据
        const [updatedUser] = await query(
            'SELECT * FROM users WHERE username = ?',
            [req.body.username]
        );

        res.json({
            code: 0,
            data: {
                ...updatedUser,
                password_hash: undefined
            }
        });
    } catch (error) {
        console.error('更新用户信息失败:', error);
        res.status(500).json({ msg: '服务器内部错误' });
    }
});
export default router;