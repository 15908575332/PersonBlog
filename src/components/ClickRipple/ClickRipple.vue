<template>
  <!-- 定义一个 canvas 元素，通过 ref 绑定到 mineCanvas，方便在 JavaScript 中操作该元素 -->
  <canvas ref="mineCanvas" id="mineCanvas"></canvas>
</template>

<script setup>
// 从 vue 中导入 ref 和 onMounted 函数
// ref 用于创建响应式数据，onMounted 是生命周期钩子，在组件挂载完成后执行
import { ref, onMounted } from "vue";
import { debounce } from "@/utils/debounce.ts"; // 导入防抖函数

import { rippleStore } from "@/store/isEnabledRipple"; // 动画显示与否

// 用于引用 canvas 元素，初始值为 null
const mineCanvas = ref(null);
// 用于引用 canvas 的 2D 绘图上下文，初始值为 null
const ctx = ref(null);
// 定义生成球的数量
const count = 20;
// 定义内部半径，用于球的初始分布范围
const innerRadius = 30;
// 定义外部半径，用于圆圈动画的目标半径
const outterRadius = 120;
// 定义更大的外部半径，用于球的最终位置计算
const moreOutterRadius = 200;
// 定义缓动系数，控制动画的速度
const easing = 0.05;

// 定义球的颜色数组，随机选择颜色用于球的绘制
const mcolor = [
  "#f4433699",
  "#ffeb3b99",
  "#03a9f499",
  "#FF003399",
  "#33009999",
  "#ff95bc99",
];
const circleColor = "#00000099"; // 线圈初始颜色
const rippleColor = "0, 0, 0"; // 涟漪效果颜色（RGBA基础值）
/**
 * 窗口变化时重置 canvas 大小
 */
const resize = () => {
  // 检查 mineCanvas 是否已经有实际的 DOM 元素
  if (mineCanvas.value) {
    // 将 canvas 的宽度设置为窗口的内部宽度
    mineCanvas.value.width = window.innerWidth;
    // 将 canvas 的高度设置为窗口的内部高度
    mineCanvas.value.height = window.innerHeight;
  }
};

/**
 * 生成指定数量的球
 * @param {number} num - 要生成的球的数量
 * @param {number} mouseX - 鼠标点击位置的 x 坐标
 * @param {number} mouseY - 鼠标点击位置的 y 坐标
 * @returns {Array} - 包含生成的球对象的数组
 */

const getEnoughBall = (num, mouseX, mouseY) => {
  // 初始化一个空数组，用于存储生成的球对象
  const balls = [];
  // 循环生成指定数量的球
  for (let i = 0; i < num; i++) {
    // 创建一个新的球对象，随机设置半径和颜色
    const ball = new Ball(
      0,
      0,
      Math.random() * (40 - 5 + 1) + 5,
      mcolor[Math.floor(Math.random() * 6)]
    );
    // 随机设置球的初始 x 坐标，范围在鼠标点击位置的内部半径内
    ball.x = mouseX + Math.random() * innerRadius - Math.random() * innerRadius;
    // 随机设置球的初始 y 坐标，范围在鼠标点击位置的内部半径内
    ball.y = mouseY + Math.random() * innerRadius - Math.random() * innerRadius;

    // 计算球的最终位置

    // 计算鼠标点击位置与球的 x 坐标差值
    const x = mouseX - ball.x;
    // 计算鼠标点击位置与球的 y 坐标差值
    const y = mouseY - ball.y;
    // 计算 x 与 y 的比例的绝对值
    const scale = Math.abs(x / y);
    // 计算球的最终 x 坐标
    ball.dx =
      (((x < 0 ? 1 : -1) * moreOutterRadius) / Math.sqrt(scale * scale + 1)) *
        Math.random() *
        scale +
      mouseX;
    // 计算球的最终 y 坐标
    ball.dy =
      (((y < 0 ? 1 : -1) * moreOutterRadius) / Math.sqrt(scale * scale + 1)) *
        Math.random() +
      mouseY;

    // 将生成的球对象添加到数组中
    balls.push(ball);
  }
  return balls;
};

/**
 * 球类，用于创建球对象并绘制球
 */
class Ball {
  /**
   * 构造函数，初始化球的属性
   * @param {number} x - 球的初始 x 坐标
   * @param {number} y - 球的初始 y 坐标
   * @param {number} radius - 球的半径
   * @param {string} color - 球的颜色
   */
  constructor(x, y, radius, color) {
    // 初始化球的 x 坐标，默认为 0
    this.x = x || 0;
    // 初始化球的 y 坐标，默认为 0
    this.y = y || 0;
    // 初始化球在 x 方向的速度，默认为 0
    this.vx = 0;
    // 初始化球在 y 方向的速度，默认为 0
    this.vy = 0;
    // 初始化球在 x 方向的缩放比例，默认为 1
    this.sx = 1;
    // 初始化球在 y 方向的缩放比例，默认为 1
    this.sy = 1;
    // 初始化球的半径，默认为 10
    this.radius = radius || 10;
    // 初始化球的颜色，默认为黑色
    this.color = color || "black";
  }

