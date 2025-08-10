// node后端服务器
import registerLoginApi from './routes/registerLoginApi.js'
import express from 'express'; // express框架
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import * as models from './db/config.js';

// body-parser是非常常用的一个express中间件，作用是对http请求体进行解析
const { json, urlencoded } = bodyParser
const app = express()

// 创建全局数据库连接（单例模式）
const conn = mysql.createConnection(models.mysql);
conn.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});
export { conn }; //导出供其它模块使用

// 公共中间件配置
app.use(cors());
app.use(json())
app.use(urlencoded({ extended: false }))

// 后端api路由
app.use('/user', registerLoginApi)

// 错误处理中间件（放在所有路由之后）
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ code: '99', msg: 'Internal Server Error' });
});
// 监听端口
app.listen(3000) // 监听server3000端口
console.log('success listen at http://localhost:3000')
