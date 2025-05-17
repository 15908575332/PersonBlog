<template>
    <div id="app">
        <!-- 控制侧边栏显示的按钮 -->
        <button @click="toggleSidebar">Toggle Sidebar</button>

        <!-- 侧边栏，使用 v-if 控制显示 -->
        <div v-if="isSidebarVisible" class="sidebar">
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/about">About</router-link></li>
                <!-- 添加更多导航链接 -->
            </ul>
        </div>

        <!-- 内容区域，使用样式调整布局 -->
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            isSidebarVisible: false // 侧边栏显示状态  
        };
    },
    methods: {
        toggleSidebar() {
            this.isSidebarVisible = !this.isSidebarVisible; // 切换侧边栏显示状态  
        }
    }
};  
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    flex-direction: row;
    height: 100vh;
    margin: 0;
    overflow: hidden;
    /* 防止内容溢出 */
}

.sidebar {
    width: 200px;
    background-color: #333;
    color: white;
    position: relative;
    /* 改为相对定位，因为我们在主容器中控制布局 */
    transition: transform 0.3s ease-in-out;
    /* 添加过渡效果 */
    transform: translateX(-100%);
    /* 初始时隐藏侧边栏 */
}

.sidebar.visible {
    transform: translateX(0);
    /* 显示侧边栏 */
}

.content {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
    /* 允许内容区域垂直滚动 */
    background-color: #f4f4f4;
    /* 背景颜色与侧边栏区分 */
    transition: padding 0.3s ease-in-out;
    /* 添加过渡效果，用于侧边栏显示时调整内容区域 */
}

/* 当侧边栏显示时，调整内容区域的padding */
.sidebar-visible .content {
    padding-left: 220px;
    /* 给侧边栏留出空间 */
}

/* 添加一个类来动态控制侧边栏的显示（虽然在这个例子中我们直接在方法中操作DOM，但这种方法更灵活） */
/* .sidebar-visible .sidebar {  
  transform: translateX(0);  
} */

/* 注意：上面的 .sidebar-visible 类在这个简化示例中并未直接使用，因为我们直接在 toggleSidebar 方法中操作了 isSidebarVisible 状态。  
   如果你想要通过添加/移除类来控制侧边栏的显示，你可以在 toggleSidebar 方法中使用 this.$el.classList.toggle('sidebar-visible', this.isSidebarVisible)   
   （但这需要你将 #app 的样式转移到一个具体的元素上，或者为 .sidebar 添加一个父元素并操作该父元素的类）。 */

/* 为了简化，我们直接在 isSidebarVisible 状态变化时通过条件渲染和样式调整来控制侧边栏的显示。 */

/* 你可以根据需要调整样式和过渡效果 */
</style>