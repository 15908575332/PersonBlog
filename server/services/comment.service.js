// comment.service.js 评论域数据服务层
import sqlQuery from '../utils/sqlQuery.js';

// 获取评论列表（分页 + 回复内容）
export const getCommentList = async ({ page = 1, pageSize = 10, articleId }) => {
    // 计算分页偏移量
    const offset = (page - 1) * pageSize;

    // 优化后的 SQL：仅选择必要字段
    const postsQuery = `
            SELECT
                bm.id AS postId,
                bm.user_id,
                bm.article_id,
                bm.content,
                DATE_FORMAT(bm.created_at, '%Y-%m-%d %H:%i:%s') AS createdAt,
                u.avatar_url,
                u.username,
                u.vip_level
            FROM blog_comments bm
            INNER JOIN articles a ON bm.article_id = a.article_id
            LEFT JOIN users u ON bm.user_id = u.user_id
            WHERE bm.article_id = ?
            ORDER BY bm.created_at DESC
            LIMIT ? OFFSET ?
        `;
    const posts = await sqlQuery(postsQuery, [articleId, parseInt(pageSize), parseInt(offset)]);

    if (posts.length === 0) {
        return { empty: true };
    }

    // 提取所有主评论ID
    const postIds = posts.map(post => post.postId);

    // 优化回复查询（仅选择必要字段）
    const replies = await sqlQuery(`
            SELECT
                pr.parent_reply_id,
                pr.user_id,
                pr.content AS replyContent,
                DATE_FORMAT(pr.created_at, '%Y-%m-%d %H:%i:%s') AS replyCreatedAt,
                u.avatar_url AS replyAvatar,
                u.username AS replyUsername,
                u.vip_level AS replyVipLevel
            FROM blog_comments_replies pr
            LEFT JOIN users u ON pr.user_id = u.user_id
            WHERE pr.parent_reply_id IN (?)
        `, [postIds]);

    // 构建回复映射
    const replyMap = new Map();
    replies.forEach(reply => {
        if (!replyMap.has(reply.parent_reply_id)) {
            replyMap.set(reply.parent_reply_id, []);
        }
        replyMap.get(reply.parent_reply_id).push({
            id: reply.id,
            parentId: reply.parent_reply_id,
            content: reply.replyContent,
            user: {
                id: reply.user_id,
                avatarUrl: reply.replyAvatar,
                username: reply.replyUsername,
                vip_level: reply.replyVipLevel
            },
            createdAt: reply.replyCreatedAt
        });
    });

    // 构建最终响应数据（移除 articleId）
    const formattedPosts = posts.map(post => ({
        id: post.postId,
        userId: post.user_id,
        content: post.content,
        createdAt: post.createdAt,
        user: {
            avatarUrl: post.avatar_url,
            username: post.username,
            vip_level: post.vip_level
        },
        // replyCount: post.reply_count,
        replies: replyMap.get(post.postId) || []
    }));
    // 获取总记录数（仅需计数，无需关联文章）
    const totalResult = await sqlQuery(
        'SELECT COUNT(*) AS total FROM blog_comments WHERE article_id = ?',
        [articleId]
    );
    // const replyTotalResult = await sqlQuery(
    //     'SELECT COUNT(*) AS total FROM blog_comments_replies WHERE parent_reply_id IN (?)',
    //     [postIds]
    // );
    // const replyTotal = replyTotalResult[0].total;
    const total = totalResult[0].total;

    return {
        empty: false,
        list: formattedPosts,
        pagination: {
            total,
            page: parseInt(page),
            pageSize: parseInt(pageSize)
        }
    };
};

// 发布评论
export const createComment = async ({ userId, articleId, content }) => {
    // 校验用户是否存在（冗余校验，外键已约束）
    const [user] = await sqlQuery(
        'SELECT user_id FROM users WHERE user_id = ?',
        [userId]
    );
    if (!user) {
        return { userMissing: true };
    }
    // 插入评论
    const result = await sqlQuery(`
            INSERT INTO blog_comments (user_id, article_id,content)
            VALUES (?, ?, ?)
        `, [userId, articleId, content.trim()]);
    return { userMissing: false, id: result.insertId };
};

// 新增回复接口（示例）
export const createReply = async ({ userId, currentFatherId, content, currentUserId }) => {
    // 校验 postId 是否存在
    const [post] = await sqlQuery('SELECT id FROM blog_comments WHERE id = ?', [currentFatherId]);
    if (!post) return { postMissing: true };
    if (userId === currentUserId) {
        return { selfReply: true };
    }
    // 插入回复
    const result = await sqlQuery(`
            INSERT INTO blog_comments_replies (user_id, parent_reply_id, content)
            VALUES ( ?, ?, ?)
        `, [currentUserId, currentFatherId, content.trim()]);
    return { postMissing: false, selfReply: false, id: result.insertId };
};
