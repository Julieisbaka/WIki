export const userPreferencesService = (() => {
    let preferences = {
        theme: 'light', // default theme
        font: 'Arial', // default font
        fontSize: '16px', // default font size
    };

    const setTheme = (theme) => {
        preferences.theme = theme;
        applyTheme();
    };

    const setFont = (font) => {
        preferences.font = font;
        applyFont();
    };

    const setFontSize = (size) => {
        preferences.fontSize = size;
        applyFontSize();
    };

    const applyTheme = () => {
        document.body.className = preferences.theme;
    };

    const applyFont = () => {
        document.body.style.fontFamily = preferences.font;
    };

    const applyFontSize = () => {
        document.body.style.fontSize = preferences.fontSize;
    };

    const getPreferences = () => {
        return preferences;
    };

    return {
        setTheme,
        setFont,
        setFontSize,
        getPreferences,
    };
})();