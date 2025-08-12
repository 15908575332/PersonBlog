<template>
    <div id="personalCenter">
        <!-- 背景图 -->
        <div class="backPhoto"></div>
        <!-- 遮罩 -->
        <div class="mask"></div>

        <!-- 导航 -->
        <Navigation></Navigation>
        <!-- 会员卡片 -->
        <div class="personalCard" v-if="userInfo">

            <div class="avatar">
                <img :src="userInfo.data.avatarUrl" alt="头像">
            </div>
            <div class="levelsbox">
                <img class="level" :src="utils.getAssetsFile('icon/level/member.svg')" alt="icon">
                <h2>会员等级：</h2>
                <img class="level" :src="utils.getAssetsFile('icon/level/lv5.svg')" alt="level">
            </div>
            <div class="form-wrap">
                <form>
                    <div class="item">
                        <label for="username">名称：</label>
                        <input type="text" name="name" id="username" v-model="userInfo.data.username"></input>
                    </div>

                    <div class="item">
                        <label>邮箱：</label>
                        <span>{{ userInfo.data.email }}</span>
                        <button class="changeBtn">修改</button>
                    </div>
                    <div class="item">
                        <label>性别：</label>
                        <div class="boy" @click="selected = 'sex'" :class="{ box_active: selected === 'sex' }">
                            <span class="box"></span>
                            <span>男</span>
                        </div>
                        <div class="girl" @click="selected = 'nv'" :class="{ box_active: selected === 'nv' }">
                            <span class="box"></span>
                            <span>女</span>
                        </div>
                    </div>
                    <div class="item">
                        <label>注册时间：</label>
                        <span>{{ userInfo.data.createTime }}</span>
                    </div>
                    <div class="item benefits">
                        <label for="introduce">简介：</label>
                        <textarea v-model="inputText" :maxlength="maxlength" @input="handleInput" name="introduce"
                            id="introduce"></textarea>
                        <div class="char-counter" :style="{ color: remainingChars <= 10 ? '#ff0000' : '#666' }">{{
                            remainingChars }} / {{ maxlength }}</div>
                    </div>
                    <div class="submit-item">
                        <button>提交</button>
                    </div>
                </form>
            </div>
        </div>
        {{ userInfo }}

    </div>
</template>.
<script setup>
import utils from '@/utils/getAssetsFile';
import Navigation from '../components/NavigationMenu/index.vue';
import { ref, computed, onMounted } from 'vue';

const selected = ref('sex');
const maxlength = ref(60);
const inputText = ref('');
import { useUserStore } from '@/store/userInfo';
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);


//剩余字数计算
const remainingChars = computed(() => {
    return maxlength.value - inputText.value.length;
});
//截取处理 
const handleInput = () => {
    if (inputText.value.length > maxlength.value) {
        inputText.value = inputText.value.slice(0, maxlength.value);
    }
};
onMounted(async () => {
    await userStore.fetchUserInfo(localStorage.getItem('token'));

});
</script>
<style scoped lang="scss">
#personalCenter {
    .backPhoto {
        width: 100vw;
        height: 100vh;
        background-size: cover;
        background-position: center;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        background-image: url('@/assets/img/personCenter/personCenterBg.jpeg');
    }

    .mask {
        background-color: rgba(50, 50, 50, 0.2);
        z-index: inherit;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
    }

    .personalCard {
        background-color: rgb(255, 255, 255, .7);
        margin: 5vw auto;
        @include flexCenter(column, center);
        width: 35vw;
        min-width: 25rem;
        border-radius: 0.5rem;
        padding: 1rem;

        .avatar {
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .levelsbox {
            @include flexCenter(row, center);

            h2 {
                font-size: 1rem;
                font-weight: 700;
                font-family: 'lmst';
                color: #ffa500;
            }

            .level {
                width: 1.5rem;
                height: 1.5rem;
                gap: 0.5rem;


                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }


        .form-wrap {
            padding: 1rem;
            font-family: 'gtpy';

            .item {
                @include flexCenter(row, flex-start);
                gap: 1rem;
                margin: 1rem 0;

                span {
                    font-size: 1rem;
                    color: #7c7873;
                    text-shadow: 0px 1px 0px #4e8faf;
                }

                // 修改按钮
                .changeBtn {
                    text-align: center;
                    color: #fff;
                    font-size: 0.8rem;
                    padding: 0.1rem 0.25rem;
                    border-radius: 0.25rem;
                    background-color: #ffa500; // 修改按钮
                    cursor: pointer;
                }

                .boy,
                .girl {
                    @include flexCenter(row, center);
                    gap: 0.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease;

                    &:hover {
                        color: #3f9eff;

                        .box {
                            border-color: #3f9eff
                        }
                    }
                }

                .box {
                    display: block;
                    width: 0.6rem;
                    height: 0.6rem;
                    border-radius: 50%;
                    border: 2px solid transparent;
                    transition: all 0.1s ease;
                    background-color: #fff;
                }

                // 性别选择框
                .box_active {
                    .box {
                        border: 5px solid #3f9eff;
                    }

                    span {
                        color: #3f9eff;
                    }
                }

                label {
                    font-size: 0.9rem;
                    color: #191918;
                    font-weight: 700;
                    text-shadow: 0px 1px 0px #4e8faf;
                }

                input[type=text],
                textarea {
                    font-family: inherit;
                    color: #4e8faf;
                    background: white;
                    font-size: 0.9rem;
                    padding: 0.25rem 0.5rem;
                    max-width: 16rem;
                    min-width: 16rem;
                    min-height: 1.6rem;
                    max-height: 20vh;
                    border: none;
                    border-radius: 0.25rem;
                    box-shadow: inset 0px 0px 1px #b3a895;


                    &:focus {
                        border: none;
                    }
                }

                textarea {
                    height: 6rem;
                    min-height: 6rem;
                }
            }

            .benefits {
                position: relative;

                .char-counter {
                    position: absolute;
                    bottom: 0.2rem;
                    right: 0.5rem;
                    font-size: 14px;
                    text-align: right;
                    margin-top: -5px;
                    padding-right: 5px;
                    transition: color 0.3s;
                }
            }

            // 提交按钮
            .submit-item {
                @include flexCenter(row, center);
                font-size: 0.8rem;

                button {
                    font-family: inherit;
                    background-color: #837bc7;
                    color: #fff;
                    padding: 0.25rem 0.8rem;
                    border-radius: 0.25rem;
                    border: none;
                }
            }
        }
    }
}
</style>