<template>
    <div class="weather" :class="{ 'cardClose': isclose }">
        <div class="content" v-for="(item, index) in weatherInfo" :key="index">
            <!-- 关闭按钮 -->
            <button class="close" title="关闭" @click="cardClose"><img src="./icon/close-icon.svg" alt="close"></button>
            <div class="address">
                <img src="./icon/position-icon.svg" alt="weather">
                <p>{{ item.province }}</p>
                <p>{{ item.city }}</p>
            </div>
            <div class="temperature">
                <p>{{ item.temperature }}</p>
                <p>℃</p>
                <p style="font-size: 26px;">{{ item.weather }}</p>
                <div class="weather__icon" :style="iconPosition(item.weather)"></div>
            </div>
            <div class="update_time">
                <p>更新时间：</p>
                <p>{{ item.reporttime }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUpdated, computed } from 'vue';

const isclose = ref(false);
const weatherInfo = ref([]);
const amapKey = '1507c9bd45ea0ad32a74dfee678cb2d0'; // 替换为你的API Key
const city = '贵阳'; // 替换为你想查询的城市名
// 获取天气信息
const getWeatherInfo = async () => {
    const res = await fetch(`https://restapi.amap.com/v3/weather/weatherInfo?key=${amapKey}&city=${city}&extensions=base`);
    if (res.ok) {
        const data = await res.json();
        weatherInfo.value = data.lives;
    } else {
        console.error('获取天气信息失败', res.statusText);
    }
}
// 图标位置映射
const positions = {
    '晴': '0 0',
    '多云': '-35px 0',
    '阴': '-72px 0',
    '阵雨': '-105px 0',
    '雷阵雨': '-140px 0',
    '雨夹雪': '-175px 0',
    '雨': '-210px 0',
    '雾': '-225px -38px',
    '小雨': '-297px 0',
    '中雨': '-335px 0'
}
const iconPosition = (type) => {
    const position = positions[type] || '0 0'; // 默认位置
    return {
        backgroundPosition: position,
    }
}
// 定时关闭天气卡片组件
const closeWeatherCard = () => {
    setTimeout(() => {
        isclose.value = true;
    }, 5000);
}
const cardClose = () => {
    isclose.value = true;
}
onMounted(() => {
    getWeatherInfo();
    closeWeatherCard();
})
</script>
<style scoped lang="scss">
.weather {
    width: 11rem;
    height: 5rem;
    background-color: #c3ebc320;
    border-radius: 10px;
    color: #fff;
    font-size: 1rem;
    backdrop-filter: blur(10px);
    animation: rotateInDownLeft 1s;
    transform-origin: 0.5rem 0.5rem;
    position: relative;

    .content {
        @include flexCenter(column, space-around);
        padding: 0.5rem;

        .close {
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
        }

        .address {
            @include flexCenter(row, center);


            img {
                width: 1rem;
            }
        }

        .temperature {
            @include flexCenter(row, center);
            margin: 5px 0;
            font-size: 30px;

            .weather__icon {
                width: 35px;
                height: 35px;
                background-image: url('./icon/weather_icon_b.png');
                background-repeat: no-repeat;
                transform: translate(5px, 4px)
            }
        }
    }
}

.update_time {
    @include flexCenter(row, space-around);
    font-size: 14px;
}

// 卡片进入动画
@keyframes rotateInDownLeft {
    from {
        transform: translate3d(-100%, 0, 0);
        visibility: visible;
    }

    to {
        transform: translate3d(0, 0, 0);
    }
}

// 卡片关闭动画
.cardClose {
    animation: backOutLeft 2s forwards;
}

@keyframes backOutLeft {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    20% {
        transform: translateX(0px) scale(0.7);
        opacity: 0.7;
    }

    100% {
        transform: translateX(-2000px) scale(0.7);
        opacity: 0.7;
    }
}
</style>