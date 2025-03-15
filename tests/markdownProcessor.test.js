const markdownProcessor = require('../src/core/markdownProcessor');

describe('Markdown Processor', () => {
    test('should process simple Markdown content correctly', () => {
        const input = '# Title\n\nThis is a [link](page1) and another [link](page2).';
        const expectedOutput = {
            title: 'Title',
            links: [
                { text: 'link', href: 'page1' },
                { text: 'link', href: 'page2' }
            ]
        };
        expect(markdownProcessor(input)).toEqual(expectedOutput);
    });

    test('should handle Markdown content with no links', () => {
        const input = '# Title\n\nThis is some text without links.';
        const expectedOutput = {
            title: 'Title',
            links: []
        };
        expect(markdownProcessor(input)).toEqual(expectedOutput);
    });

    test('should process Markdown content with multiple links', () => {
        const input = '# Another Title\n\n[link1](page1) and [link2](page2) and [link3](page3).';
        const expectedOutput = {
            title: 'Another Title',
            links: [
                { text: 'link1', href: 'page1' },
                { text: 'link2', href: 'page2' },
                { text: 'link3', href: 'page3' }
            ]
        };
        expect(markdownProcessor(input)).toEqual(expectedOutput);
    });

    test('should return an empty object for empty input', () => {
        const input = '';
        const expectedOutput = {
            title: '',
            links: []
        };
        expect(markdownProcessor(input)).toEqual(expectedOutput);
    });
});