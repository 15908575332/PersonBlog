import express from 'express';
import authenticateToken from '../middlewares/authenticateToken.js';
import { getBlogMessageList, postMessage, replies } from '../controllers/comment.controller.js';

const router = express.Router();

// 获取评论列表（分页 + 回复内容）
router.get('/getblogmessageList', authenticateToken, getBlogMessageList);

// 发布评论
router.post('/postmessage', authenticateToken, postMessage);

// 新增回复接口（示例）
router.post('/replies', authenticateToken, replies);

export default router;
