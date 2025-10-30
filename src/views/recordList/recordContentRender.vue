<template>
    <!-- 详情页（入口） -->
    <div>
        <Navigation></Navigation>
        <ListDetail :articleId="routerId" :key="routerId"></ListDetail>
    </div>
</template>
<script setup>
import ListDetail from '@/components/ListDetail/index.vue'
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const routerId = computed(() => route.params.id);
import Navigation from "@/components/NavigationMenu/index.vue";
</script>