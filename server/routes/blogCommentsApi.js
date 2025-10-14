import express from 'express';
const router = express.Router();
import sqlQuery from '../db/sqlQuery.js';
import authenticateToken from '../middleware/authenticateToken.js';


// 获取评论列表（分页 + 回复内容）
router.get('/getblogmessageList', authenticateToken, async (req, res) => {
    try {
        const { page = 1, pageSize = 10, article_id } = req.query;

        if (!article_id) {
            return res.status(400).json({ code: 400, msg: '缺少文章ID参数' });
        }

        // 计算分页偏移量
        const offset = (page - 1) * pageSize;

        // 优化后的 SQL：仅选择必要字段
        const postsQuery = `
            SELECT
                bm.id AS postId,
                bm.user_id,
                bm.article_id,
                bm.content,
                DATE_FORMAT(bm.created_at, '%Y-%m-%d %H:%i:%s') AS createdAt,
                u.avatar_url,
                u.username,
                u.vipLevel
            FROM blog_comments bm
            INNER JOIN articles a ON bm.article_id = a.article_id
            LEFT JOIN users u ON bm.user_id = u.user_id
            WHERE bm.article_id = ?
            ORDER BY bm.created_at DESC
            LIMIT ? OFFSET ?
        `;
        const posts = await sqlQuery(postsQuery, [article_id, parseInt(pageSize), parseInt(offset)]);

        if (posts.length === 0) {
            return res.status(401).json({ code: 401, msg: '该文章暂无评论' });
        }

        // 提取所有主评论ID
        const postIds = posts.map(post => post.postId);

        // 优化回复查询（仅选择必要字段）
        const replies = await sqlQuery(`
            SELECT
                pr.parent_reply_id,
                pr.user_id,
                pr.content AS replyContent,
                DATE_FORMAT(pr.created_at, '%Y-%m-%d %H:%i:%s') AS replyCreatedAt,
                u.avatar_url AS replyAvatar,
                u.username AS replyUsername,
                u.vipLevel AS replyVipLevel
            FROM blog_comments_replies pr
            LEFT JOIN users u ON pr.user_id = u.user_id
            WHERE pr.parent_reply_id IN (?)
        `, [postIds]);

        // 构建回复映射
        const replyMap = new Map();
        replies.forEach(reply => {
            if (!replyMap.has(reply.parent_reply_id)) {
                replyMap.set(reply.parent_reply_id, []);
            }
            replyMap.get(reply.parent_reply_id).push({
                id: reply.id,
                parentId: reply.parent_reply_id,
                content: reply.replyContent,
                user: {
                    id: reply.user_id,
                    avatarUrl: reply.replyAvatar,
                    username: reply.replyUsername,
                    vipLevel: reply.replyVipLevel
                },
                createdAt: reply.replyCreatedAt
            });
        });

        // 构建最终响应数据（移除 articleId）
        const formattedPosts = posts.map(post => ({
            id: post.postId,
            userId: post.user_id,
            content: post.content,
            createdAt: post.createdAt,
            user: {
                avatarUrl: post.avatar_url,
                username: post.username,
                vipLevel: post.vipLevel
            },
            replyCount: post.reply_count,
            replies: replyMap.get(post.postId) || []
        }));

        // 获取总记录数（仅需计数，无需关联文章）
        const totalResult = await sqlQuery(
            'SELECT COUNT(*) AS total FROM blog_comments WHERE article_id = ?',
            [article_id]
        );
        // const replyTotalResult = await sqlQuery(
        //     'SELECT COUNT(*) AS total FROM blog_comments_replies WHERE parent_reply_id IN (?)',
        //     [postIds]
        // );
        // const replyTotal = replyTotalResult[0].total;
        const total = totalResult[0].total;

        res.json({
            code: 200,
            data: {
                list: formattedPosts,
                pagination: {
                    total,
                    page: parseInt(page),
                    pageSize: parseInt(pageSize)
                }
            }
        });

    } catch (err) {
        console.error('获取评论失败:', err.msg);
        res.status(500).json({ code: 500, msg: '服务器错误' });
    }
});

// 发布评论
router.post('/postmessage', authenticateToken, async (req, res) => {
    try {
        const { content, article_id } = req.body;
        if (!content || content.trim().length === 0) {
            return res.status(400).json({ code: 400, msg: '评论内容不能为空' });
        }

        // 校验用户是否存在（冗余校验，外键已约束）
        const [user] = await sqlQuery(
            'SELECT user_id FROM users WHERE user_id = ?',
            [req.user.user_id]
        );
        if (!user) {
            return res.status(404).json({ code: 404, msg: '用户不存在' });
        }
        // 插入评论
        const result = await sqlQuery(`
            INSERT INTO blog_comments (user_id, article_id,content)
            VALUES (?, ?, ?)
        `, [req.user.user_id, article_id, content.trim()]);
        res.status(200).json({
            code: 200,
            data: { id: result.insertId }
        });
    } catch (err) {
        console.error('发布评论失败:', err);
        res.status(500).json({ code: 500, msg: '服务器错误' });
    }
});

// 新增回复接口（示例）
router.post('/replies', authenticateToken, async (req, res) => {
    try {
        const { content, userId, currentFatherId } = req.body;
        // 校验 postId 是否存在
        const [post] = await sqlQuery('SELECT id FROM blog_comments WHERE id = ?', [currentFatherId]);
        if (!post) return res.status(404).json({ code: 404, msg: '主评论不存在' });
        if (userId === req.user.user_id) {
            return res.status(400).json({ code: 400, msg: '不能回复自己' });
        }
        // 插入回复
        const result = await sqlQuery(`
            INSERT INTO blog_comments_replies (user_id, parent_reply_id, content)
            VALUES ( ?, ?, ?)
        `, [req.user.user_id, currentFatherId, content.trim()]);
        res.json({ code: 200, data: { id: result.insertId } });
    } catch (err) {
        console.error('创建回复失败:', err);
        res.status(500).json({ code: 500, msg: '服务器错误' });
    }
});
export default router;