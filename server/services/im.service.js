import sqlQuery from '../utils/sqlQuery.js';

// 消息类型定义
export const MESSAGE_TYPES = {
    TEXT: 1,        // 文本（包含表情）
    IMAGE: 2,       // 图片
};

export async function getSystemNotifications() {
    return await sqlQuery(
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
}

export async function getFriendList(currentUserId) {
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
    ]);
    return { friendList, statusCounts };
}

export async function getEmojis(category, em_type, is_active) {
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

    return await sqlQuery(query, params);
}

export async function getEmojiById(id) {
    return await sqlQuery(
        'SELECT * FROM im_emojis WHERE id = ? AND is_active = true',
        [id]
    );
}

// 查询已存在的单人会话
export async function findSession(user1_id, user2_id) {
    return await sqlQuery(
        `SELECT session_id, user1_id, user2_id, last_msg_content, 
                    last_msg_time, unread_count1, unread_count2, created_at
             FROM im_single_chat_sessions 
             WHERE user1_id = ? AND user2_id = ?`,
        [user1_id, user2_id]
    );
}

// 新建单人会话
export async function createSession(user1_id, user2_id) {
    // 创建新会话
    const insertResult = await sqlQuery(
        `INSERT INTO im_single_chat_sessions 
             (user1_id, user2_id, created_at, updated_at) 
             VALUES (?, ?, NOW(), NOW())`,
        [user1_id, user2_id]
    );

    if (insertResult.affectedRows === 0) {
        return { insertResult, newSession: [] };
    }

    // 获取新创建的会话详情
    const newSession = await sqlQuery(
        `SELECT session_id, user1_id, user2_id, last_msg_content, 
                    last_msg_time, unread_count1, unread_count2, created_at
             FROM im_single_chat_sessions 
             WHERE session_id = ?`,
        [insertResult.insertId]
    );

    return { insertResult, newSession };
}

export async function getUserSessions(currentUserId) {
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
    return Array.isArray(sessions) ? sessions : [];
}

// 验证会话存在且用户有权访问
export async function getSessionForUser(session_id, user_id) {
    return await sqlQuery(
        `SELECT session_id, user1_id, user2_id 
             FROM im_single_chat_sessions 
             WHERE session_id = ? AND (user1_id = ? OR user2_id = ?)`,
        [session_id, user_id, user_id]
    );
}

// 插入消息记录（严格按照SQL表结构）
export async function createMessage(session_id, sender_id, receiver_id, msg_type, content, file_url, file_size, file_duration) {
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
        return { insertResult, newMessage: [] };
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

    return { insertResult, newMessage };
}

/**
 * 更新会话最后消息
 */
export async function updateSessionLastMessage(sessionId, messageData) {
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

// 获取会话聊天记录（含表情解析）
export async function getMessagesWithParsedContent(sessionId) {
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

    return processedMessages;
}

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
export async function markSessionMessagesRead(sessionId, currentUserId) {
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
}

// 删除聊天会话
export async function deleteSession(sessionId) {
    return await sqlQuery(
        'DELETE FROM im_single_chat_sessions WHERE session_id = ?',
        [sessionId]
    );
}
