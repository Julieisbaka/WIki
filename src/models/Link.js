class Link {
    constructor(sourceNode, targetNode) {
        this.sourceNode = sourceNode;
        this.targetNode = targetNode;
    }

    getSource() {
        return this.sourceNode;
    }

    getTarget() {
        return this.targetNode;
    }

    toString() {
        return `${this.sourceNode} -> ${this.targetNode}`;
    }
}

export default Link;