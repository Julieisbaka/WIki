class DiagramState {
    constructor() {
        this.nodes = [];
        this.links = [];
        this.zoomLevel = 1;
        this.nodePositions = {};
    }

    addNode(node) {
        this.nodes.push(node);
        this.nodePositions[node.id] = { x: 0, y: 0 }; // Default position
    }

    addLink(link) {
        this.links.push(link);
    }

    setNodePosition(nodeId, x, y) {
        if (this.nodePositions[nodeId]) {
            this.nodePositions[nodeId] = { x, y };
        }
    }

    setZoomLevel(level) {
        this.zoomLevel = level;
    }

    getNodePosition(nodeId) {
        return this.nodePositions[nodeId] || { x: 0, y: 0 };
    }

    getZoomLevel() {
        return this.zoomLevel;
    }

    getDiagramData() {
        return {
            nodes: this.nodes,
            links: this.links,
            nodePositions: this.nodePositions,
            zoomLevel: this.zoomLevel,
        };
    }
}

export default DiagramState;