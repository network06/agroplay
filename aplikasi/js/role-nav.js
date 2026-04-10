/**
 * AGROPLAY - Role-based Navigation System
 * Handles routing for different user roles
 */

(function() {
    'use strict';
    
    // Role navigation helper
    const roleNav = {
        getDashboardUrl: function(role) {
            const routes = {
                'siswa': 'index.html',
                'admin': 'admin-dashboard.html',
                'guru': 'teacher-dashboard.html',
                'orangtua': 'parent-dashboard.html'
            };
            return routes[role] || 'login.html';
        },
        
        getProfileUrl: function(role) {
            const routes = {
                'siswa': 'profil-simple.html',
                'admin': 'admin-dashboard.html',
                'guru': 'teacher-dashboard.html',
                'orangtua': 'parent-dashboard.html'
            };
            return routes[role] || 'login.html';
        }
    };
    
    window.roleNav = roleNav;
    
    window.goToProfile = function() {
        // Require AUTH (loaded first in all pages)
        if (typeof AUTH === 'undefined') {
            console.error('role-nav.js: AUTH not loaded');
            window.location.href = 'login.html';
            return;
        }
        
        const user = AUTH.getCurrentUser();
        if (!user || !user.role) {
            console.log('role-nav: No user, redirect to login');
            window.location.href = 'login.html';
            return;
        }
        
        const role = user.role.trim().toLowerCase();
        const target = roleNav.getProfileUrl(role);
        console.log(`role-nav: ${AUTH.getRoleLabel(role)} → ${target}`);
        window.location.href = target;
    };
    
    // Auto-protect pages with role restrictions
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', protectPagesByRole);
    } else {
        protectPagesByRole();
    }
    
    function protectPagesByRole() {
        const user = typeof AUTH !== 'undefined' ? AUTH.getCurrentUser() : null;
        const currentPath = window.location.pathname;
        
        // Protect profil-simple.html - only for siswa
        if (currentPath.includes('profil-simple.html') && user && user.role) {
            const role = user.role.trim().toLowerCase();
            if (role !== 'siswa') {
                console.log(`role-nav: ${role} accessing siswa profile → redirect to dashboard`);
                window.location.href = roleNav.getDashboardUrl(role);
            }
        }
    }
    
    console.log('✅ role-nav.js loaded with enhanced routing');
})();

