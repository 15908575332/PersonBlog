<template>
    <!-- 详情页（入口） -->
    <div>
        <!-- 导航 -->
        <div class="nav-wrapper" :class="[$isNavHidden ? 'navHiddenOut' : 'navHiddenIn']">
            <Navigation></Navigation>
        </div>
        <ListDetail :articleId="routerId" :key="routerId" :backTextHeight=20></ListDetail>
    </div>
</template>
<script setup>
import ListDetail from '@/components/informalEssay/ListDetail.vue'
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const routerId = computed(() => route.params.id);
import Navigation from "@/components/common/NavigationMenu.vue";
</script>