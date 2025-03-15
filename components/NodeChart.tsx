import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { NodeData } from '../types/NodeTypes';

interface Props {
  data: NodeData[];
  onNodeClick: (node: NodeData) => void;
  isLoading?: boolean;
  error?: string;
}

export const NodeChart: React.FC<Props> = ({ data, onNodeClick, isLoading, error }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const handleKeyDown = (event: KeyboardEvent, nodes: NodeData[]) => {
    if (!selectedNodeId) {
      setSelectedNodeId(nodes[0]?.id);
      return;
    }

    const currentIndex = nodes.findIndex(n => n.id === selectedNodeId);
    
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        const nextIndex = (currentIndex + 1) % nodes.length;
        setSelectedNodeId(nodes[nextIndex].id);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        const prevIndex = currentIndex - 1 < 0 ? nodes.length - 1 : currentIndex - 1;
        setSelectedNodeId(nodes[prevIndex].id);
        break;
      case 'Enter':
      case ' ':
        const selectedNode = nodes.find(n => n.id === selectedNodeId);
        if (selectedNode) onNodeClick(selectedNode);
        break;
    }
  };

  useEffect(() => {
    if (!svgRef.current || !data.length) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Create tooltip
    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'node-tooltip')
      .style('opacity', 0);

    const simulation = d3.forceSimulation(data)
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('link', d3.forceLink(data.flatMap((node: { links: any[]; id: any; }) => 
        node.links.map((link: any) => ({ source: node.id, target: link }))
      )).distance(100));

    // Create links
    const links = svg.selectAll('line')
      .data(simulation.force('link').links())
      .enter()
      .append('line')
      .attr('class', 'node-link')
      .attr('stroke', 'var(--line-color)')
      .attr('stroke-opacity', 0.6);

    // Create node groups
    const nodeGroups = svg.selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'node-group')
      .attr('tabindex', 0)
      .attr('role', 'button')
      .attr('aria-label', (d: { title: any; }) => `Node ${d.title}`)
      .on('click', (event: any, d: any) => onNodeClick(d))
      .on('mouseover', (event: { pageX: number; pageY: number; }, d: { title: any; preview: any; }) => {
        tooltip.transition()
          .duration(200)
          .style('opacity', .9);
        tooltip.html(`${d.title}<br/>${d.preview}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });

    // Add circles to node groups
    nodeGroups.append('circle')
      .attr('r', 10)
      .attr('fill', 'var(--node-color)')
      .attr('class', (d: { id: any; }) => `node ${selectedNodeId === d.id ? 'selected' : ''}`);

    // Add labels to node groups
    nodeGroups.append('text')
      .text((d: { title: any; }) => d.title)
      .attr('dy', 20)
      .attr('text-anchor', 'middle')
      .attr('fill', 'var(--text-primary)')
      .attr('class', 'node-label');

    simulation.on('tick', () => {
      links
        .attr('x1', (d: { source: { x: any; }; }) => d.source.x)
        .attr('y1', (d: { source: { y: any; }; }) => d.source.y)
        .attr('x2', (d: { target: { x: any; }; }) => d.target.x)
        .attr('y2', (d: { target: { y: any; }; }) => d.target.y);

      nodeGroups
        .attr('transform', (d: { x: any; y: any; }) => `translate(${d.x},${d.y})`);
    });

    // Add keyboard event listener
    window.addEventListener('keydown', (e) => handleKeyDown(e, data));
    return () => {
      window.removeEventListener('keydown', (e) => handleKeyDown(e, data));
      simulation.stop();
      tooltip.remove();
    };
  }, [data, onNodeClick, selectedNodeId]);

  if (isLoading) {
    return <div className="chart-loading" role="status">Loading wiki graph...</div>;
  }

  if (error) {
    return <div className="chart-error" role="alert">{error}</div>;
  }

  return (
    <svg 
      ref={svgRef} 
      width="100%" 
      height="100%" 
      className="node-chart"
      role="application"
      aria-label="Wiki connection graph"
    />
  );
};
