/**
 * AGROPLAY - Profile Page Manager (Fixed & Complete)
 * Handles profile, leaderboard, achievements, notifications
 * Fixed: syntax errors, duplicates, missing functions
 */

(function() {
    'use strict';

    // Storage keys
    const PROFILE_DATA_KEY = 'agroplay_profile_data';
    const LEADERBOARD_KEY = 'agroplay_leaderboard';
    const NOTIFICATIONS_KEY = 'agroplay_notifications';
    const SOUND_SETTINGS_KEY = 'agroplay_sound_settings';

    // Enhanced Avatar System 2.0
    const AVATAR_SYSTEM = {
        // Level-based avatars
        levelAvatars: {
            1: ['🌱', '🌿', '🍀'],           // Petani Pemula
            2: ['🌸', '🪴', '🌺'],           // Petani Junior
            3: ['🌻', '🌾', '🌰'],           // Petani Madya
            4: ['🍄', '🥕', '🌽'],           // Petani Ahli
            5: ['🥦', '🥬', '🥒'],           // Petani Pro
            6: ['🍅', '🥑', '🌶'],           // Petani Master
            7: ['🥝', '🍓', '🫐'],           // Petani Expert
            8: ['🍊', '🍋', '🍉'],           // Petani Champion
            9: ['🌈', '⭐', '💎'],           // Petani Grandmaster
            10: ['👑', '🏆', '🎯']           // Petani Legend
        },
        // Achievement-based special avatars
        specialAvatars: {
            'firstQuiz': '🧠',
            'streak7': '🔥',
            'perfectQuiz': '💯',
            'masterFarmer': '�',
            'topStudent': '👑'
        },
        // Get recommended avatar based on user data
        getRecommendedAvatar: function(userData) {
            const level = userData.level || 1;
            const achievements = userData.achievements || [];
            const stats = userData.stats || {};

            // Check for special achievements first
            for (const achievement of achievements) {
                if (this.specialAvatars[achievement.id]) {
                    return this.specialAvatars[achievement.id];
                }
            }

            // Return level-based avatar
            const levelAvatars = this.levelAvatars[Math.min(level, 10)] || this.levelAvatars[1];
            return levelAvatars[Math.floor(Math.random() * levelAvatars.length)];
        },
        // Get all available avatars for user level
        getAvailableAvatars: function(userData) {
            const level = userData.level || 1;
            const available = [];

            // Add level-based avatars
            for (let l = 1; l <= Math.min(level, 10); l++) {
                available.push(...this.levelAvatars[l]);
            }

            // Add unlocked special avatars
            const achievements = userData.achievements || [];
            for (const achievement of achievements) {
                if (this.specialAvatars[achievement.id]) {
                    available.push(this.specialAvatars[achievement.id]);
                }
            }

            // Remove duplicates
            return [...new Set(available)];
        }
    };

    // Smart Analytics & Insights System
    const ANALYTICS_ENGINE = {
        // Calculate user performance metrics
        calculateMetrics: function(userData) {
            const stats = userData.stats || {};
            const xp = userData.xp || 0;
            const level = userData.level || 1;
            const streak = userData.streak || 0;

            // Calculate individual metrics first
            const engagementRate = this.calculateEngagementRate(stats);
            const quizPerformance = this.calculateQuizPerformance(stats);
            const progressVelocity = this.calculateProgressVelocity(xp, level);
            const consistencyScore = this.calculateConsistencyScore(streak, stats);

            // Calculate overall score separately to avoid infinite loop
            const overallScore = Math.round(
                (engagementRate * 0.3) +
                (quizPerformance * 0.3) +
                (progressVelocity * 0.2) +
                (consistencyScore * 0.2)
            );

            return {
                // Engagement metrics
                engagementRate: engagementRate,
                // Performance metrics
                quizPerformance: quizPerformance,
                // Progress metrics
                progressVelocity: progressVelocity,
                // Consistency metrics
                consistencyScore: consistencyScore,
                // Overall performance
                overallScore: overallScore
            };
        },

        calculateEngagementRate: function(stats) {
            const totalActivities = (stats.booksRead || 0) + (stats.plantsPlanted || 0) +
                                  (stats.gamesPlayed || 0) + (stats.quizzesCompleted || 0);
            // Rate based on activity diversity
            const uniqueActivities = [
                stats.booksRead > 0, stats.plantsPlanted > 0,
                stats.gamesPlayed > 0, stats.quizzesCompleted > 0
            ].filter(Boolean).length;

            return Math.min((uniqueActivities / 4) * 100, 100);
        },

        calculateQuizPerformance: function(stats) {
            if (!stats.quizzesCompleted || stats.quizzesCompleted === 0) return 0;
            const avgScore = (stats.totalScore || 0) / stats.quizzesCompleted;
            return Math.min((avgScore / 100) * 100, 100);
        },

        calculateProgressVelocity: function(xp, level) {
            // XP per level (simplified calculation)
            const avgXpPerLevel = 100; // Base XP per level
            const currentLevelProgress = xp % avgXpPerLevel;
            return (currentLevelProgress / avgXpPerLevel) * 100;
        },

        calculateConsistencyScore: function(streak, stats) {
            const streakScore = Math.min((streak / 7) * 50, 50); // Max 50 points for streak
            const activityScore = Math.min(((stats.booksRead || 0) + (stats.quizzesCompleted || 0)) / 10 * 50, 50);
            return streakScore + activityScore;
        },

        // Generate insights and recommendations
        generateInsights: function(userData) {
            const metrics = this.calculateMetrics(userData);
            const insights = [];
            const stats = userData.stats || {};

            // Engagement insights
            if (metrics.engagementRate < 50) {
                insights.push({
                    type: 'engagement',
                    icon: '📚',
                    title: 'Tingkatkan Engagement',
                    description: 'Coba jelajahi lebih banyak fitur untuk pengalaman yang lebih baik!',
                    priority: 'high'
                });
            }

            // Quiz performance insights
            if (metrics.quizPerformance < 70 && stats.quizzesCompleted > 0) {
                insights.push({
                    type: 'performance',
                    icon: '🧠',
                    title: 'Improve Quiz Scores',
                    description: 'Belajar dari Buku Tanamku sebelum kuis untuk skor lebih baik!',
                    priority: 'medium'
                });
            }

            // Streak insights
            if (userData.streak >= 7) {
                insights.push({
                    type: 'achievement',
                    icon: '🔥',
                    title: 'Streak Hebat!',
                    description: `${userData.streak} hari streak! Pertahankan konsistensi Anda!`,
                    priority: 'low'
                });
            }

            // Progress insights
            if (metrics.progressVelocity > 80) {
                insights.push({
                    type: 'progress',
                    icon: '🚀',
                    title: 'Progress Cepat',
                    description: 'Anda membuat progress luar biasa! Lanjutkan!',
                    priority: 'low'
                });
            }

            return insights;
        }
    };

    // Real-Time Progress Prediction System
    const PREDICTION_ENGINE = {
        // Predict time to reach next level
        predictTimeToNextLevel: function(userData) {
            const currentXP = userData.xp || 0;
            const currentLevel = userData.level || 1;
            const xpNeeded = currentLevel * 100;
            const xpRemaining = xpNeeded - currentXP;

            if (xpRemaining <= 0) return 'Level Up!';

            // Calculate average XP gain per day (based on recent activity)
            const avgXPPerDay = this.calculateAverageXPPerDay(userData);

            if (avgXPPerDay === 0) return 'Start activities to progress!';

            const daysNeeded = Math.ceil(xpRemaining / avgXPPerDay);

            if (daysNeeded === 1) return 'Tomorrow! 🚀';
            if (daysNeeded <= 3) return `In ${daysNeeded} days! ⏰`;
            if (daysNeeded <= 7) return `In ${daysNeeded} days 📅`;
            return `${daysNeeded} days needed 📆`;
        },

        calculateAverageXPPerDay: function(userData) {
            // Simplified calculation based on user activity patterns
            const stats = userData.stats || {};
            const totalXP = userData.xp || 0;

            // Estimate based on completed activities
            const estimatedDays = Math.max(1, (userData.streak || 1));
            return totalXP / estimatedDays;
        },

        // Predict achievement unlocks
        predictNextAchievements: function(userData) {
            const stats = userData.stats || {};
            const achievements = userData.achievements || [];
            const unlockedIds = achievements.map(a => a.id);

            const predictions = [];

            // Predict next achievements based on current progress
            if (stats.booksRead >= 5 && !unlockedIds.includes('bookworm5')) {
                predictions.push({
                    icon: '📚',
                    title: 'Bookworm',
                    description: 'Read 5 more materials',
                    progress: Math.min((stats.booksRead / 10) * 100, 100),
                    close: true
                });
            }

            if (stats.quizzesCompleted >= 3 && !unlockedIds.includes('quizMaster3')) {
                predictions.push({
                    icon: '🧠',
                    title: 'Quiz Master',
                    description: 'Complete 2 more quizzes',
                    progress: Math.min((stats.quizzesCompleted / 5) * 100, 100),
                    close: true
                });
            }

            if (userData.streak >= 5 && !unlockedIds.includes('streakWarrior')) {
                predictions.push({
                    icon: '🔥',
                    title: 'Streak Warrior',
                    description: 'Maintain streak for 2 more days',
                    progress: Math.min((userData.streak / 7) * 100, 100),
                    close: true
                });
            }

            return predictions;
        },

        // Generate progress recommendations
        generateRecommendations: function(userData) {
            const stats = userData.stats || {};
            const recommendations = [];

            // Find areas with lowest progress
            const progressAreas = [
                { name: 'Membaca', current: stats.booksRead || 0, max: 20, icon: '📚' },
                { name: 'Bertani', current: stats.plantsPlanted || 0, max: 30, icon: '🌱' },
                { name: 'Bermain', current: stats.gamesPlayed || 0, max: 25, icon: '🎮' }
            ];

            // Sort by progress percentage (lowest first)
            progressAreas.sort((a, b) => (a.current / a.max) - (b.current / b.max));

            // Recommend top 2 areas needing improvement
            progressAreas.slice(0, 2).forEach(area => {
                const progressPercent = (area.current / area.max) * 100;
                if (progressPercent < 50) {
                    recommendations.push({
                        icon: area.icon,
                        title: `Fokus pada ${area.name}`,
                        description: `Progress: ${area.current}/${area.max} (${Math.round(progressPercent)}%)`,
                        action: this.getRecommendedAction(area.name),
                        priority: progressPercent < 25 ? 'high' : 'medium'
                    });
                }
            });

            return recommendations;
        },

        getRecommendedAction: function(area) {
            const actions = {
                'Membaca': 'Buka Buku Tanamku dan pelajari kategori baru',
                'Bertani': 'Mainkan Kebun Ajaib atau Tanam Yuk',
                'Bermain': 'Coba game Cuan Farming untuk pengalaman baru'
            };
            return actions[area] || 'Lanjutkan eksplorasi fitur Agroplay';
        }
    };

    // Globals
    let selectedAvatar = '🌱';
    window.profilePollingInterval = null;
    const LEVEL_NAMES = {
        1: 'Petani Pemula', 2: 'Petani Junior', 3: 'Petani Madya', 4: 'Petani Ahli',
        5: 'Petani Pro', 6: 'Petani Master', 7: 'Petani Expert', 8: 'Petani Champion',
        9: 'Petani Grandmaster', 10: 'Petani Legend'
    };

    // Auto-init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfile);
} else {
    initProfile();
}

    // Background particles
    function createBackgroundParticles() {
        const container = document.getElementById('bg-particles');
        if (!container) return;

        const particles = ['🌱','🌿','🍃','🌸','🌺','🍀','🌻','🪴','🌾'];
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            container.appendChild(particle);
        }
    }

    // Progress mappings - move to global scope
    const progressMappings = {
        'booksRead': { element: 'books-progress', count: 'books-read', max: 20 },
        'plantsPlanted': { element: 'plants-progress', count: 'plants-planted', max: 30 },
        'gamesPlayed': { element: 'games-progress', count: 'games-played', max: 25 }
    };

    // Get comprehensive user data from multiple sources
    function getComprehensiveUserData() {
        const user = getCurrentUser();
        if (!user) return {};

        // Get data from REALTIME first, then fallback to localStorage
        let realtimeData = {};
        if (typeof REALTIME !== 'undefined') {
            realtimeData = REALTIME.getCurrentUserData() || {};
        }

        // Merge data from all sources
        const comprehensiveData = {
            // Basic user info
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            class: user.class,

            // REALTIME data (primary source)
            xp: realtimeData.xp || 0,
            level: realtimeData.level || 1,
            streak: realtimeData.streak || 0,
            stats: realtimeData.stats || {},
            achievements: realtimeData.achievements || [],
            lastActive: realtimeData.lastActive || user.lastLogin,

            // Fallback data from localStorage if REALTIME is empty
            ...(!realtimeData.xp && {
                xp: parseInt(localStorage.getItem('agroplay_xp') || '0'),
                level: parseInt(localStorage.getItem('agroplay_level') || '1'),
                streak: parseInt(localStorage.getItem('agroplay_streak') || '0')
            })
        };

        console.log('🔄 Comprehensive data merge:', {
            realtime: !!realtimeData.xp,
            xp: comprehensiveData.xp,
            level: comprehensiveData.level,
            stats: comprehensiveData.stats
        });

        return comprehensiveData;
    }

    // Enhanced Load User Data with Next-Gen Features
    function loadUserData() {
        const user = getCurrentUser();
        if (!user) return;

        console.log('👤 Profile: Loading data for user:', user);

        // Get comprehensive user data from multiple sources
        const data = getComprehensiveUserData();

        console.log('👤 Profile: User data loaded:', data);
        console.log('👤 Profile: User stats:', data.stats);

        // Safety check - prevent infinite loops
        if (!data || typeof data !== 'object') {
            console.warn('⚠️ Invalid user data, skipping analytics');
            return;
        }

        // Update profile info with enhanced avatar
        document.getElementById('profile-name').textContent = user.name || 'Siswa Agroplay';
        const recommendedAvatar = AVATAR_SYSTEM.getRecommendedAvatar(data);
        document.getElementById('profile-avatar').innerHTML = getAvatarHTML(recommendedAvatar);

        // Class display for siswa
        const classEl = document.getElementById('profile-class');
        const classTextEl = document.getElementById('profile-class-text');
        if (classEl && classTextEl && user.role === 'siswa') {
            classTextEl.textContent = user.class || 'Tidak terisi';
            classEl.style.display = 'block';
        } else if (classEl) {
            classEl.style.display = 'none';
        }

        // XP calculation with prediction
        const xpNeeded = data.level * 100;
        const xpPercent = Math.min((data.xp / xpNeeded) * 100, 100);
        const timeToNextLevel = PREDICTION_ENGINE.predictTimeToNextLevel(data);

        console.log(`💰 Profile: XP Calculation - Current: ${data.xp}, Needed: ${xpNeeded}, Percent: ${xpPercent}%`);
        console.log(`🔮 Prediction: Time to next level - ${timeToNextLevel}`);

        document.getElementById('current-xp').textContent = data.xp || 0;
        document.getElementById('xp-needed').textContent = xpNeeded;
        document.getElementById('xp-progress-bar').style.width = xpPercent + '%';

        // Level display
        const levelName = LEVEL_NAMES[data.level] || 'Petani Pemula';
        document.getElementById('profile-level-text').textContent = `Level ${data.level} - ${levelName}`;

        // Enhanced stats with analytics (with safety check)
        const stats = data.stats || {};
        let metrics = null;

        try {
            metrics = ANALYTICS_ENGINE.calculateMetrics(data);
            console.log('📊 Analytics calculated successfully:', metrics);
        } catch (error) {
            console.error('❌ Analytics calculation failed:', error);
            // Fallback metrics
            metrics = {
                engagementRate: 0,
                quizPerformance: 0,
                progressVelocity: 0,
                consistencyScore: 0,
                overallScore: 0
            };
        }

        document.getElementById('quiz-score').textContent = (stats.totalScore || 0).toLocaleString();
        document.getElementById('quiz-completed').textContent = stats.quizzesCompleted || 0;
        document.getElementById('streak-days').textContent = data.streak || 0;
        document.getElementById('achievements-count').textContent = (data.achievements || []).length;

        console.log('👤 Profile: UI Updated - Quiz Score:', stats.totalScore, 'Quiz Completed:', stats.quizzesCompleted, 'Streak:', data.streak);

        // Update progress bars with enhanced features
        Object.keys(progressMappings).forEach(stat => {
            const mapping = progressMappings[stat];
            const progressBarEl = document.getElementById(mapping.element);
            const countEl = document.getElementById(mapping.count);

            if (progressBarEl && countEl) {
                const count = stats[stat] || 0;
                const percent = Math.min((count / mapping.max) * 100, 100);
                progressBarEl.style.width = percent + '%';
                countEl.textContent = count;

                // Add progress indicators
                if (percent >= 100) {
                    progressBarEl.classList.add('completed');
                } else if (percent >= 75) {
                    progressBarEl.classList.add('near-complete');
                }
            }
        });

        // Update total XP progress separately
        const totalXpEl = document.getElementById('total-xp');
        const totalXpProgressEl = document.getElementById('xp-progress-profile');
        if (totalXpEl && totalXpProgressEl) {
            totalXpEl.textContent = data.xp || 0;
            const totalXpPercent = Math.min(((data.xp || 0) / 1000) * 100, 100);
            totalXpProgressEl.style.width = totalXpPercent + '%';
        }

        // Load smart insights (with safety check)
        try {
            loadSmartInsights(data);
        } catch (error) {
            console.error('❌ Failed to load insights:', error);
        }

        // Load predictions (with safety check)
        try {
            loadPredictions(data);
        } catch (error) {
            console.error('❌ Failed to load predictions:', error);
        }

        // Load recommendations (with safety check)
        try {
            loadRecommendations(data);
        } catch (error) {
            console.error('❌ Failed to load recommendations:', error);
        }

        // Save profile data
        saveProfileData({ avatar: recommendedAvatar, name: user.name });
    }

    // Smart Insights Loader
    function loadSmartInsights(userData) {
        // Safety check
        if (!userData || typeof userData !== 'object') {
            console.warn('⚠️ Invalid user data for insights');
            return;
        }

        const insights = ANALYTICS_ENGINE.generateInsights(userData);
        const container = document.getElementById('smart-insights');

        if (!container) {
            console.warn('⚠️ Smart insights container not found');
            return;
        }

        if (insights.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 20px; color: #666;">
                    🎉 Progress hebat! Tidak ada insight saat ini.
                </div>
            `;
            return;
        }

        let html = '';
        insights.forEach(insight => {
            const priorityColor = insight.priority === 'high' ? '#F44336' :
                                 insight.priority === 'medium' ? '#FF9800' : '#4CAF50';

            html += `
                <div class="insight-card" style="
                    background: white;
                    border-left: 4px solid ${priorityColor};
                    padding: 15px;
                    margin-bottom: 10px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    animation: slideInRight 0.5s ease;
                ">
                    <div style="display: flex; align-items: flex-start; gap: 12px;">
                        <div style="font-size: 24px;">${insight.icon}</div>
                        <div style="flex: 1;">
                            <div style="font-weight: 600; color: #333; margin-bottom: 4px;">${insight.title}</div>
                            <div style="font-size: 13px; color: #666; line-height: 1.4;">${insight.description}</div>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    // Predictions Loader
    function loadPredictions(userData) {
        // Safety check
        if (!userData || typeof userData !== 'object') {
            console.warn('⚠️ Invalid user data for predictions');
            return;
        }

        const predictions = PREDICTION_ENGINE.predictNextAchievements(userData);
        const container = document.getElementById('predictions');

        if (!container) {
            console.warn('⚠️ Predictions container not found');
            return;
        }

        if (predictions.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 20px; color: #666;">
                    🔮 Selesaikan lebih banyak aktivitas untuk unlock prediksi
                </div>
            `;
            return;
        }

        let html = '';
        predictions.forEach(prediction => {
            html += `
                <div class="prediction-card" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 15px;
                    margin-bottom: 10px;
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    animation: slideInRight 0.5s ease;
                ">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="font-size: 28px;">${prediction.icon}</div>
                        <div style="flex: 1;">
                            <div style="font-weight: 600; margin-bottom: 4px;">${prediction.title}</div>
                            <div style="font-size: 12px; opacity: 0.9; margin-bottom: 8px;">${prediction.description}</div>
                            <div style="background: rgba(255,255,255,0.2); height: 6px; border-radius: 3px; overflow: hidden;">
                                <div style="background: white; height: 100%; width: ${prediction.progress}%; transition: width 0.5s ease;"></div>
                            </div>
                        </div>
                        ${prediction.close ? '<div style="font-size: 12px; background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 12px;">CLOSE!</div>' : ''}
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    // Recommendations Loader
    function loadRecommendations(userData) {
        // Safety check
        if (!userData || typeof userData !== 'object') {
            console.warn('⚠️ Invalid user data for recommendations');
            return;
        }

        const recommendations = PREDICTION_ENGINE.generateRecommendations(userData);
        const container = document.getElementById('recommendations');

        if (!container) {
            console.warn('⚠️ Recommendations container not found');
            return;
        }

        if (recommendations.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 20px; color: #666;">
                    🎯 Semua progress seimbang! Lanjutkan eksplorasi.
                </div>
            `;
            return;
        }

        let html = '';
        recommendations.forEach(rec => {
            const priorityBg = rec.priority === 'high' ? 'linear-gradient(135deg, #F44336, #E91E63)' :
                              'linear-gradient(135deg, #2196F3, #1976D2)';

            html += `
                <div class="recommendation-card" style="
                    background: ${priorityBg};
                    color: white;
                    padding: 15px;
                    margin-bottom: 10px;
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    animation: slideInRight 0.5s ease;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                " onclick="executeRecommendation('${rec.action}')">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="font-size: 24px;">${rec.icon}</div>
                        <div style="flex: 1;">
                            <div style="font-weight: 600; margin-bottom: 4px;">${rec.title}</div>
                            <div style="font-size: 12px; opacity: 0.9; margin-bottom: 8px;">${rec.description}</div>
                            <div style="font-size: 11px; background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 12px; display: inline-block;">
                                💡 ${rec.action}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    // Execute recommendation action
    function executeRecommendation(action) {
        console.log('🎯 Executing recommendation:', action);

        // Show action notification
        showNotification(`🎯 ${action}`, 'info');

        // Could add navigation logic here based on action
        if (action.includes('Buku Tanamku')) {
            setTimeout(() => window.open('buku-tanamku.html', '_blank'), 1000);
        } else if (action.includes('Kebun Ajaib')) {
            setTimeout(() => window.open('kebun-ajaib.html', '_blank'), 1000);
        } else if (action.includes('Cuan Farming')) {
            setTimeout(() => window.open('cuan-farming.html', '_blank'), 1000);
        }
    }

    // Enhanced notification system
    function showNotification(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const colors = {
            info: 'linear-gradient(135deg, #2196F3, #1976D2)',
            success: 'linear-gradient(135deg, #4CAF50, #45a049)',
            warning: 'linear-gradient(135deg, #FF9800, #F57C00)',
            error: 'linear-gradient(135deg, #F44336, #E91E63)'
        };

        const notification = document.createElement('div');
        notification.style.cssText = `
            background: ${colors[type] || colors.info};
            color: white;
            padding: 15px 20px;
            border-radius: 12px;
            margin-bottom: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            animation: slideInRight 0.5s ease;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
        `;
        notification.innerHTML = `<span>${message}</span>`;

        container.appendChild(notification);

        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }
    function refreshAllProgress() {
        const userData = (typeof REALTIME !== 'undefined') ? REALTIME.getCurrentUserData() : null;
        if (!userData) return;

        const stats = userData.stats || {};

        // Update progress bars with animation
        Object.keys(progressMappings).forEach(stat => {
            const mapping = progressMappings[stat];
            const progressBarEl = document.getElementById(mapping.element);
            const countEl = document.getElementById(mapping.count);

            if (progressBarEl && countEl) {
                const count = stats[stat] || 0;
                const percent = Math.min((count / mapping.max) * 100, 100);

                // Add animation class
                progressBarEl.classList.add('progress-updated');
                progressBarEl.style.width = percent + '%';
                countEl.textContent = count;

                // Remove animation class after transition
                setTimeout(() => {
                    progressBarEl.classList.remove('progress-updated');
                }, 500);
            }
        });

        // Update total XP with animation
        const totalXpEl = document.getElementById('total-xp');
        const totalXpProgressEl = document.getElementById('xp-progress-profile');
        if (totalXpEl && totalXpProgressEl) {
            totalXpEl.classList.add('progress-updated');
            totalXpProgressEl.classList.add('progress-updated');

            totalXpEl.textContent = userData.xp || 0;
            const totalXpPercent = Math.min(((userData.xp || 0) / 1000) * 100, 100);
            totalXpProgressEl.style.width = totalXpPercent + '%';

            setTimeout(() => {
                totalXpEl.classList.remove('progress-updated');
                totalXpProgressEl.classList.remove('progress-updated');
            }, 500);
        }
    }

    // Avatar HTML
    function getAvatarHTML(avatar) {
        return `${avatar || '🌱'}<button class="avatar-edit-btn" onclick="openEditModal()"><i class="fas fa-pen"></i></button>`;
    }

    // Save profile data
    function saveProfileData(data) {
        try {
            const existing = localStorage.getItem(PROFILE_DATA_KEY);
            const profileData = existing ? JSON.parse(existing) : {};
            Object.assign(profileData, data);
            localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(profileData));
        } catch (e) {
            console.error('Profile save error:', e);
        }
    }

    // Load sound settings
    function loadSoundSettings() {
        try {
            const settings = localStorage.getItem(SOUND_SETTINGS_KEY);
            if (settings) {
                const soundOn = JSON.parse(settings).sound !== false;
                const toggle = document.getElementById('sound-toggle');
                if (toggle) {
                    toggle.classList.toggle('active', soundOn);
                }
            }
        } catch (e) {}
    }

    // Tab switching
    function switchTab(tabName) {
        document.querySelectorAll('.profile-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(`tab-${tabName}`).classList.add('active');

        if (tabName === 'achievements') loadAchievements();
        if (tabName === 'aktivitas') loadLeaderboard();
    }

    // ==================== LEADERBOARD ====================
    function loadLeaderboard() {
        const leaderboardData = getLeaderboardData();
        renderPodium(leaderboardData);
        renderLeaderboardList(leaderboardData);
    }

    function getLeaderboardData() {
        let leaderboard = [];

        // Use REALTIME if available, else sample/demo
        if (typeof REALTIME !== 'undefined') {
            // Get real leaderboard data from REALTIME
            const allUsersData = REALTIME.getAllUsersData() || {};
            const allUsers = Object.values(allUsersData).filter(user => user.role === 'siswa');

            // Calculate holistic scores for all students
            leaderboard = allUsers.map(user => {
                const stats = user.stats || {};
                const holisticScore = REALTIME.calculateHolisticScore ?
                    REALTIME.calculateHolisticScore(user) :
                    (user.xp || 0) +
                    ((stats.quizzesCompleted || 0) * 50) +
                    ((stats.plantsPlanted || 0) * 30) +
                    ((stats.gamesPlayed || 0) * 20) +
                    ((user.streak || 0) * 100);

                return {
                    name: user.name || 'Unknown',
                    holisticScore: holisticScore,
                    level: user.level || 1,
                    lastActive: user.lastActive || new Date().toISOString(),
                    avatar: AVATAR_SYSTEM.getRecommendedAvatar(user)
                };
            });

            // Sort by holistic score (highest first)
            leaderboard.sort((a, b) => b.holisticScore - a.holisticScore);

        } else {
            // Fallback sample data
            leaderboard = [
                { name: 'Andi Pratama', holisticScore: 2450, level: 5, lastActive: new Date().toISOString(), avatar: '🌱' },
                { name: 'Budi Santoso', holisticScore: 1980, level: 4, lastActive: new Date(Date.now() - 3600000).toISOString(), avatar: '🌿' },
                { name: 'Citra Dewi', holisticScore: 1850, level: 4, lastActive: new Date(Date.now() - 7200000).toISOString(), avatar: '🌸' }
            ];
        }

        return leaderboard.slice(0, 10);
    }

    function renderPodium(leaderboard) {
        const container = document.getElementById('podium-container');
        if (!container) return;

        const top3 = leaderboard.slice(0, 3);
        let html = '';

        // Positions: 2nd, 1st, 3rd for visual podium
        [1, 0, 2].forEach((idx, pos) => {
            if (top3[idx]) {
                const rank = pos + 1;
                const medals = ['🥇', '🥈', '🥉'];
                html += `
                    <div class="podium-item">
                        <div class="podium-avatar">${top3[idx].avatar || '🌱'}</div>
                        <div class="podium-medal">${medals[pos]}</div>
                        <div class="podium-name">${top3[idx].name}</div>
                        <div class="podium-score"><i class="fas fa-trophy"></i> ${formatNumber(top3[idx].holisticScore || 0)} PTS</div>
                    </div>
                `;
            }
        });

        container.innerHTML = html;
    }

    function renderLeaderboardList(leaderboard) {
        const container = document.getElementById('leaderboard-list');
        if (!container) return;

        let html = '';
        leaderboard.forEach((user, index) => {
            const rank = index + 1;
            const avatar = user.avatar || '🌱';
            const timeAgo = getTimeAgo(new Date(user.lastActive || Date.now()));

            html += `
                <div class="leaderboard-row${index < 3 ? ' top-3' : ''}">
                    <div class="leaderboard-rank">${rank}</div>
                    <div class="leaderboard-user-avatar">${avatar}</div>
                    <div class="leaderboard-user-info">
                        <div class="leaderboard-user-name">${user.name}</div>
                        <div class="leaderboard-user-status">Lv.${user.level || 1} • ${timeAgo}</div>
                    </div>
                    <div class="leaderboard-user-quiz">
                        <i class="fas fa-trophy"></i> ${formatNumber(user.holisticScore || 0)} PTS
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    // ==================== ACHIEVEMENTS ====================
    function loadAchievements() {
        let achievements = [];

        if (typeof REALTIME !== 'undefined') {
            // Get real achievements from REALTIME
            const realtimeAchievements = REALTIME.getAchievements();
            if (realtimeAchievements && realtimeAchievements.length > 0) {
                achievements = realtimeAchievements;
            } else {
                // Fallback achievements based on user stats
                const userData = getComprehensiveUserData();
                const stats = userData.stats || {};
                const level = userData.level || 1;

                achievements = [
                    {
                        name: 'Petani Pemula',
                        icon: '🌱',
                        desc: 'Tanam pertama',
                        unlocked: true,
                        progress: 100
                    },
                    {
                        name: 'Quiz Starter',
                        icon: '🧠',
                        desc: '5 kuis',
                        unlocked: (stats.quizzesCompleted || 0) >= 5,
                        progress: Math.min(((stats.quizzesCompleted || 0) / 5) * 100, 100)
                    },
                    {
                        name: 'Streak 7',
                        icon: '🔥',
                        desc: '7 hari streak',
                        unlocked: (userData.streak || 0) >= 7,
                        progress: Math.min(((userData.streak || 0) / 7) * 100, 100)
                    },
                    {
                        name: 'Level Up',
                        icon: '⭐',
                        desc: `Mencapai Level ${level}`,
                        unlocked: level >= 2,
                        progress: Math.min((level / 10) * 100, 100)
                    }
                ];
            }
        } else {
            // Sample achievements
            achievements = [
                { name: 'Petani Pemula', icon: '🌱', desc: 'Tanam pertama', unlocked: true, progress: 100 },
                { name: 'Quiz Starter', icon: '🧠', desc: '5 kuis', unlocked: false, progress: 60 },
                { name: 'Streak 7', icon: '🔥', desc: '7 hari streak', unlocked: false, progress: 40 }
            ];
        }

        const grid = document.getElementById('achievements-grid');
        if (!grid) return;

        let html = '';
        achievements.forEach(ach => {
            const progressWidth = ach.progress + '%';
            html += `
                <div class="achievement-card ${ach.unlocked ? 'unlocked' : 'locked'}">
                    <div class="achievement-icon-large">${ach.icon}</div>
                    <div class="achievement-name">${ach.name}</div>
                    <div class="achievement-desc">${ach.desc}</div>
                    ${ach.unlocked ?
                        '<div style="color: var(--success); font-weight: 600;">Terselesaikan!</div>' :
                        `<div class="achievement-progress"><div class="achievement-progress-fill" style="width: ${progressWidth};"></div></div>`
                    }
                </div>
            `;
        });

        grid.innerHTML = html;
    }

    // ==================== NOTIFICATIONS ====================
    function loadNotifications() {
        let notifications = getNotifications();
        renderNotifications(notifications);

        const badge = document.getElementById('notif-badge');
        if (badge) badge.textContent = notifications.length;
    }

    function getNotifications() {
        try {
            const stored = localStorage.getItem(NOTIFICATIONS_KEY);
            return stored ? JSON.parse(stored) : getSampleNotifications();
        } catch (e) {
            return getSampleNotifications();
        }
    }

    function getSampleNotifications() {
        // ✅ 100% REAL DATA - Aktivitas Terbaru siswa!
        if (typeof REALTIME === 'undefined') {
            console.warn('REALTIME not ready for real activities');
            return [];
        }

        // Get real activities from REALTIME
        let realActivities = [];
        if (REALTIME.getRecentActivities) {
            realActivities = REALTIME.getRecentActivities(5);
        } else if (REALTIME.getGlobalActivityLog) {
            const allActivities = REALTIME.getGlobalActivityLog();
            const currentUser = getCurrentUser();
            realActivities = allActivities
                .filter(activity => activity.userId === currentUser?.id)
                .slice(0, 5);
        }

        if (realActivities.length === 0) {
            return []; // Empty = no activities yet
        }

        return realActivities.map(activity => ({
            type: activity.type || 'activity',
            title: formatActivityTitle(activity),
            time: getTimeAgo(new Date(activity.timestamp)),
            isNew: true
        }));
    }

    function formatActivityTitle(activity) {
        const titles = {
            'complete_quiz': `<strong>${AUTH.getCurrentUser()?.name || 'Kamu'}</strong> selesai kuis!`,
            'read_guide': `<strong>${AUTH.getCurrentUser()?.name || 'Kamu'}</strong> membaca panduan`,
            'plant_crop': `<strong>${AUTH.getCurrentUser()?.name || 'Kamu'}</strong> menanam tanaman`,
            'earn_xp': `<strong>${AUTH.getCurrentUser()?.name || 'Kamu'}</strong> mendapat XP!`,
            'unlock_achievement': `<strong>${AUTH.getCurrentUser()?.name || 'Kamu'}</strong> unlock achievement`
        };
        return titles[activity.type] || `<strong>${AUTH.getCurrentUser()?.name || 'Kamu'}</strong> aktivitas ${activity.type}`;
    }


    function renderNotifications(notifications) {
        const container = document.getElementById('notifications-list');
        if (!container) return;

        if (!notifications.length) {
            container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🔔</div><div class="empty-state-text">Belum ada notifikasi</div></div>';
            return;
        }

        let html = '';
        notifications.forEach(notif => {
            html += `
                <div class="notification-item">
                    <div class="notification-icon ${notif.type || 'quiz'}">${getNotifIcon(notif.type)}</div>
                    <div class="notification-content">
                        <div class="notification-text">${notif.title}</div>
                        <div class="notification-time">${notif.time}</div>
                    </div>
                    ${notif.isNew ? '<div class="notification-new"></div>' : ''}
                </div>
            `;
        });
        container.innerHTML = html;
    }

    function getNotifIcon(type) {
        const icons = { quiz: '🧠', achievement: '🏆', level: '⭐', streak: '🔥' };
        return icons[type] || '🔔';
    }

    // ==================== PROFILE EDIT ====================
    function openEditModal() {
        const user = getCurrentUser();
        if (!user) return;

        const profileData = localStorage.getItem(PROFILE_DATA_KEY);
        const data = profileData ? JSON.parse(profileData) : {};

        document.getElementById('edit-name').value = user.name || '';
        selectedAvatar = data.avatar || '🌱';

        document.getElementById('edit-modal').classList.add('active');
    }

    function closeEditModal() {
        document.getElementById('edit-modal')?.classList.remove('active');
    }

    function selectAvatar(avatar) {
        selectedAvatar = avatar;
        document.querySelectorAll('#edit-modal .avatar-btn').forEach(btn => {
            btn.style.borderColor = btn.textContent === avatar ? '#4CAF50' : '#E0E0E0';
            btn.style.background = btn.textContent === avatar ? '#E8F5E9' : 'white';
        });
    }

    function saveProfile() {
        const user = getCurrentUser();
        if (!user) return;

        const newName = document.getElementById('edit-name').value.trim();
        if (!newName) {
            showToast('Nama tidak boleh kosong!', 'error');
            return;
        }

        // Update user
        user.name = newName;
        if (typeof AUTH !== 'undefined') AUTH.saveUser(user);

        // Update stored users
        const users = (typeof AUTH !== 'undefined') ? AUTH.getStoredUsers() : [];
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex >= 0) users[userIndex].name = newName;
        if (typeof AUTH !== 'undefined') AUTH.saveStoredUsers(users);

        // Save profile & realtime (safe call)
        saveProfileData({ avatar: selectedAvatar, name: newName });
        if (typeof REALTIME !== 'undefined' && typeof REALTIME.updateCurrentUserData === 'function') {
            try {
                REALTIME.updateCurrentUserData({ avatar: selectedAvatar });
            } catch (e) {
                console.log('REALTIME update skipped:', e.message);
            }
        }

        closeEditModal();
        loadUserData();
        showToast('Profil diperbarui!', 'success');
    }

    // ==================== UTILITIES ====================
    function getCurrentUser() {
        return (typeof AUTH !== 'undefined' && AUTH.getCurrentUser) ? AUTH.getCurrentUser() : null;
    }

    function refreshAllData() {
        loadUserData();
        loadLeaderboard();
        loadAchievements();
        loadNotifications();
        refreshAllProgress(); // Add this line
    }

    function formatNumber(num) {
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(0) + 'K';
        return num.toLocaleString();
    }

    function getTimeAgo(date) {
        const diff = Date.now() - new Date(date);
        const minutes = Math.floor(diff / 6e4);
        if (minutes < 1) return 'Baru saja';
        if (minutes < 60) return minutes + ' menit lalu';
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return hours + ' jam lalu';
        return Math.floor(hours / 24) + ' hari lalu';
    }

    function showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">${{success:'✅',error:'❌',info:'ℹ️'}[type] || 'ℹ️'}</div>
            <div class="toast-message">${message}</div>
        `;

        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => container.removeChild(toast), 300);
        }, 3000);
    }

    // Toggle sound
    function toggleSound() {
        const settings = { sound: !localStorage.getItem(SOUND_SETTINGS_KEY) || JSON.parse(localStorage.getItem(SOUND_SETTINGS_KEY)).sound !== false };
        localStorage.setItem(SOUND_SETTINGS_KEY, JSON.stringify(settings));
        loadSoundSettings();
        showToast(settings.sound ? 'Sound ON' : 'Sound OFF');
    }

    // Refresh leaderboard
    function refreshLeaderboard() {
        const btn = document.querySelector('.refresh-btn');
        if (btn) {
            btn.classList.add('loading');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
        }

        loadLeaderboard();

        if (btn) {
            setTimeout(() => {
                btn.classList.remove('loading');
                btn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
            }, 1200);
        }
        showToast('Leaderboard refreshed! ✨', 'success');
    }

    // Expose to global scope
    window.initProfile = initProfile;
    window.switchTab = switchTab;
    window.openEditModal = openEditModal;
    window.closeEditModal = closeEditModal;
    window.selectAvatar = selectAvatar;
    window.saveProfile = saveProfile;
    window.toggleSound = toggleSound;
    window.refreshLeaderboard = refreshLeaderboard;
    window.refreshStats = refreshStats;
    window.showToast = showToast;
    window.triggerPageLoadAnim = triggerPageLoadAnim;
    window.postRefreshAnim = postRefreshAnim;

// ==================== NEW: ANIMATION TRIGGERS ====================
function triggerPageLoadAnim() {
    // Simple trigger - use existing animations
    document.body.style.opacity = '0.3';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
}

function postRefreshAnim(section = 'all') {
    // Trigger refresh bounce on specific sections
    const selectors = {
        stats: '.stats-grid .stat-card-profile',
        leaderboard: '.leaderboard-row, .podium-item',
        notifications: '.notification-item',
        all: '.stat-card-profile, .leaderboard-row, .notification-item, .progress-bar-fill-profile'
    };

    const elements = document.querySelectorAll(selectors[section] || selectors.all);
    elements.forEach(el => {
        el.classList.add('refresh-animate');
        setTimeout(() => el.classList.remove('refresh-animate'), 800);
    });

    // XP shimmer
    const xpBar = document.getElementById('xp-progress-bar');
    if (xpBar) {
        xpBar.classList.add('refresh-shimmer');
        setTimeout(() => xpBar.classList.remove('refresh-shimmer'), 2000);
    }

    // Confetti success (farming-themed greens)
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0']
        });
    }

    // Toast dihilangkan per request user - cukup keyframes stagger/bounce
}


// ==================== ENHANCED INIT ====================
function initProfile() {
    console.log('📋 Profile init...');

    if (typeof AUTH === 'undefined' || !AUTH.protectPage()) return;

    // Wait for REALTIME to be ready
    let attempts = 0;
    const maxAttempts = 10;

    function tryInit() {
        attempts++;
        const realtimeReady = typeof REALTIME !== 'undefined';

        if (realtimeReady) {
            console.log('✅ REALTIME ready, loading profile...');

            createBackgroundParticles();
            loadUserData();
            loadSoundSettings();
            loadLeaderboard();
            loadNotifications();
            loadAchievements();

            // Trigger page load animations after short delay
            setTimeout(triggerPageLoadAnim, 200);

            // Start real-time polling (10 seconds)
            window.profilePollingInterval = setInterval(refreshAllData, 10000);

            console.log('✅ Profile fully loaded with real-time data');
        } else if (attempts < maxAttempts) {
            console.log(`⏳ Waiting for REALTIME... (${attempts}/${maxAttempts})`);
            setTimeout(tryInit, 1000);
        } else {
            console.error('❌ REALTIME not ready, using fallback data');
            createBackgroundParticles();
            loadUserData();
            loadSoundSettings();
            loadLeaderboard();
            loadNotifications();
            loadAchievements();
            setTimeout(triggerPageLoadAnim, 200);
        }
    }

    tryInit();
}

// ==================== ENHANCED REFRESH ====================
function refreshStats() {
    loadUserData();  // Original
    postRefreshAnim('stats');  // NEW: Visual feedback
}

function refreshLeaderboard() {
    const btn = document.querySelector('.leaderboard-section .refresh-btn');
    if (btn) {
        btn.classList.add('loading');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
    }

    loadLeaderboard();
    postRefreshAnim('leaderboard');  // NEW

    if (btn) {
        setTimeout(() => {
            btn.classList.remove('loading');
            btn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
        }, 1200);
    }
}

// Auto-init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfile);
} else {
    initProfile();
}
} ) ( ) ;  
 