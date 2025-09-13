import express from 'express';
const router = express.Router();
import sqlQuery from '../db/sqlQuery.js';

//获取导航数据
router.get('/getNavData', async (req, res) => {
    try {
        const navContent = await sqlQuery(
            `
            SELECT
                category_id,
                nav_btn_title,
                nav_btn_subtitle,
                category_img_url
            FROM articles_categories
            `
        );
        res.status(200).json({
            code: 200,
            message: '获取导航数据成功',
            navContent
        })
    } catch (error) {  // 这里添加error参数
        console.error('获取导航数据失败:', error);  // 修改错误信息
        res.status(500).json({ message: '服务器内部错误' });
    }
});

//  获取文章基本信息
router.get('/getArticleInfo', async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ message: '缺少文章ID参数' });
        }
        // 查询文章基本信息和作者信息
        const result = await sqlQuery(
            `
            SELECT 
                articles.*, 
                users.username
            FROM articles
            INNER JOIN users ON users.user_id = articles.user_id
            INNER JOIN articles_categories ac ON ac.category_id = articles.category_id
            WHERE articles.category_id = ?
            `,
            [id]
        );

        if (result.length === 0) {
            return res.status(404).json({
                code: 404,
                message: '文章不存在'
            });
        }
        // 返回文章基本信息
        res.status(200).json({
            code: 200,
            message: '获取文章信息成功',
            result
        });
    } catch (error) {
        console.error('获取文章信息失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

// 获取文章章节（按order字段升序）
router.get('/getArticleSections', async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ message: '缺少文章章节ID参数' });
        }
        // 查询文章章节
        const sections = await sqlQuery(
            `
           SELECT
  title,
  content,
  level,
  order_asc
FROM
  articles_sections
WHERE
  article_id = ?
ORDER BY
  order_asc ASC
            `,
            [id]
        );

        res.status(200).json({
            code: 200,
            message: '获取文章章节成功',
            sections
        });
    } catch (error) {
        console.error('获取文章章节失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

//内容浏览量
router.post('/updateHeat', async (req, res) => {
    try {
        const { id } = req.body;
        const result = await sqlQuery(
            `
            update articles set heat = heat + 1 where article_id = ?
            `,
            [id]  // 使用参数化查询
        )
        if (result.affectedRows === 0) {
            return res.status(404).json({  // 使用return终止执行
                code: 404,
                message: '内容不存在'
            });
        }
        // 获取更新后的浏览量
        const [article] = await sqlQuery('SELECT heat FROM articles WHERE article_id = ?', [id]);
        res.status(200).json({ heat: article.heat });
    } catch (error) {
        console.error('更新失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
})

// 新增点赞接口
router.post('/updateLike', async (req, res) => {
    try {
        const { article_id } = req.body;
        // 使用参数化查询
        const result = await sqlQuery(
            `UPDATE articles SET like_count = like_count + 1 WHERE article_id = ?`,
            [article_id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ code: 404, message: '内容不存在' });
        }
        // 返回更新后的点赞数
        const [article] = await sqlQuery('SELECT like_count FROM articles WHERE article_id = ?', [article_id]);
        res.json({ likeCount: article.like_count });
    } catch (error) {
        console.error('点赞失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});
export default router;
