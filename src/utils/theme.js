export const THEME_ENUM = {
    DARK: 'dark',
    LIGHT: 'light'
}

export const getDefaultTheme = () => {
    // 检查系统偏好
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return THEME_ENUM.DARK;
    }
    return THEME_ENUM.LIGHT;
}

export const setTheme = (theme) => {
    if (!Object.values(THEME_ENUM).includes(theme)) {
        console.warn(`不支持的主题: ${theme}`);
        return;
    }

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
}

export const initTheme = () => {
    const savedTheme = localStorage.getItem('app-theme');
    const defaultTheme = getDefaultTheme();

    // 检查保存的主题是否有效
    const theme = Object.values(THEME_ENUM).includes(savedTheme)
        ? savedTheme
        : defaultTheme;

    setTheme(theme); // 确保设置有效值
    return theme;
}

// 监听系统主题变化
export const watchSystemTheme = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
        const systemTheme = e.matches ? 'dark' : 'light';
        // 仅在没有手动设置时跟随系统
        if (!localStorage.getItem('app-theme')) {
            setTheme(systemTheme);
            currentTheme.value = systemTheme;
        }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // 初始检查系统主题
    if (!localStorage.getItem('app-theme')) {
        handleSystemThemeChange(mediaQuery);
    }
}