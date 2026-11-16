import {
    MESSAGE_TYPES,
    getSystemNotifications,
    getFriendList,
    getEmojis,
    getEmojiById,
    findSession,
    createSession,
    getUserSessions,
    getSessionForUser,
    createMessage,
    updateSessionLastMessage,
    getMessagesWithParsedContent,
    markSessionMessagesRead,
    deleteSession
} from '../services/im.service.js';

export async function systemNotifications(req, res) { //系统通知
    try {
        const result = await getSystemNotifications();

        res.status(200).json({
            result
        })
    } catch (error) {
        console.log('获取系统通知消息失败：' + error)
        res.status(500).json({ message: '服务器内部错误' }); // 添加错误响应
    }
}

export async function friendList(req, res) { //好友列表（多状态）
    try {
        // 获取当前用户ID
        const currentUserId = req?.query;
        if (!currentUserId) {
            return res.status(401).json({ message: '未授权访问' });
        }
        const { friendList, statusCounts } = await getFriendList(currentUserId);
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
}

export async function emojiList(req, res) { // 获取所有表情图
    try {
        const { category, em_type, is_active = true } = req.query;
        const result = await getEmojis(category, em_type, is_active);
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
}

export async function emojiDetail(req, res) { // 根据ID获取单个表情
    try {
        const result = await getEmojiById(req.params.id);

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
}

/**
 * 创建单人聊天会话
 * POST /instansMessaging/createMssageSession
 * 请求体: { otherUserId: '对方用户ID' }
 */
export async function createMessageSession(req, res) {
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
        const existingSession = await findSession(user1_id, user2_id);
        // 如果会话已存在，返回现有会话
        if (Array.isArray(existingSession) && existingSession.length > 0) {
            return res.json({
                code: 200,
                data: existingSession[0],
                message: '获取会话成功'
            });
        }

        // 创建新会话
        const { insertResult, newSession } = await createSession(user1_id, user2_id);

        if (insertResult.affectedRows === 0) {
            return res.status(500).json({
                code: 500,
                message: '创建会话失败'
            });
        }

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
}

/**
 * 获取用户的所有聊天会话列表
 * GET /chat-sessions
 */
export async function messageSessions(req, res) {
    try {
        const currentUserId = req.user.user_id;

        const result = await getUserSessions(currentUserId);

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
}

/**
 * 发送单人聊天消息
 * POST /instansMessaging/sendMessage
 */
export async function sendMessage(req, res) {
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
        const session = await getSessionForUser(session_id, req.user.user_id);

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
        const { insertResult, newMessage } = await createMessage(
            session_id,
            sender_id,
            receiver_id,
            msg_type,
            content,
            file_url,
            file_size,
            file_duration
        );

        if (insertResult.affectedRows === 0) {
            return res.status(500).json({
                code: 500,
                message: '消息发送失败'
            });
        }

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
}

/**
 * 获取会话聊天记录
 * GET /instansMessaging/messages/:sessionId
 */
export async function sessionMessages(req, res) {
    try {
        const { sessionId } = req.params;
        const currentUserId = req.user.user_id;

        // 验证会话权限
        const session = await getSessionForUser(sessionId, currentUserId);

        if (!Array.isArray(session) || session.length === 0) {
            return res.status(403).json({
                code: 403,
                message: '会话不存在或无权访问'
            });
        }

        // 获取消息并解析每条消息的内容
        const processedMessages = await getMessagesWithParsedContent(sessionId);

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
}

//  标记消息为已读
export async function readAll(req, res) {
    try {
        const { sessionId } = req.params;
        const currentUserId = req.user.user_id;
        await markSessionMessagesRead(sessionId, currentUserId);
        res.json({ code: 200, message: '会话消息已全部标记为已读' });
    } catch (error) {
        console.error('批量标记已读失败:', error);
        res.status(500).json({ code: 500, message: '服务器内部错误' });
    }
}

/**
 * 删除聊天会话
 * DELETE /chat-sessions/:sessionId
 */
export async function deleteChatSession(req, res) {
    try {
        const { sessionId } = req.params;
        const currentUserId = req.user.user_id;
        // 验证会话属于当前用户
        const session = await getSessionForUser(sessionId, currentUserId);

        if (!Array.isArray(session) || session.length === 0) {
            return res.status(404).json({
                code: 404,
                message: '会话不存在或无权操作'
            });
        }

        const deleteResult = await deleteSession(sessionId);

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
}
