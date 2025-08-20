import { pool } from './db.js';
// 工具函数：数据库查询
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
export default sqlQuery;
