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
                profile_picture: utils.getAssetsFile('/src/assets/img/recordList/life_profile_pic.jpeg'),
                content: [
                    {
                        contentId: 'detail/001',
                        author: '用户xxy159',
                        backImage: utils.getAssetsFile('img/recordList/listDetailImg001.jpg'),
                        mainUrl: utils.getAssetsFile('img/recordList/listDetailImg001.jpg'),
                        mediaType: 'image',
                        timeAxis: '1', // 时间轴
                        code: '1', // 源码展示
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
                        isContent: true,
                        title: '静',
                        heat: 3963,
                        like: 255,
                        text: [text, text1, text2],
                        tag1: '视听盛宴',
                        tag2: '生活',
                        comment: [
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
                        isContent: true,
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
                        isContent: true,
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
                        tagsImg: utils.getAssetsFile('img/albumCollection/10003.jpg'),
                        count: 9,
                    },
                    {
                        contentId: 'column/002',
                        title: '使用指南',
                        tagsImg: utils.getAssetsFile('img/albumCollection/10004.jpg'),
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
                        tagsImg: utils.getAssetsFile('img/albumCollection/10006.jpg'),
                        count: 6,
                    },
                    {
                        contentId: 'column/002',
                        title: '使用指南',
                        tagsImg: utils.getAssetsFile('img/albumCollection/10007.jpg'),
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
                        tagsImg: utils.getAssetsFile('img/albumCollection/10009.jpg'),
                        count: 6,
                    },
                    {
                        contentId: 'column/002',
                        title: '使用指南',
                        tagsImg: utils.getAssetsFile('img/albumCollection/10010.jpg'),
                        count: 9,
                    },
                    {
                        contentId: 'column/001',
                        title: '部署文档',
                        tagsImg: utils.getAssetsFile('img/albumCollection/10013.jpg'),
                        count: 6,
                    },
                    {
                        contentId: 'column/002',
                        title: '使用指南',
                        tagsImg: utils.getAssetsFile('img/albumCollection/10014.jpg'),
                        count: 9,
                    },
                    {
                        contentId: 'column/001',
                        title: '部署文档',
                        tagsImg: utils.getAssetsFile('img/albumCollection/10003.jpg'),
                        count: 9,
                    },
                    {
                        contentId: 'column/002',
                        title: '使用指南',
                        tagsImg: utils.getAssetsFile('img/albumCollection/10004.jpg'),
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
                        tagsImg: utils.getAssetsFile('img/albumCollection/10006.jpg'),
                        count: 6,
                    },
                    {
                        contentId: 'column/002',
                        title: '使用指南',
                        tagsImg: utils.getAssetsFile('img/albumCollection/10007.jpg'),
                        count: 9,
                    },
                    {
                        contentId: 'column/001',
                        title: '部署文档',
                        tagsImg: utils.getAssetsFile('img/albumCollection/10006.jpg'),
                        count: 6,
                    },
                    {
                        contentId: 'column/002',
                        title: '使用指南',
                        tagsImg: utils.getAssetsFile('img/albumCollection/10007.jpg'),
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