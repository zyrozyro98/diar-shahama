const fs = require('fs');

// Read DB Logo
const newLogoB64 = fs.readFileSync('logo_b64_db.txt', 'utf8').trim();

// 1. Update style.css
let styleCss = fs.readFileSync('src/style.css', 'utf8');
styleCss = styleCss.replace(/--p-red: #a11d21;/, '--p-red: #907537;');
styleCss = styleCss.replace(/--p-red-glow: rgba\(161, 29, 33, 0\.4\);/, '--p-red-glow: #90753766;');
styleCss = styleCss.replace(/--p-teal: #1c7c8c;/, '--p-teal: #b39651;');
styleCss = styleCss.replace(/--p-copper: #b8860b;/, '--p-copper: #c8a95e;');
fs.writeFileSync('src/style.css', styleCss);

// 2. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');
// replace splash screen base64 logo and any other base64 occurrences of the old one
// We'll replace the huge base64 string in index.html
const oldLogoMatch = indexHtml.match(/src="(data:image\/png;base64,[^"]+)"/);
if (oldLogoMatch) {
    indexHtml = indexHtml.replace(oldLogoMatch[1], newLogoB64);
}
// replace any other data:image occurrences in index.html, if there's any fallback
const oldLogoMatch2 = indexHtml.match(/'(data:image\/png;base64,[^']+)'/);
if (oldLogoMatch2) {
    indexHtml = indexHtml.replace(oldLogoMatch2[1], newLogoB64);
}

// update the color defaults in the config UI if they are there
indexHtml = indexHtml.replace(/value="#a11d21"/g, 'value="#907537"');
indexHtml = indexHtml.replace(/>#a11d21</g, '>#907537<');

fs.writeFileSync('index.html', indexHtml);

// 3. Update main.js defaults
let mainJs = fs.readFileSync('src/main.js', 'utf8');
mainJs = mainJs.replace(/primaryColor: "#a11d21"/g, 'primaryColor: "#907537"');
mainJs = mainJs.replace(/secondaryColor: "#1c7c8c"/g, 'secondaryColor: "#b39651"');
mainJs = mainJs.replace(/accentColor: "#b8860b"/g, 'accentColor: "#c8a95e"');
// replace any fallback string for primaryColor in mainJs
mainJs = mainJs.replace(/"#a11d21"/g, '"#907537"');
mainJs = mainJs.replace(/"#1c7c8c"/g, '"#b39651"');
mainJs = mainJs.replace(/"#b8860b"/g, '"#c8a95e"');

fs.writeFileSync('src/main.js', mainJs);

// Write to logo.jpg just in case (extract base64 data)
const base64Data = newLogoB64.replace(/^data:image\/\w+;base64,/, "");
fs.writeFileSync('logo.jpg', Buffer.from(base64Data, 'base64'));

console.log("Patching completed.");
