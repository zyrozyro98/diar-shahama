const fs = require('fs');
const path = 'src/main.js';
let content = fs.readFileSync(path, 'utf8');

const soundFunction = `
// =========================================================================================
// NOTIFICATION SOUND SYSTEM
// =========================================================================================
window.playNotificationSound = function() {
  if (window.state && window.state.soundEnabled === false) return;
  
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create oscillator for the "ding"
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    
    // Two-tone chime: High C to G
    oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
    oscillator.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.1); // G5
    
    // Envelope for a smooth sound
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05); // Attack
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5); // Decay
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.6);
  } catch (e) {
    console.warn("AudioContext not supported or blocked", e);
  }
};
`;

if (!content.includes('window.playNotificationSound')) {
    content += soundFunction;
}

if (!content.includes('window.playNotificationSound();')) {
    content = content.replace(
        'window.showWAPushNotification = async function (phone, body, assignedUserId) {',
        'window.showWAPushNotification = async function (phone, body, assignedUserId) {\n  if (window.playNotificationSound) window.playNotificationSound();'
    );
}

fs.writeFileSync(path, content, 'utf8');
console.log('Sound patch applied successfully');
