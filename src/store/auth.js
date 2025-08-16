import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(JSON.parse(localStorage.getItem('user')))
    const token = ref(localStorage.getItem('authToken'))
    const tokenExpiry = ref(localStorage.getItem('tokenExpiry'))

    // 注销动作
    const logout = () => {
        user.value = null
        token.value = null
        expiresAt.value = null
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('expiresAt')

        // 检查 token 是否过期
        const isTokenValid = computed(() => {
            return expiresAt.value && new Date() < new Date(expiresAt.value)
        })

        // 初始化时检查 token 有效性
        if (expiresAt.value && !isTokenValid.value) {
            logout()
        }
    }
    return {
        user,
        token,
        tokenExpiry,
        logout,
    }
});