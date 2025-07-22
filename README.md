### 安装

```bash
npm i
```

### 启动

```bash
npm run dev
```

### 项目目录

```
Blog
├─ 📁.vscode
│  └─ 📄extensions.json
├─ 📁public
│  └─ 📄vite.svg
├─ 📁src
│  ├─ 📁assets //静态资源
│  │  ├─ 📁fonts //自定义字体
│  │  │  ├─ 📄getype.ttf
│  │  │  └─ 📄langmanstar.ttf
│  │  ├─ 📁icon //自定义图标
│  │  │  ├─ 📄favorites_navigate_icon.svg
│  │  │  ├─ 📄helpLink_navigate_icon.svg
│  │  │  ├─ 📄music_navigate_icon.svg
│  │  │  ├─ 📁family
│  │  │  ├─ 📁homePage
│  │  │  ├─ 📁informalEssay
│  │  │  ├─ 📁level
│  │  │  ├─ 📁memberCenter
│  │  │  ├─ 📁phone
│  │  │  ├─ 📁public
│  │  │  ├─ 📁recordList
│  │  │  ├─ 📁registerLogin
│  │  │  ├─ 📁treasureBox
│  │  ├─ 📁img //自定义图片
│  │  │  ├─ 📁未使用
│  │  │  ├─ 📁family
│  │  │  ├─ 📁homePage
│  │  │  ├─ 📁img
│  │  │  ├─ 📁infomalEssay
│  │  │  ├─ 📁listDetailImg
│  │  │  ├─ 📁memberCenter
│  │  │  ├─ 📁personCenter
│  │  │  ├─ 📁phone
│  │  │  ├─ 📁profile_picture
│  │  │  ├─ 📁public
│  │  │  ├─ 📁recordList
│  │  │  ├─ 📁albumCollection
│  │  │  ├─ 📁treasureBox
│  │  │  ├─ 📁wave
│  │  ├─ 📁live2d_moc3
│  │  │  └─ 📁天使
│  │  ├─ 📁music
│  │  │  ├─ 📄song1.lrc
│  │  │  ├─ 📄song1.mp3
│  │  │  ├─ 📄song2.lrc
│  │  │  ├─ 📄song2.mp3
│  │  │  ├─ 📄song3.lrc
│  │  │  ├─ 📄song3.mp3
│  │  │  ├─ 📄song4.lrc
│  │  │  ├─ 📄song4.mp3
│  │  │  ├─ 📄song5.mp3
│  │  │  └─ 📄song6.mp3
│  │  ├─ 📁videos
│  │  │  ├─ 📄favorite_nav_bg.mp4
│  │  │  ├─ 📄recordContentBack.mp4
│  │  │  ├─ 📄video-back1.mp4
│  │  │  ├─ 📄video-back2.mp4
│  │  │  ├─ 📄video-back3.mp4
│  │  │  ├─ 📄video-back4.mp4
│  │  │  ├─ 📄video-back5.mp4
│  │  │  ├─ 📄video-back6.mp4
│  │  │  ├─ 📄video-back7.mp4
│  │  │  ├─ 📄video-back8.mp4
│  │  │  ├─ 📄video-back9.mp4
│  │  │  ├─ 📄video-back10.mp4
│  │  │  ├─ 📄video-back11.mp4
│  │  │  ├─ 📄video-back12.mp4
│  │  │  ├─ 📄video-back13.mp4
│  │  │  ├─ 📄video-back15.mp4
│  │  │  ├─ 📄video-back16.mp4
│  │  │  ├─ 📄video-back17.mp4
│  │  │  ├─ 📄video-back18.mp4
│  │  │  ├─ 📄video-back19.mp4
│  │  │  ├─ 📄video-back20.mp4
│  │  │  ├─ 📄video-back21.mp4
│  │  │  ├─ 📄video-back22.mp4
│  ├─ 📁components //组件
│  │  ├─ 📁BubbleUp
│  │  │  └─ 📄BubbleUp.vue
│  │  ├─ 📁CarouselImage
│  │  │  └─ 📄index.vue
│  │  ├─ 📁ClickRipple
│  │  ├─ 📁DropdownMenu
│  │  ├─ 📁ListDetail
│  │  ├─ 📁Live2d
│  │  ├─ 📁ModalBox
│  │  ├─ 📁NavigationMenu
│  │  ├─ 📁PhoneSlider
│  │  ├─ 📁ScrollMessage
│  │  ├─ 📁Spectrum
│  │  ├─ 📁ThumbnailCarousel
│  │  ├─ 📁TreeMenu
│  │  ├─ 📁WeatherCard
│  ├─ 📁router
│  │  └─ 📄index.ts //路由配置文件
│  ├─ 📁store
│  │  ├─ 📄isEnabledRipple.js
│  │  └─ 📄listDetailStore.js
│  ├─ 📁styles
│  │  ├─ 📄index.scss
│  │  ├─ 📄pet.less
│  │  ├─ 📄reset.scss //重置样式
│  │  └─ 📄variables.scss //全局样式
│  ├─ 📁types
│  │  └─ 📄getAssetsFile.d.ts
│  ├─ 📁utils
│  │  ├─ 📄debounce.js
│  │  └─ 📄getAssetsFile.ts //获取静态图片方法
│  ├─ 📁views
│  │  ├─ 📄debugDemo.vue
│  │  ├─ 📄Family.vue
│  │  ├─ 📄HomePage.vue //首页
│  │  ├─ 📄InformalEssay.vue
│  │  ├─ 📄MemberCenter.vue
│  │  ├─ 📄MessageBoard.vue //留言
│  │  ├─ 📄PersonalCenter.vue
│  │  ├─ 📄RecordDetail.vue //记录->资源
│  │  ├─ 📄RegisterLogin.vue //登录注册
│  │  ├─ 📄AlbumCollection.vue
│  │  ├─ 📁recordList
│  │  └─ 📁treasureBox
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
