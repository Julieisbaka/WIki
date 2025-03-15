const fs = require('fs');
const path = require('path');

class WikiValidator {
    constructor(wikiRoot) {
        this.wikiRoot = wikiRoot;
        this.errors = [];
    }

    validateFile(filePath) {
        const content = fs.readFileSync(filePath, 'utf8');
        const errors = [];

        // Check for required header
        if (!content.trim().startsWith('# ')) {
            errors.push('Missing level 1 header (# Title)');
        }

        // Validate links
        const links = this.extractLinks(content);
        links.forEach(({ text, link }) => {
            if (!this.isValidWikiLink(link)) {
                errors.push(`Broken wiki link: "${link}" in text "${text}"`);
            }
        });

        if (errors.length > 0) {
            this.errors.push({
                file: path.relative(this.wikiRoot, filePath),
                errors
            });
            return false;
        }
        return true;
    }

    extractLinks(content) {
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const links = [];
        let match;
        
        while ((match = linkRegex.exec(content)) !== null) {
            links.push({
                text: match[1],
                link: match[2]
            });
        }
        return links;
    }

    isValidWikiLink(link) {
        // Allow external links and anchors
        if (link.startsWith('http') || link.startsWith('#')) {
            return true;
        }

        // Check if wiki page exists
        const wikiPath = path.join(this.wikiRoot, 'wiki', `${link}.md`);
        return fs.existsSync(wikiPath);
    }

    getErrors() {
        return this.errors;
    }
}

module.exports = WikiValidator;
