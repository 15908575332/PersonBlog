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

前端按职责分层，页面与业务组件按业务域组织；后端按路由、控制器、服务、中间件、配置、工具六层拆分。

```
person-blog/
├── src/                        # 前端源码
│   ├── api/                    # 请求层
│   │   ├── base.js             # 接口源地址推导
│   │   ├── http.js             # axios 实例与拦截器
│   │   └── modules/music.js    # 音乐域接口
│   ├── assets/                 # 静态资源（按域划分）
│   │   ├── fonts/  icon/  img/ txt/  videos/
│   ├── components/             # 组件（按层级划分）
│   │   ├── base/               # 基础组件（LazyImage、ModalBox）
│   │   ├── layout/             # 布局/装饰组件（NavigationMenu、DropdownMenu、ClickRipple、FireWorks、FlowerAnimate）
│   │   ├── business/           # 业务组件（album / auth / column / essay / home / message / music）
│   │   └── _archive/           # 历史归档组件（未接入路由）
│   ├── composables/            # 组合式函数（当前为空目录，预留）
│   ├── devtools/               # 调试工具（debugDemo.vue）
│   ├── router/                 # 路由配置（index.ts、routes.ts）
│   ├── stores/                 # Pinia 状态管理（auth、maincontent、isEnabledRipple）
│   ├── styles/                 # 全局样式（index.scss、global.scss、reset.scss、color.scss）
│   ├── types/                  # TypeScript 类型声明
│   ├── utils/                  # 工具函数（getAssetsFile.ts、debounce.ts、theme.js 等）
│   └── views/                  # 页面（按业务域划分）
│       ├── home/  essay/  record/  treasure/
│       ├── message/  album/  family/  user/  error/
├── server/                     # 后端源码
│   ├── app.js                  # Express 入口（监听 0.0.0.0:3000）
│   ├── music-api-server.js     # 网易云音乐 API 独立进程（端口 3100）
│   ├── routes/                 # 路由定义（user / article / comment / favorite / messageBoard / im）
│   ├── controllers/            # 控制器（参数处理与响应组装）
│   ├── services/               # 业务与数据访问（Sequelize）
│   ├── middlewares/            # 鉴权与参数校验中间件
│   ├── config/                 # 配置（db.js 数据库连接、constants.js 常量）
│   └── utils/                  # 工具（email.js 邮件、sqlQuery.js SQL 查询封装）
├── index.html                  # 前端入口 HTML
├── vite.config.ts              # Vite 配置（别名、代理、构建）
├── tsconfig.json               # TypeScript 项目引用
├── tsconfig.app.json           # 应用侧 TS 配置
├── tsconfig.node.json          # 构建脚本侧 TS 配置
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
npm start          # 等价于 node app.js
# 默认监听 http://localhost:3000（绑定 0.0.0.0，局域网内可用本机 IP 访问）
```

### 网易云音乐 API（独立进程）
```bash
cd server
node music-api-server.js
# 默认监听 http://localhost:3100
```

### 前端
```bash
# 项目根目录
npm install
npm run dev
# 默认监听 http://localhost:8008（端口在 vite.config.ts 中配置）
```

开发环境下前端通过 Vite proxy 将 `/api` 请求代理到后端 `http://localhost:3000`，无需额外配置跨域。

### 构建
```bash
npm run build
# 产物输出到 dmy_dist/
```
*（内容由AI生成，仅供参考）*
