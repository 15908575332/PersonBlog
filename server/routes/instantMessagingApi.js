import express from 'express';
const router = express.Router();
import sqlQuery from '../db/sqlQuery.js';

router.get('/im_system_notifications', async (req, res) => { //系统通知
    try {
        const result = await sqlQuery(
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

        res.status(200).json({
            result
        })
    } catch (error) {
        console.log('获取系统通知消息失败：' + error)
        res.status(500).json({ message: '服务器内部错误' }); // 添加错误响应
    }
});

router.get('/im_friend_list', async (req, res) => { //好友列表（多状态）
    try {
        // 获取当前用户ID
        const currentUserId = req?.query;
        if (!currentUserId) {
            return res.status(401).json({ message: '未授权访问' });
        }
        const [friendList, statusCounts] = await Promise.all([
            sqlQuery(
                `
            SELECT
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
        ])
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
})
export default router;