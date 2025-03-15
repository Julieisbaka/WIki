import React from 'react';

const Menu = ({ node, onClose }) => {
    return (
        <div className="menu">
            <h3>{node.title}</h3>
            <p>{node.description}</p>
            <a href={node.link} target="_blank" rel="noopener noreferrer">View Details</a>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default Menu;