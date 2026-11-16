import sqlQuery from '../utils/sqlQuery.js';

//获取导航数据
export async function getNavData() {
    return await sqlQuery(
        `
            SELECT
                category_id,
                nav_btn_title,
                nav_btn_subtitle,
                category_img_url
            FROM articles_categories
            `
    );
}

//  获取文章基本信息(分类下所有文章)
export async function getArticleInfo(user_id, category_id) {
    // 查询文章基本信息和作者信息
    const result = await sqlQuery(
        `
                SELECT
                    a.*,
                    u.username,
                    CASE WHEN cv.has_comment = 1 THEN true ELSE false END AS has_comment
                FROM
                    articles a
                INNER JOIN users u
                    ON u.user_id = a.user_id
                LEFT JOIN comments_visible cv
                    ON cv.article_id = a.article_id
                    AND cv.user_id = ?
                WHERE
                    a.category_id = ?
            `,
        [user_id, category_id]
    );

    const tags = await sqlQuery(
        `
            SELECT
                distinct master_tag
            FROM
                articles
                `,
        [category_id]
    );

    return { result, tags };
}

// 获取文章章节（按order字段升序）
export async function getArticleSections(id) {
    return await sqlQuery(
        `
           SELECT
                title,
                content,
                level,
                order_asc
            FROM
                articles_sections
            WHERE
                article_id = ?
            ORDER BY
                order_asc ASC
            `,
        [id]
    );
}

//内容浏览量
export async function updateHeat(id) {
    const result = await sqlQuery(
        `
            update articles set heat = heat + 1 where article_id = ?
            `,
        [id]
    );
    if (result.affectedRows === 0) {
        return { affectedRows: result.affectedRows, heat: undefined };
    }
    // 获取更新后的浏览量
    const [article] = await sqlQuery('SELECT heat FROM articles WHERE article_id = ?', [id]);
    return { affectedRows: result.affectedRows, heat: article.heat };
}

// 检查当前用户点赞状态
export async function checkLikeStatus(user_id, article_id) {
    const result = await sqlQuery(
        `SELECT 
                CASE 
                    WHEN COUNT(*) > 0 THEN true
                    ELSE false 
                END AS has_liked
             FROM article_likes_count 
             WHERE user_id = ? AND article_id = ?
            AND liked_at > DATE_SUB(NOW(), INTERVAL 1 DAY)`,
        [user_id, article_id]
    );
    return result[0].has_liked;
}

// 点赞接口（防重复）
export async function likeArticle(user_id, article_id) {
    // 检查是否在24小时内已经点赞过
    const existingLike = await sqlQuery(
        `SELECT * FROM article_likes_count
             WHERE user_id = ? AND article_id = ?
            AND liked_at > DATE_SUB(NOW(), INTERVAL 1 DAY)`,
        [user_id, article_id]
    );

    if (existingLike.length > 0) {
        const err = new Error('您今天已经点过赞了，请明天再来');
        err.statusCode = 400;
        throw err;
    }

    try {
        // 插入点赞记录（使用ON DUPLICATE KEY UPDATE来更新已存在的记录）
        await sqlQuery(
            `INSERT INTO article_likes_count(user_id, article_id) 
                 VALUES(?, ?)
                 ON DUPLICATE KEY UPDATE liked_at = NOW()`,
            [user_id, article_id]
        );

        // 更新文章点赞数
        const updateResult = await sqlQuery(
            `UPDATE articles SET like_count = like_count + 1 
                 WHERE article_id = ? `,
            [article_id]
        );

        if (updateResult.affectedRows === 0) {
            throw new Error('文章不存在');
        }

        await sqlQuery('COMMIT');

        // 获取更新后的点赞数
        const [article] = await sqlQuery(
            'SELECT like_count FROM articles WHERE article_id = ?',
            [article_id]
        );

        return article.like_count;

    } catch (error) {
        await sqlQuery('ROLLBACK');
        throw error; // 抛出错误，由外层的catch处理
    }
}

// 专栏数据处理
export async function getColumnData(category_id) {
    return await sqlQuery(
        `
            SELECT
                a.master_tag,
            COUNT(*) AS tag_count
            FROM
                articles_categories c
            INNER JOIN
                articles a ON c.category_id = a.category_id
            WHERE
                c.category_id = ?
                GROUP BY
                a.master_tag
            ORDER BY
                tag_count;
        `,
        [category_id]
    );
}

// 专栏文章统计
export async function getColumnArticles(master_tag) {
    return await sqlQuery(
        `
        SELECT
        a.article_id,
            a.user_id,
            a.title,
            a.preface,
            a.heat,
            a.like_count,
            a.cover_image_url,
            a.cover_video_url,
            a.release_time
        FROM
                articles a
        WHERE
        a.master_tag = ?
            ORDER BY a.release_time DESC;
        `,
        [master_tag]
    );
}

//专栏获取文章详情(每次查询)
export async function getColumnDetail(article_id) {
    return await sqlQuery(
        `
          SELECT
            a.*,
            u.username
          FROM
            articles a
          INNER JOIN users u on a.user_id = u.user_id
          WHERE
            article_id = ?;
            `,
        [article_id]
    );
}

// 文章搜索接口（模糊查询master_tag）带分页
export async function searchTags(likePattern, offset, parsedPageSize) {
    // 获取总记录数（用于计算总页数）
    const totalResult = await sqlQuery(
        `SELECT COUNT(*) AS total FROM articles WHERE master_tag LIKE ?`,
        [likePattern]
    );

    const total = totalResult[0].total;
    const totalPages = Math.ceil(total / parsedPageSize);

    // 执行分页查询
    const results = await sqlQuery(
        `
            SELECT
                a.*,
                u.username
            FROM
                articles a
            INNER JOIN users u on a.user_id = u.user_id
            WHERE
                master_tag LIKE ? LIMIT ?, ?`,
        [likePattern, offset, parsedPageSize]
    );

    return { total, totalPages, results };
}
