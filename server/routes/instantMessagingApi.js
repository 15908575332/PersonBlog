import express from 'express';
const router = express.Router();
import sqlQuery from '../db/sqlQuery.js';
import authenticateToken from '../middleware/authenticateToken.js';

router.get('/im_system_notifications', async (req, res) => { //系统通知
    try {
        const result = await sqlQuery(
            `
            SELECT
              id,
              type,
              title,
              preview,
              content,
              time as realseTime 
            FROM
              im_system_notifications
            `
        );

        res.status(200).json({
            result
        })
    } catch (error) {
        console.log('获取系统通知消息失败：' + error)
        res.status(500).json({ message: '服务器内部错误' }); // 添加错误响应
    }
});

router.get('/im_friend_list', async (req, res) => { //好友列表（多状态）
    try {
        // 获取当前用户ID
        const currentUserId = req?.query;
        if (!currentUserId) {
            return res.status(401).json({ message: '未授权访问' });
        }
        const [friendList, statusCounts] = await Promise.all([
            sqlQuery(
                `
            SELECT
              u.user_id,
              u.username,
              u.email,
              u.avatar_url,
              u.phone,
              u.introduce,
              u.vip_level,
              u.sex,
              f.friend_status,
              f.id,
              f.created_at as addTime
            FROM
              users u
            JOIN im_friend_list f ON f.friend_id = u.user_id
            WHERE f.current_user_id = ?
            ORDER BY
              f.friend_status;
            `
                , [currentUserId]),
            sqlQuery(
                `
            SELECT
              COUNT(*) AS friend_count
            FROM
              im_friend_list f
            WHERE f.friend_status = 1;
            `
            )
        ])
        res.status(200).json({
            friend_list: friendList,
            friend_counts: statusCounts  // 修正拼写
        })
    } catch (error) {
        // 4. 增强错误处理
        console.error('获取好友列表失败:', error);
        res.status(500).json({
            message: '服务器内部错误',
            error: process.env.NODE_ENV === 'development' ? error.message : null
        });
    }
})

router.get('/im_emojis', async (req, res) => { // 获取所有表情图
    try {
        const { category, em_type, is_active = true } = req.query;
        let query = 'SELECT * FROM im_emojis WHERE is_active = ?';
        const params = [is_active];

        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }

        if (em_type) {
            query += ' AND em_type = ?';
            params.push(em_type);
        }

        query += ' ORDER BY sort_order ASC, id ASC';

        const result = await sqlQuery(query, params);
        res.status(200).json({
            result: result
        });

    } catch (error) {
        console.error('获取表情失败:', error);
        res.status(500).json({
            message: '服务器内部错误',
            error: process.env.NODE_ENV === 'development' ? error.message : null
        });
    }
});

router.get('/im_emojis/:id', async (req, res) => { // 根据ID获取单个表情
    try {
        const result = await sqlQuery(
            'SELECT * FROM im_emojis WHERE id = ? AND is_active = true',
            [req.params.id]
        );

        if (result.length === 0) {
            return res.status(404).json({ message: '表情不存在' });
        }

        res.status(200).json({
            emoji: result[0]
        });
    } catch (error) {
        console.error('获取表情详情失败:', error);
        res.status(500).json({
            message: '服务器内部错误',
            error: process.env.NODE_ENV === 'development' ? error.message : null
        });
    }
});


/**
 * 创建单人聊天会话
 * POST /instansMessaging/createMssageSession
 * 请求体: { otherUserId: '对方用户ID' }
 */
router.post('/createMssageSession', authenticateToken, async (req, res) => {
    try {
        const { otherUserId } = req.body;

        const currentUserId = req.user.user_id; // 从认证中间件获取当前用户ID
        if (!otherUserId) {
            return res.status(400).json({
                code: 400,
                message: '缺少对方用户ID'
            });
        }

        if (currentUserId === otherUserId) {
            return res.status(400).json({
                code: 400,
                message: '不能与自己创建会话'
            });
        }

        // 确定用户ID顺序（确保 user1_id < user2_id）
        const [user1_id, user2_id] = [currentUserId, otherUserId].sort();
        // 检查会话是否已存在
        const existingSession = await sqlQuery(
            `SELECT session_id, user1_id, user2_id, last_msg_content, 
                    last_msg_time, unread_count1, unread_count2, created_at
             FROM im_single_chat_sessions 
             WHERE user1_id = ? AND user2_id = ?`,
            [user1_id, user2_id]
        );
        // 如果会话已存在，返回现有会话
        if (Array.isArray(existingSession) && existingSession.length > 0) {
            return res.json({
                code: 200,
                data: existingSession[0],
                message: '获取会话成功'
            });
        }

        // 创建新会话
        const insertResult = await sqlQuery(
            `INSERT INTO im_single_chat_sessions 
             (user1_id, user2_id, created_at, updated_at) 
             VALUES (?, ?, NOW(), NOW())`,
            [user1_id, user2_id]
        );

        if (insertResult.affectedRows === 0) {
            return res.status(500).json({
                code: 500,
                message: '创建会话失败'
            });
        }

        // 获取新创建的会话详情
        const newSession = await sqlQuery(
            `SELECT session_id, user1_id, user2_id, last_msg_content, 
                    last_msg_time, unread_count1, unread_count2, created_at
             FROM im_single_chat_sessions 
             WHERE session_id = ?`,
            [insertResult.insertId]
        );

        res.json({
            code: 200,
            data: newSession[0],
            message: '创建会话成功'
        });

    } catch (error) {
        console.error('创建聊天会话失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器内部错误'
        });
    }
});

