import express from 'express';
const router = express.Router();
import sqlQuery from '../db/sqlQuery.js';
import authenticateToken from '../middleware/authenticateToken.js';
// 获取留言列表（分页）
router.get('/getmessageList', authenticateToken, async (req, res) => {
    try {
        const { page = 1, pageSize = 10, parentId = 0 } = req.query;
        const offset = (page - 1) * pageSize;

        // 查询当前用户的留言（或所有公开留言，根据业务调整）
        const result = await sqlQuery(`
      SELECT m.*, u.avatarUrl, u.username, u.vipLevel 
      FROM blog_messages m
      JOIN users u ON m.user_id = u.id
      WHERE m.parent_id = ? AND m.status = 0
      ORDER BY m.created_at DESC
      LIMIT ? OFFSET ?
    `, [parentId, parseInt(pageSize), parseInt(offset)]);

        // 查询总条数
        const [countRows] = await sqlQuery(`
      SELECT COUNT(*) AS total 
      FROM blog_messages m 
      WHERE m.parent_id = ? AND m.status = 0
    `, [parentId]);
        const formatData = result.map(item => ({
            ...item,
            created_at: item.created_at.toLocaleString()
        }))
        res.json({
            code: 200,
            data: {
                list: formatData,
                total: countRows.total
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
        const { content, parent_id = 0 } = req.body;
        if (!content || content.trim().length === 0) {
            return res.status(400).json({ code: 400, msg: '留言内容不能为空' });
        }

        // 校验用户是否存在（冗余校验，外键已约束）
        const [user] = await pool.execute(
            'SELECT id FROM users WHERE id = ?',
            [req.user.id]
        );
        if (user.length === 0) {
            return res.status(404).json({ code: 404, msg: '用户不存在' });
        }

        // 插入留言
        const [result] = await pool.execute(`
      INSERT INTO blog_messages (user_id, content, parent_id)
      VALUES (?, ?, ?)
    `, [req.user.id, content.trim(), parseInt(parent_id)]);

        res.status(201).json({
            code: 201,
            data: { id: result.insertId }
        });
    } catch (err) {
        console.error('发布留言失败:', err);
        res.status(500).json({ code: 500, msg: '服务器错误' });
    }
});

export default router;