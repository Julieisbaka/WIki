class Node {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.links = [];
        this.size = 1; // Default size
    }

    addLink(link) {
        this.links.push(link);
        this.updateSize();
    }

    updateSize() {
        this.size = Math.max(1, this.links.length); // Size based on number of links
    }

    getLinkCount() {
        return this.links.length;
    }

    getDetails() {
        return {
            id: this.id,
            title: this.title,
            linkCount: this.getLinkCount(),
        };
    }
}

export default Node;