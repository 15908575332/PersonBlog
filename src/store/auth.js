import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    // 从 localStorage 初始化状态
    const user = ref(JSON.parse(localStorage.getItem('user') || null))
    const token = ref(localStorage.getItem('token') || null)
    const expiresAt = ref(localStorage.getItem('expiresAt') || null)

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

    return {
        user,
        token,
        expiresAt,
        isAuthenticated,
        logout
    }
})