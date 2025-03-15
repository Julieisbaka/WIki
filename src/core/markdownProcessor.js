const marked = require('marked');

function processMarkdown(content) {
    const tokens = marked.lexer(content);
    const structuredData = {
        title: '',
        links: [],
        content: content,
        headings: []
    };

    tokens.forEach(token => {
        if (token.type === 'heading' && token.depth === 1) {
            structuredData.title = token.text;
        } else if (token.type === 'heading') {
            structuredData.headings.push({
                text: token.text,
                level: token.depth
            });
        } else if (token.type === 'link') {
            structuredData.links.push({
                text: token.text,
                href: token.href,
                title: token.title || token.text
            });
        }
    });

    // If no title found, use first heading or 'Untitled'
    if (!structuredData.title && structuredData.headings.length > 0) {
        structuredData.title = structuredData.headings[0].text;
    } else if (!structuredData.title) {
        structuredData.title = 'Untitled';
    }

    return structuredData;
}

module.exports = processMarkdown;