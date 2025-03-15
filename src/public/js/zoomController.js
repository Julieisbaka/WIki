const zoomController = (() => {
    let zoomLevel = 1;
    const zoomStep = 0.1;
    const minZoom = 0.5;
    const maxZoom = 2;

    const setZoomLevel = (newZoomLevel) => {
        zoomLevel = Math.min(Math.max(newZoomLevel, minZoom), maxZoom);
        applyZoom();
    };

    const applyZoom = () => {
        const diagramContainer = document.getElementById('diagram-container');
        if (diagramContainer) {
            diagramContainer.style.transform = `scale(${zoomLevel})`;
            diagramContainer.style.transformOrigin = '0 0';
        }
    };

    const zoomIn = () => {
        setZoomLevel(zoomLevel + zoomStep);
    };

    const zoomOut = () => {
        setZoomLevel(zoomLevel - zoomStep);
    };

    const resetZoom = () => {
        setZoomLevel(1);
    };

    return {
        zoomIn,
        zoomOut,
        resetZoom,
    };
})();

document.getElementById('zoom-in-button').addEventListener('click', zoomController.zoomIn);
document.getElementById('zoom-out-button').addEventListener('click', zoomController.zoomOut);
document.getElementById('reset-zoom-button').addEventListener('click', zoomController.resetZoom);