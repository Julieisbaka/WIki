const { execSync } = require('child_process');
const path = require('path');
const WikiValidator = require('./wikiValidation');

const wikiRoot = path.resolve(__dirname, '..');
const validator = new WikiValidator(wikiRoot);
let hasErrors = false;

try {
    // Get staged wiki files
    const stagedFiles = execSync('git diff --cached --name-only --diff-filter=ACMR "wiki/*.md"')
        .toString()
        .trim()
        .split('\n')
        .filter(Boolean);

    if (stagedFiles.length > 0) {
        console.log('Validating wiki changes...');
        
        stagedFiles.forEach(file => {
            const filePath = path.join(wikiRoot, file);
            if (!validator.validateFile(filePath)) {
                hasErrors = true;
            }
        });

        if (hasErrors) {
            console.error('\nValidation errors found:');
            validator.getErrors().forEach(error => {
                console.error(`\nFile: ${error.file}`);
                error.errors.forEach(err => console.error(`  - ${err}`));
            });
            process.exit(1);
        } else {
            console.log('Wiki validation passed!');
        }
    }
} catch (error) {
    console.error('Error during wiki validation:', error);
    process.exit(1);
}
