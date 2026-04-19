const fs = require('fs');
let code = fs.readFileSync('src/main.js', 'utf8');

const oldPublic = 'const publicPaths = ["plates", "locations", "brands", "agents", "specs", "packages", "blogs", "reviews", "cars", "ads", "sales", "settings", "partners"];';
const newPublic = 'const publicPaths = ["users", "plates", "locations", "brands", "agents", "specs", "packages", "blogs", "reviews", "cars", "ads", "sales", "settings", "partners"];';

const oldPrivate = 'const privatePaths = ["users", "bookings", "notifications", "logs", "quickReplies"];';
const newPrivate = 'const privatePaths = ["bookings", "notifications", "logs", "quickReplies"];';

if (code.includes(oldPublic) && code.includes(oldPrivate)) {
    code = code.replace(oldPublic, newPublic);
    code = code.replace(oldPrivate, newPrivate);
    fs.writeFileSync('src/main.js', code, 'utf8');
    console.log('Successfully moved users back to publicPaths.');
} else {
    console.log('Strings not found.');
}
