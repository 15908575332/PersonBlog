// stores/user.js (Pinia)
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
export const useUserStore = defineStore('user', () => {
    const userInfo = ref(null);

    // 获取用户信息（带缓存）
    const fetchUserInfo = async (token) => {
        if (!userInfo.value) {
            const response = await axios.get('http://localhost:3000/user/getUserInfo', {

                headers: { Authorization: `Bearer ${token}` }
            });
            userInfo.value = await response.data;

        }
        return userInfo.value;
    };

    return { userInfo, fetchUserInfo };
});