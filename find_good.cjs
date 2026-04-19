const { execSync } = require('child_process');

try {
  const log = execSync('git log --format="%h" src/main.js', { encoding: 'utf8' });
  const commits = log.trim().split('\n');
  
  for (const c of commits) {
    try {
      const content = execSync(`git show ${c}:src/main.js`, { encoding: 'utf8' });
      if (content.includes('عميل')) {
        console.log("Good commit found: " + c);
        process.exit(0);
      }
    } catch (e) {}
  }
} catch (e) {
  console.error("Error", e);
}
