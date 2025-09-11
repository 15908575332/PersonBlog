import express from 'express';
const router = express.Router();
import sqlQuery from '../db/sqlQuery.js';
import authenticateToken from '../middleware/authenticateToken.js';


// 获取留言列表（分页 + 回复内容）
router.get('/getmessageList', authenticateToken, async (req, res) => {
    try {
        const { page = 1, pageSize = 10 } = req.query;
        const offset = (page - 1) * pageSize;

        // 查询主留言（保持原有逻辑）
        const posts = await sqlQuery(`
            SELECT 
                p.id AS postId,
                p.user_id,
                p.content,
                p.id,
                p.created_at,
                u.avatarUrl,
                u.username,
                u.vipLevel,
                COUNT(r.id) AS reply_count 
            FROM blog_messages p
            LEFT JOIN users u ON p.user_id = u.id
            LEFT JOIN blog_messages_replies r ON p.id = r.parent_reply_id
            GROUP BY p.id
            ORDER BY p.created_at DESC
            LIMIT ? OFFSET ?
        `, [parseInt(pageSize), parseInt(offset)]);

        if (posts.length === 0) {
            return res.status(404).json({ code: 404, msg: '暂无留言' });
        }

        // 提取所有主留言ID
        const postIds = posts.map(post => post.postId);

        // 查询所有回复（新增逻辑）
        const replies = await sqlQuery(`
            SELECT 
                pr.parent_reply_id,
                pr.user_id,
                pr.content AS reply_content,
                u.avatarUrl AS reply_avatar,
                u.username AS reply_username,
                u.vipLevel AS reply_vipLevel,
                pr.created_at AS reply_created_at
            FROM blog_messages_replies pr
            LEFT JOIN users u ON pr.user_id = u.id
            WHERE pr.parent_reply_id IN (?)
            ORDER BY pr.created_at DESC
        `, [postIds]);

        // 按parent_reply_id分组回复数据
        const replyMap = replies.reduce((acc, curr) => {
            if (!acc[curr.parent_reply_id]) {
                acc[curr.parent_reply_id] = [];
            }
            acc[curr.parent_reply_id].push({
                id: curr.id,
                parentId: curr.parent_reply_id,
                content: curr.reply_content,
                user: {
                    id: curr.user_id,
                    avatarUrl: curr.reply_avatar,
                    username: curr.reply_username,
                    vipLevel: curr.reply_vipLevel,
                },
                createdAt: curr.reply_created_at.toLocaleString()
            });
            return acc;
        }, {});

        // 关联回复数据到主留言
        const formattedPosts = posts.map(post => ({
            ...post,
            replies: replyMap[post.postId] || [],
            createdAt: post.created_at.toLocaleString()
        }));

        res.json({
            code: 200,
            data: {
                list: formattedPosts,
                total: posts.length
            }
        });

    } catch (err) {
        console.error('获取留言失败:', err);
        res.status(500).json({ code: 500, msg: '服务器错误' });
    }
});

// 发布留言
router.post('/postmessage', authenticateToken, async (req, res) => {
    try {
        const { content } = req.body;
        if (!content || content.trim().length === 0) {
            return res.status(400).json({ code: 400, msg: '留言内容不能为空' });
        }

        // 校验用户是否存在（冗余校验，外键已约束）
        const [user] = await sqlQuery(
            'SELECT id FROM users WHERE id = ?',
            [req.user.id]
        );
        if (user.length === 0) {
            return res.status(404).json({ code: 404, msg: '用户不存在' });
        }
        // 插入留言
        const result = await sqlQuery(`
      INSERT INTO blog_messages (user_id, content)
      VALUES (?, ?)
    `, [req.user.id, content.trim()]);
        res.status(200).json({
            code: 200,
            data: { id: result.insertId }
        });
    } catch (err) {
        console.error('发布留言失败:', err);
        res.status(500).json({ code: 500, msg: '服务器错误' });
    }
});

// 新增回复接口（示例）
router.post('/replies', authenticateToken, async (req, res) => {
    try {
        const { content, userId, currentFatherId } = req.body;
        // 校验 postId 是否存在
        const [post] = await sqlQuery('SELECT id FROM blog_messages WHERE id = ?', [currentFatherId]);
        if (!post) return res.status(404).json({ code: 404, msg: '主留言不存在' });

        if (userId === req.user.id) {
            return res.status(400).json({ code: 400, msg: '不能回复自己' });
        }
        // 插入回复
        const result = await sqlQuery(`
            INSERT INTO blog_messages_replies (user_id, content)
            VALUES ( ?, ?)
        `, [req.user.id, content.trim()]);
        res.json({ code: 200, data: { id: result.insertId } });
    } catch (err) {
        console.error('创建回复失败:', err);
        res.status(500).json({ code: 500, msg: '服务器错误' });
    }
});
export default router;