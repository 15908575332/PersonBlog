//用户信息store 全局
import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { jwtDecode } from 'jwt-decode'
import { message } from 'ant-design-vue'
import { clearAllLocalStorage } from '@/utils/clearAllLocalStorage';
import { API_ORIGIN } from '@/api/base';
import type {
    JwtPayload,
    LoginCredentials,
    LoginResponse,
    RefreshTokenResult,
    UpdateUserProfileResult,
    UserInfo,
    UserUpdatePayload,
} from '@/types/store'

export const useAuthStore = defineStore('auth', () => {
    const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
        try {
            const response: AxiosResponse<LoginResponse> = await axios.post(`${API_ORIGIN}/user/login`, credentials);
            if (response.status === 401) {
                message.warning('密码错误')
            }

            // 更新状态
            user.value = response.data.user;
            token.value = response.data.token;
            const decoded = jwtDecode<JwtPayload>(response.data.token);
            iat.value = decoded.iat; //生效时间
            // 保存到本地存储
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('token', response.data.token); //token
            localStorage.setItem('iat', String(decoded.iat)); //生成时间
            return response.data;

        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.code === 'ERR_NETWORK') {
                alert('网络错误，后端拒绝连接');
            }
            // 错误处理
            throw error;
        }
    };

    // 从 localStorage 初始化状态
    const user = ref<UserInfo | null>(JSON.parse(localStorage.getItem('user') || 'null'))
    const token = ref<string | null>(localStorage.getItem('token') || null)
    // localStorage 取出的是字符串，登录/刷新后写入的是 jwt 载荷里的数字，二者并存
    const iat = ref<string | number | null>(localStorage.getItem('iat') || null)
    // 注销方法
    const logout = (): void => {
        user.value = null
        token.value = null
        iat.value = null

        // 清除本地 localStorage 所有数据
        clearAllLocalStorage();

    }
    //获取token过期时间
    const getTokenExpiration = (token: string): number => {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.exp; // ✅ 正确的过期时间（秒级时间戳）
    };

    // 计算 Token 有效性
    const isTokenValid = computed<boolean>(() => {
        if (!token.value) return false;
        const expiration = getTokenExpiration(token.value);
        const nowInSeconds = Math.floor(Date.now() / 1000);
        return nowInSeconds < expiration; // ✅ 正确比较
    });

    // 计算属性：用户是否已认证
    const isAuthenticated = computed<boolean>(() => {
        // 同时检查 token 存在且有效
        return !!token.value;
    });

    // 自动清理过期的 token
    const cleanupExpiredToken = (): void => {
        if (iat.value && !isTokenValid.value) {
            logout()
        }
    }

    // 初始化时立即执行一次清理
    cleanupExpiredToken()

    // 监听 iat 变化，自动处理过期
    watch(iat, cleanupExpiredToken)

    //更新用户信息.
    const updateUserProfile = async (updateData: UserUpdatePayload): Promise<UpdateUserProfileResult> => {
        try {
            const response: AxiosResponse<UpdateUserProfileResult> = await axios.post(`${API_ORIGIN}/user/updateUserInfo`, updateData, {
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

            if (axios.isAxiosError(error) && error.response) {
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
    const refreshToken = async (): Promise<RefreshTokenResult> => {
        try {
            if (!token.value) {
                throw new Error("No token available for refresh");
            }

            const response: AxiosResponse<{ token: string }> = await axios.post(`${API_ORIGIN}/user/refresh`, {}, {
                headers: {
                    'Authorization': `Bearer ${token.value}`
                }
            });

            // 检查响应数据
            if (!response.data || !response.data.token) {
                throw new Error("Invalid refresh token response");
            }

            // 更新store状态
            token.value = response.data.token;
            const decoded = jwtDecode<JwtPayload>(token.value);
            iat.value = decoded.iat;

            // 更新本地存储
            localStorage.setItem('token', token.value);
            localStorage.setItem('iat', String(iat.value));

            console.log('Token刷新成功');
            return { success: true, reason: 'REFRESHED' }; // 统一返回对象

        } catch (error) {
            console.error("Token refresh failed:", error);

            // 处理400状态码（无需刷新）
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                console.warn("Token refresh not needed");
                return { success: true, reason: 'NOT_NEEDED' }; // 统一返回对象
            }

            // 其他错误情况
            logout();

            let errorMsg = 'Token refresh failed';
            if (axios.isAxiosError(error)) {
                if (error.response) {
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
            }

            throw new Error(errorMsg);
        }
    };
    return {
        user,
        token,
        iat,
        isAuthenticated,
        isTokenValid,
        logout,
        updateUserProfile,
        refreshToken,
        login
    }
})
