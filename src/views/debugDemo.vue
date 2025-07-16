<template>
  <canvas id="canvas" ref="canvasRef"></canvas>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";

const canvasRef = ref(null);
let canvas, ctx;
let resizeHandler;
let animationId;

onMounted(() => {
  canvas = canvasRef.value;
  ctx = canvas.getContext("2d");
  // 设置canvas尺寸和背景色，背景色可在此处调整
  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    center = { x: canvas.width / 2, y: canvas.height / 2 };
  }
  setCanvasSize();
  resizeHandler = () => setCanvasSize();
  window.addEventListener("resize", resizeHandler);

  // 初始化参数
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // 烟花相关对象数组
  var listFire = []; // 发射上升的火箭
  var listFirework = []; // 爆炸后的烟花粒子
  var listText = []; // 文字粒子
  var listSpecial = []; // 特殊效果粒子
  var listSpark = []; // 火花链
  var lights = []; // 光晕效果
  var fireNumber = 10; // 同时存在的火箭数量（烟花数量，影响整体密度）
  var center = { x: canvas.width / 2, y: canvas.height / 2 };
  var range = 150; // 控制烟花发射/爆炸的范围
  var fired = 0;
  var onHold = 0;
  var supprise = false;
  var textIndex = 0;
  var actions = [
    makeDoubleFullCircleFirework,
    makePlanetCircleFirework,
    makeFullCircleFirework,
    makeDoubleCircleFirework,
    makeHeartFirework,
    makeCircleFirework,
    makeRandomFirework,
  ];
  // 生成初始火箭（烟花发射体）
  for (var i = 0; i < fireNumber; i++) {
    var fire = {
      x: (Math.random() * range) / 2 - range / 4 + center.x, // 起始x
      y: Math.random() * range * 2.5 + canvas.height, // 起始y
      size: Math.random() + 0.5, // 火箭/粒子大小
      fill: randColor(), // 颜色（可自定义）
      vx: Math.random() - 0.5, // x方向速度（影响发射角度）
      vy: -(Math.random() + 4), // y方向速度（影响发射速度/高度）
      ax: Math.random() * 0.06 - 0.03, // x方向加速度
      delay: Math.round(Math.random() * range) + range * 4, // 延迟爆炸
      hold: false,
      alpha: 1,
      far: Math.random() * range + (center.y - range), // 爆炸高度
    };
    fire.base = {
      x: fire.x,
      y: fire.y,
      vx: fire.vx,
      vy: fire.vy,
    };
    listFire.push(fire);
    playLaunchSound();
  }
  // define array of sound
  // 音效数组（如需可自定义）
  // var listExpSound = Array.from(document.querySelectorAll("audio.exp"));
  var listLaunchSound = Array.from(document.querySelectorAll("audio.launch"));

  // define array position of text
  // 文字粒子相关
  var textString = "happylunarnewyear2025"; // 显示的文字内容
  var textMatrix = [
    4.5, 0, 5.5, 0, 6.5, 0, 7.5, 0, 8.5, 0, 0, 1, 1, 1, 2, 1, 3, 1, 4, 1, 6, 1,
    7, 1, 8, 1, 10, 1, 11, 1, 12, 1, 13, 1, 5, 2, 6, 2, 7, 2, 8, 2,
  ];
  var chars = {
    h: [
      0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 1, 3, 2, 3, 3, 3, 4, 3, 5,
      0, 5, 1, 5, 2, 5, 3, 5, 4, 5, 5, 5, 6, 5, 7,
    ],
    a: [
      2, 0, 2, 1, 2, 2, 1, 2, 1, 3, 1, 4, 1, 5, 0, 5, 0, 6, 0, 7, 2, 5, 3, 0, 3,
      1, 3, 2, 4, 2, 4, 3, 4, 4, 4, 1, 5, 5, 5, 6, 5, 7, 3, 5,
    ],
    p: [
      0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 1, 0, 2, 0, 3, 0, 4, 1, 5,
      2, 4, 3, 3, 4, 2, 4, 1, 4,
    ],
    y: [
      0, 0, 0, 1, 1, 1, 1, 2, 1, 3, 2, 3, 2, 4, 2, 5, 2, 6, 2, 7, 3, 2, 3, 3, 4,
      1, 4, 2, 5, 0, 5, 1,
    ],
    l: [
      0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 1, 7, 2, 7, 3, 7, 4, 7, 5,
      7,
    ],
    u: [
      0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 1, 7, 2, 7, 3, 7, 4, 7, 5, 0, 5,
      1, 5, 2, 5, 3, 5, 4, 5, 5, 5, 6,
    ],
    n: [
      0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 1, 1, 1, 2, 2, 2, 2, 3, 2,
      4, 3, 4, 3, 5, 4, 5, 4, 6, 5, 0, 5, 1, 5, 2, 5, 3, 5, 4, 5, 5, 5, 6, 5, 7,
    ],
    e: [
      0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 1, 0, 2, 0, 3, 0, 4, 0, 5,
      0, 1, 3, 2, 3, 3, 3, 4, 3, 1, 7, 2, 7, 3, 7, 4, 7, 5, 7,
    ],
    w: [
      0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 1, 6, 2, 1, 2, 2, 2, 3, 2, 4, 2, 5, 2,
      6, 2, 7, 3, 7, 5, 0, 5, 1, 5, 2, 5, 3, 5, 4, 5, 5, 4, 5, 4, 6,
    ],
    r: [
      0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 1, 0, 2, 0, 3, 0, 4, 1, 5,
      2, 4, 3, 3, 4, 2, 4, 1, 4, 1, 5, 2, 5, 3, 6, 4, 6, 5, 7,
    ],
    2: [
      0, 1, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 5, 1, 5, 2, 5, 3, 4, 3, 3, 3, 2,
      3, 2, 4, 1, 4, 1, 5, 0, 5, 0, 6, 0, 7, 1, 7, 2, 7, 3, 7, 4, 7, 5, 7, 5, 6,
    ],
    0: [
      0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 1, 0, 2, 0, 3, 0, 4, 0, 1, 7, 2, 7, 3,
      7, 4, 7, 5, 1, 5, 2, 5, 3, 5, 4, 5, 5, 5, 6,
    ],
    1: [
      1, 2, 2, 2, 2, 1, 3, 1, 3, 0, 4, 0, 4, 1, 4, 2, 4, 3, 4, 4, 4, 5, 4, 6, 4,
      7, 1, 7, 2, 7, 3, 7, 5, 7,
    ],
    7: [
      0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 5, 1, 5, 2, 5, 3, 4, 3, 4, 4, 3, 4, 3,
      5, 3, 6, 3, 7,
    ],
  };

  function initText() {
    var i = textIndex;
    var velocity = Math.random() * 0.25 + 1;
    var shift = { x: -(Math.random() + 2), y: -(Math.random() + 3) };
    var char = chars[textString[i]];
    var width = 80;
    var half = 6.5 * width;
    var left = textMatrix[i * 2] * width - half;
    var top = textMatrix[i * 2 + 1] * range * 1.2 - range * 2.4;
    for (var j = 0; j < fireNumber * char.length * 0.25; j++) {
      var rand = Math.floor(Math.random() * char.length * 0.5);
      var x = char[rand * 2] + shift.x;
      var y = char[rand * 2 + 1] + shift.y;
      var text = {
        x: center.x + left * 0.9,
        y: center.y + top,
        left: center.x + left,
        size: Math.random() + 0.5,
        fill: "#ff3",
        vx: x * (velocity + (Math.random() - 0.5) * 0.5),
        vy: y * (velocity + (Math.random() - 0.5) * 0.5),
        ay: 0.08,
        alpha: 1,
        life: Math.round((Math.random() * range) / 2) + range / 1.5,
      };
      text.base = {
        life: text.life,
        size: text.size,
      };
      text.direct = (text.left - text.x) * 0.08;
      listText.push(text);
    }
    // play sound
    // playExpSound();
    //
    lights.push({
      x: center.x + left * 0.9,
      y: center.y + top,
      color: text.fill,
      radius: range * 2,
      if(++textIndex < textString.length) {
      setTimeout(initText, 30);
    } else {
      textIndex = 0;
    }
  });

function initSpark() {
  var x = Math.random() * range * 3 - range * 1.5 + center.x;
  var vx = Math.random() - 0.5;
  var vy = -(Math.random() + 4);
  var ax = Math.random() * 0.04 - 0.02;
  var far = Math.random() * range * 4 - range + center.y;
  var direct = ax * 10 * Math.PI;
  var max = fireNumber * 0.5;
  for (var i = 0; i < max; i++) {
    var special = {
      x: x,
      y: Math.random() * range * 0.25 + canvas.height,
      size: Math.random() + 2,
      fill: "#ff3",
      vx: vx,
      vy: vy,
      ax: ax,
      direct: direct,
      alpha: 1,
    };
    special.far = far - (special.y - canvas.height);
    listSpecial.push(special);
    // play sound
    playLaunchSound();
  }
}

// 随机生成烟花颜色（根据背景自动适配：白色背景时生成深色，深色背景时生成亮色）
function randColor() {
  // 获取当前背景色
  let bg = ctx.fillStyle;
  // 简单判断是否为白色背景
  let isWhite = false;
  if (typeof bg === "string") {
    isWhite =
      bg === "#fff" || bg === "#ffffff" || bg.toLowerCase() === "white";
  }
  // 白色背景时生成深色烟花，否则生成亮色烟花
  if (isWhite) {
    // 深色系：r/g/b均在0~100
    var r = Math.floor(Math.random() * 100);
    var g = Math.floor(Math.random() * 100);
    var b = Math.floor(Math.random() * 100);
  } else {
    // 亮色系：r/g/b均在150~255
    var r = Math.floor(Math.random() * 105) + 150;
    var g = Math.floor(Math.random() * 105) + 150;
    var b = Math.floor(Math.random() * 105) + 150;
  }
  return `rgb(${r},${g},${b})`;
}

// function playExpSound() {
//   var sound = listExpSound[Math.floor(Math.random() * listExpSound.length)];
//   sound.volume = Math.random() * 0.4 + 0.1;
//   sound.play();
// }

function playLaunchSound() {
  setTimeout(function () {
    var sound =
      listLaunchSound[Math.floor(Math.random() * listLaunchSound.length)];
    // sound.volume = 0.05;
    // sound.play();
  }, 200);
}

// 生成圆形烟花爆炸效果
function makeCircleFirework(fire) {
  var color = randColor(); // 爆炸颜色
  var velocity = Math.random() * 2 + 6; // 爆炸速度（影响扩散速度）
  var max = fireNumber * 5; // 粒子数量（影响烟花密度）
  for (var i = 0; i < max; i++) {
    var rad = (i * Math.PI * 2) / max;
    var firework = {
      x: fire.x,
      y: fire.y,
      size: Math.random() + 1.5,
      fill: color,
      vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
      vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
      ay: 0.04,
      alpha: 1,
      life: Math.round((Math.random() * range) / 2) + range / 2,
    };
    firework.base = {
      life: firework.life,
      size: firework.size,
    };
    listFirework.push(firework);
  }
  return color;
}

function makeDoubleCircleFirework(fire) {
  var color = randColor();
  var velocity = Math.random() * 2 + 8;
  var max = fireNumber * 3;
  for (var i = 0; i < max; i++) {
    var rad = (i * Math.PI * 2) / max;
    var firework = {
      x: fire.x,
      y: fire.y,
      size: Math.random() + 1.5,
      fill: color,
      vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
      vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
      ay: 0.04,
      alpha: 1,
      life: Math.round((Math.random() * range) / 2) + range / 1.5,
    };
    firework.base = {
      life: firework.life,
      size: firework.size,
    };
    listFirework.push(firework);
  }
  color = randColor();
  velocity = Math.random() * 3 + 4;
  for (var i = 0; i < max; i++) {
    var rad = (i * Math.PI * 2) / max;
    var firework = {
      x: fire.x,
      y: fire.y,
      size: Math.random() + 1.5,
      fill: color,
      vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
      vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
      ay: 0.04,
      alpha: 1,
      life: Math.round((Math.random() * range) / 2) + range / 1.5,
    };
    firework.base = {
      life: firework.life,
      size: firework.size,
    };
    listFirework.push(firework);
  }
  return color;
}

function makePlanetCircleFirework(fire) {
  var color = "#aa0609";
  var velocity = Math.random() * 2 + 4;
  var max = fireNumber * 2;
  for (var i = 0; i < max; i++) {
    var rad = (i * Math.PI * 2) / max;
    var firework = {
      x: fire.x,
      y: fire.y,
      size: Math.random() + 1.5,
      fill: color,
      vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
      vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
      ay: 0.04,
      alpha: 1,
      life: Math.round((Math.random() * range) / 2) + range / 1.5,
    };
    firework.base = {
      life: firework.life,
      size: firework.size,
    };
    listFirework.push(firework);
  }
  max = fireNumber * 4;
  for (var i = 0; i < max; i++) {
    var rad = (i * Math.PI * 2) / max;
    var firework = {
      x: fire.x,
      y: fire.y,
      size: Math.random() + 1.5,
      fill: color,
      vx: Math.cos(rad) * velocity * Math.random(),
      vy: Math.sin(rad) * velocity * Math.random(),
      ay: 0.04,
      alpha: 1,
      life: Math.round((Math.random() * range) / 2) + range / 1.5,
    };
    firework.base = {
      life: firework.life,
      size: firework.size,
    };
    listFirework.push(firework);
  }
  max = fireNumber * 3;
  color = "#ff9";
  var rotate = Math.random() * Math.PI * 2;
  var vx = velocity * (Math.random() + 2);
  var vy = velocity * 0.6;
  for (var i = 0; i < max; i++) {
    var rad = (i * Math.PI * 2) / max;
    // calc x, y for ellipse
    var cx = Math.cos(rad) * vx + (Math.random() - 0.5) * 0.5;
    var cy = Math.sin(rad) * vy + (Math.random() - 0.5) * 0.5;
    var firework = {
      x: fire.x,
      y: fire.y,
      size: Math.random() + 1.5,
      fill: color,
      vx: cx * Math.cos(rotate) - cy * Math.sin(rotate), // rotate x ellipse
      vy: cx * Math.sin(rotate) + cy * Math.cos(rotate), // rotate y ellipse
      ay: 0.02,
      alpha: 1,
      life: Math.round((Math.random() * range) / 2) + range / 1.5,
    };
    firework.base = {
      life: firework.life,
      size: firework.size,
    };
    listFirework.push(firework);
  }
  return "#aa0609";
}

function makeFullCircleFirework(fire) {
  var color = randColor();
  var velocity = Math.random() * 8 + 8;
  var max = fireNumber * 3;
  for (var i = 0; i < max; i++) {
    var rad = (i * Math.PI * 2) / max;
    var firework = {
      x: fire.x,
      y: fire.y,
      size: Math.random() + 1.5,
      fill: color,
      vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
      vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
      ay: 0.06,
      alpha: 1,
      life: Math.round((Math.random() * range) / 2) + range / 1.5,
    };
    firework.base = {
      life: firework.life,
      size: firework.size,
    };
    listFirework.push(firework);
  }
  max = fireNumber * Math.round(Math.random() * 4 + 4);
  for (var i = 0; i < max; i++) {
    var rad = (i * Math.PI * 2) / max;
    var firework = {
      x: fire.x,
      y: fire.y,
      size: Math.random() + 1.5,
      fill: color,
      vx: Math.cos(rad) * velocity * Math.random(),
      vy: Math.sin(rad) * velocity * Math.random(),
      ay: 0.06,
      alpha: 1,
      life: Math.round((Math.random() * range) / 2) + range / 1.5,
    };
    firework.base = {
      life: firework.life,
      size: firework.size,
    };
    listFirework.push(firework);
  }
  return color;
}

function makeDoubleFullCircleFirework(fire) {
  var color = randColor();
  var velocity = Math.random() * 8 + 8;
  var max = fireNumber * 3;
  for (var i = 0; i < max; i++) {
    var rad = (i * Math.PI * 2) / max;
    var firework = {
      x: fire.x,
      y: fire.y,
      size: Math.random() + 1.5,
      fill: color,
      vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
      vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
      ay: 0.04,
      alpha: 1,
      life: Math.round((Math.random() * range) / 2) + range / 1.5,
    };
    firework.base = {
      life: firework.life,
      size: firework.size,
    };
    listFirework.push(firework);
  }
  color = randColor();
  velocity = Math.random() * 3 + 4;
  max = fireNumber * 2;
  for (var i = 0; i < max; i++) {
    var rad = (i * Math.PI * 2) / max;
    var firework = {
      x: fire.x,
      y: fire.y,
      size: Math.random() + 1.5,
      fill: color,
      vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
      vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
      ay: 0.06,
      alpha: 1,
      life: Math.round((Math.random() * range) / 2) + range / 1.5,
    };
    firework.base = {
      life: firework.life,
      size: firework.size,
    };
    listFirework.push(firework);
  }
  max = fireNumber * 4;
  for (var i = 0; i < max; i++) {
    var rad = (i * Math.PI * 2) / max;
    var firework = {
      x: fire.x,
      y: fire.y,
      size: Math.random() + 1.5,
      fill: color,
      vx: Math.cos(rad) * velocity * Math.random(),
      vy: Math.sin(rad) * velocity * Math.random(),
      ay: 0.06,
      alpha: 1,
      life: Math.round((Math.random() * range) / 2) + range / 1.5,
    };
    firework.base = {
      life: firework.life,
      size: firework.size,
    };
    listFirework.push(firework);
  }
  return color;
}

function makeHeartFirework(fire) {
  var color = randColor();
  var velocity = Math.random() * 3 + 3;
  var max = fireNumber * 5;
  var rotate = Math.random() * Math.PI * 2;
  for (var i = 0; i < max; i++) {
    var rad = (i * Math.PI * 2) / max + rotate;
    var v, p;
    if (rad - rotate < Math.PI * 0.5) {
      p = (rad - rotate) / (Math.PI * 0.5);
      v = velocity + velocity * p;
    } else if (rad - rotate > Math.PI * 0.5 && rad - rotate < Math.PI) {
      p = (rad - rotate - Math.PI * 0.5) / (Math.PI * 0.5);
      v = velocity * (2 - p);
    } else if (rad - rotate > Math.PI && rad - rotate < Math.PI * 1.5) {
      p = (rad - rotate - Math.PI) / (Math.PI * 0.5);
      v = velocity * (1 - p);
    } else if (rad - rotate > Math.PI * 1.5 && rad - rotate < Math.PI * 2) {
      p = (rad - rotate - Math.PI * 1.5) / (Math.PI * 0.5);
      v = velocity * p;
    } else {
      var color = randColor();
      var velocity = Math.random() * 3 + 3;
      var max = fireNumber * 5;
      var rotate = Math.random() * Math.PI * 2;
      for (var i = 0; i < max; i++) {
        var rad = (i * Math.PI * 2) / max + rotate;
        var v, p;
        if (rad - rotate < Math.PI * 0.5) {
          p = (rad - rotate) / (Math.PI * 0.5);
          v = velocity + velocity * p;
        } else if (rad - rotate > Math.PI * 0.5 && rad - rotate < Math.PI) {
          p = (rad - rotate - Math.PI * 0.5) / (Math.PI * 0.5);
          v = velocity * (2 - p);
        } else if (rad - rotate > Math.PI && rad - rotate < Math.PI * 1.5) {
          p = (rad - rotate - Math.PI) / (Math.PI * 0.5);
          v = velocity * (1 - p);
        } else if (rad - rotate > Math.PI * 1.5 && rad - rotate < Math.PI * 2) {
          p = (rad - rotate - Math.PI * 1.5) / (Math.PI * 0.5);
          v = velocity * p;
        } else {
          v = velocity;
        }
        v = v + (Math.random() - 0.5) * 0.25;
        var firework = {
          x: fire.x,
          y: fire.y,
          size: Math.random() + 1.5,
          fill: color,
          vx: Math.cos(rad) * v,
          vy: Math.sin(rad) * v,
          ay: 0.02,
          alpha: 1,
          life: Math.round((Math.random() * range) / 2) + range / 1.5,
        };
        firework.base = {
          life: firework.life,
          size: firework.size,
        };
        listFirework.push(firework);
      }
      v = velocity;
    }
    v = v + (Math.random() - 0.5) * 0.25;
    var firework = {
      x: fire.x,
      y: fire.y,
      size: Math.random() + 1.5,
      fill: color,
      vx: Math.cos(rad) * v,
      vy: Math.sin(rad) * v,
      ay: 0.02,
      alpha: 1,
      life: Math.round((Math.random() * range) / 2) + range / 1.5,
    };
    firework.base = {
      life: firework.life,
      size: firework.size,
    };
    listFirework.push(firework);
  }
  return color;
}

function makeRandomFirework(fire) {
  var color = randColor();
  for (var i = 0; i < fireNumber * 5; i++) {
    var firework = {
      x: fire.x,
      y: fire.y,
      size: Math.random() + 1.5,
      fill: color,
      vx: Math.random() * 15 - 7.5,
      vy: Math.random() * -15 + 5,
      ay: 0.05,
      alpha: 1,
      life: Math.round((Math.random() * range) / 2) + range / 2,
    };
    firework.base = {
      life: firework.life,
      size: firework.size,
      return color;
    }

    function makeRandomFirework(fire) {
      var color = randColor();
      for (var i = 0; i < fireNumber * 5; i++) {
        var firework = {
          x: fire.x,
          y: fire.y,
          size: Math.random() + 1.5,
          fill: color,
          vx: Math.random() * 15 - 7.5,
          vy: Math.random() * -15 + 5,
          ay: 0.05,
          alpha: 1,
          life: Math.round((Math.random() * range) / 2) + range / 2,
        };
        firework.base = {
          life: firework.life,
          size: firework.size,
        };
        listFirework.push(firework);
      }
      return color;
    }

    function makeSpark(special) {
      var color = special.fill;
      var velocity = Math.random() * 6 + 12;
      var max = fireNumber;
      for (var i = 0; i < max; i++) {
        var rad =
          Math.random() * Math.PI * 0.3 +
          Math.PI * 0.35 +
          Math.PI +
          special.direct;
        var spark = {
          x: special.x,
          y: special.y,
          size: Math.random() + 1,
        };
        listFirework.push(firework);
      }
      return color;
    }

    function makeSpark(special) {
      var color = special.fill;
      var velocity = Math.random() * 6 + 12;
      var max = fireNumber;
      for (var i = 0; i < max; i++) {
        var rad =
          Math.random() * Math.PI * 0.3 +
          Math.PI * 0.35 +
          Math.PI +
          special.direct;
        var spark = {
          x: special.x,
          y: special.y,
          size: Math.random() + 1,
          fill: color,
          vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
          vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
          ay: 0.02,
          alpha: 1,
          rad: rad,
          direct: special.direct,
          chain: Math.round(Math.random() * 2) + 2,
          life: Math.round((Math.random() * range) / 2) + range / 2,
        };
        spark.base = {
          life: spark.life,
          velocity: velocity,
        };
        listSpark.push(spark);
      }
      return color;
    }

    function chainSpark(parentSpark) {
      fill: color,
        vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
          vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
            ay: 0.02,
              alpha: 1,
                rad: rad,
                  direct: special.direct,
                    chain: Math.round(Math.random() * 2) + 2,
                      life: Math.round((Math.random() * range) / 2) + range / 2,
      };
    spark.base = {
      life: spark.life,
      velocity: velocity,
    };
    listSpark.push(spark);
  }
  return color;
}

function chainSpark(parentSpark) {
  var color = parentSpark.fill;
  if (parentSpark.chain > 0) {
    var velocity = parentSpark.base.velocity * 0.6;
    var max = Math.round(Math.random() * 5);
    for (var i = 0; i < max; i++) {
      var rad =
        Math.random() * Math.PI * 0.3 -
        Math.PI * 0.15 +
        parentSpark.rad +
        parentSpark.direct;
      var spark = {
        x: parentSpark.x,
        y: parentSpark.y,
        size: parentSpark.size * 0.6,
        fill: color,
        vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
        vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
        ay: 0.02,
        alpha: 1,
        rad: rad,
        var color = parentSpark.fill;
        if(parentSpark.chain > 0) {
          var velocity = parentSpark.base.velocity * 0.6;
      var max = Math.round(Math.random() * 5);
      for (var i = 0; i < max; i++) {
        var rad =
          Math.random() * Math.PI * 0.3 -
          Math.PI * 0.15 +
          parentSpark.rad +
          parentSpark.direct;
        var spark = {
          x: parentSpark.x,
          y: parentSpark.y,
          size: parentSpark.size * 0.6,
          fill: color,
          vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
          vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
          ay: 0.02,
          alpha: 1,
          rad: rad,
          direct: parentSpark.direct,
          chain: parentSpark.chain,
          life: parentSpark.base.life * 0.8,
        };
        spark.base = {
          life: spark.life,
          size: spark.size,
          velocity: velocity,
        };
        listSpark.push(spark);
      }

      if (Math.random() > 0.9 && parentSpark.chain > 1) {
        // play sound
        // playExpSound();
      }
    }
    return color;
  }

  direct: parentSpark.direct,
    chain: parentSpark.chain,
      life: parentSpark.base.life * 0.8,
        };
spark.base = {
  life: spark.life,
  size: spark.size,
  velocity: velocity,
};
listSpark.push(spark);
      }

if (Math.random() > 0.9 && parentSpark.chain > 1) {
  // play sound
  // playExpSound();
}
    }
return color;
  }

function loop() {
  animationId = requestAnimationFrame(loop);
  update();
  draw();
}
loop();

function update() {
  // update fire logic
  for (var i = 0; i < listFire.length; i++) {
    var fire = listFire[i];
    //
    if (fire.y <= fire.far) {
      // play sound
      // playExpSound();
      // case add firework
      fired++;
      var color = actions[Math.floor(Math.random() * actions.length)](fire);
      // light
      lights.push({ x: fire.x, y: fire.y, color: color, radius: range * 2 });
      // reset
      fire.y = fire.base.y;
      fire.x = fire.base.x;
      // special
      if (fired % 33 == 0) {
        initSpark();
      }
      // on hold
      supprise = fired % 100 == 0 ? true : supprise;
      if (supprise) {
        fire.vx = 0;
        fire.vy = 0;
        fire.ax = 0;
        fire.hold = true;
        onHold++;
      } else {
        fire.vx = fire.base.vx;
        fire.vy = fire.base.vy;
        fire.ax = Math.random() * 0.06 - 0.03;
        // play sound
        playLaunchSound();
      }
    }
    //
    if (fire.hold && fire.delay <= 0) {
      onHold--;
      fire.hold = false;
      fire.delay = Math.round(Math.random() * range) + range * 4;
      fire.vx = fire.base.vx;
      fire.vy = fire.base.vy;
      fire.ax = Math.random() * 0.06 - 0.03;
      fire.alpha = 1;
      // play sound
      playLaunchSound();
    } else if (fire.hold && fire.delay > 0) {
      fire.delay--;
    } else {
      fire.x += fire.vx;
      fire.y += fire.vy;
      fire.vx += fire.ax;
      fire.alpha = (fire.y - fire.far) / fire.far;
    }
  }

  // update firework logic
  for (var i = listFirework.length - 1; i >= 0; i--) {
    var firework = listFirework[i];
    if (firework) {
      firework.vx *= 0.9;
      firework.vy *= 0.9;
      firework.x += firework.vx;
      firework.y += firework.vy;
      firework.vy += firework.ay;
      firework.alpha = firework.life / firework.base.life;
      firework.size = firework.alpha * firework.base.size;
      firework.alpha = firework.alpha > 0.6 ? 1 : firework.alpha;
      //
      firework.life--;
      if (firework.life <= 0) {
        listFirework.splice(i, 1);
      }
    }
  }

  // supprise happy new year!
  if (supprise && onHold == 10) {
    supprise = false;
    setTimeout(initText, 3000);
  }

  // update text logic
  for (var i = listText.length - 1; i >= 0; i--) {
    var text = listText[i];
    text.vx *= 0.9;
    text.vy *= 0.9;
    text.direct *= 0.9;
    text.x += text.vx + text.direct;
    text.y += text.vy;
    text.vy += text.ay;
    text.alpha = text.life / text.base.life;
    text.size = text.alpha * text.base.size;
    text.alpha = text.alpha > 0.6 ? 1 : text.alpha;
    //
    text.life--;
    if (text.life <= 0) {
      listText.splice(i, 1);
    }
  }

  // update special logic
  for (var i = listSpecial.length - 1; i >= 0; i--) {
    var special = listSpecial[i];
    if (special.y <= special.far) {
      // play sound
      // playExpSound();
      // light
      lights.push({
        x: special.x,
        y: special.y,
        color: special.fill,
        alpha: 0.02,
        radius: range * 2,
      });
      //
      makeSpark(special);
      // remove from list
      listSpecial.splice(i, 1);
    } else {
      special.x += special.vx;
      special.y += special.vy;
      special.vx += special.ax;
      special.alpha = (special.y - special.far) / special.far;
    }
  }

  // update spark logic
  for (var i = listSpark.length - 1; i >= 0; i--) {
    var spark = listSpark[i];
    if (spark) {
      spark.vx *= 0.9;
      spark.vy *= 0.9;
      spark.x += spark.vx;
      spark.y += spark.vy;
      spark.vy += spark.ay;
      spark.alpha = spark.life / spark.base.life + 0.2;
      //
      spark.life--;
      if (spark.life < spark.base.life * 0.8 && spark.life > 0) {
        //
        spark.chain--;
        chainSpark(spark);
      }
      if (spark.life <= 0) {
        listSpark.splice(i, 1);
      }
    }
  }
}

function draw() {
  // 清空画布，背景色可在此处调整
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = "#000"; // 烟花背景色（白色，自动适配烟花为深色）
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // re-draw
  ctx.globalCompositeOperation = "screen";
  // 绘制上升火箭
  for (var i = 0; i < listFire.length; i++) {
    var fire = listFire[i];
    ctx.globalAlpha = fire.alpha;
    ctx.beginPath();
    ctx.arc(fire.x, fire.y, fire.size, 0, Math.PI * 2); // fire.size 控制火箭大小
    ctx.closePath();
    ctx.fillStyle = fire.fill; // fire.fill 控制火箭颜色
    ctx.fill();
  }

  // 绘制爆炸烟花粒子
  for (var i = 0; i < listFirework.length; i++) {
    var firework = listFirework[i];
    ctx.globalAlpha = firework.alpha;
    ctx.beginPath();
    ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2); // firework.size 控制粒子大小
    ctx.closePath();
    ctx.fillStyle = firework.fill; // firework.fill 控制粒子颜色
    ctx.fill();
  }

  // 绘制特殊粒子（如火花链）
  for (var i = 0; i < listSpecial.length; i++) {
    var special = listSpecial[i];
    ctx.globalAlpha = special.alpha;
    ctx.fillStyle = special.fill;
    ctx.fillRect(
      special.x - special.size,
      special.y - special.size,
      special.size * 2,
      special.size * 2
    ); // special.size 控制特殊粒子大小
  }

  // 绘制火花链
  for (var i = 0; i < listSpark.length; i++) {
    var spark = listSpark[i];
    ctx.globalAlpha = spark.alpha;
    ctx.fillStyle = spark.fill;
    ctx.fillRect(
      spark.x - spark.size,
      spark.y - spark.size,
      spark.size * 2,
      spark.size * 2
    ); // spark.size 控制火花大小
  }

  // light effect
  // 绘制光晕效果
  while (lights.length) {
    var light = lights.pop();
    var gradient = ctx.createRadialGradient(
      light.x,
      light.y,
      0,
      light.x,
      light.y,
      light.radius
    );
    gradient.addColorStop(0, "#fff");
    gradient.addColorStop(0.2, light.color); // light.color 控制光晕主色
    gradient.addColorStop(0.8, "rgba(0, 0, 0, 0)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.globalAlpha = light.alpha ? light.alpha : 0.25;
    ctx.fillStyle = gradient;
    ctx.fillRect(
      light.x - light.radius,
      light.y - light.radius,
      light.radius * 2,
      light.radius * 2
    ); // light.radius 控制光晕大小
  }

  // supprise: HAPPY LUNAR NEW YEAR 2025!
  // 绘制文字粒子
  for (var i = 0; i < listText.length; i++) {
    var text = listText[i];
    ctx.globalAlpha = text.alpha;
    ctx.fillStyle = text.fill; // text.fill 控制文字粒子颜色
    ctx.fillRect(
      text.x - text.size,
      text.y - text.size,
      text.size * 2,
      text.size * 2
    ); // text.size 控制文字粒子大小
  }
}

  // End of onMounted
});
onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId);
  window.removeEventListener("resize", resizeHandler);
});
</script>
<style>
canvas {
  display: block;
  position: absolute;
  top: 0;
  z-index: -1;

}

.block-audio {
  display: none;
}
</style>