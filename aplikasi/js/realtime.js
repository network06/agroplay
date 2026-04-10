/**
 * AGROPLAY - Real-time Data Manager v4.0
 * 100% Real Data - No Samples/Demo/Fiktif
 * Tracks user XP, stats, activities, achievements
 */

(function() {
    'use strict';

    // Global REALTIME object
    window.REALTIME = {
        // Activity types
        ACTIVITY_TYPES: {
            LOGIN: 'login',
            LOGOUT: 'logout',
            PLAY_GAME: 'play_game',
            COMPLETE_QUIZ: 'complete_quiz',
            READ_GUIDE: 'read_guide',
            PLANT_CROP: 'plant_crop',
            HARVEST_CROP: 'harvest_crop',
            EARN_XP: 'earn_xp',
            UNLOCK_ACHIEVEMENT: 'unlock_achievement',
            VIEW_PAGE: 'view_page'
        },

        // Get all users data from localStorage with enhanced reliability
        getAllUsersData: function() {
            try {
                // Try localStorage first
                var data = localStorage.getItem('agroplay_all_users_data');
                if (data) {
                    var parsed = JSON.parse(data);
                    if (typeof parsed === 'object' && parsed !== null) {
                        // console.log('📦 REALTIME: Data loaded from localStorage');
                        return parsed;
                    }
                }
                
                // If no data, return empty object
                // console.log('📦 REALTIME: No data found, returning empty');
                return {};
            } catch (e) {
                console.error('📦 REALTIME.getAllUsersData error:', e);
                
                // Clear corrupted data
                try {
                    localStorage.removeItem('agroplay_all_users_data');
                    console.log('📦 REALTIME: Corrupted data cleared');
                } catch (storageError) {
                    console.warn('📦 Storage access blocked - using memory fallback');
                }
                
                // Initialize memory fallback
                if (!this._memoryFallback) {
                    this._memoryFallback = {};
                }
                return this._memoryFallback;
            }
        },

        // Save all users data with enhanced reliability
        saveTimeout: null,
        saveAllUsersData: function(data) {
            // Clear any existing timeout
            if (this.saveTimeout) clearTimeout(this.saveTimeout);
            
            // IMMEDIATE SAVE + Debounced save for reliability
            try {
                // Save immediately
                localStorage.setItem('agroplay_all_users_data', JSON.stringify(data));
                
                // Update memory fallback
                this._memoryFallback = { ...data };
                
                // console.log('💾 REALTIME: Data saved immediately');
                
                // Verify save
                const verify = localStorage.getItem('agroplay_all_users_data');
                if (!verify) {
                    throw new Error('Save verification failed');
                }
                
                // Also schedule debounced save as backup
                this.saveTimeout = setTimeout(() => {
                    try {
                        localStorage.setItem('agroplay_all_users_data', JSON.stringify(data));
                        // console.log('💾 REALTIME: Backup save completed');
                    } catch (e) {
                        console.warn('💾 Backup save failed:', e);
                    }
                }, 1000);
                
            } catch (e) {
                console.error('💾 REALTIME.saveAllUsersData error:', e);
                
                // Handle storage access errors
                if (!this._memoryFallback) {
                    this._memoryFallback = {};
                }
                Object.assign(this._memoryFallback, data);
                console.warn('💾 Using memory fallback due to storage issues');
            }
        },

        // Initialize user data (called on first login)
        initUserData: function(userId, userName, role) {
            var allData = this.getAllUsersData();
            if (!allData[userId]) {
                allData[userId] = {
                    id: userId,
                    name: userName || 'Siswa Agroplay',
                    role: role || 'siswa',
                    xp: 0,
                    level: 1,
                    streak: 0,
                    lastActive: new Date().toISOString(),
                    loginCount: 0,
                    achievements: [],
                    activities: [],
                    stats: {
                        gamesPlayed: 0,
                        quizzesCompleted: 0,
                        guidesRead: 0,
                        plantsPlanted: 0,
                        plantsHarvested: 0,
                        cuanCoins: 0,
                        booksRead: 0,
                        totalScore: 0
                    }
                };
                this.saveAllUsersData(allData);
            }
            return allData[userId];
        },

        // Ensure user data is properly initialized
        ensureUserInitialized: function() {
            // Try multiple ways to get current user
            var user = null;
            
            // Method 1: window.getCurrentUser
            if (typeof window.getCurrentUser === 'function') {
                user = window.getCurrentUser();
                // console.log('🔧 REALTIME: User from window.getCurrentUser:', user);
            }
            
            // Method 2: AUTH.getCurrentUser
            if (!user && typeof window.AUTH !== 'undefined' && typeof window.AUTH.getCurrentUser === 'function') {
                user = window.AUTH.getCurrentUser();
                // console.log('🔧 REALTIME: User from AUTH.getCurrentUser:', user);
            }
            
            // Method 3: Current user from localStorage
            if (!user) {
                try {
                    const currentUserStr = localStorage.getItem('agroplay_current_user');
                    if (currentUserStr) {
                        user = JSON.parse(currentUserStr);
                        // console.log('🔧 REALTIME: User from localStorage:', user);
                    }
                } catch (e) {
                    console.warn('🔧 REALTIME: Failed to get user from localStorage:', e);
                }
            }
            
            if (!user || !user.id) {
                console.error('🔧 REALTIME: No user found to initialize');
                console.error('🔧 REALTIME: Available methods:', {
                    windowGetCurrentUser: typeof window.getCurrentUser,
                    authGetCurrentUser: typeof window.AUTH?.getCurrentUser,
                    localStorageItem: localStorage.getItem('agroplay_current_user')
                });
                return false;
            }
            
            // console.log('🔧 REALTIME: Ensuring user is initialized:', user.email, 'ID:', user.id);
            
            var allData = this.getAllUsersData();
            
            if (!allData[user.id]) {
                // console.log('🔧 REALTIME: User data missing, creating...');
                this.initUserData(user.id, user.name, user.role);
                allData = this.getAllUsersData();
            }
            
            // Verify data exists
            if (allData[user.id]) {
                // console.log('🔧 REALTIME: User data confirmed:', allData[user.id]);
                return true;
            } else {
                console.error('🔧 REALTIME: Failed to initialize user data');
                return false;
            }
        },

        // Get current user data (REAL only)
        getCurrentUserData: function() {
            // Try multiple ways to get current user
            var user = null;
            
            // Method 1: window.getCurrentUser
            if (typeof window.getCurrentUser === 'function') {
                user = window.getCurrentUser();
                // console.log('🔍 REALTIME: User from window.getCurrentUser:', user);
            }
            
            // Method 2: AUTH.getCurrentUser
            if (!user && typeof window.AUTH !== 'undefined' && typeof window.AUTH.getCurrentUser === 'function') {
                user = window.AUTH.getCurrentUser();
                // console.log('🔍 REALTIME: User from AUTH.getCurrentUser:', user);
            }
            
            // Method 3: Current user from localStorage
            if (!user) {
                try {
                    const currentUserStr = localStorage.getItem('agroplay_current_user');
                    if (currentUserStr) {
                        user = JSON.parse(currentUserStr);
                        // console.log('🔍 REALTIME: User from localStorage:', user);
                    }
                } catch (e) {
                    console.warn('🔍 REALTIME: Failed to get user from localStorage:', e);
                }
            }
            
            if (!user || !user.id) {
                console.error('🔍 REALTIME: No current user found');
                console.error('🔍 REALTIME: Available methods:', {
                    windowGetCurrentUser: typeof window.getCurrentUser,
                    authGetCurrentUser: typeof window.AUTH?.getCurrentUser,
                    localStorageItem: localStorage.getItem('agroplay_current_user')
                });
                return null;
            }

            // console.log('🔍 REALTIME: Looking for user data with ID:', user.id);
            
            var allData = this.getAllUsersData();
            // console.log('🔍 REALTIME: Available user IDs:', Object.keys(allData));
            
            if (!allData[user.id]) {
                // console.log('🔍 REALTIME: User data not found, initializing...');
                this.initUserData(user.id, user.name, user.role);
                allData = this.getAllUsersData();
                // console.log('🔍 REALTIME: User data initialized:', allData[user.id]);
            }
            
            var userData = allData[user.id];
            // console.log('🔍 REALTIME: Returning user data:', userData);
            return userData;
        },

        // Add XP (REAL updates)
        addXP: function(amount, source) {
            var userData = this.getCurrentUserData();
            if (!userData) {
                // console.log('💫 REALTIME: No user data for addXP');
                return { xp: 0, level: 1 };
            }

            var allData = this.getAllUsersData();
            var currentXP = userData.xp || 0;
            var newXP = currentXP + amount;
            var level = Math.floor(newXP / 100) + 1;
            var xpNeeded = level * 100;
            
            // console.log('💫 REALTIME: Adding XP - Current:', currentXP, 'Adding:', amount, 'New:', newXP, 'Level:', level);

            // Update user data
            allData[userData.id].xp = newXP;
            allData[userData.id].level = level;
            allData[userData.id].lastActive = new Date().toISOString();

            this.saveAllUsersData(allData);
            
            // Use enhanced real-time tracking
            this.trackRealtimeActivity('earn_xp', { amount, source, newLevel: level });
            
            // console.log('💫 REALTIME: XP saved successfully - New XP:', newXP, 'New Level:', level);
            return { xp: newXP, level, xpNeeded };
        },

        // Increment stat counter (REAL)
        incrementStat: function(statName, value) {
            var userData = this.getCurrentUserData();
            
            if (!userData) {
                console.log('📈 REALTIME: No user data for incrementStat:', statName);
                return;
            }

            var allData = this.getAllUsersData();
            allData[userData.id].stats = allData[userData.id].stats || {};
            
            // Handle both increment (default) and custom value
            var oldValue = allData[userData.id].stats[statName] || 0;
            var newValue = value !== undefined ? oldValue + value : oldValue + 1;
            allData[userData.id].stats[statName] = newValue;
            
            console.log('📈 REALTIME: Incremented', statName, 'from', oldValue, 'to', newValue, value !== undefined ? '(added ' + value + ')' : '');
            
            allData[userData.id].lastActive = new Date().toISOString();
            this.saveAllUsersData(allData);
            
            // Track this activity for real-time leaderboard
            this.trackRealtimeActivity('increment_stat', { 
                statName: statName, 
                oldValue: oldValue, 
                newValue: newValue,
                added: value !== undefined ? value : 1
            });
        },

        // Record activity (REAL)
        recordActivity: function(type, details) {
            var userData = this.getCurrentUserData();
            if (!userData) return;

            var allData = this.getAllUsersData();
            if (!allData[userData.id].activities) allData[userData.id].activities = [];

            var activity = {
                type: type,
                timestamp: new Date().toISOString(),
                details: details || {}
            };

            allData[userData.id].activities.unshift(activity);
            if (allData[userData.id].activities.length > 50) {
                allData[userData.id].activities = allData[userData.id].activities.slice(0, 50);
            }
            allData[userData.id].lastActive = new Date().toISOString();
            this.saveAllUsersData(allData);
        },

        // Recent activities (REAL only - NO samples)
        getRecentActivities: function(limit) {
            var userData = this.getCurrentUserData();
            if (!userData || !userData.activities || userData.activities.length === 0) {
                return [];
            }

            return userData.activities.slice(0, limit || 5).map(activity => {
                var timeDiff = Date.now() - new Date(activity.timestamp);
                var minutes = Math.floor(timeDiff / 60000);
                var timeStr = minutes < 1 ? 'Baru saja' :
                             minutes < 60 ? minutes + ' menit lalu' :
                             Math.floor(minutes / 60) + ' jam lalu';
                return { ...activity, time: timeStr };
            });
        },

        // Leaderboard (100% REAL siswa data with anti-cheat validation)
        getLeaderboard: function(limit) {
            var allData = this.getAllUsersData();
            var siswa = [];

            Object.keys(allData).forEach(id => {
                var user = allData[id];
                if (user.role === 'siswa') {
                    var stats = user.stats || {};
                    
                    // Anti-cheat validation: Check if quiz data is realistic
                    var quizAttempts = stats.quizAttempts || 0;
                    var avgScore = quizAttempts > 0 ? (stats.totalQuizScore || 0) / quizAttempts : 0;
                    var timePerQuestion = stats.avgTimePerQuestion || 0;
                    
                    // Validate quiz session (basic anti-cheat)
                    var isValidSession = true;
                    if (avgScore > 100) isValidSession = false; // Impossible average score
                    if (timePerQuestion > 0 && timePerQuestion < 2) isValidSession = false; // Too fast (less than 2 seconds per question)
                    if (quizAttempts > 100 && avgScore > 95) isValidSession = false; // Suspicious pattern
                    
                    // Calculate holistic score with validation bonus/penalty
                    var baseScore = Math.round(
                        (user.xp || 0) * 0.4 +
                        (stats.quizzesCompleted || 0) * 10 +
                        (stats.plantsPlanted || 0) * 5 +
                        (user.streak || 0) * 20
                    );
                    
                    // Apply validation modifier
                    if (isValidSession) {
                        baseScore += 5; // Bonus for valid sessions
                    } else {
                        baseScore *= 0.5; // Penalty for suspicious sessions
                    }
                    
                    siswa.push({ 
                        ...user, 
                        holisticScore: Math.round(baseScore),
                        isValidSession: isValidSession,
                        quizAttempts: quizAttempts,
                        avgScore: Math.round(avgScore)
                    });
                }
            });

            // Sort by holistic score, but prioritize valid sessions
            siswa.sort((a, b) => {
                if (a.isValidSession !== b.isValidSession) {
                    return b.isValidSession - a.isValidSession; // Valid sessions first
                }
                return b.holisticScore - a.holisticScore;
            });
            
            return siswa.slice(0, limit || 10);
        },

        getTopPetani: function(limit = 10) {
            var allData = this.getAllUsersData();
            var siswa = [];
            var now = Date.now();

            Object.keys(allData).forEach(id => {
                var user = allData[id];
                if (user.role === 'siswa') {
                    var stats = user.stats || {};
                    
                    // Enhanced anti-cheat validation
                    var quizAttempts = stats.quizAttempts || 0;
                    var avgScore = quizAttempts > 0 ? (stats.totalQuizScore || 0) / quizAttempts : 0;
                    var timePerQuestion = stats.avgTimePerQuestion || 0;
                    
                    // Advanced validation
                    var isValidSession = true;
                    var validationScore = 1.0;
                    
                    if (avgScore > 100) { 
                        isValidSession = false; 
                        validationScore = 0.3;
                    }
                    if (timePerQuestion > 0 && timePerQuestion < 2) { 
                        isValidSession = false; 
                        validationScore = 0.4;
                    }
                    if (quizAttempts > 100 && avgScore > 95) { 
                        isValidSession = false; 
                        validationScore = 0.5;
                    }
                    
                    // Calculate activity score (real-time engagement)
                    var lastActiveTime = new Date(user.lastActive || user.createdAt).getTime();
                    var hoursSinceActive = (now - lastActiveTime) / (1000 * 60 * 60);
                    var activityScore = Math.max(0, 100 - (hoursSinceActive * 2)); // Decay over time
                    
                    // Enhanced holistic scoring
                    var baseScore = Math.round(
                        (user.xp || 0) * 0.3 +                    // XP weight reduced
                        (stats.quizzesCompleted || 0) * 15 +     // Quiz weight increased
                        (stats.plantsPlanted || 0) * 8 +         // Planting weight increased
                        (stats.plantsHarvested || 0) * 10 +     // Harvesting added
                        (user.streak || 0) * 25 +                // Streak weight increased
                        (stats.booksRead || 0) * 5 +             // Reading activity
                        activityScore * 2 +                      // Real-time activity
                        ((user.loginCount || 0) * 2)             // Login frequency
                    );
                    
                    // Apply validation modifier
                    if (isValidSession) {
                        baseScore += 50; // Bonus for valid sessions
                    } else {
                        baseScore *= validationScore; // Penalty for suspicious sessions
                    }
                    
                    // Calculate engagement level
                    var engagementLevel = this.calculateEngagementLevel(user, stats);
                    
                    siswa.push({ 
                        ...user, 
                        holisticScore: Math.round(baseScore),
                        activityScore: Math.round(activityScore),
                        engagementLevel: engagementLevel,
                        isValidSession: isValidSession,
                        quizAttempts: quizAttempts,
                        avgScore: Math.round(avgScore),
                        hoursSinceActive: Math.round(hoursSinceActive),
                        lastSeen: this.formatLastSeen(lastActiveTime)
                    });
                }
            });

            // Sort by holistic score, then by activity, then by engagement
            siswa.sort((a, b) => {
                // Prioritize valid sessions
                if (a.isValidSession !== b.isValidSession) {
                    return b.isValidSession - a.isValidSession;
                }
                // Then by holistic score
                if (b.holisticScore !== a.holisticScore) {
                    return b.holisticScore - a.holisticScore;
                }
                // Then by recent activity
                if (b.activityScore !== a.activityScore) {
                    return b.activityScore - a.activityScore;
                }
                // Finally by engagement level
                return b.engagementLevel - a.engagementLevel;
            });
            
            return siswa.slice(0, limit);
        },

        // Calculate engagement level based on various factors
        calculateEngagementLevel: function(user, stats) {
            var level = 0;
            
            // XP contribution
            level += Math.min((user.xp || 0) / 100, 50);
            
            // Activity diversity
            var activityTypes = 0;
            if (stats.quizzesCompleted > 0) activityTypes++;
            if (stats.plantsPlanted > 0) activityTypes++;
            if (stats.plantsHarvested > 0) activityTypes++;
            if (stats.booksRead > 0) activityTypes++;
            level += activityTypes * 10;
            
            // Consistency (streak)
            level += Math.min((user.streak || 0) * 5, 30);
            
            // Login frequency
            level += Math.min((user.loginCount || 0) * 0.5, 10);
            
            return Math.round(level);
        },

        // Format last seen time
        formatLastSeen: function(timestamp) {
            var now = Date.now();
            var diff = now - timestamp;
            var minutes = Math.floor(diff / 60000);
            var hours = Math.floor(diff / 3600000);
            var days = Math.floor(diff / 86400000);
            
            if (minutes < 1) return 'Online sekarang';
            if (minutes < 60) return minutes + ' menit lalu';
            if (hours < 24) return hours + ' jam lalu';
            if (days < 7) return days + ' hari lalu';
            return 'Lebih dari seminggu';
        },

        // Track real-time user activity
        trackRealtimeActivity: function(activityType, details = {}) {
            var userData = this.getCurrentUserData();
            if (!userData) return;

            var allData = this.getAllUsersData();
            
            // Update last active timestamp
            allData[userData.id].lastActive = new Date().toISOString();
            
            // Track activity frequency
            if (!allData[userData.id].activityFrequency) {
                allData[userData.id].activityFrequency = {};
            }
            
            var today = new Date().toDateString();
            if (!allData[userData.id].activityFrequency[today]) {
                allData[userData.id].activityFrequency[today] = {};
            }
            
            allData[userData.id].activityFrequency[today][activityType] = 
                (allData[userData.id].activityFrequency[today][activityType] || 0) + 1;
            
            // Update online status
            allData[userData.id].isOnline = true;
            
            // Record the activity
            this.recordActivity(activityType, details);
            
            // Save changes
            this.saveAllUsersData(allData);
            
            // Auto-set offline after 5 minutes of inactivity
            this.scheduleOfflineCheck(userData.id);
        },

        // Schedule offline status check
        scheduleOfflineCheck: function(userId) {
            // Clear existing timeout for this user
            if (this._offlineTimeouts) {
                Object.keys(this._offlineTimeouts).forEach(id => {
                    if (id === userId) {
                        clearTimeout(this._offlineTimeouts[id]);
                        delete this._offlineTimeouts[id];
                    }
                });
            } else {
                this._offlineTimeouts = {};
            }
            
            // Set new timeout
            this._offlineTimeouts[userId] = setTimeout(() => {
                this.setUserOffline(userId);
            }, 5 * 60 * 1000); // 5 minutes
        },

        // Set user as offline
        setUserOffline: function(userId) {
            var allData = this.getAllUsersData();
            if (allData[userId]) {
                allData[userId].isOnline = false;
                this.saveAllUsersData(allData);
            }
        },

        // Get online users count
        getOnlineUsersCount: function() {
            var allData = this.getAllUsersData();
            var count = 0;
            var now = Date.now();
            
            Object.values(allData).forEach(user => {
                if (user.role === 'siswa' && user.isOnline) {
                    // Verify user is actually recently active
                    var lastActive = new Date(user.lastActive).getTime();
                    var minutesSinceActive = (now - lastActive) / (1000 * 60);
                    
                    if (minutesSinceActive < 10) { // Consider online if active in last 10 minutes
                        count++;
                    } else {
                        // Auto-correct offline status
                        user.isOnline = false;
                    }
                }
            });
            
            return count;
        },

        // Get activity heatmap data
        getActivityHeatmap: function(userId, days = 7) {
            var allData = this.getAllUsersData();
            var userData = allData[userId];
            if (!userData) return {};

            var heatmap = {};
            var now = new Date();
            
            for (var i = 0; i < days; i++) {
                var date = new Date(now);
                date.setDate(date.getDate() - i);
                var dateStr = date.toDateString();
                
                var dayActivities = userData.activityFrequency && userData.activityFrequency[dateStr];
                var totalActivities = 0;
                
                if (dayActivities) {
                    Object.values(dayActivities).forEach(count => {
                        totalActivities += count;
                    });
                }
                
                heatmap[dateStr] = {
                    date: dateStr,
                    activities: totalActivities,
                    details: dayActivities || {}
                };
            }
            
            return heatmap;
        },

        // Get user engagement trends
        getEngagementTrends: function(userId, days = 7) {
            var heatmap = this.getActivityHeatmap(userId, days);
            var trends = {
                daily: [],
                totalActivities: 0,
                mostActiveDay: null,
                averageActivities: 0
            };
            
            var dates = Object.keys(heatmap).sort();
            var maxActivities = 0;
            
            dates.forEach(dateStr => {
                var data = heatmap[dateStr];
                trends.daily.push({
                    date: dateStr,
                    activities: data.activities
                });
                
                trends.totalActivities += data.activities;
                
                if (data.activities > maxActivities) {
                    maxActivities = data.activities;
                    trends.mostActiveDay = dateStr;
                }
            });
            
            trends.averageActivities = dates.length > 0 ? 
                Math.round(trends.totalActivities / dates.length) : 0;
            
            return trends;
        },

        // Smart auto-sync for profile updates
        setupProfileSync: function() {
            // Listen for storage changes from other tabs
            window.addEventListener('storage', function(e) {
                if (e.key === 'agroplay_all_users_data') {
                    console.log(' REALTIME: Storage updated from other tab');
                    // Trigger profile refresh if on profile page
                    if (window.location.pathname.includes('profil-simple')) {
                        setTimeout(() => {
                            if (typeof window.loadSimpleProfile === 'function') {
                                window.loadSimpleProfile();
                            }
                        }, 100);
                    }
                }
            });
            
            // Setup periodic profile sync (every 15 seconds)
            setInterval(() => {
                if (window.location.pathname.includes('profil-simple')) {
                    const currentUser = this.getCurrentUserData();
                    if (currentUser) {
                        // Force refresh of profile data
                        // console.log(' REALTIME: Auto-syncing profile data');
                        this.syncData();
                    }
                }
            }, 15000);
        },

        // Force immediate profile update
        updateProfileNow: function() {
            const userData = this.getCurrentUserData();
            if (userData) {
                console.log(' REALTIME: Force updating profile');
                
                // Trigger custom event for profile update
                window.dispatchEvent(new CustomEvent('profileUpdate', {
                    detail: { userData: userData }
                }));
                
                // Also try direct update
                if (typeof window.updateProfileUI === 'function') {
                    const user = window.AUTH ? window.AUTH.getCurrentUser() : null;
                    if (user) {
                        window.updateProfileUI(user, userData);
                    }
                }
            }
        },

        // Update user stats with enhanced tracking
        updateUserStats: function(newStats) {
            var userData = this.getCurrentUserData();
            if (!userData) return false;
            
            var allData = this.getAllUsersData();
            var currentStats = allData[userData.id].stats || {};
            Object.keys(newStats).forEach(key => {
                if (typeof newStats[key] === 'number') {
                    currentStats[key] = (currentStats[key] || 0) + newStats[key];
                } else {
                    currentStats[key] = newStats[key];
                }
            });
            
            allData[userData.id].stats = currentStats;
            allData[userData.id].lastActive = new Date().toISOString();
            this.saveAllUsersData(allData);
            return true;
        },

        // Save single user data (helper function)
        saveUserData: function(userData) {
            var allData = this.getAllUsersData();
            allData[userData.id] = userData;
            this.saveAllUsersData(allData);
        },

        // Update current user data (for profile edits)
        updateCurrentUserData: function(updates) {
            var userData = this.getCurrentUserData();
            if (!userData) return false;
            
            var allData = this.getAllUsersData();
            Object.assign(allData[userData.id], updates);
            allData[userData.id].lastActive = new Date().toISOString();
            this.saveAllUsersData(allData);
            return true;
        },

        // Backup critical data to localStorage
        backupData: function() {
            try {
                const allData = this.getAllUsersData();
                const backup = {
                    timestamp: new Date().toISOString(),
                    version: '1.0',
                    data: allData
                };
                
                localStorage.setItem('agroplay_backup', JSON.stringify(backup));
                // console.log('💾 REALTIME: Data backup created');
                return true;
            } catch (e) {
                console.error('💾 REALTIME: Backup failed:', e);
                return false;
            }
        },

        // Restore data from backup if needed
        restoreFromBackup: function() {
            try {
                const backup = localStorage.getItem('agroplay_backup');
                if (!backup) {
                    // console.log('🔄 REALTIME: No backup found');
                    return false;
                }
                
                const parsed = JSON.parse(backup);
                if (parsed.data && typeof parsed.data === 'object') {
                    this.saveAllUsersData(parsed.data);
                    // console.log('🔄 REALTIME: Data restored from backup');
                    return true;
                }
                return false;
            } catch (e) {
                console.error('🔄 REALTIME: Restore failed:', e);
                return false;
            }
        },

        // Sync all data to localStorage
        syncData: function() {
            try {
                const currentData = this.getAllUsersData();
                const userCount = Object.keys(currentData).length;
                
                // console.log('🔄 REALTIME: Syncing data for', userCount, 'users');
                
                // Force save to localStorage
                localStorage.setItem('agroplay_all_users_data', JSON.stringify(currentData));
                
                // Create backup
                this.backupData();
                
                // Verify sync
                const verify = localStorage.getItem('agroplay_all_users_data');
                if (verify) {
                    const verifyParsed = JSON.parse(verify);
                    // console.log('✅ REALTIME: Data sync successful');
                    return true;
                }
                return false;
            } catch (e) {
                console.error('🔄 REALTIME: Sync failed:', e);
                return false;
            }
        },
        getUserStats: function() {
            var userData = this.getCurrentUserData();
            return userData ? userData.stats || {} : {};
        },

        // Achievements (REAL calculations)
        getAchievements: function() {
            var userData = this.getCurrentUserData();
            if (!userData) return [];

            var stats = userData.stats || {};
            var achievements = [
                { name: 'Petani Pemula', icon: '🌱', req: 1, type: 'plantsPlanted', unlocked: (stats.plantsPlanted || 0) >= 1 },
                { name: 'Quiz Starter', icon: '🧠', req: 5, type: 'quizzesCompleted', unlocked: (stats.quizzesCompleted || 0) >= 5 },
                { name: 'Guide Reader', icon: '📚', req: 10, type: 'guidesRead', unlocked: (stats.guidesRead || 0) >= 10 },
                { name: 'Streak 3', icon: '🔥', req: 3, type: 'streak', unlocked: (userData.streak || 0) >= 3 },
                { name: 'Streak 7', icon: '⚡', req: 7, type: 'streak', unlocked: (userData.streak || 0) >= 7 },
                { name: 'Quiz Master', icon: '🏆', req: 20, type: 'quizzesCompleted', unlocked: (stats.quizzesCompleted || 0) >= 20 },
                { name: 'Plant Expert', icon: '🌿', req: 50, type: 'plantsPlanted', unlocked: (stats.plantsPlanted || 0) >= 50 }
            ];

            achievements.forEach(ach => {
                var progress = 0;
                switch (ach.type) {
                    case 'plantsPlanted': progress = Math.min(((stats.plantsPlanted || 0) / ach.req) * 100, 100); break;
                    case 'quizzesCompleted': progress = Math.min(((stats.quizzesCompleted || 0) / ach.req) * 100, 100); break;
                    case 'guidesRead': progress = Math.min(((stats.guidesRead || 0) / ach.req) * 100, 100); break;
                    case 'streak': progress = Math.min(((userData.streak || 0) / ach.req) * 100, 100); break;
                }
                ach.progress = Math.round(progress);
            });

            return achievements;
        },

        // Track login
        trackLogin: function() {
            var userData = this.getCurrentUserData();
            if (!userData) return;

            var allData = this.getAllUsersData();
            allData[userData.id].loginCount = (allData[userData.id].loginCount || 0) + 1;
            allData[userData.id].lastActive = new Date().toISOString();
            allData[userData.id].isOnline = true;
            
            this.saveAllUsersData(allData);
            
            // Use enhanced real-time tracking
            this.trackRealtimeActivity('login', { 
                loginNumber: allData[userData.id].loginCount,
                timestamp: new Date().toISOString()
            });
            
            // Schedule offline check
            this.scheduleOfflineCheck(userData.id);
        },

        // Track logout
        trackLogout: function() {
            var userData = this.getCurrentUserData();
            if (!userData) return;

            var allData = this.getAllUsersData();
            allData[userData.id].isOnline = false;
            allData[userData.id].lastActive = new Date().toISOString();
            
            // Clear any existing offline timeout
            if (this._offlineTimeouts && this._offlineTimeouts[userData.id]) {
                clearTimeout(this._offlineTimeouts[userData.id]);
                delete this._offlineTimeouts[userData.id];
            }
            
            this.saveAllUsersData(allData);
            
            // Use enhanced real-time tracking
            this.trackRealtimeActivity('logout', { 
                timestamp: new Date().toISOString()
            });
        },

        // Track page views
        trackPageView: function(page) {
            this.recordActivity('view_page', { page: page || 'unknown' });
        },

        // Teacher-specific methods (REAL data)
        getTeacherClasses: function(teacherId) {
            var allData = this.getAllUsersData();
            var classes = {};
            Object.values(allData).forEach(user => {
                if (user.role === 'siswa' && user.class && user.class !== '') {
                    if (!classes[user.class]) classes[user.class] = { id: user.class, name: user.class, count: 0 };
                    classes[user.class].count++;
                }
            });
            return Object.values(classes);
        },

        getStudentsByTeacher: function(teacherId) {
            var allData = this.getAllUsersData();
            return Object.values(allData).filter(user => user.role === 'siswa');
        },

        getStudentsByClass: function(classId) {
            var allData = this.getAllUsersData();
            return Object.values(allData).filter(user => user.role === 'siswa' && user.class === classId);
        },

        getClassLeaderboard: function(classId, limit = 10) {
            var students = this.getStudentsByClass(classId);
            var leaderboard = students.map(user => {
                var score = Math.round(
                    (user.xp || 0) * 0.4 +
                    ((user.stats?.quizzesCompleted || 0) * 10) +
                    ((user.stats?.plantsPlanted || 0) * 5) +
                    ((user.streak || 0) * 20)
                );
                return { ...user, holisticScore: score };
            }).sort((a, b) => b.holisticScore - a.holisticScore);
            return leaderboard.slice(0, limit);
        },

        getGlobalActivityLog: function(limit = 50) {
            var allData = this.getAllUsersData();
            var activities = [];
            Object.values(allData).forEach(user => {
                if (user.activities && user.activities.length > 0) {
                    activities = activities.concat(user.activities.map(a => ({ ...a, userId: user.id, userName: user.name })));
                }
            });
            return activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, limit);
        },

        // Get stats summary for admin dashboard
        getStatsSummary: function() {
            var allData = this.getAllUsersData();
            var summary = {
                totalUsers: Object.keys(allData).length,
                activeUsers: 0,
                totalSessions: 0,
                roleStats: { siswa: 0, guru: 0, orangtua: 0, admin: 0 },
                totalXP: 0,
                avgLevel: 0,
                recentActivity: 0
            };

            var now = Date.now();
            var dayAgo = now - (24 * 60 * 60 * 1000);
            var weekAgo = now - (7 * 24 * 60 * 60 * 1000);

            Object.values(allData).forEach(user => {
                // Count roles
                if (user.role && summary.roleStats.hasOwnProperty(user.role)) {
                    summary.roleStats[user.role]++;
                }

                // Count active users (last 24 hours)
                if (user.lastActive) {
                    var lastActive = new Date(user.lastActive).getTime();
                    if (lastActive > dayAgo) {
                        summary.activeUsers++;
                    }
                    if (lastActive > weekAgo) {
                        summary.recentActivity++;
                    }
                }

                // Total XP and sessions
                summary.totalXP += user.xp || 0;
                summary.totalSessions += user.loginCount || 0;
            });

            // Calculate average level
            if (summary.totalUsers > 0) {
                var totalLevel = Object.values(allData).reduce((sum, user) => sum + (user.level || 1), 0);
                summary.avgLevel = Math.round(totalLevel / summary.totalUsers);
            }

            return summary;
        },

        // Auto-initialize on load
        // Initialize auto-sync and monitoring
        initAutoTrack: function() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    this.initializeDataSync();
                });
            } else {
                this.initializeDataSync();
            }
        },

        // Initialize data synchronization
        initializeDataSync: function() {
            // console.log('🔄 REALTIME: Initializing data sync...');
            
            // Clear any existing intervals
            if (this._syncInterval) clearInterval(this._syncInterval);
            if (this._backupInterval) clearInterval(this._backupInterval);
            
            // Check if data exists, if not try restore from backup
            const currentData = this.getAllUsersData();
            const userCount = Object.keys(currentData).length;
            
            if (userCount === 0) {
                // console.log('🔄 REALTIME: No data found, trying backup...');
                this.restoreFromBackup();
            }
            
            // Force sync to ensure data is in localStorage
            this.syncData();
            
            // Setup periodic backup (every 60 seconds - reduced frequency)
            this._backupInterval = setInterval(() => {
                this.backupData();
            }, 60000);
            
            // Setup periodic sync (every 30 seconds - reduced frequency)
            this._syncInterval = setInterval(() => {
                this.syncData();
            }, 30000);
            
            // console.log('🔄 REALTIME: Data sync initialized');
        },

        // Force save and verify user data after critical activities
        forceSaveAndVerify: function(activityType, details = {}) {
            var userData = this.getCurrentUserData();
            if (!userData) return false;
            
            console.log('💾 REALTIME: Force save and verify after', activityType);
            
            var allData = this.getAllUsersData();
            
            // Ensure user exists in all data
            if (!allData[userData.id]) {
                allData[userData.id] = userData;
            }
            
            // Update last active
            allData[userData.id].lastActive = new Date().toISOString();
            
            // Force save multiple times for reliability
            try {
                localStorage.setItem('agroplay_all_users_data', JSON.stringify(allData));
                
                // Verify save
                var verify = localStorage.getItem('agroplay_all_users_data');
                if (verify) {
                    var verifyData = JSON.parse(verify);
                    if (verifyData[userData.id]) {
                        console.log('✅ REALTIME: Force save successful for', userData.name);
                        console.log('📊 REALTIME: User data after save:', verifyData[userData.id]);
                        
                        // Track this force save
                        this.trackRealtimeActivity('force_save', { 
                            activityType: activityType,
                            details: details
                        });
                        
                        return true;
                    }
                }
            } catch (e) {
                console.error('❌ REALTIME: Force save failed:', e);
            }
            
            return false;
        }
    };

    // Initialize immediately
    window.REALTIME.initAutoTrack();
})();
