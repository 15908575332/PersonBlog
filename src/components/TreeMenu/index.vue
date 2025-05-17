<template>
    <div class="treedown">
        <div class="header" @click="toggle">
            <a>
                <img src="@/components/NavigationMenu/icon/record-icon.svg" alt="">
                <span>记录</span>
            </a>
            <div class="triangle-down" :class="{ 'flipped': isOpen }"></div>
        </div>
        <div class="showHide" v-if="isOpen">
            <div class="treedown-content" @click.self="closetreedownIfNeeded" @click="selectOption($event, option)">
                <div v-for="option in options" :key="option.value" class="treedown-item" data-value="option.value">
                    <a :href="option.router">{{ option.text }}</a>
                </div>
            </div>
        </div>
    </div>
</template>
<!-- 移动端专用树形菜单 -->
<script>
import { ref } from 'vue';

export default {
    name: 'treedownMenu',
    setup() {
        const selectedOption = ref(null);
        const isOpen = ref(false);
        const toggle = () => {
            console.log(1);
            isOpen.value = !isOpen.value;
        }
        const options = ref([
            { value: 'option1', text: '资源', router: '/record/recordDetail' },
            { value: 'option2', text: '学习人生' },
            { value: 'option3', text: '生活倒影' },
        ]);

        // 注意：closetreedownIfNeeded 方法现在可能不是必需的，  
        // 因为hover菜单会在鼠标离开时自动关闭（如果这是所需的行为）。  
        // 但如果你希望在点击菜单项后保持菜单打开（例如，用于显示子菜单），  
        // 则可以保留并调整此方法。  
        const closetreedownIfNeeded = () => {
            // 根据需要实现逻辑，例如，如果点击了菜单外部，则关闭菜单  
            // 但对于hover菜单，这通常不是必需的。  
        };

        const selectOption = (event, option) => {
            // 阻止事件冒泡到.treedown-content，否则它会触发closetreedownIfNeeded  
            event.stopPropagation();
            selectedOption.value = option;
            // 对于hover菜单，你可能不需要立即关闭它，  
            // 但如果你想要这样做，可以调用一个关闭方法（如果实现了的话）。  
            // 注意：这里我们传递了$event和option，但option实际上是通过v-for绑定的，  
            // 所以我们应该从事件目标中获取它，或者使用其他方法来传递正确的option。  
            // 但由于我们使用了data-value属性，我们可以直接从DOM元素中获取它。  
            // 然而，更Vue的方式是使用@click.stop="selectOption(option)"并直接在方法中接收option。  
            // 下面的代码是一个示例，展示了如何从事件目标中获取data-value（尽管在这个例子中我们不需要它）。  
            // const clickedOptionValue = event.target.getAttribute('data-value');  
        };

        // 注意：由于我们使用了hover来显示菜单，因此不需要返回isOpen变量。  
        return {
            selectedOption,
            options,
            toggle,
            isOpen,
            // 注意：closetreedownIfNeeded 现在可能不是必需的，取决于你的具体需求。  
            // closetreedownIfNeeded,  
            selectOption,
        };
    },
};  
</script>

<style scoped lang="scss">
.treedown {
    color: white;
    display: none;
    padding-left: 0.4rem;


    .header {
        width: 200px;
        @include flexCenter(row, space-between);
        /* 添加过渡效果 */

        >a {
            padding: 0.4rem 0;
            @include flexCenter(row, flex-start);

            img {
                width: 1.2rem;
                margin-right: 0.35rem;
            }
        }

        .triangle-down {
            width: 0;
            height: 0;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-right: 12px solid rgb(255, 255, 255);
            transition: transform 0.5s ease-in-out;
        }
    }

    .showHide {
        animation: treefadeIn 0.8s ease-in-out;

        .treedown-content {
            transform: translateX(1.55rem);

            .treedown-item {
                // background-color: rebeccapurple;
                margin: 0.6rem 0.4rem;

                a {
                    font-weight: 600;
                    font-size: 0.9rem;
                    padding: 0.2rem 0;
                    align-items: center;
                    border-bottom: 2px solid #ffa500;
                }
            }

        }
    }

    @include media-to('phone') {
        display: block;
    }
}

.flipped {
    transform: rotate(-90deg);
}

@keyframes treefadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>
