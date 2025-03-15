const fs = require('fs');
const path = require('path');

/**
 * Reads a Markdown file and returns its content.
 * @param {string} filePath - The path to the Markdown file.
 * @returns {Promise<string>} - A promise that resolves to the content of the file.
 */
const readMarkdownFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
};

/**
 * Gets the list of Markdown files in a directory.
 * @param {string} dirPath - The path to the directory.
 * @returns {Promise<string[]>} - A promise that resolves to an array of Markdown file paths.
 */
const getMarkdownFiles = (dirPath) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, files) => {
            if (err) {
                return reject(err);
            }
            const markdownFiles = files
                .filter(file => path.extname(file) === '.md')
                .map(file => path.join(dirPath, file));
            resolve(markdownFiles);
        });
    });
};

module.exports = {
    readMarkdownFile,
    getMarkdownFiles
};