const fs = require('fs');
const path = 'src/main.js';
let content = fs.readFileSync(path, 'utf8');

// Replace everything from window.playNotificationSound = function () { to the end of the file
const startIdx = content.indexOf('window.playNotificationSound = function () {');
if (startIdx !== -1) {
    const newFunction = `window.playNotificationSound = function () {
  if (window.state && window.state.soundEnabled === false) return;
  try {
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2861/2861-preview.mp3");
    audio.volume = 0.5;
    audio.play().catch(e => console.warn("Audio play failed:", e));
  } catch (e) {
    console.warn("Audio error:", e);
  }
};
`;
    content = content.substring(0, startIdx) + newFunction;
    fs.writeFileSync(path, content, 'utf8');
    console.log('Syntax error fixed successfully');
} else {
    console.log('Function not found');
}
