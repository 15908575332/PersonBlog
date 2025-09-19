// src/utils/clearStorage.js
/**
 * 清除当前域名下所有 localStorage 数据
 * @param {boolean} includeAll 是否清除所有标签页的存储（默认仅当前标签页）
 */
export function clearAllLocalStorage(includeAll = false) {
    try {
        // 当前标签页的 localStorage
        localStorage.clear();

        // 可选：清除其他同源标签页的 localStorage（需配合 storage 事件监听）
        if (includeAll) {
            window.addEventListener('storage', function handler(event) {
                if (event.key === 'dummyKey' && event.newValue === null) {
                    localStorage.clear();
                    window.removeEventListener('storage', handler);
                }
            });
            // 触发其他标签页的 storage 事件（通过修改一个不存在的键）
            localStorage.setItem('dummyKey', Date.now().toString());
            localStorage.removeItem('dummyKey');
        }

        console.log('localStorage 所有数据已清除');
    } catch (error) {
        console.error('清除 localStorage 失败:', error);
    }
}