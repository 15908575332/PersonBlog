// node后端服务器
import userRelatedApi from './routes/userRelatedApi.js'
import express from 'express'; // express框架
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
config({ path: './.env' });
import authenticateToken from './routes/userRelatedApi.js'

// body-parser是非常常用的一个express中间件，作用是对http请求体进行解析
const { json, urlencoded } = bodyParser
const app = express()

// 公共中间件配置
app.use(authenticateToken)
app.use(cors());
app.use(json())
app.use(urlencoded({ extended: false }))

// 后端api路由
app.use('/user', userRelatedApi)

// 错误处理中间件（放在所有路由之后）
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ code: '99', msg: 'Internal Server Error' });
});
// 监听端口
app.listen(3000) // 监听server3000端口
console.log('success listen at http://localhost:3000')
