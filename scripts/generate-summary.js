const fs = require('fs');
const path = require('path');

const frontOverviewPath = path.join(__dirname, '..', 'docs', 'tests', 'frontend_tests', 'overview.md');
const frontUnitTestDir = path.join(__dirname, '..', 'docs', 'tests', 'frontend_tests', 'unit_tests');
const fonrtIntegrationTestDir = path.join(__dirname, '..', 'docs', 'tests', 'frontend_tests', 'integ_tests');
const frontConclusionPath = path.join(__dirname, '..', 'docs', 'tests', 'frontend_tests', 'conclusion.md');
const frontSummaryPath = path.join(__dirname, '..', 'docs', 'tests', 'frontend_tests', 'Summary.md');

const backOverviewPath = path.join(__dirname, '..', 'docs', 'tests', 'backend_tests', 'overview.md');
const backUnitTestDir = path.join(__dirname, '..', 'docs', 'tests', 'backend_tests', 'unit_tests');
const backIntegrationTestDir = path.join(__dirname, '..', 'docs', 'tests', 'backend_tests', 'integ_tests');
const backConclusionPath = path.join(__dirname, '..', 'docs', 'tests', 'backend_tests', 'conclusion.md');
const backSummaryPath = path.join(__dirname, '..', 'docs', 'tests', 'backend_tests', 'Summary.md');



function increaseHeadingLevel(markdown) {
    return markdown.replace(/^(\s*)(#{1,6})\s+(.*)$/gm, (match, leadingSpace, hashes, text) => {
        const newHashes = '#'.repeat(hashes.length + 3);
        return `${leadingSpace}${newHashes} ${text.trim()}`;
    });
}

function getComponentTitle(fileName) {
    return `${fileName.replace(/\.test.md$|\.md$/i, '')}`;
}

function appendMarkdownFilesWithHeader(dir, headerTitle, baseDir, headerWritten = { value: false }) {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            appendMarkdownFilesWithHeader(fullPath, headerTitle, baseDir, headerWritten);
        } else if (entry.name.endsWith('.md')) {
            if (!headerWritten.value) {
                frontContent += `## ${headerTitle}\n\n`;
                headerWritten.value = true;
            }

            const componentTitle = getComponentTitle(entry.name);
            frontContent += `### Unit: ${componentTitle}\n\n`;
            const rawData = fs.readFileSync(fullPath, 'utf-8');
            const data = increaseHeadingLevel(rawData);
            // content += data + '\n\n---\n\n';
            frontContent += data + '\n\n';
        }
    }
}

// Append overview.md
let frontContent = '';
let backContent = ''
// Read overview.md
if (fs.existsSync(frontOverviewPath)) {
    const overview = fs.readFileSync(frontOverviewPath, 'utf-8');
    frontContent += overview + '\n\n';
}
if (fs.existsSync(backOverviewPath)) {
    const overview = fs.readFileSync(backOverviewPath, 'utf-8');
    backContent += overview + '\n\n';
}

// Append unit tests
appendMarkdownFilesWithHeader(frontUnitTestDir, 'Unit Tests', frontUnitTestDir);
appendMarkdownFilesWithHeader(backUnitTestDir, 'Unit Tests', backUnitTestDir);

// Append integration tests
appendMarkdownFilesWithHeader(fonrtIntegrationTestDir, 'Integration Tests', fonrtIntegrationTestDir);
appendMarkdownFilesWithHeader(backIntegrationTestDir, 'Integration Tests', backIntegrationTestDir);

// Append conclusion.md
if (fs.existsSync(frontConclusionPath)) {
    const conclusion = fs.readFileSync(frontConclusionPath, 'utf-8');
    frontContent += conclusion + '\n\n';
}
if (fs.existsSync(frontConclusionPath)) {
    const conclusion = fs.readFileSync(backConclusionPath, 'utf-8');
    backContent += conclusion + '\n\n';
}

// Write to Summary.md
fs.writeFileSync(frontSummaryPath, frontContent);
fs.writeFileSync(backSummaryPath, backContent);

console.log('Summary.md generated!');