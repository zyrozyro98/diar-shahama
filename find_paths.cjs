const text = require('fs').readFileSync('src/main.js', 'utf8');
const matches = [...text.matchAll(/ref\(db,\s*['"`]([^'"`]+)['"`]/g)];
const paths = new Set(matches.map(m => m[1].split('/')[0]));
console.log(Array.from(paths).join('\n'));
