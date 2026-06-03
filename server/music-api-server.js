// NeteaseCloudMusicApi 独立服务，端口 3100
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serveNcmApi } = require('NeteaseCloudMusicApi');

serveNcmApi({ port: 3100 }).then(() => {
  console.log('网易云音乐 API 已启动: http://localhost:3100');
});