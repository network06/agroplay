// Fallback logout - ensures logout always works
window.logout = window.logout || function() {
    if (window.AUTH && AUTH.logout) {
        AUTH.logout();
    } else {
        localStorage.removeItem('agroplay_current_user');
        localStorage.removeItem('agroplay_parent');
        if (typeof REALTIME !== 'undefined') REALTIME.trackLogout();
        window.location.href = 'login.html';
    }
};

window.quickLogout = window.quickLogout || window.logout;

console.log('✅ Fallback logout ready');

