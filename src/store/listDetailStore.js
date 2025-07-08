import { defineStore } from 'pinia';
/**
 @isContent 是否需要评论，内容才可见true/false
 @text 主体文本内容 string
 @timeAxis 是否展示时间轴 '不为空' / ' ' / null
 @code 是否展示源代码模块 '不为空' / ' ' / null
 */
import utils from '@/utils/getAssetsFile';
let text = `在这个纷繁复杂的世界里，我曾无数次幻想过，有那么一个人，能与我并肩站在时光之岸，看潮起潮落，云卷云舒。
            而今，你就这样悄然走进我的世界，带着温暖的光芒，照亮了我所有的阴霾。我们不需多言，一个眼神便能读懂彼此的心意。未来的路，或许会有风雨，但有你相伴，每一天都将是晴天。让我们携手，共渡这漫长而又美好的余生。`;
let text1 = `黄昏，这个温柔而神秘的时刻，总是以一种难以言喻的魔力，悄然降临于世界的每一个角落。它如同一位慈祥的老画家，以天际为布，以余晖为墨，绘出一幅幅绚烂而宁静的画卷。
            当太阳缓缓下沉，天边的云彩被染上了淡淡的金黄、橙红，直至深邃的紫罗兰色，整个世界仿佛都被披上了一层梦幻般的薄纱。那些平日里忙碌奔波的人们，在这柔和的光线下，也不由得放慢了脚步，驻足欣赏这份难得的宁静与美好。`;
