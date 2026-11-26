import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { message } from "ant-design-vue";
// @ts-ignore
import { useAuthStore } from "@/stores/auth";

message.config({
  duration: 2,
});
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 路由切换时始终滚动到最顶部
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, to, _from };
    }
  },
});

// 添加全局路由守卫
router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore();
  // 路由类型
  const isPublicRoute = to.matched.some((record) => record.meta.public);
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // 公共路由直接放行
  if (isPublicRoute) {
    // 已登录用户访问登录页，重定向到首页
    if (authStore.isAuthenticated) {
      return next({
        path: "/home",
      });
    }
    return next(); //放行未登录用户
  }

  //需要认证的路由处理
  if (requiresAuth) {
    //未认证用户直接跳转登录页
    if (!authStore.isAuthenticated) {
      message.warning("请先登录");
      return next({
        path: "/userInfo",
        query: { redirect: to.fullPath },
      });
    }
    //处理token过期
    if (!authStore.isTokenValid) {
      try {
        await authStore.refreshToken();
        //刷新成功继续导航
        return next();
      } catch (error) {
        authStore;
        message.warning("登录过期，请重新登录");
        return next({
          path: "/userInfo",
          query: { redirect: to.fullPath },
        });
      }
    }
  }

  // 既不是公共路由，也不是需要认证的路由（未标记）
  // 采用保守策略：默认需要认证
  if (!authStore.isAuthenticated) {
    return next({
      path: "/userInfo",
      query: { redirect: to.fullPath },
    });
  }
  //404
  next();
});

export default router;
