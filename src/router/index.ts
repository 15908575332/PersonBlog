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
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/family", component: () => import('@/views/Family.vue'),
        },

        {
            path: "/InformalEssay",
            redirect: "/InformalEssay/InfoContenet",
            children: [
                {
                    path: "InfoContenet",
                    name: "InfoContenet",
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
            path: "/listDetail/:id",
            name: "listDetail", component: () => import('@/Components/ListDetail/index.vue'),
            props: true

        },
        {
            path: "/userInfo", component: UserRegisterLogin,
            meta: {
                public: true
            }

        },
        {
            path: '/resetPassword', component: () => import('@/views/ResetPassword.vue'),
            meta: {
                public: true
            }
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
            , meta: {
                public: true
            }

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
    // 路由类型
    const isPublicRoute = to.matched.some(record => record.meta.public);
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    // 公共路由直接放行
    if (isPublicRoute) {
        // 已登录用户访问登录页，重定向到首页
        if (authStore.isAuthenticated) {
            return next({
                path: "/home",
            })
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
                query: { redirect: to.fullPath }
            })
        }
        //处理token过期
        if (!authStore.isTokenValid) {
            try {
                await authStore.refreshToken();
                //刷新成功继续导航
                return next();
            } catch (error) {
                authStore
                message.warning("登录过期，请重新登录");
                return next({
                    path: "/userInfo",
                    query: { redirect: to.fullPath }
                })
            }
        }
    }

    // 既不是公共路由，也不是需要认证的路由（未标记）
    // 采用保守策略：默认需要认证
    if (!authStore.isAuthenticated) {
        return next({
            path: '/userInfo',
            query: { redirect: to.fullPath }
        });
    }
    //404
    next();
})

export default router;
