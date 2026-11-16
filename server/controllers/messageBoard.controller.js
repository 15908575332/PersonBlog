// messageBoard.controller.js 留言板控制器
import { insertMessage, fetchMessageList } from '../services/messageBoard.service.js';

// POST /setMessgeContent 发布留言
export const setMessgeContent = async (req, res) => {
    const userId = req.body.userId;
    const content = req.body.content;
    try {
        const insertValue = await insertMessage(userId, content);

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
        res.status(500).json({ error: error.message })
    }
};

// GET /getMessageList 获取留言列表
export const getMessageList = async (req, res) => {
    try {
        const data = await fetchMessageList();

        res.status(200).json({
            code: 0,
            message: '获取留言列表成功',
            data
        })
    } catch (error) {
        console.error('获取留言失败:', error);
        res.status(500).json({
            code: -1,
            message: '获取留言失败',
            error: error.message
        });
    }
};
