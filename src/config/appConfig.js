module.exports = {
    serverPort: process.env.PORT || 3000,
    defaultTheme: 'light',
    supportedThemes: ['light', 'dark', 'highContrast'],
    defaultFont: 'Arial',
    defaultFontSize: '16px',
    zoomLevel: 1,
    draggableNodes: true,
    nodeSizeFactor: 10, // Factor to determine node size based on link count
    highContrastMode: {
        backgroundColor: '#000',
        textColor: '#FFF',
        linkColor: '#FF0'
    },
    lightMode: {
        backgroundColor: '#FFF',
        textColor: '#000',
        linkColor: '#00F'
    },
    darkMode: {
        backgroundColor: '#121212',
        textColor: '#E0E0E0',
        linkColor: '#BB86FC'
    }
};