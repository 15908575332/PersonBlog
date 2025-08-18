import axios from 'axios'
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    // 从 localStorage 初始化状态
    const user = ref(JSON.parse(localStorage.getItem('user') || null))
    const token = ref(localStorage.getItem('token') || null)
    const expiresAt = ref(localStorage.getItem('expiresAt') || null)
    // 注销方法
    const logout = () => {
        user.value = null
        token.value = null
        expiresAt.value = null

        // 清除 localStorage
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('expiresAt')
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

    return {
        user,
        token,
        expiresAt,
        isAuthenticated,
        logout,
        updateUserProfile
    }
})