  /**
   * 绘制球的方法
   * @param {string} type - 绘制类型，可选值为 'fill'（填充） 或 'stroke'（描边）
   */
  draw(type) {
    // 检查传入的绘制类型是否合法
    if (["fill", "stroke"].indexOf(type) === -1) {
      // 若不合法，抛出错误提示
      throw new Error("ball.draw need a right type");
    }
    // 保存当前绘图状态
    ctx.value.save();
    // 将绘图原点移动到球的位置
    ctx.value.translate(this.x, this.y);
    // 对球进行缩放
    ctx.value.scale(this.sx, this.sy);
    // 设置填充颜色
    ctx.value.fillStyle = this.color;
    // 设置描边颜色
    ctx.value.strokeStyle = this.color;
    // 开始绘制路径
    ctx.value.beginPath();
    // 绘制一个圆形
    ctx.value.arc(0, 0, this.radius, 0, (360 * Math.PI) / 180);
    // 关闭路径
    ctx.value.closePath();
    // 根据绘制类型选择填充或描边
    type === "fill" ? ctx.value.fill() : ctx.value.stroke();
    // 恢复之前保存的绘图状态
    ctx.value.restore();
  }
}

/**
 * 鼠标类，用于获取鼠标在 canvas 上的点击位置
 */
class Mouse {
  /**
   * 构造函数，初始化鼠标的 x 和 y 坐标为 0
   */
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  /**
   * 获取鼠标在 canvas 上的点击位置
   * @param {HTMLCanvasElement} cnv - canvas 元素
   */
  getMousePosition(cnv) {
    // 为 canvas 添加鼠标按下事件监听器
    cnv.addEventListener(
      "mousedown",
      (e) => {
        // 计算鼠标在 canvas 上的 x 坐标
        this.x = e.clientX - cnv.offsetLeft;
        // 计算鼠标在 canvas 上的 y 坐标
        this.y = e.clientY - cnv.offsetTop;
      },
      false
    );
  }
}

// 组件挂载完成后执行的钩子函数
onMounted(() => {
  // 检查 mineCanvas 是否已经有实际的 DOM 元素
  if (mineCanvas.value) {
    // 获取 canvas 的 2D 绘图上下文
    ctx.value = mineCanvas.value.getContext("2d");
    // 为窗口添加大小变化事件监听器，当窗口大小改变时调用 resize 函数
    window.onresize = resize;
    // 调用 resize 函数，初始化 canvas 大小
    resize();

    const handClick = debounce((e) => {
      if (!rippleStore.enabled) return; // 如果 rippleStore 为 false，则不执行动画，直接返回
      // 判断点击的是否是链接
      const target = e.target.closest("a");
      // 如果是链接，阻止默认行为
      if (target) e.preventDefault();
      // 调用 getEnoughBall 函数，生成指定数量的球
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const balls = getEnoughBall(count, mouseX, mouseY);
      const circle = new Ball(mouseX, mouseY, innerRadius, circleColor);
      // 初始化圆圈的透明度为 0.6
      let opacticy = 0.9;

      /**
       * 动画循环函数，用于实现球和圆圈的动画效果
       */
      const animation = () => {
        // 请求浏览器在下一次重绘之前调用该函数，实现动画循环
        requestAnimationFrame(animation);
        // 清除 canvas 上的内容，为下一帧绘制做准备
        ctx.value.clearRect(
          0,
          0,
          mineCanvas.value.width,
          mineCanvas.value.height
        );

        // 遍历所有球对象
        balls.forEach((item) => {
          // 绘制球，使用填充模式
          item.draw("fill");
          // 缓动动画，计算球在 x 方向的速度
          item.vx = (item.dx - item.x) * easing;
          // 缓动动画，计算球在 y 方向的速度
          item.vy = (item.dy - item.y) * easing;
          // 更新球的 x 坐标
          item.x += item.vx;
          // 更新球的 y 坐标
          item.y += item.vy;
          // 更新球在 x 方向的缩放比例，实现缩放动画
          item.sx += -item.sx * easing;
          // 更新球在 y 方向的缩放比例，实现缩放动画
          item.sy += -item.sy * easing;
        });

        // 绘制圆圈，使用描边模式
        circle.draw("stroke");
        // 缓动动画，更新圆圈的半径，使其逐渐变大到 outterRadius
        circle.radius += (outterRadius - circle.radius) * easing;
        // 逐渐降低圆圈的透明度
        opacticy = opacticy - 0.6 * easing;

        // 更新圆圈的颜色，根据透明度生成 rgba 颜色值
        circle.color = `rgba(${rippleColor}, ${opacticy})`;

        //判断动画执行完毕后跳转链接
        if (opacticy <= 0) {
          cancelAnimationFrame(animation);
          if (target) window.location.href = target.href;
        }
      };
      // 启动动画循环
      animation();
    }, 50);
    //监听全局点击事件
    document.addEventListener("click", handClick);
  }
});
</script>
<style scoped lang="scss">
#mineCanvas {
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  /* 确保在最顶层 */
  pointer-events: none;
  /* 关键：允许事件穿透 */
}
</style>
