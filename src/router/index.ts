import { createRouter, createWebHistory } from "vue-router"
import HomePage from "../views/HomePage.vue";
import MessageBoard from "../views/MessageBoard.vue";
import UserRegisterLogin from "../views/RegisterLogin.vue";
import recordListDetail from '@/views/recordList/recordResource.vue'
import { message } from "ant-design-vue";
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
            path: "/InformalEssay", component: () => import('@/views/InformalEssay.vue')
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
            path: "/travelAlbum", component: () => import('@/views/TravelAlbum.vue')
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

    ],
    // 路由切换时始终滚动到最顶部
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0, to, from };
        }
    }

})
// router.beforeEach((to, from, next) => {
//     if (to.path === '/userInfo') {
//         next();
//     } else {
//         const token = sessionStorage.getItem('simulateUserToken');
//         const tokenExpireTime = sessionStorage.getItem('sessionExpiration');

//         if (token || (tokenExpireTime !== null && new Date().getTime() > parseInt(tokenExpireTime))) {
//             next();
//         } else {
//             message.warning('请先登录');
//             next('/userInfo');
//             return from;
//         }
//     }
// });
export default router;
