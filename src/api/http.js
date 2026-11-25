// src/api/http.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '@/stores/auth';
import { API_ORIGIN } from './base';
// 创建 Axios 实例（可根据需求配置多个实例）
const service = axios.create({
    baseURL: API_ORIGIN, // 按当前访问 hostname 动态推导（见 src/api/base.js）
    timeout: 5000, // 请求超时时间（5秒）
    // withCredentials: true, // 跨域时是否携带 Cookie（根据后端需求）
});

// --------------------------
// 请求拦截器（发送请求前处理）
// --------------------------
//获取token过期时间
const getTokenExpiration = (token) => {
    const decoded = jwtDecode(token);
    return decoded.exp; // ✅ 正确的过期时间（秒级时间戳）
};
service.interceptors.request.use(
    async (config) => {
        const useStore = useAuthStore();
        let token = localStorage.getItem('token');

        if (token) {
            const expiration = getTokenExpiration(token);
            const remainingTime = expiration - Math.floor(Date.now() / 1000);

            // 仅在 token 仍有效且即将过期时刷新；已过期则交给后端 401 处理，避免过期后无限续命
            if (remainingTime > 0 && remainingTime < 300) {
                try {
                    const refreshResult = await useStore.refreshToken();

                    // 处理refreshToken的不同返回结果
                    if (refreshResult?.success && refreshResult.reason === 'REFRESHED') {
                        // 刷新成功，获取新token
                        token = localStorage.getItem('token');
                        console.log('Token刷新成功，使用新token');
                    } else if (refreshResult?.success && refreshResult.reason === 'NOT_NEEDED') {
                        // 无需刷新，使用原token
                        console.log('Token无需刷新');
                    }
                } catch (error) {
                    console.error('Token刷新失败:', error);
                    // 刷新失败时清除token
                    localStorage.removeItem('token');
                    window.location.href = '/userInfo';
                    return Promise.reject(error);
                }
            }

            // 设置Authorization头（使用最新的token）
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        console.error('请求拦截器错误:', error);
        return Promise.reject(error);
    }
);
// --------------------------
// 响应拦截器（接收响应后处理）
// --------------------------
// 无需登录态的公开接口：它们的 401 属于业务校验失败（如账号或密码错误），不触发跳转
const PUBLIC_PATHS = [
    '/user/login',
    '/user/register',
    '/user/captcha',
    '/user/send-reset-code',
    '/user/verify-reset-code',
    '/user/reset-password'
];
const isPublicRequest = (url = '') => PUBLIC_PATHS.some((path) => url.includes(path));

// 鉴权失效统一处理：仅对需要登录态的接口生效
const handleUnauthorized = (error) => {
    if (isPublicRequest(error.config?.url)) return;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('iat');
    if (window.location.pathname !== '/userInfo') window.location.href = '/userInfo';
};

service.interceptors.response.use(
    (response) => {
        // axios 只在 2xx 进入成功分支，直接返回业务数据
        return response.data;
    },
    async (error) => {
        const status = error.response?.status;
        const message = error.response?.data?.message || '网络异常，请稍后重试';

        // 401 处理放在失败分支才有效（历史误放在成功分支导致成为死代码）
        if (status === 401) {
            handleUnauthorized(error);
            return Promise.reject(error);
        }

        switch (status) {
            case 400:
                // 参数或验证码校验失败，交由调用方按 message 提示
                break;
            case 404:
                console.error('资源不存在');
                break;
            case 429:
                console.error(message);
                break;
            case 500:
                console.error('服务器内部错误');
                break;
            default:
                console.error(message);
        }

        return Promise.reject(error);
    }
);

export default service; // 导出实例
