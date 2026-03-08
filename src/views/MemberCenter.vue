<template>
    <div id="memberCenter">
        <!-- 背景图 -->
        <div class="backPhoto"></div>
        <!-- 遮罩 -->
        <div class="mask"></div>
        <!-- 导航 -->
        <Navigation></Navigation>
        <div class="pricing-cards">
            <!-- 卡片 -->
            <div class="pricing-card" v-for="(card, index) in cards" :key="index">
                <a-badge-ribbon v-if="card.isRecommended" :color="card.ribbonColor"
                    :text="card.ribbonText"></a-badge-ribbon>
                <h1 :class="card.h1">{{ card.h1 }}</h1>
                <div class="content">
                    <div class="card-header">
                        <div class="level">
                            <img :src="utils.getAssetsFile(`icon/level/lv${card.level}.svg`)" alt="member">

                        </div>
                        <h3>{{ card.title }}</h3>
                    </div>
                    <div class="price-section">
                        <div class="current-price" :data-end="card.price">
                            ￥ {{ formattedPrice(card.price) }}
                        </div>
                        <div class="original-price">￥{{ formattedPrice(card.originalPrice) }}</div>
                    </div>
                    <div class="benefits" v-html="card.benefits"></div>
                    <button class="buy-button" @click="handlePurchase(card)">立即购买</button>
                </div>
            </div>
        </div>
        <!-- 购买界面 -->
        <div v-if="isVisible" :ref="selectedCard" class="modal-overlay" @click.self="closeModal">
            <div class="modal-content" @click.stop>
                <button @click="closeModal"><img :src="utils.getAssetsFile('icon/memberCenter/close.svg')"
                        alt="close"></button>
                <div class="content">
                    <div class="card-header">
                        <div class="level">
                            <img :src="utils.getAssetsFile(`icon/level/lv${selectedCard.level}.svg`)" alt="member">
                        </div>
                        <h3>{{ selectedCard.title }}</h3>
                    </div>
                    <div class="price-section">
                        <div class="current-price">￥ {{ formattedPrice(selectedCard.price) }}</div>
                        <div class="original-price">￥ {{ formattedPrice(selectedCard.originalPrice) }}</div>
                    </div>
                    <!-- 付款方式 -->
                    <div class="pay-title">
                        请选择支付方式
                    </div>
                    <div class="payment-methods">
                        <div class="method">
                            <img :src="utils.getAssetsFile('icon/memberCenter/wechatPay.png')" alt="wechat">
                            <span>微信</span>
                        </div>
                        <div class="method">
                            <img :src="utils.getAssetsFile('icon/memberCenter/alipay.svg')" alt="alipay">
                            <span>支付宝</span>
                        </div>
                        <div class="method">
                            <img :src="utils.getAssetsFile('icon/memberCenter/unionPay.png')" alt="unionpay">
                            <span>银联</span>
                        </div>
                        <div class="method">
                            <img :src="utils.getAssetsFile('icon/memberCenter/creditCard.svg')" alt="creditcard">
                            <span>信用卡</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import utils from '@/utils/getAssetsFile';
import Navigation from "@/components/common/NavigationMenu.vue";
import { ref, reactive } from 'vue';

// 卡片数据集合
const cards = reactive([
    {
        title: '个人博客源码授权',
        h1: 'routine',
        level: 3,
        ribbonColor: '#fe3459',
        ribbonText: '常规',
        price: 99,
        originalPrice: 199,
        benefits: '基础博客授权功能<br>支持单篇文章付费阅读',
        isRecommended: true //角标
    },
    {
        title: '其它订单商品支付 - blog',
        h1: 'advanced',
        level: 4,
        ribbonColor: '#ff9900',
        ribbonText: '进阶',
        price: 198,
        originalPrice: 299,
        benefits: '高级商品订单系统<br>支持虚拟商品/实物商品支付',
        isRecommended: true
    },
    {
        title: '高级定制',
        h1: 'recommend',
        level: 6,
        ribbonColor: '#d81e06',
        ribbonText: '🔥推荐',
        price: 999,
        originalPrice: '暂无',
        benefits: '专属定制服务<br>API接口开放<br>优先技术支持',
        isRecommended: true
    }
]);

const selectedCard = ref(null); // 选中的卡片
const formattedPrice = (price) => { // 格式化价格
    return price.toLocaleString('en-US', { minimumFractionDigits: 0 });
};
const isVisible = ref(false); // 购买界面是否可见
const handlePurchase = (card) => { // 处理购买
    selectedCard.value = card;
    isVisible.value = true;
};
const closeModal = () => { // 关闭购买界面
    isVisible.value = false;
};

