// comment.controller.js 评论域控制器
import { getCommentList, createComment, createReply } from '../services/comment.service.js';

// 获取评论列表（分页 + 回复内容）
export const getBlogMessageList = async (req, res) => {
    try {
        const { page = 1, pageSize = 10, article_id } = req.query;

        if (!article_id) {
            return res.status(400).json({ code: 400, msg: '缺少文章ID参数' });
        }

        const result = await getCommentList({ page, pageSize, articleId: article_id });

        if (result.empty) {
            return res.status(401).json({ code: 401, msg: '该文章暂无评论' });
        }

        res.json({
            code: 200,
            data: {
                list: result.list,
                pagination: result.pagination
            }
        });

    } catch (err) {
        console.error('获取评论失败:', err.msg);
        res.status(500).json({ code: 500, msg: '服务器错误' });
    }
};

// 发布评论
export const postMessage = async (req, res) => {
    try {
        const { content, article_id } = req.body;
        if (!content || content.trim().length === 0) {
            return res.status(400).json({ code: 400, msg: '评论内容不能为空' });
        }

        const result = await createComment({
            userId: req.user.user_id,
            articleId: article_id,
            content
        });

        if (result.userMissing) {
            return res.status(404).json({ code: 404, msg: '用户不存在' });
        }

        res.status(200).json({
            code: 200,
            data: { id: result.id }
        });
    } catch (err) {
        console.error('发布评论失败:', err);
        res.status(500).json({ code: 500, msg: '服务器错误' });
    }
};

// 新增回复接口（示例）
export const replies = async (req, res) => {
    try {
        const { content, userId, currentFatherId } = req.body;

        const result = await createReply({
            userId,
            currentFatherId,
            content,
            currentUserId: req.user.user_id
        });

        if (result.postMissing) return res.status(404).json({ code: 404, msg: '主评论不存在' });
        if (result.selfReply) {
            return res.status(400).json({ code: 400, msg: '不能回复自己' });
        }

        res.json({ code: 200, data: { id: result.id } });
    } catch (err) {
        console.error('创建回复失败:', err);
        res.status(500).json({ code: 500, msg: '服务器错误' });
    }
};
