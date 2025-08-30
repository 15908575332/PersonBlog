// 站点主要内容接口
import express from 'express';
const router = express.Router();
import sqlQuery from '../db/sqlQuery.js';

router.get('/getMainContent', async (req, res) => {
    try {
        const result = await sqlQuery(
            `
           SELECT
             id,
             order_id,
             title,
             subtitle,
             create_time
          FROM
            blog_content_class
          ORDER BY
            create_time ASC
            `
        );
        res.status(200).json({
            code: 0,
            message: '获取主要内容成功',
            data: result
        });
    } catch (error) {
        console.error('获取主要内容失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

export default router;
