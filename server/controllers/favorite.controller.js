// favorite.controller.js 收藏夹控制器
import { fetchFavoriteData } from '../services/favorite.service.js';

// GET /treasureBox/favorite-data 收藏夹数据
export const getFavoriteData = async (req, res) => {
    try {
        const result = await fetchFavoriteData();
        res.json({ code: 200, data: result });
    } catch (error) {
        console.error('查询失败:', error);
        res.status(500).json({ code: 500, message: '服务器内部错误' });
    }
};