let text2 = `眼前的美景如同一幅精致的画卷，碧波荡漾的湖面宛如一面镜子，映照着蓝天白云的清晰倒影，翠绿的山峦层层叠叠，云雾缭绕其间，增添了几分神秘与仙气。微风轻轻拂过，带来阵阵花香，令人心旷神怡，仿佛所有的烦恼都随风而去。每一处景色都如诗如画，细腻而生动，让人沉醉其中，流连忘返，仿佛自己已经融入了这幅大自然的绝美画卷之中。`;
const localizedDateString = (new Date()).toLocaleString();
export const useListDetail = defineStore('data', {
    state: () => ({
        // 内容
        dataContent: [
            {
                id: 'lifeReflection',
                navBtntitle: '生活倒影',
                subtitle: '分享生活的乐趣',
                profile_picture: utils.getAssetsFile('img/recordList/life_profile_pic.jpeg'),
                content: [
                    {
                        contentId: 'detail/001',
                        author: '用户xxy159',
                        backImage: utils.getAssetsFile('img/recordList/listDetailImg001.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/listDetailImg001.jpg'),
                        mediaType: 'image',
                        timeAxis: '1', // 时间轴
                        code: '1', // 源码展示
                        isContent: false, // 是否显示内容
                        release__time: localizedDateString,
                        title: '生活是一张巨大的画布',
                        heat: 3963,
                        like: 255,
                        text: false,
                        tag1: '生活倒影',
                        tag2: '生活',

                        comment: [
                            {
                                commentId: 'comment001',
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏',
                                replies: [
                                    {
                                        replyId: 'reply001',
                                        profile__picture: utils.getAssetsFile('img/profile_picture/10001.png'),
                                        nickname: '回复159',
                                        replyUser: 'xxy159',
                                        level: 'lv1',
                                        timestamp: '2025/03/10 13:11:50',
                                        replyContent: '测试自定义回复数据格式是否正确',
                                    },
                                    {
                                        replyId: 'reply002',
                                        profile__picture: utils.getAssetsFile('img/profile_picture/10006.png'),
                                        nickname: '回复159',
                                        replyUser: 'xxy159',
                                        level: 'lv1',
                                        timestamp: '2025/03/10 13:11:50',
                                        replyContent: '测试自定义回复2数据格式是否正确',
                                    },

                                ]
                            },
                            {
                                commentId: 'comment002',
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常',
                                replies: [
                                    {
                                        replyId: 'reply001',
                                        profile__picture: utils.getAssetsFile('img/profile_picture/10002.png'),
                                        nickname: '回复Sara',
                                        replyUser: 'Sara',
                                        level: 'lv1',
                                        timestamp: '2025/03/10 13:11:50',
                                        replyContent: '测试自定义回复数据格式是否正确',
                                    }
                                ]
                            },
                            {
                                commentId: 'comment003',
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常',
                                replies: [
                                    {
                                        replyId: 'reply001',
                                        profile__picture: utils.getAssetsFile('img/profile_picture/10012.png'),
                                        nickname: '回复城北吕公',
                                        replyUser: '城北吕公',
                                        level: 'lv1',
                                        timestamp: '2025/03/10 13:11:50',
                                        replyContent: '测试自定义回复数据格式是否正确',
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        contentId: 'detail/099',
                        author: 'Sara',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back10.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back10.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        isContent: false, // 是否显示内容
                        title: '静',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/002',
                        backImage: utils.getAssetsFile('img/recordList/listDetailImg002.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/listDetailImg002.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '生活倒影',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/020',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back20.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back20.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '聆听海的声音',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/021',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back21.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back21.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/022',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back22.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back22.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 63,
                        like: 25,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/003',
                        backImage: utils.getAssetsFile('img/recordList/listDetailImg003.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/listDetailImg003.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '乐趣',
                        heat: 963,
                        like: 55,
                        text: [text, text1, text2],
                        tag1: '生活倒影',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/004',
                        backImage: utils.getAssetsFile('img/recordList/listDetailImg004.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/listDetailImg004.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '生活倒影',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/005',
                        backImage: utils.getAssetsFile('img/recordList/listDetailImg005.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/listDetailImg005.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '生活倒影',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/006',
                        backImage: utils.getAssetsFile('img/recordList/listDetailImg006.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/listDetailImg006.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '生活倒影',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/001',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back1.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back1.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                ],
            },
            {
                id: 'audiovisualFeast',
                navBtntitle: '视听盛宴',
                subtitle: '听音乐，看电影，享受生活',
                profile_picture: utils.getAssetsFile('img/recordList/video_profile_pic.jpeg'),

                content: [
                    {
                        contentId: 'detail/001',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back1.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back1.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/002',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back2.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back2.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/003',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back3.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back3.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/004',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back4.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back4.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/005',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back5.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back5.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/006',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back6.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back6.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/007',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back7.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back7.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/008',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back8.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back8.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/009',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back9.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back9.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/010',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back10.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back10.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/011',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back11.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back11.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/012',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back12.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back12.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/013',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back13.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back13.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/015',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back15.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back15.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/003',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back16.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back16.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/0017',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back17.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back17.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/018',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back18.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back18.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/0',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back19.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back19.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    }
                ],
            },
            {
                id: 'blog',
                navBtntitle: 'Blog',
                subtitle: '最美博客',
                profile_picture: utils.getAssetsFile('img/recordList/blog_profile_pic.jpeg'),

                content: [
                    {
                        contentId: 'detail/001',
                        backImage: utils.getAssetsFile('img/recordList/blog001.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/blog001.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '科技与乐趣并存的工作室一角',
                        heat: 3963,
                        like: 255,
                        text: ['在我这个充满创意与灵感的工作室里，科技与乐趣完美地融合在了一起。中心位置摆放着一台高性能的显示器，屏幕上正显示着一个蓝色背景的界面，上面清晰地写着“CUSTOMER RELATIONSHIP MANAGEMENT”（客户关系管理）。这是我工作中不可或缺的一部分，帮助我高效地管理客户信息，提升服务质量。',
                            '显示器周围，我精心布置了许多小物件，它们不仅具有实用性，更增添了一份生活的情趣。时钟时刻提醒着我时间的宝贵，而灯饰则散发出柔和的光芒，为整个工作室营造出一种温馨的氛围。文件夹里整齐地存放着重要的文件和资料，方便我随时查阅。此外，还有一些小巧的装饰品，它们让工作室充满了艺术气息。',
                            '在显示器下方的桌子上，摆放着多个游戏控制器、键盘和鼠标。这些设备是我闲暇时的娱乐伙伴，让我在工作之余也能享受到游戏的乐趣。每当完成一项艰巨的工作任务后，我都会拿起游戏控制器，沉浸在游戏的世界中，放松身心。',
                            '整个工作室给人一种科技感十足且杂乱无章的感觉，但这正是我所追求的。我喜欢这种自由自在、无拘无束的工作氛围，它激发了我的创造力和想象力。在这里，我可以尽情地发挥自己的才华，创造出更多令人惊叹的作品。'
                        ],
                        tag1: 'blog',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/002',
                        backImage: utils.getAssetsFile('img/recordList/blog002.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/blog002.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '背景里的“主角”',
                        heat: 3963,
                        like: 255,
                        text: [
                            '这是一幅充满趣味性的卡通插画，画面中央是一只表情生动的蓝眼睛猫咪。猫咪的耳朵尖尖的，粉红色的鼻子小巧可爱，但此刻它的脸上却写满了不满和失望。眉头紧锁，嘴巴紧闭，仿佛正在经历一场无声的抗议。',
                            '猫咪所处的背景是单色的深蓝色，与猫咪身上明亮的颜色形成了鲜明的对比。然而，真正吸引眼球的不仅仅是猫咪的可爱和背景的色彩，还有图片上方那一行醒目的白色英文文字：“Oh, great... Im in the background.”（哦，太棒了……我只是背景。）这句话以一种幽默而讽刺的方式，道出了猫咪内心的无奈和不满。',
                            '在这幅插画中，猫咪似乎并不满足于自己仅仅作为背景的角色，它的眼神和表情仿佛在诉说着对成为焦点的渴望。这种幽默和讽刺的元素，不仅让画面更加生动有趣，也引发了我们对于“主角”与“背景”之间关系的思考。',
                            '或许，在每个人的生活中，我们都有可能成为别人的背景，但只要我们保持积极的心态，发挥自己的特点和优势，就能在属于自己的舞台上成为最耀眼的“主角”。'
                        ],
                        tag1: 'blog',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/003',
                        backImage: utils.getAssetsFile('img/recordList/blog003.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/blog003.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: 'blog',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/004',
                        backImage: utils.getAssetsFile('img/recordList/blog004.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/blog004.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: 'blog',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/005',
                        backImage: utils.getAssetsFile('img/recordList/blog005.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/blog005.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: 'blog',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/006',
                        backImage: utils.getAssetsFile('img/recordList/blog006.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/blog006.jpg'),

                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: 'blog',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    }
                ],
            },
            {
                id: 'resources',
                navBtntitle: '资源',
                subtitle: '寻找有趣的资源',
                profile_picture: utils.getAssetsFile('img/recordList/res_profile_pic.jpeg'),

                content: [
                    {
                        contentId: 'detail/001',
                        backImage: utils.getAssetsFile('img/recordList/resource001.png'),
                        mainUrl: utils.getAssetsFile('img/recordList/resource001.png'),
                        mediaType: 'image',
                        release__time: '2025/1/04 10:46:50',
                        title: '前端 | CSS代码可视化',
                        heat: 63,
                        like: 25,
                        isContent: true,
                        text: [
                            '前端常见形状、动画、布局、CSS样式等可视化代码，可直接复制使用'
                        ],
                        tag1: '资源',
                        tag2: '代码可视化',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/002',
                        backImage: utils.getAssetsFile('img/recordList/resource002.png'),
                        mainUrl: utils.getAssetsFile('img/recordList/resource002.png'), mediaType: 'video',
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: 'Animate.css跨浏览器动画库',
                        heat: 3963,
                        like: 255,
                        text: [
                            'Animate.css v4 brought some breaking changes, please refer to the migration guide before updating from v3.x and under.',
                            'Animate.css is a library of ready- to - use, cross - browser animations for use in your web projects.Great for emphasis, home pages, sliders, and attention- guiding hints.'
                        ],
                        tag1: '资源',
                        tag2: '动画',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/003',
                        backImage: utils.getAssetsFile('img/recordList/resource003.png'),
                        mainUrl: utils.getAssetsFile('img/recordList/resource003.png'), mediaType: 'video',
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: 'ant-design-vue组件库',
                        heat: 3963,
                        like: 255,
                        text: [
                            'ant-design-vue 为 Web 应用提供了丰富的基础 UI 组件，我们还将持续探索企业级应用的最佳 UI 实践。'
                        ],
                        tag1: '资源',
                        tag2: 'vue3组件',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/004',
                        backImage: utils.getAssetsFile('img/recordList/resource004.png'),
                        mainUrl: utils.getAssetsFile('img/recordList/resource004.png'), mediaType: 'video',
                        mediaType: 'image',
                        release__time: '2025/1/04 10:58:50',
                        title: 'Custom Shape Dividers',
                        heat: 3963,
                        like: 255,
                        text: [
                            'Custom Shape Dividers 是一个免费的在线工具，可让您轻松创建漂亮的 SVG 形状分隔线。',
                            '我们创建这个免费工具是为了让设计师和开发人员更容易为他们的最新项目导出漂亮的 SVG形状分隔线。我们希望您喜欢这个工具。我们的形状分隔线是预制的 SVG 形状，它们不是动态的，不会显示在工具栏上使用的设置中。导出的每个形状都将按照其原始设计出现，并通过您导出的代码进行操作并实施到您的 Web 构建中。'
                        ],
                        tag1: '资源',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/005',
                        backImage: utils.getAssetsFile('img/recordList/resource005.png'),
                        mainUrl: utils.getAssetsFile('img/recordList/resource005.png'), mediaType: 'video',
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: 'CSS-Inspiration -- CSS灵感',
                        heat: 1963,
                        like: 2552,
                        text: [
                            'CSS Inspiration 是一个 CSS 灵感网站，它收集了许多 CSS 灵感，包括 CSS 动画、CSS 效果、CSS 布局、CSS 技巧等等。',
                            '希望这里可以让你寻找到使用或者是学习 CSS 的灵感，以分类的形式，展示不同 CSS 属性或者不同的课题使用 CSS 来解决的各种方法。'
                        ],
                        tag1: '资源',
                        tag2: 'css灵感',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/006',
                        backImage: utils.getAssetsFile('img/recordList/resource006.png'),
                        mainUrl: utils.getAssetsFile('img/recordList/resource006.png'), mediaType: 'video',
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '开源插图',
                        heat: 563,
                        like: 365,
                        text: [
                            '开源插图，适用于您可以想象和创建的任何想法；',
                            '不断更新的美丽 svg 图像集合，您可以完全免费使用且无需署名。创建更美观的登录页面、移动应用程序和产品'
                        ],
                        tag1: '资源',
                        tag2: '插图',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    }
                ],

            },
        ],
        // 专栏
        specialColumn: [
            {
                id: 'blog',
                title: 'Blog',
                content: [
                    {
                        contentId: 'column/001',
                        title: '部署文档',
                        tagsImg: utils.getAssetsFile('img/travelAlbum/10003.jpg'),
                        count: 9,
                    },
                    {
                        contentId: 'column/002',
                        title: '使用指南',
                        tagsImg: utils.getAssetsFile('img/travelAlbum/10004.jpg'),
                        count: 12,
                    }
                ]
            },
            {
                id: 'lifeReflection',
                title: '生活倒影',
                content: [
                    {
                        contentId: 'column/001',
                        title: '部署文档',
                        tagsImg: utils.getAssetsFile('img/travelAlbum/10006.jpg'),
                        count: 6,
                    },
                    {
                        contentId: 'column/002',
                        title: '使用指南',
                        tagsImg: utils.getAssetsFile('img/travelAlbum/10007.jpg'),
                        count: 9,
                    }
                ]
            },
            {
                id: 'audiovisualFeast',
                title: '视听盛宴',
                content: [
                    {
                        contentId: 'column/001',
                        title: '部署文档',
                        tagsImg: utils.getAssetsFile('img/travelAlbum/10009.jpg'),
                        count: 6,
                    },
                    {
                        contentId: 'column/002',
                        title: '使用指南',
                        tagsImg: utils.getAssetsFile('img/travelAlbum/10010.jpg'),
                        count: 9,
                    },
                    {
                        contentId: 'column/001',
                        title: '部署文档',
                        tagsImg: utils.getAssetsFile('img/travelAlbum/10013.jpg'),
                        count: 6,
                    },
                    {
                        contentId: 'column/002',
                        title: '使用指南',
                        tagsImg: utils.getAssetsFile('img/travelAlbum/10014.jpg'),
                        count: 9,
                    },
                    {
                        contentId: 'column/001',
                        title: '部署文档',
                        tagsImg: utils.getAssetsFile('img/travelAlbum/10003.jpg'),
                        count: 9,
                    },
                    {
                        contentId: 'column/002',
                        title: '使用指南',
                        tagsImg: utils.getAssetsFile('img/travelAlbum/10004.jpg'),
                        count: 12,
                    }
                ]
            },
            {
                id: 'resources',
                title: '资源',
                content: [
                    {
                        contentId: 'column/001',
                        title: '部署文档',
                        tagsImg: utils.getAssetsFile('img/travelAlbum/10006.jpg'),
                        count: 6,
                    },
                    {
                        contentId: 'column/002',
                        title: '使用指南',
                        tagsImg: utils.getAssetsFile('img/travelAlbum/10007.jpg'),
                        count: 9,
                    },
                    {
                        contentId: 'column/001',
                        title: '部署文档',
                        tagsImg: utils.getAssetsFile('img/travelAlbum/10006.jpg'),
                        count: 6,
                    },
                    {
                        contentId: 'column/002',
                        title: '使用指南',
                        tagsImg: utils.getAssetsFile('img/travelAlbum/10007.jpg'),
                        count: 9,
                    }
                ]
            }
        ],
        // 学习人生
        learingLife: [
            {
                id: 'Java',
                navBtntitle: 'Java',
                content: [
                    {
                        contentId: 'detail/001',
                        backImage: utils.getAssetsFile('img/recordList/listDetailImg001.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/listDetailImg001.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: 'java',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/010',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back10.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back10.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/002',
                        backImage: utils.getAssetsFile('img/recordList/listDetailImg002.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/listDetailImg002.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: 'java',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/020',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back20.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back20.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/021',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back21.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back21.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/022',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back22.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back22.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/003',
                        backImage: utils.getAssetsFile('img/recordList/listDetailImg003.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/listDetailImg003.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: 'java',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/004',
                        backImage: utils.getAssetsFile('img/recordList/listDetailImg004.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/listDetailImg004.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: 'java',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/005',
                        backImage: utils.getAssetsFile('img/recordList/listDetailImg005.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/listDetailImg005.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: 'java',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/006',
                        backImage: utils.getAssetsFile('img/recordList/listDetailImg006.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/listDetailImg006.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: 'java',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/001',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back1.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back1.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                ],
            },
            {
                id: 'SpringBoot',
                navBtntitle: 'SpringBoot',
                content: [
                    {
                        contentId: 'detail/001',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back1.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back1.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/002',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back2.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back2.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/003',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back3.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back3.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/004',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back4.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back4.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/005',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back5.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back5.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/006',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back6.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back6.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/007',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back7.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back7.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/008',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back8.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back8.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/009',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back9.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back9.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/010',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back10.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back10.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/011',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back11.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back11.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/012',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back12.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back12.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/013',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back13.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back13.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/015',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back15.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back15.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/003',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back16.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back16.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/0017',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back17.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back17.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/018',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back18.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back18.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/0',
                        backImage: utils.getAssetsFile('img/recordList/videoButton-back19.png'),
                        mainUrl: utils.getAssetsFile('videos/video-back19.mp4'),
                        mediaType: 'video',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    }
                ],
            },
            {
                id: 'bigData',
                navBtntitle: '大数据',
                content: [
                    {
                        contentId: 'detail/001',
                        backImage: utils.getAssetsFile('img/recordList/blog001.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/blog001.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '科技与乐趣并存的工作室一角',
                        heat: 3963,
                        like: 255,
                        text: ['在我这个充满创意与灵感的工作室里，科技与乐趣完美地融合在了一起。中心位置摆放着一台高性能的显示器，屏幕上正显示着一个蓝色背景的界面，上面清晰地写着“CUSTOMER RELATIONSHIP MANAGEMENT”（客户关系管理）。这是我工作中不可或缺的一部分，帮助我高效地管理客户信息，提升服务质量。',
                            '显示器周围，我精心布置了许多小物件，它们不仅具有实用性，更增添了一份生活的情趣。时钟时刻提醒着我时间的宝贵，而灯饰则散发出柔和的光芒，为整个工作室营造出一种温馨的氛围。文件夹里整齐地存放着重要的文件和资料，方便我随时查阅。此外，还有一些小巧的装饰品，它们让工作室充满了艺术气息。',
                            '在显示器下方的桌子上，摆放着多个游戏控制器、键盘和鼠标。这些设备是我闲暇时的娱乐伙伴，让我在工作之余也能享受到游戏的乐趣。每当完成一项艰巨的工作任务后，我都会拿起游戏控制器，沉浸在游戏的世界中，放松身心。',
                            '整个工作室给人一种科技感十足且杂乱无章的感觉，但这正是我所追求的。我喜欢这种自由自在、无拘无束的工作氛围，它激发了我的创造力和想象力。在这里，我可以尽情地发挥自己的才华，创造出更多令人惊叹的作品。'
                        ],
                        tag1: 'blog',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/002',
                        backImage: utils.getAssetsFile('img/recordList/blog002.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/blog002.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '背景里的“主角”',
                        heat: 3963,
                        like: 255,
                        text: [
                            '这是一幅充满趣味性的卡通插画，画面中央是一只表情生动的蓝眼睛猫咪。猫咪的耳朵尖尖的，粉红色的鼻子小巧可爱，但此刻它的脸上却写满了不满和失望。眉头紧锁，嘴巴紧闭，仿佛正在经历一场无声的抗议。',
                            '猫咪所处的背景是单色的深蓝色，与猫咪身上明亮的颜色形成了鲜明的对比。然而，真正吸引眼球的不仅仅是猫咪的可爱和背景的色彩，还有图片上方那一行醒目的白色英文文字：“Oh, great... Im in the background.”（哦，太棒了……我只是背景。）这句话以一种幽默而讽刺的方式，道出了猫咪内心的无奈和不满。',
                            '在这幅插画中，猫咪似乎并不满足于自己仅仅作为背景的角色，它的眼神和表情仿佛在诉说着对成为焦点的渴望。这种幽默和讽刺的元素，不仅让画面更加生动有趣，也引发了我们对于“主角”与“背景”之间关系的思考。',
                            '或许，在每个人的生活中，我们都有可能成为别人的背景，但只要我们保持积极的心态，发挥自己的特点和优势，就能在属于自己的舞台上成为最耀眼的“主角”。'
                        ],
                        tag1: 'blog',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/003',
                        backImage: utils.getAssetsFile('img/recordList/blog003.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/blog003.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: 'blog',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/004',
                        backImage: utils.getAssetsFile('img/recordList/blog004.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/blog004.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: 'blog',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/005',
                        backImage: utils.getAssetsFile('img/recordList/blog005.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/blog005.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: 'blog',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/006',
                        backImage: utils.getAssetsFile('img/recordList/blog006.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/blog006.jpg'),

                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: 'blog',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    }
                ],
            },
        ],
        // 寻国记
        country: [
            {
                id: 'country',
                navBtntitle: 'Blog',
                subtitle: '最美博客',
                content: [
                    {
                        contentId: 'detail/001',
                        backImage: utils.getAssetsFile('img/recordList/blog001.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/blog001.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '科技与乐趣并存的工作室一角',
                        heat: 3963,
                        like: 255,
                        text: ['在我这个充满创意与灵感的工作室里，科技与乐趣完美地融合在了一起。中心位置摆放着一台高性能的显示器，屏幕上正显示着一个蓝色背景的界面，上面清晰地写着“CUSTOMER RELATIONSHIP MANAGEMENT”（客户关系管理）。这是我工作中不可或缺的一部分，帮助我高效地管理客户信息，提升服务质量。',
                            '显示器周围，我精心布置了许多小物件，它们不仅具有实用性，更增添了一份生活的情趣。时钟时刻提醒着我时间的宝贵，而灯饰则散发出柔和的光芒，为整个工作室营造出一种温馨的氛围。文件夹里整齐地存放着重要的文件和资料，方便我随时查阅。此外，还有一些小巧的装饰品，它们让工作室充满了艺术气息。',
                            '在显示器下方的桌子上，摆放着多个游戏控制器、键盘和鼠标。这些设备是我闲暇时的娱乐伙伴，让我在工作之余也能享受到游戏的乐趣。每当完成一项艰巨的工作任务后，我都会拿起游戏控制器，沉浸在游戏的世界中，放松身心。',
                            '整个工作室给人一种科技感十足且杂乱无章的感觉，但这正是我所追求的。我喜欢这种自由自在、无拘无束的工作氛围，它激发了我的创造力和想象力。在这里，我可以尽情地发挥自己的才华，创造出更多令人惊叹的作品。'
                        ],
                        tag1: 'blog',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/002',
                        backImage: utils.getAssetsFile('img/recordList/blog002.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/blog002.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '背景里的“主角”',
                        heat: 3963,
                        like: 255,
                        text: [
                            '这是一幅充满趣味性的卡通插画，画面中央是一只表情生动的蓝眼睛猫咪。猫咪的耳朵尖尖的，粉红色的鼻子小巧可爱，但此刻它的脸上却写满了不满和失望。眉头紧锁，嘴巴紧闭，仿佛正在经历一场无声的抗议。',
                            '猫咪所处的背景是单色的深蓝色，与猫咪身上明亮的颜色形成了鲜明的对比。然而，真正吸引眼球的不仅仅是猫咪的可爱和背景的色彩，还有图片上方那一行醒目的白色英文文字：“Oh, great... Im in the background.”（哦，太棒了……我只是背景。）这句话以一种幽默而讽刺的方式，道出了猫咪内心的无奈和不满。',
                            '在这幅插画中，猫咪似乎并不满足于自己仅仅作为背景的角色，它的眼神和表情仿佛在诉说着对成为焦点的渴望。这种幽默和讽刺的元素，不仅让画面更加生动有趣，也引发了我们对于“主角”与“背景”之间关系的思考。',
                            '或许，在每个人的生活中，我们都有可能成为别人的背景，但只要我们保持积极的心态，发挥自己的特点和优势，就能在属于自己的舞台上成为最耀眼的“主角”。'
                        ],
                        tag1: 'blog',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/003',
                        backImage: utils.getAssetsFile('img/recordList/blog003.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/blog003.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: 'blog',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/004',
                        backImage: utils.getAssetsFile('img/recordList/blog004.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/blog004.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: 'blog',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/005',
                        backImage: utils.getAssetsFile('img/recordList/blog005.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/blog005.jpg'),
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: 'blog',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/006',
                        backImage: utils.getAssetsFile('img/recordList/blog006.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/blog006.jpg'),

                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '潮起潮落，云卷云舒',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: 'blog',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    }
                ],
            },
            {
                id: 'resources',
                navBtntitle: '资源',
                subtitle: '寻找有趣的资源',
                content: [
                    {
                        contentId: 'detail/001',
                        backImage: utils.getAssetsFile('img/recordList/resource001.png'),
                        mainUrl: utils.getAssetsFile('img/recordList/resource001.png'),
                        mediaType: 'image',
                        release__time: '2025/1/04 10:46:50',
                        title: '前端 | CSS代码可视化',
                        heat: 63,
                        like: 25,
                        text: [
                            '前端常见形状、动画、布局、CSS样式等可视化代码，可直接复制使用'
                        ],
                        tag1: '资源',
                        tag2: '代码可视化',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/002',
                        backImage: utils.getAssetsFile('img/recordList/resource002.png'),
                        mainUrl: utils.getAssetsFile('img/recordList/resource002.png'), mediaType: 'video',
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: 'Animate.css跨浏览器动画库',
                        heat: 3963,
                        like: 255,
                        text: [
                            'Animate.css v4 brought some breaking changes, please refer to the migration guide before updating from v3.x and under.',
                            'Animate.css is a library of ready- to - use, cross - browser animations for use in your web projects.Great for emphasis, home pages, sliders, and attention- guiding hints.'
                        ],
                        tag1: '资源',
                        tag2: '动画',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/003',
                        backImage: utils.getAssetsFile('img/recordList/resource003.png'),
                        mainUrl: utils.getAssetsFile('img/recordList/resource003.png'), mediaType: 'video',
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: 'ant-design-vue组件库',
                        heat: 3963,
                        like: 255,
                        text: [
                            'ant-design-vue 为 Web 应用提供了丰富的基础 UI 组件，我们还将持续探索企业级应用的最佳 UI 实践。'
                        ],
                        tag1: '资源',
                        tag2: 'vue3组件',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/004',
                        backImage: utils.getAssetsFile('img/recordList/resource004.png'),
                        mainUrl: utils.getAssetsFile('img/recordList/resource004.png'), mediaType: 'video',
                        mediaType: 'image',
                        release__time: '2025/1/04 10:58:50',
                        title: 'Custom Shape Dividers',
                        heat: 3963,
                        like: 255,
                        text: [
                            'Custom Shape Dividers 是一个免费的在线工具，可让您轻松创建漂亮的 SVG 形状分隔线。',
                            '我们创建这个免费工具是为了让设计师和开发人员更容易为他们的最新项目导出漂亮的 SVG形状分隔线。我们希望您喜欢这个工具。我们的形状分隔线是预制的 SVG 形状，它们不是动态的，不会显示在工具栏上使用的设置中。导出的每个形状都将按照其原始设计出现，并通过您导出的代码进行操作并实施到您的 Web 构建中。'
                        ],
                        tag1: '资源',
                        tag2: '生活',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/005',
                        backImage: utils.getAssetsFile('img/recordList/resource005.png'),
                        mainUrl: utils.getAssetsFile('img/recordList/resource005.png'), mediaType: 'video',
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: 'CSS-Inspiration -- CSS灵感',
                        heat: 1963,
                        like: 2552,
                        text: [
                            'CSS Inspiration 是一个 CSS 灵感网站，它收集了许多 CSS 灵感，包括 CSS 动画、CSS 效果、CSS 布局、CSS 技巧等等。',
                            '希望这里可以让你寻找到使用或者是学习 CSS 的灵感，以分类的形式，展示不同 CSS 属性或者不同的课题使用 CSS 来解决的各种方法。'
                        ],
                        tag1: '资源',
                        tag2: 'css灵感',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    },
                    {
                        contentId: 'detail/006',
                        backImage: utils.getAssetsFile('img/recordList/resource006.png'),
                        mainUrl: utils.getAssetsFile('img/recordList/resource006.png'), mediaType: 'video',
                        mediaType: 'image',
                        release__time: localizedDateString,
                        title: '开源插图',
                        heat: 563,
                        like: 365,
                        text: [
                            '开源插图，适用于您可以想象和创建的任何想法；',
                            '不断更新的美丽 svg 图像集合，您可以完全免费使用且无需署名。创建更美观的登录页面、移动应用程序和产品'
                        ],
                        tag1: '资源',
                        tag2: '插图',
                        comment: [
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar01.webp'),
                                nickname: 'xxy159',
                                level: 'lv1',
                                timestamp: '2020/10/16 13:11:50',
                                content: '测试自定义数据格式是否正确',
                                tag1: '资源',
                                tag2: '测试付费专栏'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar02.webp'),
                                nickname: 'Sara',
                                level: 'lv6',
                                timestamp: '2020/10/16 13:11:50',
                                content: '😁😁测试数据超出内容区域后是否自动换行是否正常，测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                            {
                                profile__picture: utils.getAssetsFile('img/public/avatar03.webp'),
                                nickname: '城北吕公',
                                level: 'lv4',
                                timestamp: '2024/11/26 13:11:50',
                                content: '测试接收表情数据是否正常测试接收表情数据是否正常'
                            },
                        ]
                    }
                ],

            },
        ],
        // 收藏夹数据源
        favoriteData: [
            {
                title: '常用',
                content: [
                    {
                        imgSrc: "https://css.bqrdh.com/images/logo.png",
                        subtitle: 'CSS可视化',
                        introduce: '常见不规则形状|其它css样式可视化操作，更直观感受样式的变化及不同',
                        href: 'https://css.bqrdh.com/css-shape'
                    },
                    {
                        imgSrc: 'http://www.htmleaf.com/images/logo.svg',
                        subtitle: 'Jquery之家',
                        introduce: '自由分享Jquery、html、css3、vue的免费的插件库',
                        href: 'http://www.htmleaf.com/#google_vignette'
                    },
                ]
            },
            {
                title: '数据库',
                content: [
                    {
                        imgSrc: 'https://www.runoob.com/images/logo.png',
                        subtitle: '菜鸟教程',
                        introduce: '学的不仅是技术，更是梦想',
                        href: 'https://www.runoob.com/'
                    },
                    {
                        imgSrc: 'https://www.w3schools.com/images/logo.png',
                        subtitle: 'w3school',
                        introduce: '拥有世界上最大的 Web 开发人员网站',
                        href: 'https://www.w3schools.com/mysql/'
                    },
                ]
            },
            {
                title: '前端',
                content: [
                    {
                        imgSrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASYAAAA8CAYAAADL/heTAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAA8LSURBVHhe7Z35kx5FGcf3D/GgSi3UEtFSDMiloYiAiBJDBAQSSkxKQxIKssmG3CH3vQkbdnOYO2tYcmezyW7uYzenkESEJJoYEPFExdLyqmrrO1W9O3m6p+d5+p159z36h08peWee7u3p/k73008/U/O/986qQCAQKCVq6D8EAoFAbxOEqQT4zztn1Otte9WkoQ3qO30mq343jVdf+Wht9L8Dbp+qpg9vjH7HdfTeQKASCcLUy/z29aPq6ftnq1s+UpsKrsP11EYgUGkEYepF/nHllHru0YWGALkY1n+e+vDyCcNWIFBJBGHqRbq2tkZLNio+LnA97qO2AoFKoiBhalu9RU17ttGLCx3thr1qY9XM9YbwcMB91Faguvjvb86od08fUVdPHDJ+qwS8hemvl06owd+YZQwaLi8+/bL697XqduZO/XGj0S4cJg5ZatgKVD5Ywh97bZcaO3iJuutTY6O+UKkvKW9hOrt7r7r1htHGoOHywBcnqXdOHzbsVhNBmAIusAt7+dhB1TBhVbQ7S/sBCMJEQGPRRpKCpSC1W02sm7fBaBMOldoZA2fVH853ql0rNqth352v+nws/cVfqX3BS5j+9GanGnjnNKORpIx+anFVL+fe2LNXffWGMUa7uMD1uI/aCpQ/WKoNeWiu8cxdBGGKgXWudDfJxn03T1DXTh0x7FcL/7p2Wo0ZtNhoFxe4HvdRW4HyJwhTD2Jhwm7A7OeWGQ3kS8vLm4wyqokP3upiixOuw/XURqAyCMLUg1iYsAZ+5I6XjAby5dkB86NAQ1pONQGxv9J1UDVOWq1+9PA89eCXJnWDnU/8O37HdfTeQOUQhKkHsTAd/OkOo3EKoe+nx6lLRw4Y5QQC1UYQph5EwgRHNeKPaOPYuO3jY9h+qOZFzUZZgUC1EYSpB5EwIe4I8Ue0cWzMfWEZe8mHhxHOfwWqnSBMPYiECXFHtGFsYEsbaTomD11q/GajFLfAdXDbpsWboiM0LzxeH/l88L8zRzSpHcs2R0cCKt3vgwj/oy07VX3dSlU3eEmUlgV+L7TJqlnr1c/3dXjvEuK+y0cPdLcx/Guwj3LmPL9cta/dFvk06X15AFE439GhWlduicqOP3MENyKoVf/NnVta1R8vHM/82ZeDMP3lYpc6tbMtage0h+4T8TbC80RbFjLZYAsTlnGIO6INY+PJe2eqD97uYgsZaJq8xihTyiGB/yspevrPv+hS9WN/ou74RJ1xjw3kTGpe2OztwEc9qE0XSfX2tYk2o/djwJ3Z1aae6sc7coRAwFkjm9Tvzh8zbNnAzPulYa9Ey31qywZm3geat2eej+q9nx1VDeNXqwe+MNEokwPqj+Mh0lxZaKdvfZm38siKOz9Zp97c32HUhUMh7QTBWjt3o/rbRZlIsYUJs4d7PjvOKNgG3ji4BzFKiFWiv9vAWxhvZ1quBIkwjRy4QP3zas+bHh1r44Jm9mChPNxnitfBZImIgKyFiYZrIN/TqCfqjes4oO3QhkmDFOK9aMxK4z4uyEeFWSq1K+VXnYfU848tMuwXAp7/ye27WbOochGmLNsJfQPPnitQbGFCB6aF2Yin5cDAhwDQa2zg3B3O39FyJUiEKe7XwoCZMbzJuEYKGn/f+u1GvVxIRARkLUzxpcBbB/dFSxd6jZSFo1cYy7vfnz+unnlwjnGtFNQP9aR/MwfUCUsQzlEPXzixZqUuTIW+QFzc+7nxkYDTMiksYUJFEW9EC7Hx0C2T1ftv9GRZ5AoawPk7WrYEH2FCZ8W6mP7uC8IfsL6mdUtCIiIgL2GCrwidhv7uCwRAzx4wC8Pynl7jS//bpqp3z8hmTn//5Uk14YcNhq08wN/qyjRaysKU9bOygRcDduJds0uWMCHOCAOOFmADDu94gWgMNAq9zgbO3+EcHi2fi0SYtB8M61/6W6EMvGta5Byl9bMhERGQtTDhZYAldBazmTh45ufa2zMXfg36GZ2VJZFXHVzAkZ/kmihVYYLYQ/TpvXkRf3lRWMIkSWiGXY34vZKdBiwDcQ6Pls9FIkzoGJ1bd2c6S4jD3S2RiAjIWpgmDmlQSyesNv49C5A2GP2BG88mAW9dPD/6t9vI4+XDYeX0ddaBV4rCVGxRAniGHeu2GXUBqcIkSQiXdChXkiIF5/BsD5ODRJgQjyXNty2BO/uTiAjIWpi+f88Mdf/N8t0WLnn6czjJBhGOkNfLJw2Ui/JpnUpNmHpjRqlBqIFtQyNVmCSpOehOl0aSVA5bw76xKxJhAnm8yTVcZ75EREDWwlTOUH8mpZAD530/M677vCL+P/2diy0MptSEac+ard5jAS8evOQRNkN/4zJv1HJjMpIqTGhYaiiJpKMl0vxNOI9HbXCQCpMNpCyFfwBvkEH9Zhb0xkciOFpHilREiiVMiFlB8Bzo93leyAcX7F5m0cZp4i85qaCZMaIpitux2UKd6fVpaF9m3Bb8j898c/Z1h7UB6iptC/RXasfGo3dPUxctZ1JRF/hEqd000E40wBgzr+ObW6PQCXq9C9t5WacwoUG5HnqXIkvfXJwpuo1ChAmNCZ8FjcHBbk7jFL44x8lDRPKwGQdxKzTlMZ7fub3tUQen10vA/bZASbSxr5+L+jTj4Dd6fRIQBMwc6Js7DtwaUnG6+8ax6u1D+w1bNiT+WA3Xl5mEJAgaQETSvtKDcImh35b9HXRm6RQmyeeF0gIkJVkJfPOB+woTdqQQZ0PtadBZ4cik96XBydApFZE8hQkzGNdOF8IguLuzlLQtfrQxpvT0vjRcA3PNnA3sgFnkX097VkDi2tDYouttFFuYJGFAGqT9pXZsSH17dGbpFCZEcFMDSaTFIEmn1T75wH2EyTXTiyOtP+AcTpaKSF7ChOMnOI5DbcWRznw13B00SViKJm1gos7vnzsWnbvDJ9hty1LJWc0PL52MlmHUhgsaXZ9EsYVJcpoDpE0+4kj7Ch2HicIkSQjH+Qij5Kwd4Mw2KD7CxN0FlNYflJMwcV8EiGyn96bBTQboM+h9BiaeCforMmDAgQ5Rpn6gJNBXxv2Al/pHWsdiC5NkqQuSfMhJSFZcIL4sTxQmSV5v7ta4JAo8KfTAhY8wSRztK6bJlnPlIkyYCboileNIAmY13MGT56B3AZ8X5+WkkbYvt47FFibJiojOaDhIzsoCjC99r1WY8JC4KUsAjfZOQjp15E6BNVJhkjgmgSTQFJSLMHHqqZEKE2c2HUda90IGJhcIF4Qb/hUIJzfzhLSOxRQmyTlWgCX25oZXVfu6bWy2NbWIMhLE+7ZVmBAbgikuvTEJ7qxD2vDcJYBGKkyIJeGm6gCVKkwcmxqpMEnftNK6+w7MJPCCxRY6+tL04Y3irW8b3DpKx4fENsWnrLxJFSbJFiJmQHAcYoBzQK4jaiMJW3yDiyBM+dnUVJowIfEZZnQLaldEsT7SOCIO3Dr6iAXXNqU3gjzTcAqTJK93MZA43IIw5WdTU+7ChBnR5WMHojQ30h1AX7h1DMLkECapwypvOINbE4QpP5uachUmCBLyAHF3mrOEW8cgTA5hkuycFQNJjEkQpvxsaspRmOCnxFKN3lssOHUEQZgShEnqqS8WNFw9iSBM+dnUlJswZX1yHrtMX7vxRePfXaTVUVNMYfIpK2/if8t1wuQTeVsMuBGnQZjys6kpN2FqWeK/AkBWAXwpBV/9wNjQmTOyrqPGRyy4tinSSQg3VjErrhMmOJpphUqBtFPkmiBM+dnUlJMwSU4vaDAb2vrKq84XYZZ1jFNMYQJ5B1gWQrcw+TRKMUk7iweCMOVnU1NOwiQJewGPfX16agR8ntHpPmOQa9tG3kdSCqFbmKQdrthwppJBmPKzqZH2k94UJmQMoNe7cKVQ0UhSAWlcdYzjI0zxYxxSpCcxOAe9KchthfZCeAZywNOUN0l0C5MkIRyYX7viusBJKRcP7xftCnDygQdhys+mplyESTrIue6Cs617xGlPkupIkdYZSE9HxPFJe+L6gADFtvGA4zwckYqESZLXG3Afoguf0/ppmQCCMOVnU1OpwgTSvgnokygOJNWR4rNMdCX01yARX9IJCulyF+XBB+cSFQBRSpvsIFcWztnaRCoSJklObsBZVnGQrnHT8oEHYcrPpqaShcn1ySVkZax90u8LxZKMrNLlJ4BYIMlePNUthOHqiUPRUg8OfdilZQHf1LqP950RZSOl/Rv/jX/H7/QeF/goRvxDoZEwSb5iAvQnwAtFusYFrgPDQZjys6kpF2GSbodr0CcQZIxsm+gbp3a2RYNemlEgDoQDNtEXIBjIlpq0/MorwBmii5kTLQ8U8jGCrKCxijXSDwVwfD1cfDqPK8VKEKb8bGrKRZiA9IVbLFz9Ttq+XPCZpKTVhs0XVEz63zrF+ABEjSQhHEhbTkmRDnZXPvAgTPnZ1EgHTm8KkzSDYrFAlk5k66T1BT4OaQ5pz6E3PngJknxkNZK8vMA1Y/FB2tFBUhrYIEz52dRIn1fagKBI6+4SJh8/Exe8ICXJ9uO4llUATvg8BBXjg5YVpzfEKWmXr0aSEA64fDw+SHcEQVI+8CBM+dnUlJMwgUK+7JIE7MFu2q5TEmntndfSKq2tAPxfPjuPUjBTQsCmTZRADb3BhWsZVQhSX0BSPvAgTPnZ1JSbMAHMQLifcUoDsySd7cI3fICzeQTbwx+R+V/TQChCkhDEwXKyaepa4/6sQFbQ0zvbjHLjiIQpaaZSKNJwBWDLBx6EKT+bmnIUJnCho73gNLmjnqg3jqz4zDC4dc5SIAbfN0td6TpolOECk5Axg2Sxhi4QttC8sDlxRzKOSJg4Ifs+SHcGgS3iNQhTfjY15SpMAP1lx/LXRAKlgwCR9TJptgG7WxtbVL+b0n1OCDtAwjpqwwX66ILaleIlKa5HlLWr7hxwDGXt3I1qwO1y/xPab+T3FqrOLa3Oj6lSjERxgUA1gMF2tGWnqq9bGflz4OfElnrd4CVq5ogmtWPZZvXrU4eNiGQXGPwIcsTmDJZrsKtB6hR8nVYyOCmwj4937t+w/bp649PrmLXhvxsnrY5EAIGThYhREgjxgX8N0d9oJ1sdUDfUEbNLSfvFCcIUCARKjiBMgUCg5AjCFAgESo4gTIFAoOQIwhQIBEqO/wPKJy/gQmEVXgAAAABJRU5ErkJggg==',
                        subtitle: 'Animate.css',
                        introduce: 'is a library of ready-to-use, cross-browser animations for use in your web projects. Great for emphasis, home pages, sliders, and attention-guiding hints.',
                        href: 'https://animate.style/'
                    },
                    {
                        imgSrc: 'https://aliyuncdn.antdv.com/v2/assets/logo.1ef800a8.svg',
                        subtitle: 'Ant Design Vue',
                        introduce: '为 Web 应用提供了丰富的基础 UI 组件，我们还将持续探索企业级应用的最佳 UI 实践。',
                        href: 'https://2x.antdv.com/components/alert-cn'
                    },
                    {
                        imgSrc: 'https://www.shapedivider.app/img/logo_500x500.18aca7aa.png',
                        subtitle: 'Shape Dividers',
                        introduce: "We created this free tool to make it easier for designers and developers to export a beautiful SVGshape divider for their latest project.We hope you enjoy this toolOur Shape Dividers are premade SVG shapes that are not dynamic to the settingsyou use on the toolbar.Every Shape exported will come out as per it's originaldesign and is manipulated via the code you export with it and implement into your web build.",
                        href: 'https://www.shapedivider.app/'
                    },
                    {
                        imgSrc: 'data:image/png;base64,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',
                        subtitle: 'Swiper',
                        introduce: 'Swiper 是最完整的现代手机滑动框架，没有任何依赖。',
                        href: 'https://www.swiper.com.cn/'
                    }
                ]
            },
            {
                title: '其它',
                content: [
                    {
                        imgSrc: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIKICAgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzA2LjE4NSAxMjAuMjk2IgogICB2aWV3Qm94PSIyNCAyNiA2OCA2OCIKICAgeT0iMHB4IgogICB4PSIwcHgiCiAgIHZlcnNpb249IjEuMSI+CiAgIAkgPGc+PGxpbmUKICAgICAgIHkyPSI3Mi4zOTQiCiAgICAgICB4Mj0iNDEuMDYxIgogICAgICAgeTE9IjQzLjM4NCIKICAgICAgIHgxPSI1OC4wNjkiCiAgICAgICBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiCiAgICAgICBzdHJva2Utd2lkdGg9IjMuNTUyOCIKICAgICAgIHN0cm9rZT0iI0ZGRkZGRiIKICAgICAgIGZpbGw9Im5vbmUiIC8+PGxpbmUKICAgICAgIHkyPSI3Mi4zOTQiCiAgICAgICB4Mj0iNzUuMDc2IgogICAgICAgeTE9IjQzLjM4NCIKICAgICAgIHgxPSI1OC4wNjgiCiAgICAgICBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiCiAgICAgICBzdHJva2Utd2lkdGg9IjMuNTAwOCIKICAgICAgIHN0cm9rZT0iI0ZGRkZGRiIKICAgICAgIGZpbGw9Im5vbmUiIC8+PGc+PHBhdGgKICAgICAgICAgZD0iTTUyLjc3Myw3Ny4wODRjMCwxLjk1NC0xLjU5OSwzLjU1My0zLjU1MywzLjU1M0gzNi45OTljLTEuOTU0LDAtMy41NTMtMS41OTktMy41NTMtMy41NTN2LTkuMzc5ICAgIGMwLTEuOTU0LDEuNTk5LTMuNTUzLDMuNTUzLTMuNTUzaDEyLjIyMmMxLjk1NCwwLDMuNTUzLDEuNTk5LDMuNTUzLDMuNTUzVjc3LjA4NHoiCiAgICAgICAgIGZpbGw9IiNGRkZGRkYiIC8+PC9nPjxnCiAgICAgICBpZD0iZzM0MTkiPjxwYXRoCiAgICAgICAgIGQ9Ik02Ny43NjIsNDguMDc0YzAsMS45NTQtMS41OTksMy41NTMtMy41NTMsMy41NTNINTEuOTg4Yy0xLjk1NCwwLTMuNTUzLTEuNTk5LTMuNTUzLTMuNTUzdi05LjM3OSAgICBjMC0xLjk1NCwxLjU5OS0zLjU1MywzLjU1My0zLjU1M0g2NC4yMWMxLjk1NCwwLDMuNTUzLDEuNTk5LDMuNTUzLDMuNTUzVjQ4LjA3NHoiCiAgICAgICAgIGZpbGw9IiNGRkZGRkYiIC8+PC9nPjxnPjxwYXRoCiAgICAgICAgIGQ9Ik04Mi43NTIsNzcuMDg0YzAsMS45NTQtMS41OTksMy41NTMtMy41NTMsMy41NTNINjYuOTc3Yy0xLjk1NCwwLTMuNTUzLTEuNTk5LTMuNTUzLTMuNTUzdi05LjM3OSAgICBjMC0xLjk1NCwxLjU5OS0zLjU1MywzLjU1My0zLjU1M2gxMi4yMjJjMS45NTQsMCwzLjU1MywxLjU5OSwzLjU1MywzLjU1M1Y3Ny4wODR6IgogICAgICAgICBmaWxsPSIjRkZGRkZGIiAvPjwvZz48L2c+PC9zdmc+',
                        subtitle: 'draw.io',
                        introduce: '免费的流程图软件，可作为应用安装在edge浏览器中使用',
                        href: 'https://app.diagrams.net/'
                    },
                    {
                        imgSrc: 'https://res.openi.cn/2023/04/logo-n-pic.png',
                        subtitle: 'OpenAI',
                        introduce: '多种AI模型',
                        href: 'https://openi.cn/'
                    }
                ]
            }
        ]
    }),
    actions: {
        updateIsContent(contentId, newValue) {
            this.dataContent.forEach(section => {
                section.content.forEach(item => {
                    if (item.contentId === contentId) {
                        item.isContent = newValue;
                    }
                })
            })
        },
        //新增留言回复
        addReply(commentId, newReply) {
            const comment = this.dataContent
                .flatMap(section => section.content)
                .flatMap(content => content.comment)
                .find(c => c.commentId === commentId);

            if (comment) {
                comment.replies.push(newReply);
            }
        }
    },
});