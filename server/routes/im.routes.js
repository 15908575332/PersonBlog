import express from 'express';
const router = express.Router();
import authenticateToken from '../middlewares/authenticateToken.js';
import {
    systemNotifications,
    friendList,
    emojiList,
    emojiDetail,
    createMessageSession,
    messageSessions,
    sendMessage,
    sessionMessages,
    readAll,
    deleteChatSession
} from '../controllers/im.controller.js';

router.get('/im_system_notifications', systemNotifications); //系统通知

router.get('/im_friend_list', friendList); //好友列表（多状态）

router.get('/im_emojis', emojiList); // 获取所有表情图

router.get('/im_emojis/:id', emojiDetail); // 根据ID获取单个表情

/**
 * 创建单人聊天会话
 * POST /instansMessaging/createMssageSession
 * 请求体: { otherUserId: '对方用户ID' }
 */
router.post('/createMssageSession', authenticateToken, createMessageSession);

/**
 * 获取用户的所有聊天会话列表
 * GET /chat-sessions
 */
router.get('/getMessageSessions', authenticateToken, messageSessions);

/**
 * 发送单人聊天消息
 * POST /instansMessaging/sendMessage
 */
router.post('/sendMessage', authenticateToken, sendMessage);

/**
 * 获取会话聊天记录
 * GET /instansMessaging/messages/:sessionId
 */
router.get('/messages/:sessionId', authenticateToken, sessionMessages);

//  标记消息为已读
router.post('/sessions/:sessionId/read-all', authenticateToken, readAll);

/**
 * 删除聊天会话
 * DELETE /chat-sessions/:sessionId
 */
router.delete('/:sessionId', authenticateToken, deleteChatSession);

export default router;
