/**
 * AGROPLAY - Simple Profile (Direct Access)
 * Fast and reliable profile loading
 */

(function() {
    'use strict';

    // Simple, clean profile data
    function initSimpleProfile() {
        console.log('👤 Simple Profile: Initializing...');
        
        // Safety check
        if (typeof AUTH === 'undefined' || !AUTH.getCurrentUser()) {
            console.log('👤 No user found');
            return;
        }

        // Setup smart sync
        if (typeof REALTIME !== 'undefined') {
            REALTIME.setupProfileSync();
            
            // Listen for profile update events
            window.addEventListener('profileUpdate', function(e) {
                console.log('👤 Profile update event received');
                updateProfileUI(AUTH.getCurrentUser(), e.detail.userData);
            });
        }

        // Initial load
        loadSimpleProfile();
        
        // Smart refresh setiap 15 detik (reduced dari 10)
        window.profileInterval = setInterval(() => {
            loadSimpleProfile();
        }, 15000);
    }

    function loadSimpleProfile() {
        const user = AUTH.getCurrentUser();
        if (!user) {
            console.log('👤 No user from AUTH');
            return;
        }
        
        console.log('👤 Loading profile for:', user.email);
        
        // Add loading state
        document.body.classList.add('loading');
        
        // Direct localStorage access for reliability
        try {
            const allUsersData = localStorage.getItem('agroplay_all_users_data');
            if (!allUsersData) {
                console.log('👤 No user data in localStorage');
                showEmptyState();
                document.body.classList.remove('loading');
                return;
            }
            
            const parsed = JSON.parse(allUsersData);
            const userData = parsed[user.id];
            
            if (!userData) {
                console.log('👤 User data not found for ID:', user.id);
                console.log('👤 Available IDs:', Object.keys(parsed));
                showEmptyState();
                document.body.classList.remove('loading');
                return;
            }
            
            console.log('👤 User data found:', userData);
            // Update UI with data
            updateProfileUI(user, userData);
            
        } catch (e) {
            console.error('👤 Error loading profile:', e);
            showEmptyState();
        }
        
        // Remove loading state
        document.body.classList.remove('loading');
    }

    // Make updateProfileUI global for REALTIME access
    window.updateProfileUI = updateProfileUI;

    function updateProfileUI(user, userData) {
        // Update basic info
        updateElement('profile-name', user.name || 'Siswa Agroplay');
        updateElement('profile-level', `Level ${userData.level || 1}`);
        updateElement('profile-xp', `${userData.xp || 0} XP`);

        // Update stats
        const stats = userData.stats || {};
        updateElement('stat-quizzes', stats.quizzesCompleted || 0);
        updateElement('stat-score', stats.totalScore || 0);
        updateElement('stat-streak', userData.streak || 0);
        updateElement('stat-plants', stats.plantsPlanted || 0);
        updateElement('stat-books', stats.booksRead || 0);
        updateElement('stat-games', stats.gamesPlayed || 0);

        // Update achievements
        const achievements = userData.achievements || [];
        updateElement('stat-achievements', achievements.length);

        // Update progress bars
        updateProgressBar('xp-progress', userData.xp || 0, (userData.level || 1) * 100);
        updateProgressBar('quiz-progress', stats.quizzesCompleted || 0, 50);
        updateProgressBar('plant-progress', stats.plantsPlanted || 0, 100);
    }

    function showEmptyState() {
        updateElement('profile-name', 'Data tidak tersedia');
        updateElement('profile-level', 'Level 1');
        updateElement('profile-xp', '0 XP');
        
        // Reset all stats to 0
        const statIds = ['stat-quizzes', 'stat-score', 'stat-streak', 'stat-plants', 'stat-books', 'stat-games', 'stat-achievements'];
        statIds.forEach(id => updateElement(id, 0));
        
        // Reset progress bars
        ['xp-progress', 'quiz-progress', 'plant-progress'].forEach(id => updateProgressBar(id, 0, 100));
    }

    function updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        } else {
            console.log('👤 Element not found:', id);
        }
    }

    function updateProgressBar(id, current, max) {
        const bar = document.getElementById(id);
        const text = document.getElementById(id + '-text');
        if (bar) {
            const percentage = Math.min((current / max) * 100, 100);
            bar.style.width = percentage + '%';
            if (text) {
                text.textContent = `${current}/${max}`;
            }
        } else {
            console.log('👤 Progress bar not found:', id);
        }
    }

    // Simple refresh function
    window.refreshSimpleProfile = function() {
        console.log('🔄 Refreshing profile...');
        loadSimpleProfile();
        
        // Visual feedback
        const container = document.querySelector('.profile-container');
        if (container) {
            container.style.opacity = '0.7';
            setTimeout(() => {
                container.style.opacity = '1';
            }, 300);
        }
    };

    // Cleanup on page unload
    window.addEventListener('beforeunload', function() {
        if (window.profileInterval) {
            clearInterval(window.profileInterval);
        }
    });

    // Auto-init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSimpleProfile);
    } else {
        // Small delay to ensure scripts are loaded
        setTimeout(initSimpleProfile, 100);
    }

    console.log('👤 Simple Profile module loaded');
})();
