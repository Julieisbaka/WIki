import React from 'react';
import PropTypes from 'prop-types';

const NodeDetail = ({ node, onClose }) => {
    return (
        <div className="node-detail">
            <button className="close-button" onClick={onClose}>Close</button>
            <h2>{node.title}</h2>
            <p>{node.description}</p>
            <h3>Links:</h3>
            <ul>
                {node.links.map((link, index) => (
                    <li key={index}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

NodeDetail.propTypes = {
    node: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        links: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })).isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default NodeDetail;