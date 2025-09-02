// 站点主要内容接口
import express from 'express';
const router = express.Router();
import sqlQuery from '../db/sqlQuery.js';

router.get('/getMainContent', async (req, res) => {
    try {
        const navContent = await sqlQuery(
            `
            SELECT
                order_id,
                title,
                subtitle,
                class_img_url
            FROM blog_content_class
            `
        )
        const result = await sqlQuery(
            `
    SELECT
        m.* ,
        u.username
    FROM
        blog_content_main m
    INNER JOIN users u on u.id = m.author_id
    INNER JOIN blog_content_class c on c.order_id = m.father_id
    where c.order_id = '${req.query.id}'
    ORDER BY m.release_time desc
            `
        );
        // const contentList = result.map(item => ({
        //     author: item.username,
        //     releaseTime: item.release_time,
        //     heat: item.heat,
        //     likeCount: item.like_count,
        //     categorySubtitle: item.subtitle
        // }))
        res.status(200).json({
            code: 200,
            message: '获取主要内容成功',
            navContent,
            content: result  // 博客列表数组
        });
    } catch (error) {
        console.error('获取主要内容失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

export default router;
