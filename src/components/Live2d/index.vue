<template></template>
<script setup>
import { onMounted, ref } from 'vue';
import * as live2d from 'live2d-render';
onMounted(async () => {
    await live2d.initializeLive2D({
        BackgroundRGBA: [0.0, 0.0, 0.0, 0.0],
        ResourcesPath: '../../live2d_moc3/天使/天使.model3.json',
        //这是你自己的live2d资源文件，相对路径引用即可
        CanvasSize: {
            height: 300,
            width: 200
        },
        // 展示工具箱（可以控制 live2d 的展出隐藏，使用特定表情）
        ShowToolBox: true,

        // 是否使用 indexDB 进行缓存优化，这样下一次载入就不会再发起网络请求了
        LoadFromCache: true
    })
});
</script>