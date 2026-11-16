// favorite.service.js 收藏夹数据服务层
import sqlQuery from '../utils/sqlQuery.js';

// 查询收藏夹分类与子项，返回已过滤空分类的数据
export const fetchFavoriteData = async () => {
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
    return categories
        .filter(category => Array.isArray(category.content) && category.content.length > 0)
        .map(({ id, title, content }) => ({
            id,
            title,
            content
        }));
};
