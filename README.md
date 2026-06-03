---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: 709956bc7e78d20f930279d5e2bd24f5_080b9aae5f0d11f18d42525400d9a7a1
    ReservedCode1: sV+eoVk8F1Tud8PxAmQAG5rQyYin0WSTanDY0hTHYBVmJm+CVsdSGwDbsljHvnXHeSN2WbMw0OZdL+MbS0W7vFPP8WRFQ86HDjH1ZxoCIUjdo7RMDO59biQ1wjmyZvDuTG+co5jHAKAH3r+Sm8dpfVKu+pt9wFsxZX2s5OfK0aM8rRBgU7LZteLRYyw=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: 709956bc7e78d20f930279d5e2bd24f5_080b9aae5f0d11f18d42525400d9a7a1
    ReservedCode2: sV+eoVk8F1Tud8PxAmQAG5rQyYin0WSTanDY0hTHYBVmJm+CVsdSGwDbsljHvnXHeSN2WbMw0OZdL+MbS0W7vFPP8WRFQ86HDjH1ZxoCIUjdo7RMDO59biQ1wjmyZvDuTG+co5jHAKAH3r+Sm8dpfVKu+pt9wFsxZX2s5OfK0aM8rRBgU7LZteLRYyw=
---

# Person Blog

一个功能丰富的个人博客系统，基于 **Vue 3 + TypeScript + Vite** 构建前端，**Node.js + Express + Sequelize + MySQL** 构建后端。

## 技术栈

### 前端
| 类别 | 技术 |
|------|------|
| 框架 | Vue 3 + TypeScript |
| 构建工具 | Vite 5 |
| 状态管理 | Pinia |
| 路由 | Vue Router 4（History 模式） |
| UI 组件库 | Ant Design Vue 4 |
| CSS 预处理 | SCSS (Sass) |
| 动画 | GSAP、AOS、Lottie |
| 代码高亮 | highlight.js |
| 图片预览 | v-preview-image |
| 轮播 | vue3-carousel-3d |
| 弹幕 | vue3-danmaku |
| 二维码 | vue-qrcode |
| 截图 | html2canvas |
| 验证码 | vue3-slide-verify |
| 表情选择 | vue3-emoji-picker |
| 分页 | vue-awesome-paginate |

### 后端
| 类别 | 技术 |
|------|------|
| 运行时 | Node.js |
| 框架 | Express 5 |
| ORM | Sequelize 6 |
| 数据库 | MySQL |
| 认证 | jsonwebtoken + bcrypt |
| 跨域 | cors |
| 环境变量 | dotenv |

## 功能模块

- **首页** — 博客主页，需登录访问
- **随笔** — 文章内容、纪念日、生活卡片
- **记录列表** — 内容、专栏、资源、其他分类
- **宝藏盒** — 音乐（推荐/宝藏/收藏）、收藏夹、友情链接
- **留言板** — 访客留言与互动
- **相册集** — 图片展示
- **个人中心** — 用户信息管理
- **会员中心** — 会员功能
- **即时通讯** — 在线聊天
- **用户系统** — 注册、登录、密码重置、Token 刷新

## 项目结构

```
person-blog/
├── src/                    # 前端源码
│   ├── components/         # 公共组件
│   ├── views/              # 页面视图
│   │   ├── HomePage.vue
│   │   ├── Family.vue
│   │   ├── informalEssay/  # 随笔模块
│   │   ├── recordList/     # 记录列表模块
│   │   ├── treasureBox/    # 宝藏盒模块
│   │   ├── MessageBoard.vue
│   │   ├── AlbumCollection.vue
│   │   ├── PersonalCenter.vue
│   │   ├── MemberCenter.vue
│   │   ├── InstantMessage.vue
│   │   └── RegisterLogin.vue
│   ├── router/             # 路由配置
│   ├── store/              # Pinia 状态管理
│   ├── utils/              # 工具函数（axios 封装等）
│   └── styles/             # 全局样式
├── server/                 # 后端源码
│   ├── app.js              # Express 入口
│   ├── routes/             # API 路由
│   │   ├── userRelatedApi.js      # 用户相关
│   │   ├── messageBoardApi.js     # 留言板
│   │   ├── favoritesApi.js        # 收藏夹
│   │   ├── mainContentApi.js      # 主要内容
│   │   ├── blogCommentsApi.js     # 博客评论
│   │   └── instantMessagingApi.js # 即时通讯
│   └── .env                # 环境变量
├── vite.config.ts          # Vite 配置
├── package.json
└── README.md
```

## 后端 API 路由

| 路由前缀 | 功能 |
|----------|------|
| `/user` | 用户注册、登录、Token 管理 |
| `/` | 留言板 |
| `/treasureBox` | 收藏夹管理 |
| `/main` | 博客主要内容 CRUD |
| `/message` | 博客评论 |
| `/instansMessaging` | 即时通讯 |

## 快速启动

### 环境要求
- Node.js 18+
- MySQL 数据库

### 后端
```bash
cd server
# 配置 .env 文件（数据库连接、JWT_SECRET 等）
npm install
node app.js
# 默认监听 http://localhost:3000
```

### 前端
```bash
# 项目根目录
npm install
npm run dev
# 默认监听 http://localhost:8008
```

开发环境下前端通过 Vite proxy 将 `/api` 请求代理到后端 `http://localhost:3000`，无需额外配置跨域。

### 构建
```bash
npm run build
# 产物输出到 dmy_dist/
```
*（内容由AI生成，仅供参考）*
