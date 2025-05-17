### 安装
```bash
npm i 
```
###启动
```bash
non run dev
```
###项目目录
```
Blog
├─ 📁.vscode
│  └─ 📄extensions.json
├─ 📁public
│  └─ 📄vite.svg
├─ 📁src
│  ├─ 📁assets //静态资源
│  │  ├─ 📁fonts //自定义字体
│  │  ├─ 📁icon //自定义图标
│  │  │  ├─ 📁phone //手机模式图标
│  │  ├─ 📁img //自定义图片
│  │  │  ├─ 📁phone //手机模式图片
│  │  ├─ 📁imgBackup 
│  │  └─ 📁video 
│  ├─ 📁components //组件
│  │  ├─ 📄DropdownMenu.vue //下拉框
│  │  ├─ 📄NavigationMenu.vue //导航栏
│  │  ├─ 📄PhoneSlider.vue //手机端侧边栏
│  │  ├─ 📄temporary.vue 
│  │  ├─ 📄TreeMenu.vue //手机端树形导航
│  │  └─ 📄WeatherCard.vue //天气卡片及桌宠
│  ├─ 📁router 
│  │  └─ 📄index.ts //路由配置文件
│  ├─ 📁styles 
│  │  ├─ 📄index.scss
│  │  ├─ 📄pet.less 
│  │  ├─ 📄reset.scss //重置样式
│  │  └─ 📄variables.scss //全局样式
│  ├─ 📁utils
│  │  └─ 📄getAssetsFile.ts //获取静态图片方法
│  ├─ 📁views
│  │  ├─ 📄HomePage.vue //首页
│  │  ├─ 📄MessageBoard.vue //留言
│  │  ├─ 📄RecordDetail.vue //记录->资源
│  │  └─ 📄RegisterLogin.vue //登录注册
│  ├─ 📄App.vue 
│  ├─ 📄main.ts //入口文件
│  └─ 📄vite-env.d.ts
├─ 📄.gitignore
├─ 📄index.html 
├─ 📄package-lock.json
├─ 📄package.json //安装目录
├─ 📄README.md
├─ 📄tsconfig.app.json
├─ 📄tsconfig.json
├─ 📄tsconfig.node.json
└─ 📄vite.config.ts //项目配置
```