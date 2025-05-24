<template>
    <div v-for="(b, i) in balloons" :key="i" class="baloon"
        :style="`--width:${b.width};--animationDelay:${b.delay};left:${b.left};background-image:${b.bg};--duration:${b.duration}`">
        <span></span>
    </div>
</template>

<script setup>
// 随机生成气球参数，减少代码量
const balloonCount = 5;
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max, fixed = 0) => (Math.random() * (max - min) + min).toFixed(fixed);
const colorPairs = [
    ['#E85D04', '#FFBA08'], ['#ff3da4', '#FB5607'], ['#f15156', '#3A86FF'], ['#FFBE0B', '#f15156'],
    ['#FF006E', '#00a1de'], ['#DC2F02', '#ff3da4'], ['#FFBE0B', '#FB5607'], ['#8338EC', '#00a1de'],
    ['#d177ff', '#00a1de'], ['#3A86FF', '#E85D04'], ['#FB5607', '#FF006E'], ['#f15156', '#DC2F02']
];
const balloons = Array.from({ length: balloonCount }, (_, i) => {
    const [c1, c2] = colorPairs[random(0, colorPairs.length - 1)];
    return {
        width: random(60, 120) + 'px',
        delay: random(0, 2) + 's', // 让动画延迟为0~2秒，气球首次进入页面就能陆续出现
        left: random(1, 99) + '%',
        duration: random(8, 10) + 's', // 新增动画时长，8~10秒
        bg: `linear-gradient(45deg,${c1},${c2})`
    };
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Courgette&display=swap");

* {
    box-sizing: border-box
}

html,
body {
    height: 100%;
    font-family: "Courgette", cursive
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    overflow: hidden
}

.baloon {
    height: calc(1.2 * var(--width));
    width: var(--width);
    border: 2px solid black;
    border-radius: 50% 50% 50% 50%/45% 45% 55% 55%;
    background-color: red;
    position: absolute;
    margin-bottom: 20px;
    top: 100%;
    -webkit-animation: animate var(--duration) ease-in-out infinite;
    animation: animate var(--duration) ease-in-out infinite;
    -webkit-animation-delay: calc(var(--animationDelay) * 0.15);
    animation-delay: calc(var(--animationDelay) * 0.15);
    z-index: 1;
    opacity: 0.75
}

.baloon::before,
.baloon::after {
    content: "";
    position: absolute;
    top: 0;
    margin: auto;
    border-radius: inherit;
    opacity: 0.25
}

.baloon::before {
    border-left: calc(var(--width) * 0.15) solid #ffffff;
    left: 4px;
    height: 100%;
    width: calc(0.95 * var(--width))
}

.baloon::after {
    height: 100%;
    width: 80%;
    right: 4px;
    border-right: calc(var(--width) * 0.15) solid #000000
}

.baloon span {
    display: inline-flex;
    position: absolute;
    height: calc(0.4 * var(--width));
    width: calc(0.04 * var(--width));
    top: 100%;
    left: 0;
    right: 0;
    margin: auto;
    background-image: inherit;
    z-index: -1;
    border-radius: 20px;
    border: 2px solid black
}

.baloon span::before,
.baloon span::after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translatex(-50%);
    border-radius: 4px;
    background-image: inherit;
    margin: auto;
    width: calc(0.1 * var(--width));
    height: calc(0.12 * var(--width));
    border-radius: 500px;
    border: 2px solid black
}

.baloon span::after {
    top: calc(0.14 * var(--width));
    width: calc(0.08 * var(--width));
    height: calc(0.02 * var(--width))
}

@-webkit-keyframes animate {
    from {
        top: 100%
    }

    to {
        top: -55%
    }
}

@keyframes animate {
    from {
        top: 100%
    }

    to {
        top: -55%
    }
}
</style>