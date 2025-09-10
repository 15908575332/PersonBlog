import { pool } from './db.js';

const sqlQuery = (statement, values) => new Promise((resolve, reject) => {
    // 输入校验
    // if (typeof statement !== 'string' || !Array.isArray(values)) {
    //     return reject(new Error('Invalid query parameters'));
    // }

    // 设置超时
    const queryTimeout = 5000;
    const timeout = setTimeout(() => {
        reject(new Error('Query timeout'));
    }, queryTimeout);

    pool.query(statement, values, (error, results) => {
        clearTimeout(timeout); // 清除超时定时器

        if (error) {
            // 生产环境隐藏敏感信息
            console.error('[DB ERROR]', error.message);
            return reject({
                code: 'DB_ERROR',
                message: 'Database query failed',
                details: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }

        resolve(results || []);
    });
});

export default sqlQuery;