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

})
export default router;