const fs = require('fs');
const path = require('path');

class LinkValidator {
    constructor(wikiRoot) {
        this.wikiRoot = wikiRoot;
        this.errors = [];
    }

    validateLinks(filePath) {
        const content = fs.readFileSync(filePath, 'utf8');
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        let match;
        let hasErrors = false;

        while ((match = linkRegex.exec(content)) !== null) {
            const [_, text, link] = match;
            if (!this.isValidLink(link)) {
                this.errors.push({
                    file: path.relative(this.wikiRoot, filePath),
                    link,
                    text,
                    message: `Broken link: "${link}" referenced in "${text}"`
                });
                hasErrors = true;
            }
        }

        return !hasErrors;
    }

    isValidLink(link) {
        // Ignore external links and anchors
        if (link.startsWith('http') || link.startsWith('#')) {
            return true;
        }

        // Check if the referenced markdown file exists
        const targetFile = path.join(this.wikiRoot, 'wiki', `${link}.md`);
        return fs.existsSync(targetFile);
    }

    getErrors() {
        return this.errors;
    }
}

module.exports = LinkValidator;
