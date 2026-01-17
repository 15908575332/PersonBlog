import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import viteCompression from 'vite-plugin-compression'
import basicSsl from '@vitejs/plugin-basic-ssl'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // 生产环境下的公共路径
  server: {
    host: '0.0.0.0', // 默认是 localhost
    headers: {
      'Cache-Control': 'no-store, max-age=0', // 设置缓存策略，禁用缓存
    },
    https: {}, // 是否开启 https
    port: 8008, // 自定义端口
    strictPort: false, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    open: false, // 启动后是否浏览器自动打开
    hmr: true, // 热更新
    proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: true
      }
    }
  },
  plugins: [
    vue(),
    basicSsl(),
    viteCompression({
      //algorithm: 'gzip', // 压缩算法，可选[‘gzip’，‘brotliCompress’，‘deflate’，‘deflateRaw’]
      //threshold: 10240, // 如果体积大于阈值，则进行压缩，单位为b
      deleteOriginFile: false // 压缩后是否删除源文件
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),// 兼容src目录下的文件夹可通过 @/components/HelloWorld.vue写法 
      '@assetImg': resolve(__dirname, 'src/assets/images'),
    }
  },
  build: {
    outDir: 'dmy_dist', //  打包构建输出路径，默认 dmy_dist ，如果路径存在，构建之前会被删除
    rollupOptions: {
      output: {
        /** S-静态文件按类型分包 */
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        /** E-静态文件按类型分包 */
        manualChunks(id) {  // 超大静态资源拆分
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
    terserOptions: {
      //打包后移除console和注释
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    sourcemap: false, // 打包后是否生成 source map 文件
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['last 2 versions', 'ie >= 11'], // 浏览器兼容性配置
          grid: true // 是否使用 grid 布局
        })
      ]
    },
    devSourcemap: false, // 开发环境下是否开启css sourcemap，默认false
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/global.scss" as *;
          @use "@/styles/color.scss" as *;
          @use "sass:math";
          @use "sass:color";
          @use "sass:list";
        `,
        api: 'modern-compiler', // or 'modern'
        charset: false
      }
    }
  },
})

