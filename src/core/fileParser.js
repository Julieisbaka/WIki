const fs = require('fs');
const path = require('path');

/**
 * Parses a Markdown file to extract links and content.
 * @param {string} filePath - The path to the Markdown file.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the content and links.
 */
async function parseMarkdownFile(filePath) {
    const content = await readFile(filePath);
    const links = extractLinks(content);
    return { content, links };
}

/**
 * Reads a file and returns its content.
 * @param {string} filePath - The path to the file.
 * @returns {Promise<string>} - A promise that resolves to the file content.
 */
function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
}

/**
 * Extracts links from the Markdown content.
 * @param {string} content - The Markdown content.
 * @returns {Array<string>} - An array of extracted links.
 */
function extractLinks(content) {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const links = [];
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
        links.push({ text: match[1], url: match[2] });
    }

    return links;
}

module.exports = {
    parseMarkdownFile,
};