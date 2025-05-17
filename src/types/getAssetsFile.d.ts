// 假设 getAssetsFile 导出一个对象，这里可以根据实际情况修改类型
declare module '@/utils/getAssetsFile' {
    const utils: {
        // 这里定义 utils 对象的具体类型
        getAssetsFile: (path: string) => string;
        // 如果还有其他属性或方法，可以继续添加
    };
    export default utils;
}