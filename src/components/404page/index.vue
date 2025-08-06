<template>
    <div class="notFound">
        <div>
            <img src="@/assets/img/404page.svg" alt="404">
        </div>
        <div>
            <span>你访问的页面不存在</span>
            <span>返回首页</span>
        </div>
    </div>
</template>
<style scoped lang="scss">
.notFound {
    @include flexCenter(column, center);
    height: 100vh;

    img {
        width: 50%;
    }

    div {
        margin: 1rem 0;
    }
}
</style>