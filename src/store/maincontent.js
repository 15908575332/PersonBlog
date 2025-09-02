//站点主要内容store 全局
import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useMainStore = defineStore('main', () => {
    const dataContent = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const fetchMainContent = async (id) => {
        loading.value = true;
        try {
            const response = await axios.get('http://localhost:3000/main/getMainContent', {
                params: {
                    id: id
                }
            });
            if (!response.data) throw new Error("无效数据");
            dataContent.value = response.data;
        } catch (err) {
            console.error("请求错误:", err);
            error.value = "数据加载失败";
            dataContent.value = []; // 确保错误时清空数据
        } finally {
            loading.value = false;
        }
    };
    return { dataContent, fetchMainContent, loading, error };
});