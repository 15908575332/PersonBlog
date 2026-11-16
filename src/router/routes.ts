import type { RouteRecordRaw } from "vue-router"
import HomePage from "@/views/home/HomePage.vue"
import MessageBoard from "@/views/message/MessageBoard.vue"
import UserRegisterLogin from "@/views/user/RegisterLogin.vue"
import recordListDetail from "@/views/record/RecordResource.vue"

export const routes: RouteRecordRaw[] = [

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
        path: "/family", component: () => import('@/views/family/Family.vue'),
    },

    {
        path: "/InformalEssay",
        redirect: "/InformalEssay/InfoContenet",
        children: [
            {
                path: "InfoContenet",
                name: "InfoContenet",
                component: () => import('@/views/essay/InformalEssay.vue')
            },
            {
                path: "commemorate",
                name: "commemorate",
                component: () => import('@/views/essay/Commemorate.vue')
            },
            // {
            //     path: "lifeCard",
            //     name: "lifeCard",
            //     component: () => import('@/views/essay/LifeCard.vue')
            // },

        ]
    },
    {
        path: "/recordList",
        children: [
            {
                path: "content",
                name: "recordContent",
                component: () => import('@/views/record/RecordContent.vue')
            },
            {
                path: "column",
                name: "recordColumn",
                component: () => import('@/views/record/RecordColumn.vue')
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
                path: "other",
                name: "recordOther",
                component: () => import('@/views/record/RecordOther.vue')
            }
        ]
    },
    {
        path: "/treasureBox",
        children: [
            {
                path: "music",
                name: "music",
                component: () => import('@/views/treasure/Music.vue'),
                redirect: '/treasureBox/music/recommend', // 默认重定向到推荐页
                children: [
                    {
                        path: "recommend",
                        name: "musicRecommend",
                        component: () => import('@/components/business/music/Recommend.vue')
                    },
                    {
                        path: "treasure",
                        name: "musicTreasure",
                        component: () => import('@/components/business/music/Treasure.vue')
                    },
                    {
                        path: "favorite",
                        name: "musicFavorite",
                        component: () => import('@/components/business/music/MineFavorite.vue')
                    }
                ]
            },
            {
                path: "favorites",
                name: "favorites",
                component: () => import('@/views/treasure/Favorites.vue')
            },
            {
                path: "friendshipLink",
                name: "friendshipLink",
                component: () => import('@/views/treasure/FriendshipLink.vue')
            }
        ]
    },
    {
        path: "/message", component: MessageBoard,
    },
    {
        path: "/listDetail/:id",
        name: "listDetail", component: () => import('@/views/record/RecordContentRender.vue'),
        props: true

    },
    {
        path: "/columnDetail/:id",
        name: "columnDetail", component: () => import('@/components/business/column/ColumnDetail.vue'),
        props: true
    },
    {
        path: "/userInfo", component: UserRegisterLogin,
        meta: {
            public: true
        }

    },
    {
        path: '/resetPassword', component: () => import('@/views/user/ResetPassword.vue'),
        meta: {
            public: true
        }
    },
    {
        path: "/albumCollection", component: () => import('@/views/album/AlbumCollection.vue')
    },
    {
        path: "/debug", component: () => import('@/devtools/debugDemo.vue')
    },

    {
        path: "/personalCenter", component: () => import("@/views/user/PersonalCenter.vue") // 个人中心
    },
    {
        path: "/memberCenter", component: () => import("@/views/user/MemberCenter.vue") //会员中心
    },
    {
        path: "/contactUs", component: () => import("@/views/message/InstantMessage.vue") //即时通讯
    },
    // 404 页面
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/error/NotFound.vue')
        , meta: {
            public: true
        }

    }
]
