import express from 'express';
const router = express.Router();
import sqlQuery from '../db/sqlQuery.js';

router.post('/setMessgeContent', async (req, res) => {
    const userId = req.body.userId;
    const content = req.body.content;
    try {
        const insertValue = await sqlQuery(
            'INSERT INTO message_board (user_id, message_content, created_at) VALUES (?, ?, NOW())',
            [userId, content]
        )

        if (!insertValue || !insertValue.insertId) {
            throw new Error('插入失败')
        }
        res.status(201).json({
            code: 0,
            message: '留言发布成功',
            data: {
                messageId: insertValue.insertId,
                userId,
                content,
                createdAt: new Date().toISOString()
            }
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }

});
router.get('/getMessageList', async (req, res) => {
    try {
        const result = await sqlQuery(
            ` 
             SELECT
                m.message_content,
                m.created_at,
                u.username,
                u.avatarUrl
            FROM message_board m
            INNER JOIN users u ON m.user_id = u.id
            ORDER BY m.created_at DESC`
        )
        res.status(200).json({
            code: 0,
            message: '获取留言列表成功',
            data: result.map(item => ({
                ...item,
                avatarUrl: item.avatarUrl,
                username: item.username,
                content: item.message_content
            }))
        })
    } catch (error) {
        console.error('获取留言失败:', error);
        res.status(500).json({
            code: -1,
            message: '获取留言失败',
            error: error.message
        });
    }
});
export default router;