const fs = require('fs');
const path = require('path');

// Configuration
const NEW_LOGO_FILE = 'new_logo_b64.txt';
const BRAND_COLOR = '#c49a6c';
const BRAND_VERSION = '1.0.6'; // Increment this to bust cache

if (!fs.existsSync(NEW_LOGO_FILE)) {
    console.error(`Error: ${NEW_LOGO_FILE} not found.`);
    process.exit(1);
}

const newLogoB64 = fs.readFileSync(NEW_LOGO_FILE, 'utf8').trim();

function patchHtml(filePath) {
    if (!fs.existsSync(filePath)) return;
    console.log(`Patching HTML: ${filePath}...`);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Replace all large base64 images (potential old logos)
    const logoRegex = /data:image\/[a-z]+;base64,[A-Za-z0-9+/=]{5000,}/g;
    const matches = content.match(logoRegex);
    if (matches) {
        console.log(`Found ${matches.length} large base64 strings to replace.`);
        content = content.replace(logoRegex, newLogoB64);
    }

    // 2. Inject/Update Brand Version for Cache Busting
    const cacheBuster = `
    // Cache Buster Logic
    const CURRENT_BRAND_VERSION = '${BRAND_VERSION}';
    if (localStorage.getItem('luxury-brand-version') !== CURRENT_BRAND_VERSION) {
        localStorage.removeItem('luxury-settings-cache');
        localStorage.setItem('luxury-brand-version', CURRENT_BRAND_VERSION);
        location.reload();
    }
    `;

    if (!content.includes('luxury-brand-version')) {
        // Find a good place to inject. Let's look for the start of the inline script
        content = content.replace("<script>\n        (function () {", `<script>\n    ${cacheBuster}\n        (function () {`);
    } else {
        content = content.replace(/const CURRENT_BRAND_VERSION = '.*';/, `const CURRENT_BRAND_VERSION = '${BRAND_VERSION}';`);
    }

    // 3. Update Favicon if it's base64
    const faviconRegex = /<link rel="icon" href="data:image\/[a-z]+;base64,[A-Za-z0-9+/=]+" \/>/;
    const newFavicon = `<link rel="icon" href="${newLogoB64}" />`;
    if (faviconRegex.test(content)) {
        content = content.replace(faviconRegex, newFavicon);
    }

    fs.writeFileSync(filePath, content, 'utf8');
}

function patchJs(filePath) {
    if (!fs.existsSync(filePath)) return;
    console.log(`Patching JS: ${filePath}...`);
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/--p-copper:\s*#[A-Fa-f0-9]{6}/g, `--p-copper: ${BRAND_COLOR}`);
    fs.writeFileSync(filePath, content, 'utf8');
}

patchHtml('index.html');
patchHtml('dist/index.html');
patchJs('src/main.js');

console.log('Patching complete.');
