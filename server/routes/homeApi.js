// homeApi.js
import * as models from '../db/config.js'
import express from 'express' // express框架
import mysql from 'mysql2'
var router = express.Router()
import sqlMap from '../db/sqlMap.js' // sql语句
const $sql = sqlMap // 兼容旧代码

// 连接数据库
var conn = mysql.createConnection(models.mysql)
conn.connect()

var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        })
    } else {
        res.json(ret)
    }
}

// 查询列表接口，
// get接口，这里配置的/getlist,使用的时候就是 /home/getlist
// 回看index.js 中 app.use('/home', homeApi) ，就懂了

router.get('/getlist', (req, res) => {
    console.log('getlist接口被调用')
    var sql = $sql.home.search
    var parms = req.query
    console.log(parms)
    conn.query(sql, function (err, result) {
        if (err) {
            console.log(err)
        }
        if (result) {
            console.log(result)
            res.send(result)
        }
    })
})

// 新增列表
router.post('/addlist', (req, res) => {
    var sql = $sql.home.add
    var parms = req.body
    console.log(parms)
    conn.query(sql, [parms.title, parms.num], function (err, result) {
        if (err) {
            console.log(err)
        }
        if (result) {
            jsonWrite(res, result)
        }
    })
})

export default router;
