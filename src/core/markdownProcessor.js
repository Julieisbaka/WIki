const marked = require('marked');

function processMarkdown(content) {
    const tokens = marked.lexer(content);
    const structuredData = {
        headings: [],
        links: [],
        paragraphs: []
    };

    tokens.forEach(token => {
        if (token.type === 'heading') {
            structuredData.headings.push({
                text: token.text,
                level: token.depth
            });
        } else if (token.type === 'link') {
            structuredData.links.push({
                text: token.text,
                href: token.href
            });
        } else if (token.type === 'paragraph') {
            structuredData.paragraphs.push(token.text);
        }
    });

    return structuredData;
}

module.exports = processMarkdown;