// favorite.routes.js 收藏夹数据接口路由
import express from 'express';
import authenticateToken from '../middlewares/authenticateToken.js';
import { getFavoriteData } from '../controllers/favorite.controller.js';

const router = express.Router();

router.get('/favorite-data', authenticateToken, getFavoriteData);

export default router;
