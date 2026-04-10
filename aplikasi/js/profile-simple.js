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
            console.log('No user from AUTH');
            return;
        }
        
        console.log('Loading profile for:', user.email);
        
        // Add loading state
        document.body.classList.add('loading');
        
        // Try comprehensive scoring system first
        try {
            const userDataKey = `agroplay_user_${user.email}`;
            const userData = JSON.parse(localStorage.getItem(userDataKey));
            
            if (userData) {
                console.log('Profile: Found comprehensive scoring data:', userData);
                updateProfileUI(user, userData);
                document.body.classList.remove('loading');
                return;
            }
        } catch (e) {
            console.log('Profile: Comprehensive scoring data not found, trying legacy system');
        }
        
        // Fallback to legacy system
        try {
            const allUsersData = localStorage.getItem('agroplay_all_users_data');
            if (!allUsersData) {
                console.log('No user data in localStorage');
                showEmptyState();
                document.body.classList.remove('loading');
                return;
            }
            
            const parsed = JSON.parse(allUsersData);
            const userData = parsed[user.id];
            
            if (!userData) {
                console.log('User data not found for ID:', user.id);
                console.log('Available IDs:', Object.keys(parsed));
                showEmptyState();
                document.body.classList.remove('loading');
                return;
            }
            
            console.log('User data found:', userData);
            // Update UI with data
            updateProfileUI(user, userData);
            
        } catch (e) {
            console.error('Error loading profile:', e);
            showEmptyState();
        }
        
        // Remove loading state
        document.body.classList.remove('loading');
    }

    // Make updateProfileUI global for REALTIME access
    window.updateProfileUI = updateProfileUI;

    function updateProfileUI(user, userData) {
        // Update basic info
        updateElement('profile-name', user.name || userData.name || 'Siswa Agroplay');
        updateElement('profile-level', `Level ${userData.level || 1}`);
        updateElement('profile-xp', `${userData.xp || 0} XP`);

        // Handle comprehensive scoring system data
        let totalScore = 0;
        let totalSessions = 0;
        let activityCount = 0;
        
        if (userData.activities) {
            // New comprehensive scoring system
            Object.values(userData.activities).forEach(activity => {
                totalScore += activity.score || 0;
                totalSessions += activity.sessions || 0;
                if (activity.sessions > 0) activityCount++;
            });
        } else {
            // Legacy system
            const stats = userData.stats || {};
            totalScore = stats.totalScore || 0;
            totalSessions = stats.quizzesCompleted || 0;
            activityCount = stats.gamesPlayed || 0;
        }

        // Update stats
        updateElement('stat-score', totalScore);
        updateElement('stat-quizzes', userData.activities?.['kuis-seru']?.sessions || 0);
        updateElement('stat-plants', userData.activities?.['tanam-yuk']?.sessions || 0);
        updateElement('stat-books', userData.activities?.['buku-tanamku']?.sessions || 0);
        updateElement('stat-games', activityCount);
        updateElement('stat-streak', userData.streak || 0);

        // Update achievements
        const achievements = userData.achievements || [];
        updateElement('stat-achievements', achievements.length);

        // Update progress bars
        updateProgressBar('xp-progress', userData.xp || 0, (userData.level || 1) * 100);
        updateProgressBar('quiz-progress', userData.activities?.['kuis-seru']?.sessions || 0, 50);
        updateProgressBar('plant-progress', userData.activities?.['tanam-yuk']?.sessions || 0, 100);
        
        // Update activity breakdown if element exists
        updateActivityBreakdown(userData);
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

    function updateActivityBreakdown(userData) {
        const breakdownElement = document.getElementById('activity-breakdown');
        if (!breakdownElement || !userData.activities) return;
        
        const activities = userData.activities;
        let html = '<div class="activity-grid">';
        
        const activityInfo = {
            'kebun-ajaib': { name: 'Kebun Ajaib', icon: '??', color: '#4CAF50' },
            'tanam-yuk': { name: 'Tanam Yuk!', icon: '??', color: '#FF9800' },
            'kuis-seru': { name: 'Kuis Seru Tani', icon: '??', color: '#2196F3' },
            'buku-tanamku': { name: 'Buku Tanamku', icon: '??', color: '#9C27B0' },
            'cuan-farming': { name: 'Cuan Farming', icon: '??', color: '#F44336' }
        };
        
        Object.entries(activityInfo).forEach(([key, info]) => {
            const activity = activities[key] || { score: 0, xp: 0, sessions: 0 };
            if (activity.sessions > 0) {
                html += `
                    <div class="activity-item" style="border-left: 4px solid ${info.color}">
                        <div class="activity-icon">${info.icon}</div>
                        <div class="activity-details">
                            <div class="activity-name">${info.name}</div>
                            <div class="activity-stats">
                                <span>Skor: ${activity.score}</span>
                                <span>XP: ${activity.xp}</span>
                                <span>Sesi: ${activity.sessions}</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        });
        
        html += '</div>';
        breakdownElement.innerHTML = html;
    }

    // Simple refresh function
    window.refreshSimpleProfile = function() {
        console.log('Refreshing profile...');
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
