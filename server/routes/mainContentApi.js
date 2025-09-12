// 站点主要内容接口
import express from 'express';
const router = express.Router();
import sqlQuery from '../db/sqlQuery.js';
//获取导航数据
router.get('/getNavData', async (req, res) => {
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
        );
        res.status(200).json({
            code: 200,
            message: '获取导航数据成功',
            navContent
        })
    } catch {
        console.error('获取主要内容失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});
// 获取主要内容
router.get('/getMainContent', async (req, res) => {
    try {
        const result = await sqlQuery(
            `
        SELECT
            m.* ,
            u.username
        FROM
            blog_content_main m
        INNER JOIN users u on u.user_id = m.user_id
        INNER JOIN blog_content_class c on c.order_id = m.father_id
        where c.order_id = '${req.query.id}'
        ORDER BY m.release_time desc
            `
        );
        res.status(200).json({
            code: 200,
            message: '获取主要内容成功',
            result, // 博客列表数组
        });
    } catch (error) {
        console.error('获取主要内容失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});
//内容浏览量
router.post('/updateHeat', async (req, res) => {
    try {
        const { id } = req.body;
        const result = await sqlQuery(
            `
            update blog_content_main set heat = heat + 1 where id = ${id}
            `
        )
        if (result.affectedRows === 0) {
            res.status(404).json({
                code: 404,
                message: '内容不存在'
            })
        }
        // 获取更新后的浏览量（可选）
        const [article] = await sqlQuery('SELECT heat FROM blog_content_main WHERE id = ?', [id]);
        res.status(200).json({ heat: article.heat });
    } catch (error) {
        console.error('更新失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
})

// 新增点赞接口
router.post('/updateLike', async (req, res) => {
    try {
        const { id } = req.body;
        // 这里可以添加防重复点赞逻辑（如检查用户ID）
        const result = await sqlQuery(
            `UPDATE blog_content_main SET like_count = like_count + 1 WHERE id = ?`,
            [id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ code: 404, message: '内容不存在' });
        }
        // 返回更新后的点赞数
        const [article] = await sqlQuery('SELECT like_count FROM blog_content_main WHERE id = ?', [id]);
        res.json({ likeCount: article.like_count });
    } catch (error) {
        console.error('点赞失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});
export default router;
