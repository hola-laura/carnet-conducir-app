const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const www = path.join(root, 'www');
const files = ['index.html', 'manifest.json', 'privacy.html', 'css', 'js', 'assets', 'data'];

fs.rmSync(www, { recursive: true, force: true });
fs.mkdirSync(www);

for (const name of files) {
    const from = path.join(root, name);
    if (!fs.existsSync(from)) continue;
    fs.cpSync(from, path.join(www, name), { recursive: true });
}
