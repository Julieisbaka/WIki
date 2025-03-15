const fs = require('fs');
const path = require('path');
const fileParser = require('../src/core/fileParser');

describe('File Parser', () => {
    const markdownFilePath = path.join(__dirname, 'testMarkdown.md');

    beforeAll(() => {
        const markdownContent = `
# Test Document

This is a [link to page one](page-one).
This is a [link to page two](page-two).
        `;
        fs.writeFileSync(markdownFilePath, markdownContent);
    });

    afterAll(() => {
        fs.unlinkSync(markdownFilePath);
    });

    test('should parse links from markdown file', () => {
        const result = fileParser(markdownFilePath);
        expect(result).toEqual({
            title: 'Test Document',
            links: [
                { text: 'link to page one', href: 'page-one' },
                { text: 'link to page two', href: 'page-two' }
            ]
        });
    });

    test('should return empty object for non-existent file', () => {
        const result = fileParser('non-existent-file.md');
        expect(result).toEqual({});
    });
});