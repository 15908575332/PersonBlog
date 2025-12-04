// src/utils/request.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '@/store/auth';
// 创建 Axios 实例（可根据需求配置多个实例）
const service = axios.create({
    baseURL: 'http://localhost:3000', // 从环境变量获取基础 URL（需配置 Vite 或 Vue CLI）
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

            // 如果token即将过期，刷新token
            if (remainingTime < 300) {
                try {
                    const refreshResult = await useStore.refreshToken();

                    // 处理refreshToken的不同返回结果
                    if (refreshResult === true) {
                        // 刷新成功，获取新token
                        token = localStorage.getItem('token');
                        console.log('Token刷新成功，使用新token');
                    } else if (refreshResult === 'NOT_NEEDED') {
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
service.interceptors.response.use(
    (response) => {
        if (response.status !== 200) {
            // 统一处理错误提示（可使用 Element Plus 的 console 或自定义提示）
            console.error(response.data.message || '请求失败，请稍后重试');

            // 特殊状态码处理（如未登录跳转登录页）
            if (response.status === 401) {
                localStorage.removeItem('token'); // 清除失效 token
                window.location.href = '/userInfo'; // 跳转到登录页
            }

            return Promise.reject(new Error(res.message || '请求失败'));
        }

        // 成功时返回业务数据
        return response.data;
    },
    async (error) => {
        // 处理 HTTP 状态码错误（如 404、500）
        const status = error.response?.status;
        const message = error.response?.data?.message || '网络异常，请稍后重试';

        switch (status) {
            case 404:
                console.error('资源不存在');
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