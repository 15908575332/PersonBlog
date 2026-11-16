// messageBoard.routes.js 留言主页面数据接口路由
import express from 'express';
import { setMessgeContent, getMessageList } from '../controllers/messageBoard.controller.js';

const router = express.Router();

router.post('/setMessgeContent', setMessgeContent);
router.get('/getMessageList', getMessageList);

export default router;
