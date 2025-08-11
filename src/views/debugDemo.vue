<!-- 任意组件 -->
<script setup>
import { useUserStore } from '@/store/userInfo';
import { computed, onMounted } from 'vue';

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);

// 首次加载时获取
onMounted(async () => {
  await userStore.fetchUserInfo(localStorage.getItem('token'));
});
</script>

<template>
  <div v-if="userInfo">
    {{ userInfo.data }}

    欢迎 {{ userInfo.data.username }}
  </div>
</template>