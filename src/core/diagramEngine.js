class DiagramEngine {
    constructor() {
        this.nodes = [];
        this.links = [];
        this.zoomLevel = 1;
    }

    addNode(node) {
        this.nodes.push(node);
    }

    addLink(link) {
        this.links.push(link);
        this.updateNodeSizes();
    }

    updateNodeSizes() {
        const linkCounts = {};

        this.links.forEach(link => {
            linkCounts[link.source] = (linkCounts[link.source] || 0) + 1;
            linkCounts[link.target] = (linkCounts[link.target] || 0) + 1;
        });

        this.nodes.forEach(node => {
            node.size = this.calculateNodeSize(linkCounts[node.id]);
        });
    }

    calculateNodeSize(linkCount) {
        return linkCount ? Math.min(100 + linkCount * 10, 200) : 100;
    }

    render() {
        // Logic to render the diagram using a library like D3.js or similar
    }

    zoomIn() {
        this.zoomLevel += 0.1;
        this.applyZoom();
    }

    zoomOut() {
        this.zoomLevel = Math.max(0.1, this.zoomLevel - 0.1);
        this.applyZoom();
    }

    applyZoom() {
        // Logic to apply zoom level to the diagram rendering
    }

    getNodeById(id) {
        return this.nodes.find(node => node.id === id);
    }
}

export default DiagramEngine;