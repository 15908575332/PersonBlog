// stores/user.js (Pinia)
import { defineStore } from 'pinia';
import { ref, watchEffect } from 'vue';
import axios from 'axios';

export const useUserStore = defineStore('user', () => {
    const userInfo = ref(null);
    const token = ref(localStorage.getItem('token') || null);

    //手动更新token
    const updateToken = (newToken) => {
        localStorage.setItem('token', newToken);
        token.value = newToken;
    }
    // 获取用户信息（带缓存）
    const fetchUserInfo = async () => {
        if (!userInfo.value) {
            const response = await axios.get('http://localhost:3000/user/getUserInfo', {
                headers: { Authorization: `Bearer ${token.value}` }

            });
            userInfo.value = await response.data;

        }
        return userInfo.value;
    };
    // 在useUserStore中添加更新方法
    const updateUserProfile = async (newInfo) => {
        try {
            // 发送更新请求
            const response = await axios.post(
                'http://localhost:3000/user/updateUserInfo',
                newInfo,
                { headers: { Authorization: `Bearer ${token.value}` } }
            );
            console.log(response.data);
            // 更新本地缓存
            userInfo.value = {
                ...userInfo.value,
                ...response.data.data
            };

            return response.data;
        } catch (error) {
            console.error('更新失败:', error.response?.data?.msg || error.message);
            throw error;
        }
    };

    // 添加校验辅助函数（可选）
    const validateUpdateInfo = (info) => {
        const errors = {};
        if (info.email && !/^\S+@\S+\.\S+$/.test(info.email)) {
            errors.email = '邮箱格式不正确';
        }
        if (info.username && info.username.length < 3) {
            errors.username = '用户名至少3个字符';
        }
        return errors;
    };
    return { userInfo, token, updateToken, fetchUserInfo, updateUserProfile, validateUpdateInfo };

});
