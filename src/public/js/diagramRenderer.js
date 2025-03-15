const diagramContainer = document.getElementById('diagram-container');
let nodes = [];
let links = [];
let zoomLevel = 1;

// Function to render the diagram
function renderDiagram() {
    clearDiagram();
    nodes.forEach(node => {
        const nodeElement = createNodeElement(node);
        diagramContainer.appendChild(nodeElement);
    });
    links.forEach(link => {
        const linkElement = createLinkElement(link);
        diagramContainer.appendChild(linkElement);
    });
}

// Function to clear the diagram
function clearDiagram() {
    diagramContainer.innerHTML = '';
}

// Function to create a node element
function createNodeElement(node) {
    const nodeElement = document.createElement('div');
    nodeElement.className = 'node';
    nodeElement.style.width = `${node.size * zoomLevel}px`;
    nodeElement.style.height = `${node.size * zoomLevel}px`;
    nodeElement.innerText = node.name;
    nodeElement.draggable = true;

    nodeElement.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', node.id);
    });

    nodeElement.addEventListener('click', () => {
        openNodeMenu(node.id);
    });

    return nodeElement;
}

// Function to create a link element
function createLinkElement(link) {
    const linkElement = document.createElement('line');
    linkElement.setAttribute('x1', link.source.x);
    linkElement.setAttribute('y1', link.source.y);
    linkElement.setAttribute('x2', link.target.x);
    linkElement.setAttribute('y2', link.target.y);
    linkElement.className = 'link';
    return linkElement;
}

// Function to open the node menu
function openNodeMenu(nodeId) {
    // Logic to display the menu for the node
}

// Function to set zoom level
function setZoom(level) {
    zoomLevel = level;
    renderDiagram();
}

// Function to initialize the diagram
function initializeDiagram(data) {
    nodes = data.nodes;
    links = data.links;
    renderDiagram();
}

// Exporting functions for external use
export { initializeDiagram, setZoom };