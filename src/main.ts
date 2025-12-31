import { createApp } from 'vue'
import App from './App.vue'
//图像hover效果
import '@ciar4n/izmir/izmir.min.css'
// 个人编辑文件
import '@/styles/reset.scss'
import '@/styles/index.scss'

import router from './router/index.js'
import { createPinia } from 'pinia';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
    offset: 100,
    duration: 800,
    once: true,
    disable: 'mobile',
});

// 创建 Pinia 实例
const pinia = createPinia()
//懒加载
import VueLazyload from 'vue-lazyload'
//图片预览
import vPreviewImage from 'v-preview-image'
import Carousel3d from 'vue3-carousel-3d';
import "vue3-carousel-3d/dist/index.css"
import Antd from 'ant-design-vue';
// 分页
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
// 代码高亮
import 'highlight.js/styles/paraiso-light.min.css'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import hljsVuePlugin from "@highlightjs/vue-plugin";
hljs.registerLanguage('javascript', javascript);
import utils from '@/utils/getAssetsFile';
//@ts-ignore
import request from '@/utils/request';
function setRemUnit() {
    // 获取视口宽度  
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;

    // 设置html元素的font-size，这里以视口宽度的1/10为基准，并设置一个最大值  
    var remSize = viewportWidth / 10;
    if (remSize > 20) { // 最大值设置为20，可以根据需要调整  
        remSize = 20;
    }
    document.documentElement.style.fontSize = remSize + 'px';
}
// 监听视口大小变化事件  
window.addEventListener('resize', setRemUnit);

// 初始化时调用一次  
setRemUnit();
const app = createApp(App)
    .use(pinia)
    .use(router)
    .use(Antd)
    .use(Carousel3d)
    .use(VueAwesomePaginate)
    .use(hljsVuePlugin)
    .use(VueLazyload, {
        preLoad: 1.3,
        error: utils.getAssetsFile('img/public/loadding_error.jpg'),
        loading: utils.getAssetsFile('img/public/lazyLoading.gif'),
        attempt: 1,
        throttleWait: 500,
        silent: true, // 取消控制台的错误提示

    })
    .use(vPreviewImage)
// 显式声明全局属性类型
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $http: typeof request;
    }
}
// 挂载全局属性
app.config.globalProperties.$http = request;
app.mount('#app')

