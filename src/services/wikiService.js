const fs = require('fs');
const path = require('path');
const { parseMarkdownFile } = require('../core/fileParser');

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

const wikiService = {
    async getAllNodes() {
        const wikiDir = path.join(__dirname, '../../wiki');
        const files = await fs.promises.readdir(wikiDir);
        const markdownFiles = files.filter(file => file.endsWith('.md'));
        
        const nodes = await Promise.all(
            markdownFiles.map(file => parseMarkdownFile(path.join(wikiDir, file)))
        );

        return nodes.filter(node => node !== null);
    },

    async createDiagramData() {
        const nodes = await this.getAllNodes();
        const links = [];
        
        // Create links from parsed Markdown files
        nodes.forEach(node => {
            node.links.forEach(link => {
                const targetFile = `${link.href}.md`;
                if (nodes.some(n => n.id === link.href)) {
                    links.push({
                        source: node.id,
                        target: link.href,
                        label: link.text
                    });
                }
            });
        });

        return { nodes, links };
    }
};

module.exports = wikiService;