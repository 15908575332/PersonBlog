import { createRouter, createWebHistory } from "vue-router"
import HomePage from "../views/HomePage.vue";
import MessageBoard from "../views/MessageBoard.vue";
import UserRegisterLogin from "../views/RegisterLogin.vue";
import recordListDetail from '@/views/recordList/recordResource.vue'
import { message } from "ant-design-vue";
// @ts-ignore
import { useAuthStore } from '@/store/auth';

message.config({
    duration: 1,
});
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [

        {
            path: "/", redirect: '/home'
        },
        {
            path: "/home", component: HomePage,
        },
        {
            path: "/family", component: () => import('@/views/Family.vue'),
        },

        {
            path: "/InformalEssay",
            redirect: "/InformalEssay/InfContent",
            children: [
                {
                    path: "InfContent",
                    name: "InfContent",
                    component: () => import('@/views/informalEssay/InformalEssay.vue')
                },
                {
                    path: "commemorate",
                    name: "commemorate",
                    component: () => import('@/views/informalEssay/Commemorate.vue')
                },
                {
                    path: "lifeCard",
                    name: "lifeCard",
                    component: () => import('@/views/informalEssay/LifeCard.vue')
                },

            ]
        },
        {
            path: "/recordList",
            children: [
                {
                    path: "content",
                    name: "recordContent",
                    component: () => import('@/views/recordList/recordContent.vue')
                },
                {
                    path: "column",
                    name: "recordColumn",
                    component: () => import('@/views/recordList/recordColumn.vue')
                },
                {
                    path: "resource",
                    name: "recordResource",
                    component: recordListDetail,
                    meta: {
                        dataKey: "resource"
                    }
                },
                {
                    path: "learning",
                    name: "recordLearning",
                    component: () => recordListDetail,
                    meta: {
                        dataKey: "learning"
                    }
                },
                {
                    path: "country",
                    name: "recordCountry",
                    component: () => recordListDetail,
                    meta: {
                        dataKey: "country"
                    }
                }
            ]
        },
        {
            path: "/treasureBox",
            children: [
                {
                    path: "music",
                    name: "music",
                    component: () => import('@/views/treasureBox/Music.vue')
                },
                {
                    path: "favorites",
                    name: "favorites",
                    component: () => import('@/views/treasureBox/Favorites.vue')
                },
                {
                    path: "friendshipLink",
                    name: "friendshipLink",
                    component: () => import('@/views/treasureBox/FriendshipLink.vue')
                }
            ]
        },
        {
            path: "/message", component: MessageBoard,
        },
        {
            path: "/listDetail/:id", name: "listDetail", component: () => import('@/Components/ListDetail/index.vue')
        },
        {
            path: "/userInfo", component: UserRegisterLogin,
        },
        {
            path: '/resetPassword', component: () => import('@/views/ResetPassword.vue')
        },
        {
            path: "/albumCollection", component: () => import('@/views/AlbumCollection.vue')
        },
        {
            path: "/debug", component: () => import('@/views/debugDemo.vue')
        },

        {
            path: "/personalCenter", component: () => import("@/views/PersonalCenter.vue") // 个人中心
        },
        {
            path: "/memberCenter", component: () => import("@/views/MemberCenter.vue") //会员中心
        },
        // 404 页面
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('@/components/NotFound/index.vue')
        }
    ],
    // 路由切换时始终滚动到最顶部
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0, to, from };
        }
    },
});

// 添加全局路由守卫
router.beforeEach(async (to, from, next) => {

    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated;

    // 获取当前时间（用于检查token过期）
    const currentTime = Math.floor(Date.now() / 1000);

    // 定义免校验路由
    const isPublicRoute = to.matched.some(record => record.meta.public);
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    // 公共路由直接放行
    if (isPublicRoute) {
        return next();
    }

    // console.log(isAuthenticated)
    // console.log(authStore)
    if (!isAuthenticated) {
        // 检查token是否存在和过期
        if (authStore.token) {
            console.log('路由守卫', to, from)
            // 验证token过期
            const isTokenExpired = authStore.expireAt ? currentTime >= authStore.expireAt : true;

            if (isTokenExpired) {
                try {
                    // 尝试刷新token
                    await authStore.refreshToken();
                } catch (error) {
                    // 刷新失败则清除用户状态
                    authStore.logout();
                    message.warning("登录已过期，请重新登录");
                    // 跳转到登录页，携带原目标路径以便登录后重定向
                    return next({
                        path: "/userInfo",
                        query: { redirect: to.fullPath }
                    });
                }
            }

            // 如果路由需要认证且用户已认证，放行
            if (requiresAuth && isAuthenticated) {
                return next();
            }
        }
    }
    // 需要认证但未登录/认证失效
    if (requiresAuth && !isAuthenticated) {
        message.warning("请先登录访问该页面");
        return next({
            path: "/userInfo",
            query: { redirect: to.fullPath }
        });
    }

    // 其他情况放行
    next();
});

export default router;
