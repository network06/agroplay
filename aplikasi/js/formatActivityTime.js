window.formatActivityTime = function(timestamp) {
    if (!timestamp) return 'Never';
    const diff = Date.now() - new Date(timestamp).getTime();
    const min = Math.floor(diff / 60000);
    if (min < 1) return 'Baru saja';
    if (min < 60) return min + ' menit lalu';
    const hr = Math.floor(min / 60);
    if (hr < 24) return hr + ' jam lalu';
    return new Date(timestamp).toLocaleDateString('id-ID');
};
