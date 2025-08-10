// node后端服务器
import registerLoginApi from './routes/registerLoginApi.js'
import cors from 'cors';


// body-parser是非常常用的一个express中间件，作用是对http请求体进行解析
import bodyParser from 'body-parser'
const { json, urlencoded } = bodyParser

import express from 'express' // express框架
const app = express()

app.use(cors());
app.use(json())
app.use(urlencoded({ extended: false }))

// 后端api路由
app.use('/user', registerLoginApi)
// 监听端口
app.listen(3000) // 监听server3000端口
console.log('success listen at http://localhost:3000')
