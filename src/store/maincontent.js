//站点主要内容store 全局
import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useMainStore = defineStore('main', () => {
    const navData = ref([]); //导航数据
    const contentData = ref(''); //主要内容数据
    const mainContent = ref([]); //主要内容数据(内存)
    const tags = ref([]); //标签数据
    const loading = ref(false);
    const error = ref(null);
    
    const fetchMainContent = async (category_id, user_id) => {
        loading.value = true;
        try {
            const response = await axios.get('http://localhost:3000/main/getArticleInfo', {
                params: {
                    category_id: category_id,
                    user_id: user_id,
                }
            });
            if (!response.data) throw new Error("无效数据");
            contentData.value = response.data.result;
            mainContent.value = response.data.result;
            tags.value = response.data.tags;
            // localStorage.setItem('mainContent', JSON.stringify(mainContent.value));
        } catch (err) {
            console.error("请求错误:", err);
            error.value = "数据加载失败";
            mainContent.value = []; // 确保错误时清空数据
        } finally {
            loading.value = false;
        }
    };
    const fetchNavData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/main/getNavData');
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
