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
    const theme = savedTheme || getDefaultTheme();
    setTheme(theme);
    return theme;
}

// 监听系统主题变化
export const watchSystemTheme = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('app-theme')) {
            setTheme(e.matches ? THEME_ENUM.DARK : THEME_ENUM.LIGHT);
        }
    });
}