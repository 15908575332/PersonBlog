const getAssetsFile = (url: string) => {
    return new URL(`../assets/${url}`, import.meta.url).href;
};

const getVideoFile = (url: string) => {
    // 假设视频文件位于与图片文件相同的资产目录中
    // 如果视频位于不同的子目录，请相应地调整路径
    return new URL(`../assets/${url}`, import.meta.url).href;
};


export default {
    getAssetsFile,
    getVideoFile // 新增的视频文件引入方法
};