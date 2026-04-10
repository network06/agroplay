// Agroplay Achievements Helper
// Standalone for confetti/unlock animations

// Confetti on achievement unlock
function celebrateAchievement(achName, achIcon) {
    // Canvas confetti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#34D399', '#6EE7B7']
    });
    
    // Show popup
    showAchievementPopup(achName, achIcon);
}

// Achievement unlock popup
function showAchievementPopup(name, icon) {
    var popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(34, 197, 94, 0.9));
        padding: 32px 24px;
        border-radius: 24px;
        text-align: center;
        color: white;
        box-shadow: 0 25px 50px rgba(16, 185, 129, 0.4);
        z-index: 10001;
        backdrop-filter: blur(20px);
        animation: popupPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        max-width: 320px;
        font-family: 'Fredoka', sans-serif;
    `;
    popup.innerHTML = `
        <div style="font-size: 64px; margin-bottom: 16px;">${icon}</div>
        <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 8px;">Achievement Unlocked!</h2>
        <p style="font-size: 16px; margin-bottom: 24px; opacity: 0.95;">${name}</p>
        <button onclick="this.parentElement.remove()" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 12px 24px; border-radius: 12px; font-weight: 600; cursor: pointer; backdrop-filter: blur(10px);">Lanjut</button>
    `;
    document.body.appendChild(popup);
    
    // Add animation
    var style = document.createElement('style');
    style.textContent = `
        @keyframes popupPop {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Check for new achievements (call after stats update)
function checkNewAchievements() {
    REALTIME.ACHIEVEMENTS.forEach(function(ach) {
        if (REALTIME.checkAchievement(ach.id)) {
            celebrateAchievement(ach.name, ach.icon);
        }
    });
}

// Export globals
window.celebrateAchievement = celebrateAchievement;
window.checkNewAchievements = checkNewAchievements;

