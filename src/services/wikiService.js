const fs = require('fs');
const path = require('path');

// Function to fetch wiki data based on the provided node name
const fetchWikiData = (nodeName) => {
    const filePath = path.join(__dirname, '../..', 'wiki', `${nodeName}.md`);
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
};

// Function to get all links from a Markdown file
const extractLinksFromMarkdown = (markdownContent) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let links = [];
    let match;
    while ((match = linkRegex.exec(markdownContent)) !== null) {
        links.push({ title: match[1], url: match[2] });
    }
    return links;
};

// Function to get details for a specific node
const getNodeDetails = async (nodeName) => {
    try {
        const markdownContent = await fetchWikiData(nodeName);
        const links = extractLinksFromMarkdown(markdownContent);
        return { nodeName, links };
    } catch (error) {
        throw new Error(`Error fetching details for node ${nodeName}: ${error.message}`);
    }
};

// Exporting the functions for use in other parts of the application
module.exports = {
    fetchWikiData,
    extractLinksFromMarkdown,
    getNodeDetails,
};