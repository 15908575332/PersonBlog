// favoritesApi.js
import express from 'express';
const router = express.Router();
import sqlQuery from '../db/sqlQuery.js';

router.get('/favorite-data', async (req, res) => {
    try {
        // 获取主分类
        const categories = await sqlQuery('SELECT * FROM favorite_categories');

        // 处理每个分类的子项
        for (const category of categories) {
            // 执行子项查询并确保结果为数组
            const result = await sqlQuery(
                'SELECT imgSrc, subtitle, introduce, href FROM favorite_items WHERE category_id = ?',
                [category.id]
            );

            // 强制转换为数组（兼容非数组返回）
            category.content = Array.isArray(result) ? result : [];
        }

        // 构建响应数据（过滤掉无内容的分类）
        const result = categories
            .filter(category => Array.isArray(category.content) && category.content.length > 0)
            .map(({ id, title, content }) => ({
                title,
                content
            }));

        res.json({ code: 200, data: result });
    } catch (error) {
        console.error('查询失败:', error);
        res.status(500).json({ code: 500, message: '服务器内部错误' });
    }
});

export default router;