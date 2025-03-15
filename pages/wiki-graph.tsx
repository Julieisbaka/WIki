import { useEffect, useState } from 'react';
import { NodeChart } from '../components/NodeChart';
import { NodeDetails } from '../components/NodeDetails';
import { MarkdownParser } from '../services/MarkdownParser';
import { NodeData } from '../types/NodeTypes';
import { useRouter } from 'next/router';

export default function WikiGraph() {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadNodes = async () => {
      try {
        const data = await MarkdownParser.parseDirectory('d:/Data/Wiki/pages');
        setNodes(data);
      } catch (error) {
        console.error('Failed to load markdown files:', error);
      }
    };

    loadNodes();
  }, []);

  const handleNodeClick = (node: NodeData) => {
    setSelectedNode(node);
  };

  const handleCloseDetails = () => {
    setSelectedNode(null);
  };

  const handleNavigate = (path: string) => {
    // Convert file path to URL path
    const urlPath = path
      .replace('d:/Data/Wiki/pages/', '')
      .replace('.md', '');
    router.push(`/${urlPath}`);
  };

  return (
    <div className="wiki-graph-container">
      <NodeChart 
        data={nodes} 
        onNodeClick={handleNodeClick}
      />
      <NodeDetails
        node={selectedNode}
        onClose={handleCloseDetails}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
