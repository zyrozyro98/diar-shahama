const fs = require('fs');
let code = fs.readFileSync('src/main.js', 'utf8');

const oldPublic = 'const publicPaths = ["users", "plates", "locations", "brands", "agents", "specs", "packages", "blogs", "reviews", "cars", "ads", "sales", "settings", "partners"];';
const newPublic = 'const publicPaths = ["plates", "locations", "brands", "agents", "specs", "packages", "blogs", "reviews", "cars", "ads", "sales", "settings", "partners"];';

const oldPrivate = 'const privatePaths = ["bookings", "notifications", "logs", "quickReplies"];';
const newPrivate = 'const privatePaths = ["users", "bookings", "notifications", "logs", "quickReplies"];';

if (code.includes(oldPublic) && code.includes(oldPrivate)) {
    code = code.replace(oldPublic, newPublic);
    code = code.replace(oldPrivate, newPrivate);
    fs.writeFileSync('src/main.js', code, 'utf8');
    console.log('Successfully moved users to privatePaths.');
} else {
    console.log('Target strings not found. Checking for variations...');
    // Fallback search
    if (code.includes('["users", "plates"')) {
        console.log('Found variation with users first in list.');
        code = code.replace('["users", "plates"', '["plates"');
        code = code.replace('["bookings"', '["users", "bookings"');
        fs.writeFileSync('src/main.js', code, 'utf8');
        console.log('Successfully patched with variation.');
    } else {
        console.log('Could not find target strings.');
    }
}
