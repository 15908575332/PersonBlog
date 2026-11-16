import {
    getNavData,
    getArticleInfo,
    getArticleSections,
    updateHeat,
    checkLikeStatus,
    likeArticle,
    getColumnData,
    getColumnArticles,
    getColumnDetail,
    searchTags
} from '../services/article.service.js';

//获取导航数据
export async function navData(req, res) {
    try {
        const navContent = await getNavData();
        res.status(200).json({
            code: 200,
            message: '获取导航数据成功',
            navContent
        });
    } catch (error) {  // 这里添加error参数
        console.error('获取导航数据失败:', error);  // 修改错误信息
        res.status(500).json({ message: '服务器内部错误' });
    }
}

//  获取文章基本信息(分类下所有文章)
export async function articleInfo(req, res) {
    try {
        const { category_id, user_id } = req.query;
        if (!category_id || !user_id && isNaN(category_id)) {
            return res.status(400).json({ message: '缺少分类ID或用户ID参数' });
        }
        const { result, tags } = await getArticleInfo(user_id, category_id);
        if (result.length === 0) {
            return res.status(404).json({
                code: 404,
                message: '文章不存在'
            });
        }
        // 返回文章基本信息
        res.status(200).json({
            code: 200,
            message: '获取文章信息成功',
            result,
            tags
        });
    } catch (error) {
        console.error('获取文章信息失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
}

// 获取文章章节（按order字段升序）
export async function articleSections(req, res) {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ message: '缺少文章章节ID参数' });
        }
        // 查询文章章节
        const sections = await getArticleSections(id);

        res.status(200).json({
            code: 200,
            message: '获取文章章节成功',
            sections
        });
    } catch (error) {
        console.error('获取文章章节失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
}

//内容浏览量
export async function heat(req, res) {
    try {
        const { id } = req.body;
        const { affectedRows, heat } = await updateHeat(id);
        if (affectedRows === 0) {
            return res.status(404).json({  // 使用return终止执行
                code: 404,
                message: '内容不存在'
            });
        }
        res.status(200).json({ heat });
    } catch (error) {
        console.error('更新失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
}

// 检查当前用户点赞状态
export async function likeStatus(req, res) {
    try {
        const { user_id, article_id } = req.query;

        if (!user_id || !article_id) {
            return res.status(400).json({
                code: 400,
                message: '缺少必要参数'
            });
        }

        const hasLiked = await checkLikeStatus(user_id, article_id);

        res.status(200).json({
            code: 200,
            hasLiked
        });

    } catch (error) {
        console.error('检查点赞状态失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器内部错误'
        });
    }
}

// 点赞接口（防重复）
export async function like(req, res) {
    try {
        const { user_id, article_id } = req.body;
        // 参数校验
        if (!user_id || !article_id) {
            return res.status(400).json({
                code: 400,
                message: '缺少必要参数'
            });
        }

        const likeCount = await likeArticle(user_id, article_id);

        res.status(200).json({
            code: 200,
            message: '点赞成功',
            likeCount
        });

    } catch (error) {
        if (error && error.statusCode === 400) {
            return res.status(400).json({
                code: 400,
                message: error.message
            });
        }
        console.error('点赞失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器内部错误'
        });
    }
}

// 专栏数据处理
export async function columnData(req, res) {
    try {
        const { category_id } = req.query;
        if (!category_id) {
            return res.status(400).json({ message: '缺少专栏ID参数' });
        }
        // 查询专栏数据
        const columnData = await getColumnData(category_id);

        res.status(200).json({
            code: 200,
            message: '获取专栏数据成功',
            columnData
        });
    } catch (error) {
        console.error('获取专栏数据失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
}

// 专栏文章统计
export async function columnArticles(req, res) {
    try {
        const { master_tag } = req.query;
        if (!master_tag) {
            return res.status(400).json({ message: '缺少专栏文章标签参数' });
        }
        // 查询专栏文章
        const articles = await getColumnArticles(master_tag);
        res.status(200).json({
            code: 200,
            message: '获取专栏文章成功',
            articles
        });

    } catch (error) {
        console.error('获取专栏文章失败:', error);
        res.status(500).json({ message: '服务器内部错误' });

    }
}

//专栏获取文章详情(每次查询)
export async function columnDetail(req, res) {
    try {
        const { article_id } = req.query;
        if (!article_id) {
            return res.status(400).json({ message: '缺少文章ID参数' });
        }
        // 查询文章详情
        const articleDetail = await getColumnDetail(article_id);
        res.status(200).json({
            code: 200,
            message: '获取文章详情成功',
            articleDetail
        });
    } catch (error) {
        console.error('获取文章详情失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
}

// 文章搜索接口（模糊查询master_tag）带分页
export async function searchTag(req, res) {
    try {
        const { keyword, pageNum = 1, pageSize = 10 } = req.query;
        // 参数校验
        if (!keyword) {
            return res.status(400).json({
                code: 400,
                message: '缺少关键字参数'
            });
        }

        // 参数类型转换与校验
        const parsedPageNum = parseInt(pageNum, 10);
        const parsedPageSize = parseInt(pageSize, 10);

        if (isNaN(parsedPageNum) || parsedPageNum < 1) {
            return res.status(400).json({
                code: 400,
                message: 'pageNum必须为大于0的整数'
            });
        }

        if (isNaN(parsedPageSize) || parsedPageSize < 1 || parsedPageSize > 100) {
            return res.status(400).json({
                code: 400,
                message: 'pageSize必须为1-100的整数'
            });
        }

        // 构建模糊查询条件
        const likePattern = `%${keyword}%`;

        // 分页偏移量
        const offset = (parsedPageNum - 1) * parsedPageSize;
        const { total, totalPages, results } = await searchTags(likePattern, offset, parsedPageSize);

        res.status(200).json({
            code: 200,
            message: '搜索成功',
            pagination: {
                total,
                pageNum: parsedPageNum,
                pageSize: parsedPageSize,
                totalPages
            },
            data: {
                searchKey: keyword,
                results
            }
        });

    } catch (error) {
        console.error('搜索标签失败:', error);
        res.status(500).json({
            code: 500,
            message: '服务器内部错误'
        });
    }
}
