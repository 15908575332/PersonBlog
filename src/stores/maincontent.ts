//站点主要内容store 全局
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { API_ORIGIN } from '@/api/base';
import type {
    ArticleInfo,
    ArticleTagRow,
    MainContentResponse,
    NavDataResponse,
    NavItem,
} from '@/types/store';

export const useMainStore = defineStore('main', () => {
    const navData = ref<NavItem[]>([]); //导航数据
    // 初值保持空串（原实现如此），加载成功后为文章数组
    const contentData = ref<ArticleInfo[] | ''>(''); //主要内容数据
    const mainContent = ref<ArticleInfo[]>([]); //主要内容数据(内存)
    const tags = ref<ArticleTagRow[]>([]); //标签数据
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchMainContent = async (category_id: number | string, user_id: number | string): Promise<void> => {
        loading.value = true;
        try {
            const response: AxiosResponse<MainContentResponse> = await axios.get(`${API_ORIGIN}/main/getArticleInfo`, {
                params: {
                    category_id: category_id,
                    user_id: user_id,
                },
                headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` }
            });
            if (!response.data) throw new Error("无效数据");
            contentData.value = response.data.result;
            mainContent.value = response.data.result;
            tags.value = response.data.tags;
            localStorage.setItem('mainContent', JSON.stringify(mainContent.value));
        } catch (err) {
            console.error("请求错误:", err);
            error.value = "数据加载失败";
            mainContent.value = []; // 确保错误时清空数据
        } finally {
            loading.value = false;
        }
    };
    const fetchNavData = async (): Promise<void> => {
        try {
            const response: AxiosResponse<NavDataResponse> = await axios.get(`${API_ORIGIN}/main/getNavData`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` }
            });
            if (!response.data) throw new Error("无效数据");
            navData.value = response.data.navContent;
        } catch (err) {
            console.error("请求错误:", err);
            error.value = "数据加载失败";
            navData.value = []; // 确保错误时清空数据
        }
    };
    return { fetchNavData, navData, fetchMainContent, contentData, tags, loading, error };
});
