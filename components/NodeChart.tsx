import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { NodeData } from '../types/NodeTypes';

interface Props {
  data: NodeData[];
  onNodeClick: (node: NodeData) => void;
}

export const NodeChart: React.FC<Props> = ({ data, onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight;

    const simulation = d3.forceSimulation(data)
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('link', d3.forceLink(data.flatMap(node => 
        node.links.map(link => ({ source: node.id, target: link }))
      )).distance(100));

    const links = svg.selectAll('line')
      .data(simulation.force('link').links())
      .enter()
      .append('line')
      .style('stroke', '#999')
      .style('stroke-opacity', 0.6);

    const nodes = svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('r', 10)
      .style('fill', '#69b3a2')
      .on('click', (event, d) => onNodeClick(d));

    simulation.on('tick', () => {
      links
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      nodes
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });

    return () => simulation.stop();
  }, [data, onNodeClick]);

  return <svg ref={svgRef} width="100%" height="100%" />;
};
