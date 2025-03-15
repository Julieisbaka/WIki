const { execSync } = require('child_process');
const path = require('path');
const LinkValidator = require('./linkValidation');

const wikiRoot = path.resolve(__dirname, '..');
const validator = new LinkValidator(wikiRoot);
let hasErrors = false;

try {
    // Get staged markdown files
    const stagedFiles = execSync('git diff --cached --name-only --diff-filter=ACMR "*.md"')
        .toString()
        .trim()
        .split('\n')
        .filter(Boolean);

    if (stagedFiles.length > 0) {
        console.log('Checking for broken links in staged Markdown files...');
        
        stagedFiles.forEach(file => {
            const filePath = path.join(wikiRoot, file);
            if (!validator.validateLinks(filePath)) {
                hasErrors = true;
            }
        });

        if (hasErrors) {
            console.error('\nBroken links found:');
            validator.getErrors().forEach(error => {
                console.error(`\n${error.file}:`);
                console.error(`  ${error.message}`);
            });
            process.exit(1);
        }
    }
} catch (error) {
    console.error('Error during link validation:', error);
    process.exit(1);
}
