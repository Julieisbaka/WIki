import React, { useEffect, useRef, useState } from 'react';
import { renderDiagram, updateNodePositions } from '../../public/js/diagramRenderer';
import { handleNodeDrag, handleNodeClick } from '../../public/js/interactionHandlers';
import { zoomIn, zoomOut, resetZoom } from '../../public/js/zoomController';
import './Diagram.css';

const Diagram = ({ nodes, links, onNodeSelect }) => {
    const svgRef = useRef(null);
    const [zoomLevel, setZoomLevel] = useState(1);

    useEffect(() => {
        if (svgRef.current) {
            renderDiagram(svgRef.current, nodes, links, zoomLevel);
        }
    }, [nodes, links, zoomLevel]);

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev * 1.2, 3)); // Max zoom level
        zoomIn(svgRef.current);
    };

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev * 0.8, 0.5)); // Min zoom level
        zoomOut(svgRef.current);
    };

    const handleResetZoom = () => {
        setZoomLevel(1);
        resetZoom(svgRef.current);
    };

    return (
        <div className="diagram-container">
            <div className="zoom-controls">
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>
                <button onClick={handleResetZoom}>Reset Zoom</button>
            </div>
            <svg ref={svgRef} className="diagram-svg" onMouseDown={handleNodeDrag} onClick={handleNodeClick(onNodeSelect)}>
                {/* Diagram nodes and links will be rendered here */}
            </svg>
        </div>
    );
};

export default Diagram;