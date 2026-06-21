import { createApp, ref } from "vue";
import { debounce } from "./utils/debounce";
import App from "./App.vue";
//图像hover效果
import "@ciar4n/izmir/izmir.min.css";
// 个人编辑文件
import "@/styles/reset.scss";
import "@/styles/index.scss";

import router from "./router/index.js";
import { createPinia } from "pinia";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
  offset: 100,
  duration: 800,
  once: true,
  disable: "mobile",
});

// 创建 Pinia 实例
const pinia = createPinia();
//懒加载
import LazyImage from "@/components/common/LazyImage.vue";
//图片预览
import vPreviewImage from "v-preview-image";
import Carousel3d from "vue3-carousel-3d";
import "vue3-carousel-3d/dist/index.css";
import Antd from "ant-design-vue";
// 分页
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
// 代码高亮
import "highlight.js/styles/paraiso-light.min.css";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import hljsVuePlugin from "@highlightjs/vue-plugin";
hljs.registerLanguage("javascript", javascript);
//@ts-ignore
import request from "@/utils/request";
function setRemUnit() {
  // 获取视口宽度
  var viewportWidth = window.innerWidth || document.documentElement.clientWidth;

  // 设置html元素的font-size，这里以视口宽度的1/10为基准，并设置一个最大值
  var remSize = viewportWidth / 10;
  if (remSize > 20) {
    // 最大值设置为20，可以根据需要调整
    remSize = 20;
  }
  document.documentElement.style.fontSize = remSize + "px";
}
// 监听视口大小变化事件
window.addEventListener("resize", setRemUnit);

// 初始化时调用一次
setRemUnit();
const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(Antd)
  .use(Carousel3d)
  .use(VueAwesomePaginate)
  .use(hljsVuePlugin)
  .use(vPreviewImage);

app.component('LazyImage', LazyImage);

// 滚动隐藏导航栏 - 全局注入
const isNavHidden = ref(false);
const navScrollHandler = debounce(() => {
  isNavHidden.value =
    (window.scrollY || document.documentElement.scrollTop || 0) > 200;
}, 100);
window.addEventListener("scroll", navScrollHandler);

// 显式声明全局属性类型
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $http: typeof request;
    $isNavHidden: boolean;
  }
}
// 挂载全局属性
app.config.globalProperties.$http = request;
// 使用 getter 确保 Ref 在模板中自动解包
Object.defineProperty(app.config.globalProperties, "$isNavHidden", {
  get() {
    return isNavHidden.value;
  },
  enumerable: true,
  configurable: true,
});
app.mount("#app");
