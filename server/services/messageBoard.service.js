// messageBoard.service.js 留言板数据服务层
import sqlQuery from '../utils/sqlQuery.js';

// 新增留言
export const insertMessage = async (userId, content) => {
    return await sqlQuery(
        'INSERT INTO message_board (user_id, message_content, created_at) VALUES (?, ?, NOW())',
        [userId, content]
    );
};

// 查询留言列表（含发布者信息补全）
export const fetchMessageList = async () => {
    const result = await sqlQuery(
        ` 
         SELECT
            m.message_content,
            m.created_at,
            u.username,
            u.avatar_url
        FROM message_board m
        INNER JOIN users u ON m.user_id = u.id
        ORDER BY m.created_at DESC
        `
    );

    return result.map(item => ({
        ...item,
        avatarUrl: item.avatar_url,
        username: item.username,
        content: item.message_content
    }));
};
