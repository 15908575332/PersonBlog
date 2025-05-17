<template>
    <div id="memberCenter">
        <!-- 背景图 -->
        <div class="backPhoto"></div>
        <!-- 遮罩 -->
        <div class="mask"></div>

        <!-- 导航 -->
        <Navigation></Navigation>

        <div class="pricing-cards">
            <!-- 卡片1 -->
            <div class="pricing-card">
                <a-badge-ribbon color="#fe3459" text="❦ 常规"></a-badge-ribbon>
                <div class="content">
                    <div class="card-header">
                        <div class="level">
                            <img :src="utils.getAssetsFile('icon/level/lv3.svg')" alt="member">

                        </div>
                        <h3>POETIZE - 最美博客授权</h3>
                    </div>

                    <div class="price-section">
                        <div class="current-price">￥{{ displayedPrice1 }}</div>
                        <div class="original-price">￥299</div>
                    </div>

                    <div class="benefits">
                        此处可以写HTML，自定义会员权益
                    </div>

                    <button class="buy-button" @click="isPayment">立即购买</button>
                </div>
            </div>
            <!-- 卡片2 -->
            <div class="pricing-card">
                <div class="content">
                    <div class="card-header">
                        <div class="level">
                            <img :src="utils.getAssetsFile('icon/level/lv4.svg')" alt="member">

                        </div>
                        <h3>POETIZE - 商品订单支付授权</h3>
                    </div>

                    <div class="price-section">
                        <div class="current-price">￥{{ displayedPrice2 }}</div>
                        <div class="original-price">￥999</div>
                    </div>

                    <div class="benefits">
                        此处可以写HTML，自定义会员权益
                    </div>

                    <button class="buy-button" @click="isPayment">立即购买</button>
                </div>
            </div>
            <!-- 卡片3 -->
            <div class="pricing-card">
                <a-badge-ribbon color="#d81e06" text="❧ 推荐"></a-badge-ribbon>

                <div class="content">
                    <div class="card-header">
                        <div class="level">
                            <img :src="utils.getAssetsFile('icon/level/lv6.svg')" alt="member">
                        </div>
                        <h3>POETIZE站长专享</h3>
                    </div>

                    <div class="price-section">
                        <div class="current-price">￥{{ displayedPrice3 }}</div>
                        <div class="original-price">暂无</div>
                    </div>

                    <div class="benefits">
                        此处可以写HTML，自定义会员权益
                    </div>

                    <button class="buy-button" @click="isPayment">立即购买</button>
                </div>
            </div>
        </div>
        <!-- 购买界面 -->
        <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
            <div class="modal-content" @click.stop>
                <button @click="closeModal"><img :src="utils.getAssetsFile('icon/memberCenter/close.svg')"
                        alt="close"></button>
                <div class="content">
                    <div class="card-header">
                        <div class="level">
                            <img :src="utils.getAssetsFile('icon/level/lv4.svg')" alt="member">
                        </div>
                        <h3>POETIZE - 商品订单支付授权</h3>
                    </div>
                    <div class="price-section">
                        <div class="current-price">￥{{ displayedPrice2 }}</div>
                        <div class="original-price">￥999</div>
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
    <!-- <a-space direction="vertical" style="width: 50%"> -->
    <!-- <a-card title="Pushes open the window" size="small">and raises the spyglass.</a-card> -->
    <!-- </a-space> -->
</template>
<script setup>
import utils from '@/utils/getAssetsFile';
import Navigation from '../components/NavigationMenu/index.vue';
import { onMounted, ref, watch } from 'vue';

// 价格常量
const PRICES = {
    card1: 199,
    card2: 99,
    card3: 9999
}

// 响应式显示值
const displayedPrice1 = ref(0)
const displayedPrice2 = ref(0)
const displayedPrice3 = ref(0)

onMounted(() => {
    animateValue(0, PRICES.card1, 2000, val => displayedPrice1.value = val)
    animateValue(0, PRICES.card2, 2000, val => displayedPrice2.value = val)
    animateValue(0, PRICES.card3, 2500, val => displayedPrice3.value = val) // 较大数值适当延长动画时间
})

/**
 * 带缓动函数的数值递增动画
 * @param {number} start - 起始值
 * @param {number} end - 结束值
 * @param {number} duration - 动画时长(ms)
 * @param {function} callback - 更新回调
 */
function animateValue(start, end, duration, callback) {
    const startTime = Date.now()
    const easing = t => t * (2 - t) // 缓出函数

    const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        callback(
            start + Math.round((end - start) * easing(progress))
        )

        if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
}

// 购买界面
const isVisible = ref(false);
const isPayment = () => {
    isVisible.value = !isVisible.value;
}
const closeModal = () => {
    isVisible.value = false;
};

</script>
<style lang="scss" scoped>
#memberCenter {
    .backPhoto {
        width: 100vw;
        height: 100vh;
        // background-size: cover;
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
        height: 100%;
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
        margin-top: 5rem;
        font-family: 'gtpy';

        .pricing-card {
            width: 24rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;

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
                height: 40px;
                color: #666;
                font-size: 0.95em;
                line-height: 1.5;
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