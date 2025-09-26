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

//  获取文章基本信息(分类下所有文章)
router.get('/getArticleInfo', async (req, res) => {
    try {
        const { category_id, user_id } = req.query;
        if (!category_id || !user_id && isNaN(category_id)) {
            return res.status(400).json({ message: '缺少分类ID或用户ID参数' });
        }
        // 查询文章基本信息和作者信息
        const result = await sqlQuery(
            `
                SELECT
                    a.*,
                    u.username,
                    CASE WHEN cv.has_comment = 1 THEN true ELSE false END AS has_comment
                FROM
                    articles a
                INNER JOIN users u
                    ON u.user_id = a.user_id
                LEFT JOIN comments_visible cv
                    ON cv.article_id = a.article_id
                    AND cv.user_id = ?
                WHERE
                    a.category_id = ?

            `,
            [user_id, category_id]
        );

        if (result.length === 0) {
            return res.status(404).json({
                code: 404,
                message: '文章不存在'
            });
        }
        const tags = await sqlQuery(
            `
            SELECT
                distinct master_tag
            FROM
                articles
                `,
            [category_id]
        )
        // 返回文章基本信息
        res.status(200).json({
            code: 200,
            message: '获取文章信息成功',
            result,
            tags
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

// 检查当前用户点赞状态
router.get('/checkLikeStatus', async (req, res) => {
    try {
        const { user_id, article_id } = req.query;

        if (!user_id || !article_id) {
            return res.status(400).json({
                code: 400,
                message: '缺少必要参数'
            });
        }

        const result = await sqlQuery(
            `SELECT 
                CASE 
                    WHEN COUNT(*) > 0 THEN true 
                    ELSE false 
                END AS has_liked
             FROM article_likes_count 
             WHERE user_id = ? AND article_id = ?
            AND liked_at > DATE_SUB(NOW(), INTERVAL 1 DAY)`,
            [user_id, article_id]
        );

        res.status(200).json({
            code: 200,
            hasLiked: result[0].has_liked
        });

    } catch (error) {
        console.error('检查点赞状态失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器内部错误'
        });
    }
});

// 点赞接口（防重复）
router.post('/likeArticle', async (req, res) => {
    try {
        const { user_id, article_id } = req.body;
        // 参数校验
        if (!user_id || !article_id) {
            return res.status(400).json({
                code: 400,
                message: '缺少必要参数'
            });
        }

        // 检查是否在24小时内已经点赞过
        const existingLike = await sqlQuery(
            `SELECT * FROM article_likes_count
             WHERE user_id = ? AND article_id = ?
            AND liked_at > DATE_SUB(NOW(), INTERVAL 1 DAY)`,
            [user_id, article_id]
        );

        if (existingLike.length > 0) {
            return res.status(400).json({
                code: 400,
                message: '您今天已经点过赞了，请明天再来'
            });
        }

        try {
            // 插入点赞记录（使用ON DUPLICATE KEY UPDATE来更新已存在的记录）
            await sqlQuery(
                `INSERT INTO article_likes_count(user_id, article_id) 
                 VALUES(?, ?)
                 ON DUPLICATE KEY UPDATE liked_at = NOW()`,
                [user_id, article_id]
            );

            // 更新文章点赞数
            const updateResult = await sqlQuery(
                `UPDATE articles SET like_count = like_count + 1 
                 WHERE article_id = ? `,
                [article_id]
            );

            if (updateResult.affectedRows === 0) {
                throw new Error('文章不存在');
            }

            await sqlQuery('COMMIT');

            // 获取更新后的点赞数
            const [article] = await sqlQuery(
                'SELECT like_count FROM articles WHERE article_id = ?',
                [article_id]
            );

            res.status(200).json({
                code: 200,
                message: '点赞成功',
                likeCount: article.like_count
            });

        } catch (error) {
            await sqlQuery('ROLLBACK');
            throw error; // 抛出错误，由外层的catch处理
        }

    } catch (error) {
        console.error('点赞失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器内部错误'
        });
    }
});

// 专栏数据处理
router.get('/getColumnData', async (req, res) => {
    try {
        const { category_id } = req.query;
        if (!category_id) {
            return res.status(400).json({ message: '缺少专栏ID参数' });
        }
        // 查询专栏数据
        const columnData = await sqlQuery(
            `
            SELECT
                a.master_tag,
            COUNT(*) AS tag_count
            FROM
                articles_categories c
            INNER JOIN
                articles a ON c.category_id = a.category_id
            WHERE
                c.category_id = ?
                GROUP BY
                a.master_tag
            ORDER BY
                tag_count;
        `,
            [category_id]
        );

        res.status(200).json({
            code: 200,
            message: '获取专栏数据成功',
            columnData
        });
    } catch (error) {
        console.error('获取专栏数据失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

// 专栏文章统计
router.get('/getColumnArticles', async (req, res) => {
    try {
        const { master_tag } = req.query;
        if (!master_tag) {
            return res.status(400).json({ message: '缺少专栏文章标签参数' });
        }
        // 查询专栏文章
        const articles = await sqlQuery(
            `
        SELECT
        a.article_id,
            a.user_id,
            a.title,
            a.preface,
            a.heat,
            a.like_count,
            a.cover_image_url,
            a.cover_video_url,
            a.release_time
        FROM
                articles a
        WHERE
        a.master_tag = ?
            ORDER BY a.release_time DESC;
        `,
            [master_tag]
        );
        res.status(200).json({
            code: 200,
            message: '获取专栏文章成功',
            articles
        });

    } catch (error) {
        console.error('获取专栏文章失败:', error);
        res.status(500).json({ message: '服务器内部错误' });

    }
});

//专栏获取文章详情(每次查询)
router.get('/getColumnDetail', async (req, res) => {
    try {
        const { article_id } = req.query;
        if (!article_id) {
            return res.status(400).json({ message: '缺少文章ID参数' });
        }
        // 查询文章详情
        const articleDetail = await sqlQuery(
            `
          SELECT
            *
            FROM
                articles
            WHERE
                article_id = ?;
            `,
            [article_id]
        );
        res.status(200).json({
            code: 200,
            message: '获取文章详情成功',
            articleDetail
        });
    } catch (error) {
        console.error('获取文章详情失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});
export default router;
