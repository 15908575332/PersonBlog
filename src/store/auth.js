import axios from 'axios'
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    // 从 localStorage 初始化状态
    const user = ref(JSON.parse(localStorage.getItem('user') || null))
    const token = ref(localStorage.getItem('token') || null)
    const expiresAt = ref(localStorage.getItem('expiresAt') || null)
    const expiresInMs = ref(localStorage.getItem('expiresInMs') || null)

    // 注销方法
    const logout = () => {
        user.value = null
        token.value = null
        expiresAt.value = null
        expiresInMs.value = null


        // 清除 localStorage
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('expiresAt')
        localStorage.removeItem('expiresInMs')
    }
    // 计算属性：检查 token 是否有效（存在且未过期）
    const isTokenValid = computed(() => {
        return expiresAt.value && new Date() < new Date(expiresAt.value)
    })

    // 计算属性：用户是否已认证
    const isAuthenticated = computed(() => {
        return !!token.value && isTokenValid.value
    })

    // 自动清理过期的 token
    const cleanupExpiredToken = () => {
        if (expiresAt.value && !isTokenValid.value) {
            logout()
        }
    }

    // 初始化时立即执行一次清理
    cleanupExpiredToken()

    // 监听 expiresAt 变化，自动处理过期
    watch(expiresAt, cleanupExpiredToken)

    //更新用户信息.
    const updateUserProfile = async (updateData) => {
        try {
            const response = await axios.post('http://localhost:3000/user/updateUserInfo', updateData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.value}`
                }
            })
            const result = response.data;
            user.value = result.user;

            // 更新本地存储
            localStorage.setItem('user', JSON.stringify(user.value));
            return result

        } catch (error) {
            let errorMsg = '网络请求失败';

            if (error.response) {
                // 优先使用后端返回的错误消息
                errorMsg = error.response.data?.message ||
                    (error.response.data?.validationErrors
                        ? '数据验证失败'
                        : '更新失败');
            }
            throw new Error(errorMsg);
        }
    }

    // 刷新token
    const refreshToken = async () => {
        try {
            // 检查当前是否有可用的 token
            if (!token.value) {
                throw new Error("No token available for refresh");
            }

            // 发送刷新 token 的请求
            const response = await axios.post('http://localhost:3000/user/refresh', {}, {
                headers: {
                    'Authorization': `Bearer ${token.value}`
                }
            });

            // 检查响应是否有效
            if (!response.data || !response.data.accessToken) {
                throw new Error("Invalid refresh token response");
            }

            // 更新 store 状态
            token.value = response.data.accessToken;
            expiresAt.value = response.data.expiresAt || new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 默认1小时

            // 更新本地存储
            localStorage.setItem('token', token.value);
            localStorage.setItem('expiresAt', expiresAt.value);

            return true; // 表示刷新成功

        } catch (error) {
            console.error("Token refresh failed:", error);

            // 刷新失败时清除用户状态
            logout();

            // 处理不同的错误情况
            let errorMsg = 'Token refresh failed';

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // 根据 HTTP 状态码细化错误消息
                    switch (error.response.status) {
                        case 401:
                            errorMsg = 'Session expired, please login again';
                            break;
                        case 403:
                            errorMsg = 'Refresh token rejected';
                            break;
                        default:
                            errorMsg = `Server error: ${error.response.status}`;
                    }
                } else if (error.request) {
                    errorMsg = 'No response from server';
                }
            } else if (error instanceof Error) {
                errorMsg = error.message;
            }

            throw new Error(errorMsg); // 抛出错误以便调用者处理
        }
    };
    return {
        user,
        token,
        expiresAt,
        isAuthenticated,
        logout,
        updateUserProfile,
        refreshToken
    }
})