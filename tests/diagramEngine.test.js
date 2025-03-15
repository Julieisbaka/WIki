import { DiagramEngine } from '../src/core/diagramEngine';
import { Node } from '../src/models/Node';
import { Link } from '../src/models/Link';

describe('DiagramEngine', () => {
    let diagramEngine;

    beforeEach(() => {
        diagramEngine = new DiagramEngine();
    });

    test('should initialize with empty nodes and links', () => {
        expect(diagramEngine.nodes).toEqual([]);
        expect(diagramEngine.links).toEqual([]);
    });

    test('should add a node correctly', () => {
        const node = new Node('Node1');
        diagramEngine.addNode(node);
        expect(diagramEngine.nodes).toContain(node);
    });

    test('should create a link between nodes', () => {
        const node1 = new Node('Node1');
        const node2 = new Node('Node2');
        diagramEngine.addNode(node1);
        diagramEngine.addNode(node2);
        const link = new Link(node1, node2);
        diagramEngine.addLink(link);
        expect(diagramEngine.links).toContain(link);
    });

    test('should calculate node size based on links', () => {
        const node1 = new Node('Node1');
        const node2 = new Node('Node2');
        const node3 = new Node('Node3');
        diagramEngine.addNode(node1);
        diagramEngine.addNode(node2);
        diagramEngine.addNode(node3);
        
        const link1 = new Link(node1, node2);
        const link2 = new Link(node1, node3);
        diagramEngine.addLink(link1);
        diagramEngine.addLink(link2);

        expect(node1.size).toBe(2); // Node1 has 2 links
        expect(node2.size).toBe(1); // Node2 has 1 link
        expect(node3.size).toBe(1); // Node3 has 1 link
    });

    test('should render the diagram correctly', () => {
        const node = new Node('Node1');
        diagramEngine.addNode(node);
        const renderedDiagram = diagramEngine.render();
        expect(renderedDiagram).toBeDefined();
        expect(renderedDiagram.nodes).toContain(node);
    });
});