/**
 * 获取用户的所有聊天会话列表
 * GET /chat-sessions
 */
router.get('/getMessageSessions', authenticateToken, async (req, res) => {
    try {
        const currentUserId = req.user.user_id;

        const sessions = await sqlQuery(
            `SELECT 
                s.session_id,
                s.user1_id,
                s.user2_id,
                -- 确定对方用户信息
                CASE 
                    WHEN s.user1_id = ? THEN s.user2_id 
                    ELSE s.user1_id 
                END AS other_user_id,
                s.last_msg_content,
                s.last_msg_time,
                s.last_msg_type,
                -- 当前用户的未读消息数
                CASE 
                    WHEN s.user1_id = ? THEN s.unread_count1 
                    ELSE s.unread_count2 
                END AS unread_count,
                s.created_at,
                s.updated_at,
                -- 获取对方用户信息
                u.username AS other_username,
                u.avatar_url AS other_avatar
             FROM im_single_chat_sessions s
             LEFT JOIN users u ON (
                 u.user_id = CASE 
                     WHEN s.user1_id = ? THEN s.user2_id 
                     ELSE s.user1_id 
                 END
             )
             WHERE s.user1_id = ? OR s.user2_id = ?
             ORDER BY s.last_msg_time DESC, s.updated_at DESC`,
            [currentUserId, currentUserId, currentUserId, currentUserId, currentUserId]
        );

        // 确保返回数组格式
        const result = Array.isArray(sessions) ? sessions : [];

        res.json({
            code: 200,
            data: result,
            message: '获取会话列表成功'
        });

    } catch (error) {
        console.error('获取会话列表失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器内部错误'
        });
    }
});

/**
 * 发送单人聊天消息
 * POST /instansMessaging/sendMessage
 */
// 消息类型定义
const MESSAGE_TYPES = {
    TEXT: 1,        // 文本（包含表情）
    IMAGE: 2,       // 图片
};

