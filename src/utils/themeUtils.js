export const getCurrentTheme = () => {
    const theme = localStorage.getItem('theme') || 'light';
    return theme;
};

export const setTheme = (theme) => {
    localStorage.setItem('theme', theme);
    applyTheme(theme);
};

const applyTheme = (theme) => {
    const body = document.body;
    body.classList.remove('light', 'dark', 'high-contrast');
    body.classList.add(theme);
};

export const getFontSize = () => {
    const fontSize = localStorage.getItem('fontSize') || '16px';
    return fontSize;
};

export const setFontSize = (size) => {
    localStorage.setItem('fontSize', size);
    document.body.style.fontSize = size;
};

export const toggleHighContrast = () => {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'high-contrast' ? 'light' : 'high-contrast';
    setTheme(newTheme);
};