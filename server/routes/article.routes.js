import express from 'express';
const router = express.Router();
import {
    navData,
    articleInfo,
    articleSections,
    heat,
    likeStatus,
    like,
    columnData,
    columnArticles,
    columnDetail,
    searchTag
} from '../controllers/article.controller.js';

//获取导航数据
router.get('/getNavData', navData);

//  获取文章基本信息(分类下所有文章)
router.get('/getArticleInfo', articleInfo);

// 获取文章章节（按order字段升序）
router.get('/getArticleSections', articleSections);

//内容浏览量
router.post('/updateHeat', heat);

// 检查当前用户点赞状态
router.get('/checkLikeStatus', likeStatus);

// 点赞接口（防重复）
router.post('/likeArticle', like);

// 专栏数据处理
router.get('/getColumnData', columnData);

// 专栏文章统计
router.get('/getColumnArticles', columnArticles);

//专栏获取文章详情(每次查询)
router.get('/getColumnDetail', columnDetail);

// 文章搜索接口（模糊查询master_tag）带分页
router.get('/searchTags', searchTag);

export default router;
