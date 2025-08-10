import bcrypt from 'bcrypt';
import express from 'express';
const router = express.Router();
import { conn } from '../app.js';

// 连接数据库
// import mysql from 'mysql2'
// import * as models from '../db/config.js'
// var conn = mysql.createConnection(models.mysql)

const saltRounds = 10; // 定义盐的轮数
const hashPassword = async (userPassword) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(userPassword, salt);
    return { salt, hash };
}
const comparePassword = async (userPassword, hash) => {
    return await bcrypt.compare(userPassword, hash);
}
// 注册接口
const register = async (req, res) => {
    console.log('注册请求:', req.body);
    const { userName, userEmail, userPassword } = req.body;
    const { salt, hash } = await hashPassword(userPassword);

    // 串联检查用户名和邮箱唯一性
    const sqlCheckUser = 'SELECT * FROM users WHERE username = ?';
    conn.query(sqlCheckUser, [userName], (err, userResult) => {
        if (err) {
            console.log(err);
            return res.json({ code: '1', msg: '注册失败' });
        }
        if (userResult.length > 0) {
            return res.json({ code: '1', msg: '用户名已存在' });
        }
        // 检查邮箱唯一性
        const sqlCheckEmail = 'SELECT * FROM users WHERE email = ?';
        conn.query(sqlCheckEmail, [userEmail], (err, emailResult) => {
            if (err) {
                console.log(err);
                return res.json({ code: '1', msg: '注册失败' });
            }
            if (emailResult.length > 0) {
                return res.json({ code: '1', msg: '邮箱已存在' });
            }
            // 都不存在，插入新用户
            const sql = `INSERT INTO users 
                (username,email, password_hash, created_at, updated_at, status)
                VALUES  (?, ?, ?, DEFAULT, DEFAULT, DEFAULT)`;
            conn.query(sql, [userName, userEmail, hash], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.json({ code: '1', msg: '注册失败' });
                } else {
                    return res.json({ code: '0', msg: '注册成功' });
                }
            });
        });
    });
}
// 登录接口
const login = async (req, res) => {
    const { loginEmail, userPassword } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
    conn.query(sql, [loginEmail], async (err, results) => {
        if (err) {
            console.log(err);
            res.json({ code: '1', msg: '登录失败' });
        } else if (results.length === 0) {
            res.json({ code: '1', msg: '用户不存在' });
        } else {
            const user = results[0];
            const match = await comparePassword(userPassword, user.password_hash);
            if (match) {
                res.json({ code: '0', msg: '登录成功' });
            } else {
                res.json({ code: '1', msg: '密码错误' });
            }
        }
    });
}
router.post('/register', register);
router.post('/login', login);
export default router;
