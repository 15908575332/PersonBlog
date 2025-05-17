<template>
    <div class="bubble-container">
        <transition-group name="bubble" tag="div">
            <div v-for="bubble in bubbles" :key="bubble.id" class="bubble" :style="{
                left: bubble.position + 'px',
                backgroundColor: bubble.color,
                width: bubble.size + 'px',
                height: bubble.size + 'px',
                animationDuration: bubble.duration + 's',
                fontSize: bubble.fontSize + 'px',
                animationDelay: bubble.delay + 's'  // 直接在这里设置延迟
            }">
                {{ bubble.content }}
            </div>
        </transition-group>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const bubbles = ref([]);
let id = 0;
let intervalId = null;

const getRandomEmoji = () => {
    const emojis = ['✨', '🌟', '💫', '⚡', '🎈', '💦', '☁️', '❤️', '🔥', '🎯'];
    return emojis[Math.floor(Math.random() * emojis.length)];
};

const generateBubbles = (count = 5) => {
    if (bubbles.value.length > 100) return;

    for (let i = 0; i < count; i++) {
        const size = 20 + Math.random() * 40;
        const newBubble = {
            id: id++,
            content: getRandomEmoji(),
            position: Math.random() * (window.innerWidth - 100),
            color: `hsla(${Math.random() * 360}, 70%, 70%, 0.7)`,
            size: size,
            fontSize: size * 0.5,
            duration: 3 + Math.random() * 4,
            delay: Math.random() * 0.5
        };
        bubbles.value.push(newBubble);

        setTimeout(() => {
            bubbles.value = bubbles.value.filter(b => b.id !== newBubble.id);
        }, newBubble.duration * 1000);
    }
};

onMounted(() => {
    for (let i = 0; i < 6; i++) {
        setTimeout(generateBubbles, i * 100);
    }

    intervalId = setInterval(() => {
        generateBubbles(5);
    }, 200);
});

onUnmounted(() => {
    clearInterval(intervalId);
});
</script>

<style scoped>
.bubble-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    pointer-events: none;
    overflow: hidden;
    z-index: -2;
}

.bubble {
    position: absolute;
    bottom: 0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    pointer-events: none;
    transform: translateY(0) scale(0.5);
    opacity: 0;
    animation: bubble-up linear forwards;
}

@keyframes bubble-up {
    0% {
        transform: translateY(0) scale(0.5);
        opacity: 0;
    }

    20% {
        opacity: 0.8;
        transform: translateY(-20px) scale(1);
    }

    100% {
        transform: translateY(-100vh) scale(0.8);
        opacity: 0;
    }
}
</style>