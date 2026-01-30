<template>
    <!-- 详情页（入口） -->
    <div>
        <div class="navigate">
            <Navigation></Navigation>
        </div>
        <ListDetail :articleId="routerId" :key="routerId"></ListDetail>
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
<style>
.navigate {
    position: relative;
    z-index: 2;
}
</style>