</script>
<style lang="scss" scoped>
#memberCenter {
    position: relative;
    z-index: 1;

    .backPhoto {
        width: 100vw;
        height: 100vh;
        background-position: center;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        background-image: url('@/assets/img/memberCenter/memberCenterBg.jpeg');
    }

    .mask {
        background-color: rgba(50, 50, 50, 0.3);
        z-index: inherit;
        width: 100%;
        height: 100vh;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
    }

    .pricing-cards {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        padding: 1rem;
        margin: 5rem auto;
        font-family: var(--app-font-family);

        .pricing-card {
            width: 18rem;
            background: white;
            border-radius: 0.6rem;
            box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
            height: auto;
            overflow: hidden;

            h1 {
                height: 2rem;
                text-align: center;
                line-height: 2rem;
                font-size: 0.9rem;
                width: 100%;
            }

            .routine,
            .advanced,
            .recommend {
                background-color: $primary-hover;
            }

            .content {
                padding: 1rem;

                .card-header {
                    .level {
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        img {
                            height: 4rem;
                        }
                    }

                    h3 {
                        text-align: center;
                        font-size: 1.5em;
                        font-weight: bold;
                        margin: 0;
                        color: #333;
                    }
                }

                .price-section {
                    margin: 25px 0;
                    text-align: center;
                    @include flexCenter(row, center);
                    align-items: end;

                    .current-price {
                        font-size: 2.2em;
                        color: #ff5473;
                        font-weight: bold;
                    }

                    .original-price {
                        font-size: 0.9em;
                        color: #ff5473;
                        text-decoration: line-through;
                    }
                }
            }

            .benefits {
                text-align: center;
                height: 4rem;
                overflow: hidden;
                color: #666;
                font-size: 0.95em;
                line-height: 1.5;
                margin: 0.5rem 0;
            }

            .buy-button {
                width: 100%;
                padding: 8px;
                background: #f4e1c0;
                font-weight: 700;
                color: #ff5473;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                font-size: 1.1em;
                transition: background 0.3s;
                font-family: inherit;
            }

            .buy-button:hover {
                background: #ff3333;
                color: #fefefe;
            }
        }
    }

    //购买界面
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 998;
        cursor: pointer;
        width: 100%;
        height: 100%;
        font-family: var(--app-font-family);

        .modal-content {
            background-color: white;
            padding: 0 1rem;
            border-radius: 8px;
            min-width: 30vw;
            max-width: 60%;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            cursor: auto;
            position: relative;
            user-select: none;
            animation: spaceInDown 1s both;

            button {
                position: absolute;
                top: 1.5rem;
                right: 1.5rem;

                img {
                    width: 1rem;
                    transition: all 0.2s linear;
                }

                &:hover img {
                    transform: scale(1.1);
                }
            }

            .content {
                padding: 1rem;

                .card-header {

                    .level {
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        img {
                            height: 2rem;
                        }
                    }

                    h3 {
                        text-align: center;
                        font-size: 1em;
                        font-weight: bold;
                        margin: 0;
                        color: #333;
                    }
                }

                .price-section {
                    margin: 25px 0;
                    text-align: center;
                    @include flexCenter(row, center);
                    align-items: end;

                    .current-price {
                        font-size: 2em;
                        color: #ff5473;
                        font-weight: bold;
                    }

                    .original-price {
                        font-size: 0.9em;
                        color: #ff5473;
                        text-decoration: line-through;
                    }
                }

                .pay-title {
                    font-size: 0.7em;
                    color: #666;
                    padding: 10px;
                    border-bottom: 1px solid #ddd;
                }

                //付款方式
                .payment-methods {
                    @include flexCenter(row, center);
                    gap: 2rem;
                    padding: 1rem;

                    .method {
                        display: flex;
                        align-items: center;
                        margin: 0.5rem 0;
                        cursor: pointer;
                        transition: transform 0.3s;
                        font-size: 0.7rem;
                        padding: 0.5rem 1rem;
                        border: 1px solid transparent;
                        transition: all 0.3s ease-in-out;
                        border-radius: 0.2rem;
                        border-color: #89b7ff;

                        img {
                            width: 0.8rem;
                            margin-right: 0.25rem;
                        }

                        &:hover {
                            background-color: #cedffb;
                        }
                    }

                }
            }
        }

        @keyframes spaceInDown {
            0% {
                opacity: 0;
                transform-origin: 50% 100%;
                transform: scale(.2) translate(0%, 200%);
            }

            100% {
                opacity: 1;
                transform-origin: 50% 100%;
                transform: scale(1) translate(0%, 0%);
            }
        }
    }
}

/* 数字动画样式 */
.current-price {
    font-feature-settings: "tnum"; // 启用等宽数字
    font-variant-numeric: tabular-nums; // 确保数字对齐
    // min-width: 8em; // 防止布局抖动
    display: inline-block;
    transition: font-weight 0.3s;

    &:hover {
        font-weight: 700; // 添加悬停效果增强交互
    }
}

@media (max-width: 768px) {
    .pricing-cards {
        flex-direction: column;
        align-items: center;
    }
}
</style>