router.post('/sendMessage', authenticateToken, async (req, res) => {
    try {
        const {
            session_id,
            receiver_id,
            msg_type = MESSAGE_TYPES.TEXT, // 默认文本类型
            content,
            file_url = null,
            file_size = null,
            file_duration = null,
            is_simulated = false,        // 是否模拟回复
            simulated_sender_id = null   // 模拟回复的发送者ID
        } = req.body;

        // 确定发送者ID
        let sender_id;
        if (is_simulated && simulated_sender_id) {
            // 模拟回复：使用指定的发送者ID
            sender_id = simulated_sender_id;
        } else {
            // 正常消息：使用当前登录用户
            sender_id = req.user.user_id;
        }

        // 验证会话存在且用户有权访问
        const session = await sqlQuery(
            `SELECT session_id, user1_id, user2_id 
             FROM im_single_chat_sessions 
             WHERE session_id = ? AND (user1_id = ? OR user2_id = ?)`,
            [session_id, req.user.user_id, req.user.user_id]
        );

        if (!Array.isArray(session) || session.length === 0) {
            return res.status(403).json({
                code: 403,
                message: '会话不存在或无权操作'
            });
        }

        // 验证模拟回复的发送者必须是会话中的对方用户
        if (is_simulated) {
            const sessionData = session[0];
            const validSenderIds = [sessionData.user1_id, sessionData.user2_id];

            if (!validSenderIds.includes(simulated_sender_id)) {
                return res.status(403).json({
                    code: 403,
                    message: '模拟回复的发送者ID无效'
                });
            }

            if (simulated_sender_id === req.user.user_id) {
                return res.status(403).json({
                    code: 403,
                    message: '不能模拟自己发送消息'
                });
            }
        }

        // 验证消息内容
        if (!content || content.trim() === '') {
            return res.status(400).json({
                code: 400,
                message: '消息内容不能为空'
            });
        }

        // 图片消息需要文件URL
        if (msg_type === MESSAGE_TYPES.IMAGE && !file_url) {
            return res.status(400).json({
                code: 400,
                message: '图片消息必须提供文件URL'
            });
        }

        // 插入消息记录（严格按照SQL表结构）
        const insertResult = await sqlQuery(
            `INSERT INTO im_single_chat_messages 
             (session_id, sender_id, receiver_id, msg_type, content, 
              file_url, file_size, file_duration, is_read, is_received,
              created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [
                session_id,
                sender_id,
                receiver_id,
                msg_type,
                content,
                file_url,
                file_size,
                file_duration,
                0,  // is_read: 0-未读
                0   // is_received: 0-未送达（稍后可以更新为已送达）
            ]
        );

        if (insertResult.affectedRows === 0) {
            return res.status(500).json({
                code: 500,
                message: '消息发送失败'
            });
        }

        // 获取新插入的消息详情
        const newMessage = await sqlQuery(
            `SELECT 
                msg_id,
                session_id,
                sender_id,
                receiver_id,
                msg_type,
                content,
                file_url,
                file_size,
                file_duration,
                is_read,
                read_at,
                is_received,
                received_at,
                created_at,
                updated_at
             FROM im_single_chat_messages 
             WHERE msg_id = ?`,
            [insertResult.insertId]
        );

        if (!Array.isArray(newMessage) || newMessage.length === 0) {
            return res.status(500).json({
                code: 500,
                message: '获取新消息详情失败'
            });
        }

        // 更新会话的最后一条消息和未读计数
        await updateSessionLastMessage(session_id, newMessage[0]);

        res.json({
            code: 200,
            data: newMessage[0],
            message: '消息发送成功'
        });

    } catch (error) {
        console.error('发送消息失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器内部错误',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

/**
 * 更新会话最后消息
 */
async function updateSessionLastMessage(sessionId, messageData) {
    try {
        const { msg_id, content, msg_type, sender_id } = messageData;

        const session = await sqlQuery(
            'SELECT user1_id, user2_id FROM im_single_chat_sessions WHERE session_id = ?',
            [sessionId]
        );

        if (Array.isArray(session) && session.length > 0) {
            const sessionData = session[0];
            const isUser1 = sender_id === sessionData.user1_id;

            // 更新会话表的相关字段
            await sqlQuery(
                `UPDATE im_single_chat_sessions 
                 SET 
                     last_msg_id = ?, 
                     last_msg_content = ?, 
                     last_msg_type = ?, 
                     last_msg_time = NOW(),
                     unread_count1 = CASE 
                         WHEN user1_id = ? THEN unread_count1 
                         ELSE unread_count1 + 1 
                     END,
                     unread_count2 = CASE 
                         WHEN user2_id = ? THEN unread_count2 
                         ELSE unread_count2 + 1 
                     END,
                     updated_at = NOW()
                 WHERE session_id = ?`,
                [
                    msg_id,
                    content,
                    msg_type,
                    sender_id,  // 对于user1_id的判断
                    sender_id,  // 对于user2_id的判断
                    sessionId
                ]
            );
        }
    } catch (error) {
        console.error('更新会话最后消息失败:', error);
        // 不抛出错误，避免影响主流程
    }
}

/**
 * 获取会话聊天记录
 * GET /instansMessaging/messages/:sessionId
 */
// 在 instantMessagingApi.js 中修改获取消息接口
router.get('/messages/:sessionId', authenticateToken, async (req, res) => {
    try {
        const { sessionId } = req.params;
        const currentUserId = req.user.user_id;

        // 验证会话权限
        const session = await sqlQuery(
            `SELECT session_id FROM im_single_chat_sessions 
             WHERE session_id = ? AND (user1_id = ? OR user2_id = ?)`,
            [sessionId, currentUserId, currentUserId]
        );

        if (!Array.isArray(session) || session.length === 0) {
            return res.status(403).json({
                code: 403,
                message: '会话不存在或无权访问'
            });
        }

        // 获取消息
        const messages = await sqlQuery(
            `SELECT 
                m.msg_id,
                m.session_id,
                m.sender_id,
                m.receiver_id,
                m.msg_type,
                m.content,
                m.file_url,
                m.file_size,
                m.file_duration,
                m.is_read,
                m.read_at,
                m.is_received,
                m.received_at,
                m.created_at,
                u.username as sender_name,
                u.avatar_url as sender_avatar
            FROM im_single_chat_messages m
            LEFT JOIN users u ON m.sender_id = u.user_id
            WHERE m.session_id = ?
            ORDER BY m.created_at ASC`,
            [sessionId]
        );

        // 解析每条消息的内容
        const processedMessages = await Promise.all(
            messages.map(async (msg) => {
                if (msg.msg_type === 1) { // 文本消息
                    return {
                        ...msg,
                        parsed_content: await parseMessageContent(msg.content)
                    };
                }
                // 图片消息直接返回
                return msg;
            })
        );
        res.json({
            code: 200,
            data: {
                messages: processedMessages
            },
            message: '获取消息成功'
        });

    } catch (error) {
        console.error('获取消息失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器内部错误'
        });
    }
});

// 简化的消息解析函数
async function parseMessageContent(content) {
    if (!content) return [];

    const result = [];
    const emojiRegex = /\[emoji:([^|\]]+)\|([^\]]+)\]/g;
    let lastIndex = 0;
    let match;
    while ((match = emojiRegex.exec(content)) !== null) {
        // 添加表情前的文本
        if (match.index > lastIndex) {
            const text = content.substring(lastIndex, match.index);
            if (text.trim()) {
                result.push({ type: 'text', content: text });
            }
        }

        // 查询表情URL
        const emojiCode = match[1];
        const emojiText = match[2];
        const emojiUrl = await getEmojiUrl(emojiCode);
        // 添加表情
        result.push({
            type: 'emoji',
            code: emojiCode,
            text: emojiText,
            url: emojiUrl
        });

        lastIndex = match.index + match[0].length;
    }

    // 添加剩余文本
    if (lastIndex < content.length) {
        const text = content.substring(lastIndex);
        if (text.trim()) {
            result.push({ type: 'text', content: text });
        }
    }

    return result;
}

// 查询表情URL
async function getEmojiUrl(emojiCode) {
    try {
        const result = await sqlQuery(
            'SELECT content FROM im_emojis WHERE code = ? AND is_active = 1',
            [emojiCode]
        );
        return result[0]?.content || null;
    } catch (error) {
        console.error('查询表情URL失败:', error);
        return null;
    }
}

//  标记消息为已读
router.post('/sessions/:sessionId/read-all', authenticateToken, async (req, res) => {
    try {
        const { sessionId } = req.params;
        const currentUserId = req.user.user_id;
        // 批量更新该会话中所有未读消息为已读
        await sqlQuery(
            `UPDATE im_single_chat_messages 
             SET is_read = 1, read_at = NOW() 
             WHERE session_id = ? AND receiver_id = ? AND is_read = 0`,
            [sessionId, currentUserId]
        );
        // 重置会话未读计数
        await sqlQuery(
            `UPDATE im_single_chat_sessions 
             SET unread_count1 = CASE WHEN user1_id = ? THEN 0 ELSE unread_count1 END,
                 unread_count2 = CASE WHEN user2_id = ? THEN 0 ELSE unread_count2 END
             WHERE session_id = ?`,
            [currentUserId, currentUserId, sessionId]
        );
        res.json({ code: 200, message: '会话消息已全部标记为已读' });
    } catch (error) {
        console.error('批量标记已读失败:', error);
        res.status(500).json({ code: 500, message: '服务器内部错误' });
    }
});

/**
 * 删除聊天会话
 * DELETE /chat-sessions/:sessionId
 */
router.delete('/:sessionId', authenticateToken, async (req, res) => {
    try {
        const { sessionId } = req.params;
        const currentUserId = req.user.user_id;
        // 验证会话属于当前用户
        const session = await sqlQuery(
            'SELECT session_id FROM im_single_chat_sessions WHERE session_id = ? AND (user1_id = ? OR user2_id = ?)',
            [sessionId, currentUserId, currentUserId]
        );

        if (!Array.isArray(session) || session.length === 0) {
            return res.status(404).json({
                code: 404,
                message: '会话不存在或无权操作'
            });
        }

        const deleteResult = await sqlQuery(
            'DELETE FROM im_single_chat_sessions WHERE session_id = ?',
            [sessionId]
        );

        if (deleteResult.affectedRows === 0) {
            return res.status(500).json({
                code: 500,
                message: '删除会话失败'
            });
        }

        res.json({
            code: 200,
            message: '删除会话成功'
        });

    } catch (error) {
        console.error('删除会话失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器内部错误'
        });
    }
});

export default router;