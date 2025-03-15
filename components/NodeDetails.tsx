import React from 'react';
import { NodeData } from '../types/NodeTypes';

interface Props {
  node: NodeData | null;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const NodeDetails: React.FC<Props> = ({ node, onClose, onNavigate }) => {
  if (!node) return null;

  return (
    <div className="node-details-panel">
      <button className="close-button" onClick={onClose}>×</button>
      <h2>{node.title}</h2>
      <p>{node.preview}</p>
      <div className="links-section">
        <h3>Connected Pages</h3>
        <ul>
          {node.links.map(link => (
            <li key={link}>{link}</li>
          ))}
        </ul>
      </div>
      <button 
        className="navigate-button"
        onClick={() => onNavigate(node.path)}
      >
        Open Page
      </button>
    </div>
  );
};
