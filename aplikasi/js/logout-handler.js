/**
 * AGROPLAY - Global Logout Handler
 * Provides consistent logout functionality across all pages
 */

(function() {
    'use strict';
    
    // Global logout function
    window.handleLogout = function() {
        if (confirm('Apakah Anda yakin ingin keluar? Semua progress akan tersimpan.')) {
            try {
                // Show loading state
                if (typeof showToast === 'function') {
                    showToast('Sedang keluar...', 'info');
                } else {
                    alert('Sedang keluar...');
                }
                
                // Clear current user session
                if (typeof AUTH !== 'undefined' && AUTH.logout) {
                    AUTH.logout();
                    console.log('✅ Logged out via AUTH system');
                } else {
                    // Fallback: clear localStorage and redirect
                    console.log('⚠️ AUTH not available, using fallback logout');
                    
                    // Clear all localStorage data
                    localStorage.clear();
                    
                    // Clear session storage
                    if (typeof sessionStorage !== 'undefined') {
                        sessionStorage.clear();
                    }
                    
                    // Show success message
                    if (typeof showToast === 'function') {
                        showToast('Anda telah keluar dari sistem.', 'success');
                    } else {
                        alert('Anda telah keluar dari sistem.');
                    }
                    
                    // Redirect to home page after delay
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1500);
                }
            } catch (error) {
                console.error('❌ Logout error:', error);
                
                // Emergency fallback
                try {
                    localStorage.clear();
                    alert('Terjadi kesalahan. Anda akan diarahkan ke halaman utama.');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                } catch (e) {
                    window.location.href = 'index.html';
                }
            }
        }
    };
    
    // Enhanced logout with animation
    window.handleLogoutAnimated = function() {
        const button = event.target.closest('button');
        if (button) {
            // Add loading animation
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        }
        
        handleLogout();
    };
    
    console.log('🔐 Logout handler loaded');
})();
