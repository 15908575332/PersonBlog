<template>
    <div id="live2d-container">
        <!-- 其他内容 -->
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import * as live2d from 'live2d-render';

onMounted(async () => {
    await live2d.initializeLive2D({
        MinifiedJSUrl: 'https://unpkg.com/core-js-bundle@3.6.1/minified.js',
        Live2dCubismcoreUrl: 'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js',
        // 模型配置文件 (.model3.json) 的路径
        ResourcesPath: '/live2d_moc3/tianshi.model3.json',
        // 画布大小
        CanvasSize: { height: 400, width: 200 },
        // live2d 的位置 ('left' | 'right')
        CanvasPosition: 'left',
        // 背景透明度 [R, G, B, A]
        BackgroundRGBA: [0, 0, 0, 8],
        // 是否显示工具箱（可用于切换表情等）
        ShowToolBox: true,
        // 是否使用 IndexedDB 缓存模型以优化加载
        LoadFromCache: true,
    });
});
</script>