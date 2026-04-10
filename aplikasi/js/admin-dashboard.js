/**
 * Advanced Real-time Admin Dashboard JS
 * Integrates with REALTIME, AUTH, Chart.js
 */

(function() {
    'use strict';

    // DOM Elements
    const elements = {
        stats: {
            totalUsers: document.getElementById('total-users'),
            activeUsers: document.getElementById('active-users'),
            totalSessions: document.getElementById('total-sessions'),
            roleSiswa: document.getElementById('count-siswa'),
            roleGuru: document.getElementById('count-guru'),
            roleOrtu: document.getElementById('count-ortu'),
            roleAdmin: document.getElementById('count-admin')
        },
        usersTable: document.getElementById('users-table-body'),
        activitiesFeed: document.getElementById('activity-feed'),
        searchUsers: document.getElementById('search-users'),
        filterRole: document.getElementById('filter-role'),
        sortUsers: document.getElementById('sort-users')
    };

    let allUsers = [];
    let globalActivities = [];
    let leaderboard = [];
    let pollInterval;

    // Init
function init() {
        // Retry logic for AUTH loading
        function tryInit(attempts = 0) {
            if (typeof AUTH !== 'undefined' && AUTH.requireRole('admin')) {
                loadInitialData();
                setupEventListeners();
                startRealtimePolling();
                renderRoleStats();
                console.log('🔥 Advanced Admin Dashboard loaded');
                return;
            }
            if (attempts < 10) {
                console.log('Waiting for AUTH... attempt', attempts + 1);
                setTimeout(() => tryInit(attempts + 1), 200);
            } else {
                console.error('AUTH not ready after 10 attempts - redirecting to login');
                window.location.href = 'login.html';
            }
        }
        tryInit();
    }

    // Load all data
    function loadInitialData() {
        try {
            console.log('📊 Loading admin dashboard data...');
            
            // Get all users from REALTIME
            const allUsersData = REALTIME.getAllUsersData() || {};
            const authUsers = AUTH.getStoredUsers() || [];
            
            // Merge auth users with realtime data
            allUsers = authUsers.map(authUser => {
                const realtimeData = allUsersData[authUser.id] || {};
                return {
                    ...authUser,
                    ...realtimeData,
                    lastActive: realtimeData.lastActive || authUser.lastLogin,
                    stats: realtimeData.stats || authUser.stats || {},
                    activities: realtimeData.activities || []
                };
            });
            
            // Get activities and leaderboard
            globalActivities = REALTIME.getGlobalActivityLog().slice(0, 50) || [];
            leaderboard = REALTIME.getLeaderboard(50) || [];
            
            // Update all UI components
            renderUsersTable(allUsers);
            renderActivitiesFeed(globalActivities);
            renderLeaderboard();
            updateStats();
            initializeCharts();
            
            console.log('✅ Admin data loaded:', {
                users: allUsers.length,
                activities: globalActivities.length,
                leaderboard: leaderboard.length
            });
        } catch (error) {
            console.error('❌ Error loading admin data:', error);
            // Fallback to auth users only
            allUsers = AUTH.getStoredUsers() || [];
            renderUsersTable(allUsers);
            updateStats();
        }
    }

    // Realtime polling
    function startRealtimePolling() {
        pollInterval = setInterval(() => {
            refreshAllData();
        }, 5000);
    }

    function refreshAllData() {
        loadInitialData();
        updateStats();
    }

    // Stats
    function updateStats() {
        try {
            // Calculate real-time stats
            const totalUsers = allUsers.length;
            const activeUsers = allUsers.filter(user => {
                const lastActive = new Date(user.lastActive || user.lastLogin);
                const hoursSinceActive = (Date.now() - lastActive) / (1000 * 60 * 60);
                return hoursSinceActive < 24;
            }).length;
            
            const totalXP = allUsers.reduce((sum, user) => sum + (user.xp || 0), 0);
            const avgXP = totalUsers > 0 ? Math.round(totalXP / totalUsers) : 0;
            const totalSessions = allUsers.filter(user => user.lastActive).length;
            
            // Update DOM elements
            const totalUsersEl = document.getElementById('total-users');
            const activeUsersEl = document.getElementById('active-users');
            const totalSessionsEl = document.getElementById('total-sessions');
            const avgXPEl = document.getElementById('avg-xp');
            
            if (totalUsersEl) totalUsersEl.textContent = totalUsers.toLocaleString();
            if (activeUsersEl) activeUsersEl.textContent = activeUsers.toLocaleString();
            if (totalSessionsEl) totalSessionsEl.textContent = totalSessions.toLocaleString();
            if (avgXPEl) avgXPEl.textContent = avgXP.toLocaleString();
            
            // Update live users count
            const liveUsersCount = document.getElementById('live-users-count');
            if (liveUsersCount) liveUsersCount.textContent = activeUsers;
            
            renderRoleStats();
        } catch (error) {
            console.error('❌ Error updating stats:', error);
        }
    }

    // Initialize Charts
    let dailyActiveChart = null;
    let roleChart = null;
    
    function initializeCharts() {
        setTimeout(() => {
            initializeDailyActiveChart();
            initializeRoleChart();
        }, 100);
    }
    
    function initializeDailyActiveChart() {
        const ctx = document.getElementById('dailyActiveChart');
        if (!ctx) return;
        
        if (dailyActiveChart) {
            dailyActiveChart.destroy();
        }
        
        // Prepare data for last 7 days
        const days = 7;
        const labels = [];
        const loginData = [];
        const activityData = [];
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' });
            labels.push(dateStr);
            
            // Count logins and activities for this day
            const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
            const dayEnd = dayStart + (24 * 60 * 60 * 1000);
            
            const dayLogins = allUsers.filter(user => {
                const lastActive = new Date(user.lastActive || user.lastLogin).getTime();
                return lastActive >= dayStart && lastActive < dayEnd;
            }).length;
            
            const dayActivities = globalActivities.filter(activity => {
                const activityTime = new Date(activity.timestamp).getTime();
                return activityTime >= dayStart && activityTime < dayEnd;
            }).length;
            
            loginData.push(dayLogins);
            activityData.push(dayActivities);
        }
        
        dailyActiveChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Login Harian',
                    data: loginData,
                    borderColor: '#6366F1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Aktivitas Harian',
                    data: activityData,
                    borderColor: '#EC4899',
                    backgroundColor: 'rgba(236, 72, 153, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: 'white' }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: 'rgba(255,255,255,0.8)' },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    },
                    y: {
                        ticks: { color: 'rgba(255,255,255,0.8)' },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    }
                }
            }
        });
    }
    
    function initializeRoleChart() {
        const ctx = document.getElementById('roleChart');
        if (!ctx) return;
        
        if (roleChart) {
            roleChart.destroy();
        }
        
        // Count users by role
        const roleCounts = { siswa: 0, guru: 0, orangtua: 0, admin: 0 };
        allUsers.forEach(user => {
            if (roleCounts.hasOwnProperty(user.role)) {
                roleCounts[user.role]++;
            }
        });
        
        roleChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Siswa', 'Guru', 'Orang Tua', 'Admin'],
                datasets: [{
                    data: [roleCounts.siswa, roleCounts.guru, roleCounts.orangtua, roleCounts.admin],
                    backgroundColor: [
                        '#34D399',
                        '#60A5FA',
                        '#F472B6',
                        '#FBBF24'
                    ],
                    borderWidth: 2,
                    borderColor: '#1F2937'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: 'white' }
                    }
                }
            }
        });
    }

    // Initialize Charts
    let dailyActiveChart = null;
    let roleChart = null;
    
    function initializeCharts() {
        setTimeout(() => {
            initializeDailyActiveChart();
            initializeRoleChart();
        }, 100);
    }
    
    function initializeDailyActiveChart() {
        const ctx = document.getElementById('dailyActiveChart');
        if (!ctx) return;
        
        if (dailyActiveChart) {
            dailyActiveChart.destroy();
        }
        
        // Prepare data for last 7 days
        const days = 7;
        const labels = [];
        const loginData = [];
        const activityData = [];
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' });
            labels.push(dateStr);
            
            // Count logins and activities for this day
            const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
            const dayEnd = dayStart + (24 * 60 * 60 * 1000);
            
            const dayLogins = allUsers.filter(user => {
                const lastActive = new Date(user.lastActive || user.lastLogin).getTime();
                return lastActive >= dayStart && lastActive < dayEnd;
            }).length;
            
            const dayActivities = globalActivities.filter(activity => {
                const activityTime = new Date(activity.timestamp).getTime();
                return activityTime >= dayStart && activityTime < dayEnd;
            }).length;
            
            loginData.push(dayLogins);
            activityData.push(dayActivities);
        }
        
        dailyActiveChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Login Harian',
                    data: loginData,
                    borderColor: '#6366F1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Aktivitas Harian',
                    data: activityData,
                    borderColor: '#EC4899',
                    backgroundColor: 'rgba(236, 72, 153, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: 'white' }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: 'rgba(255,255,255,0.8)' },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    },
                    y: {
                        ticks: { color: 'rgba(255,255,255,0.8)' },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    }
                }
            }
        });
    }
    
    function initializeRoleChart() {
        const ctx = document.getElementById('roleChart');
        if (!ctx) return;
        
        if (roleChart) {
            roleChart.destroy();
        }
        
        // Count users by role
        const roleCounts = { siswa: 0, guru: 0, orangtua: 0, admin: 0 };
        allUsers.forEach(user => {
            if (roleCounts.hasOwnProperty(user.role)) {
                roleCounts[user.role]++;
            }
        });
        
        roleChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Siswa', 'Guru', 'Orang Tua', 'Admin'],
                datasets: [{
                    data: [roleCounts.siswa, roleCounts.guru, roleCounts.orangtua, roleCounts.admin],
                    backgroundColor: [
                        '#34D399',
                        '#60A5FA',
                        '#F472B6',
                        '#FBBF24'
                    ],
                    borderWidth: 2,
                    borderColor: '#1F2937'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: 'white' }
                    }
                }
            }
        });
    }

    function renderRoleStats() {
        try {
            const counts = { siswa: 0, guru: 0, 'orangtua': 0, admin: 0 };
            allUsers.forEach(user => {
                if (user.role && counts.hasOwnProperty(user.role)) {
                    counts[user.role]++;
                }
            });
            
            if (elements.stats.roleSiswa) elements.stats.roleSiswa.textContent = counts.siswa;
            if (elements.stats.roleGuru) elements.stats.roleGuru.textContent = counts.guru;
            if (elements.stats.roleOrtu) elements.stats.roleOrtu.textContent = counts.orangtua || 0;
            if (elements.stats.roleAdmin) elements.stats.roleAdmin.textContent = counts.admin;
        } catch (error) {
            console.error('❌ Error rendering role stats:', error);
        }
    }

    // Users Table
    function renderUsersTable(users = []) {
        if (!elements.usersTable) return;
        elements.usersTable.innerHTML = users.map(user => createUserRow(user)).join('');
    }

    function createUserRow(user) {
        try {
            const isOnline = isUserOnline(user.lastActive);
            const avatar = getRandomAvatar(user.name);
            const statsSummary = formatUserStats(user);
            return `
                <tr>
                    <td>
                        <span class="user-avatar-mini" style="background: ${isOnline ? '#10B981' : '#6B7280'}">${avatar}</span>
                        <div style="display:inline-block">
                            <div style="font-weight:600">${user.name || 'Unknown'}</div>
                            <div style="font-size:11px;color:rgba(255,255,255,0.7)">${user.email || 'No email'}</div>
                        </div>
                    </td>
                    <td><span class="role-badge ${user.role || 'unknown'}">${getRoleLabel(user.role)}</span></td>
                    <td>${user.xp?.toLocaleString() || 0} XP (Lv.${user.level || 1})</td>
                    <td><span class="status-badge"><span class="status-dot ${isOnline ? 'active' : 'offline'}"></span>${isOnline ? 'Online' : 'Offline'}</span></td>
                    <td>${formatLastActive(user.lastActive)}</td>
                    <td><div class="admin-actions">
                        <button class="admin-btn admin-btn-primary" onclick="viewUserDetails('${user.id}')" title="Lihat Detail"><i class="fas fa-eye"></i></button>
                        <button class="admin-btn admin-btn-success" onclick="forceLogoutUser('${user.id}')" title="Force Logout" ${isOnline ? '' : 'disabled'}><i class="fas fa-power-off"></i></button>
                        <button class="admin-btn admin-btn-danger" onclick="deleteUser('${user.id}')" title="Hapus"><i class="fas fa-trash"></i></button>
                    </div></td>
                </tr>
            `;
        } catch (error) {
            console.error('❌ Error creating user row:', error);
            return `<tr><td colspan="6" style="color: red;">Error loading user data</td></tr>`;
        }
    }

    // Filter/Search users
    function filterUsers() {
        let filtered = allUsers;
        const search = elements.searchUsers?.value.toLowerCase() || '';
        const roleFilter = elements.filterRole?.value || 'all';
        
        if (search) {
            filtered = filtered.filter(u => 
                u.name.toLowerCase().includes(search) || 
                u.email.toLowerCase().includes(search)
            );
        }
        if (roleFilter !== 'all') {
            filtered = filtered.filter(u => u.role === roleFilter);
        }
        
        renderUsersTable(filtered);
    }

    // Sort users
    function sortUsers(sortBy) {
        allUsers.sort((a, b) => {
            switch (sortBy) {
                case 'xp': return (b.xp || 0) - (a.xp || 0);
                case 'lastActive': return new Date(b.lastActive) - new Date(a.lastActive);
                case 'name': return a.name.localeCompare(b.name);
                default: return 0;
            }
        });
        renderUsersTable(allUsers);
    }

    // Activities Feed
    function renderActivitiesFeed(activities) {
        if (!elements.activitiesFeed) return;
        try {
            const validActivities = Array.isArray(activities) ? activities : [];
            elements.activitiesFeed.innerHTML = validActivities.slice(0, 20).map(activity => {
                const icon = getActivityIcon(activity.type);
                const time = formatActivityTime(activity.timestamp);
                return `<div class="activity-item">
                    <div class="activity-icon" style="background: ${icon.bg};">${icon.emoji}</div>
                    <div class="activity-content">
                        <div class="activity-title">${activity.userName || 'User'} ${activity.type === 'login' ? 'masuk aplikasi' : activity.type === 'logout' ? 'keluar aplikasi' : 'melakukan aktivitas'}</div>
                        <div class="activity-time">${time}</div>
                    </div>
                </div>`;
            }).join('');
        } catch (error) {
            console.error('❌ Error rendering activities feed:', error);
            elements.activitiesFeed.innerHTML = '<div class="activity-item">Error loading activities</div>';
        }
    }

    // Leaderboard Tab
    function renderLeaderboard() {
        const lbContainer = document.getElementById('leaderboard-container');
        if (!lbContainer) return;
        try {
            const validLeaderboard = Array.isArray(leaderboard) ? leaderboard : [];
            lbContainer.innerHTML = `
                <div class="leaderboard-podium">
                    ${validLeaderboard.slice(0, 3).map((user, i) => `
                        <div class="podium-item podium-${i + 1}">
                            <div class="medal">${['🥇', '🥈', '🥉'][i]}</div>
                            <div class="podium-user">${user.name || 'Unknown'}</div>
                            <div class="podium-score">${(user.holisticScore || 0).toLocaleString()}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="leaderboard-table">
                    ${validLeaderboard.slice(3, 10).map((user, i) => `
                        <div class="lb-row">
                            <span>${i + 4}.</span>
                            <span>${user.name || 'Unknown'}</span>
                            <span>${(user.holisticScore || 0).toLocaleString()}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        } catch (error) {
            console.error('❌ Error rendering leaderboard:', error);
            lbContainer.innerHTML = '<div class="leaderboard-podium">Error loading leaderboard</div>';
        }
    }

    // User actions
    window.viewUserDetails = function(userId) {
        const user = allUsers.find(u => u.id === userId);
        if (!user) return showToast('error', 'User tidak ditemukan');
        
        // Full stats popup
        const stats = user.stats || {};
        const modalHTML = `
            <div class="user-detail-modal">
                <h3>Detail User: ${user.name}</h3>
                <div class="user-stats-grid">
                    <div>Level: ${user.level || 1}</div>
                    <div>XP: ${user.xp?.toLocaleString() || 0}</div>
                    <div>Streak: ${user.streak || 0} hari</div>
                    <div>Tanaman Ditanam: ${stats.plantsPlanted || 0}</div>
                    <div>Panen: ${stats.plantsHarvested || 0}</div>
                    <div>Cuan Coins: Rp ${formatNumber(stats.cuanCoins || 0)}</div>
                    <div>Kuis Selesai: ${stats.quizzesCompleted || 0}</div>
                    <div>Buku Dibaca: ${stats.booksRead || 0}</div>
                    <div>Achievements: ${user.achievements?.length || 0}</div>
                </div>
                <button onclick="closeModal()" class="btn-secondary">Tutup</button>
            </div>
        `;
        showModal(modalHTML);
    };

    window.forceLogoutUser = function(userId) {
        if (!confirm('Force logout user ini?')) return;
        REALTIME.forceLogout(userId);
        showToast('success', 'User berhasil di-logout');
        refreshAllData();
    };

    window.deleteUser = function(userId) {
        if (!confirm('Hapus user ini? Data akan hilang permanen!')) return;
        // TODO: Implement real delete from REALTIME
        showToast('warning', 'Delete not implemented (demo)');
    };

    // Export CSV
    window.exportUsersCSV = function() {
        const csv = 'Name,Email,Role,XP,Level,Last Active\n' + 
            allUsers.map(u => `"${u.name}","${u.email}",${u.role},${u.xp || 0},${u.level || 1},"${formatLastActive(u.lastActive)}"`).join('\n');
        downloadCSV('agroplay_users.csv', csv);
    };

    function downloadCSV(filename, csv) {
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Event Listeners
    function setupEventListeners() {
        if (elements.searchUsers) elements.searchUsers.addEventListener('input', debounce(filterUsers, 300));
        if (elements.filterRole) elements.filterRole.addEventListener('change', filterUsers);
        if (elements.sortUsers) elements.sortUsers.addEventListener('change', (e) => sortUsers(e.target.value));
    }

    // Utils
    function debounce(fn, delay) {
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(fn, delay);
        };
    }

    function isUserOnline(lastActive) {
        if (!lastActive) return false;
        const fiveMinAgo = Date.now() - 5 * 60 * 1000;
        return new Date(lastActive).getTime() > fiveMinAgo;
    }

    function formatLastActive(timestamp) {
        if (!timestamp) return 'Never';
        const diff = Date.now() - new Date(timestamp).getTime();
        const min = Math.floor(diff / 60000);
        if (min < 1) return 'Just now';
        if (min < 60) return min + ' min ago';
        const hr = Math.floor(min / 60);
        if (hr < 24) return hr + ' hr ago';
        return new Date(timestamp).toLocaleDateString('id-ID');
    }

    function formatUserStats(user) {
        const stats = user.stats || {};
        return `${stats.plantsPlanted || 0}p/${stats.plantsHarvested || 0}h/${stats.quizzesCompleted || 0}q`;
    }

    function getRandomAvatar(name) {
        const avatars = ['👦','👧','🧒','👩','👨','🧔','👵','👴'];
        const hash = name.split('').reduce((a,b) => a + b.charCodeAt(0), 0);
        return avatars[hash % avatars.length];
    }

    function getActivityIcon(type) {
        const icons = {
            login: { emoji: '🔑', bg: '#3B82F6' },
            logout: { emoji: '🚪', bg: '#6B7280' },
            play_game: { emoji: '🎮', bg: '#F59E0B' },
            complete_quiz: { emoji: '🧠', bg: ' #10B981' },
            read_guide: { emoji: '📚', bg: '#FBBF24' },
            plant_crop: { emoji: '🌱', bg: '#10B981' },
            harvest_crop: { emoji: '🧺', bg: '#F59E0B' }
        };
        return icons[type] || { emoji: '📱', bg: '#6B7280' };
    }

    function getRoleLabel(role) {
        return AUTH ? AUTH.getRoleLabel(role) : role;
    }

    // Close on overlay click
    document.addEventListener('DOMContentLoaded', () => {
        const modalOverlay = document.getElementById('modal-overlay');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) closeModal();
            });
        }
    });

    function showModal(html) {
        const modal = document.getElementById('modal-overlay');
        const modalBody = document.getElementById('modal-body');
        if (modal && modalBody) {
            modalBody.innerHTML = html;
            modal.classList.add('active');
        }
    }

    window.closeModal = function() {
        const modal = document.getElementById('modal-overlay');
        if (modal) modal.classList.remove('active');
    };

    // Content Management
    function renderContentManagement() {
        const contentGrid = document.getElementById('content-grid');
        if (!contentGrid) return;
        
        const contentData = [
            {
                title: 'Quiz Management',
                icon: '🧠',
                count: allUsers.filter(u => u.role === 'siswa').reduce((sum, s) => sum + (s.stats?.quizzesCompleted || 0), 0),
                color: '#10B981',
                action: 'manageQuizzes'
            },
            {
                title: 'Learning Guides',
                icon: '📚',
                count: allUsers.filter(u => u.role === 'siswa').reduce((sum, s) => sum + (s.stats?.guidesRead || 0), 0),
                color: '#F59E0B',
                action: 'manageGuides'
            },
            {
                title: 'Game Activities',
                icon: '🎮',
                count: allUsers.filter(u => u.role === 'siswa').reduce((sum, s) => sum + (s.stats?.gamesPlayed || 0), 0),
                color: '#6366F1',
                action: 'manageGames'
            },
            {
                title: 'Achievement System',
                icon: '🏆',
                count: '25',
                color: '#EC4899',
                action: 'manageAchievements'
            },
            {
                title: 'Class Management',
                icon: '🏫',
                count: [...new Set(allUsers.filter(u => u.role === 'siswa').map(u => u.class).filter(Boolean))].length,
                color: '#F472B6',
                action: 'manageClasses'
            },
            {
                title: 'User Reports',
                icon: '📊',
                count: allUsers.length,
                color: '#60A5FA',
                action: 'generateReports'
            }
        ];
        
        contentGrid.innerHTML = contentData.map(content => `
            <div class="content-card" onclick="handleContentAction('${content.action}')">
                <div class="content-card-header">
                    <div class="content-card-title">${content.title}</div>
                    <div class="content-card-badge" style="background: ${content.color};">${content.count}</div>
                </div>
                <div class="content-card-stats">
                    <div class="content-stat-value">${content.count}</div>
                    <div class="content-stat-label">Total Items</div>
                </div>
            </div>
        `).join('');
    }
    
    window.handleContentAction = function(action) {
        switch(action) {
            case 'manageQuizzes':
                showToast('info', 'Quiz Management - Coming Soon');
                break;
            case 'manageGuides':
                showToast('info', 'Guide Management - Coming Soon');
                break;
            case 'manageGames':
                showToast('info', 'Game Management - Coming Soon');
                break;
            case 'manageAchievements':
                showToast('info', 'Achievement Management - Coming Soon');
                break;
            case 'manageClasses':
                showToast('info', 'Class Management - Coming Soon');
                break;
            case 'generateReports':
                exportUsersCSV();
                break;
            default:
                showToast('warning', 'Feature not available');
        }
    };
    
    // Export Activities CSV
    window.exportActivitiesCSV = function() {
        const csv = 'Timestamp,User,Email,Activity,Details\n' + 
            globalActivities.map(a => 
                `"${new Date(a.timestamp).toLocaleString()}","${a.userName || 'Unknown'}","${a.email || ''}","${a.type}","${a.details || ''}"`
            ).join('\n');
        downloadCSV('agroplay_activities.csv', csv);
    };
    
    // Define missing globals for tab switching
    window.showTab = function(tabName) {
        document.querySelectorAll('.admin-tab-content').forEach(tab => tab.style.display = 'none');
        const targetTab = document.getElementById(`tab-${tabName}`);
        if (targetTab) targetTab.style.display = 'block';
        document.querySelectorAll('.admin-tab').forEach(btn => btn.classList.remove('active'));
        if (event && event.target) event.target.classList.add('active');
        
        // Load tab-specific content
        if (tabName === 'content') {
            renderContentManagement();
        }
    };

    // Init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

