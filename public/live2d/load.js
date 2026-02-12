
// 切换夜间模式
function toggleNightMode() {
  window.toggleTheme('dark'); //APP.vue全局暴露的主题切换方法
}

const initConfig = {
  mode: 'fixed',
  hidden: true,
  content: {
    welcome: ['Hi!'],
    touch: '',
    skin: ['诶，想看看其他团员吗？', '替换后入场文本'],
    custom: [
      { selector: '.comment-form', text: 'Content Tooltip' },
      { selector: '.home-social a:last-child', text: 'BLOG Tooltip' },
      { selector: '.read, .kbn-read', type: 'read' },
      { selector: 'a, .link, .kbn-link', type: 'link' },
      { selector: '.kbn-chart', type: 'chart' },
      { selector: '.kbn-music', type: 'music' },
      { selector: '.kbn-album', type: 'album' },
      { selector: '.kbn-look', type: 'look' },
      { selector: '.kbn-custom', type: 'custom' }
    ],
    homeLink: 'https://192.168.236.102:8008/', // 首页链接
    homePort: '' // 首页domain端口号
  },
  night: 'toggleNightMode()',
  model: ['/live2d/biaoqiang/biaoqiang.model3.json', '/live2d/z23/z23.model3.json'],
  tips: true,
};

function 加载圣·嘉然() {
  pio_instance = new Paul_Pio(initConfig);

  pio_alignment = 'left';

  // Then apply style
  pio_refresh_style();
}
// 加载圣·嘉然实例
var pio_instance;
window.onload = 加载圣·嘉然;
