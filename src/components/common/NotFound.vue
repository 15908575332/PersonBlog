<template>
    <div class="notFound">
        <div class="img">
            <img src="@/assets/img/404page.svg" alt="404">
        </div>
        <div class="text">
            <div>你访问的页面不存在</div>
            <div class="backhome" @click="goHome">返回首页</div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goHome = () => {
    router.push('/');
}

</script>
<style scoped lang="scss">
.notFound {
    @include flexCenter(column, center);

    .img {
        height: 70vh;

        img {
            height: 120%;
        }
    }

    .text {
        @include flexCenter(column, center);
        gap: 1rem;
        color: #22af85;
        font-family: var(--app-font-family);

        .backhome {
            padding: 0.5rem 1rem;
            background-color: #22af85;
            border-radius: 0.5rem;
            cursor: pointer;
            color: #fff;
        }

    }

}
</style>