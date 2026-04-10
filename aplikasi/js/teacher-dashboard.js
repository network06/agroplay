/**
 * Advanced Real-time Teacher Dashboard JS
 * Integrates with REALTIME, AUTH, Chart.js - Teacher specific
 */

(function() {
    'use strict';

    // DOM Elements
    const elements = {
        stats: {
            totalStudents: document.getElementById('total-students'),
            activeStudents: document.getElementById('active-students'),
            totalClasses: document.getElementById('total-classes'),
            avgXP: document.getElementById('avg-xp'),
            completionRate: document.getElementById('completion-rate')
        },
        studentsTable: document.getElementById('students-table-body'),
        activityFeed: document.getElementById('activity-feed'),
        classesList: document.getElementById('classes-list'),
        leaderboardContainer: document.getElementById('leaderboard-container'),
        searchStudents: document.getElementById('search-students'),
        classFilter: document.getElementById('class-filter'),
        sortStudents: document.getElementById('sort-students'),
        leaderboardClassSelect: document.getElementById('leaderboard-class-select'),
        activityClassFilter: document.getElementById('activity-class-filter')
    };

    let currentTeacher = null;
    let allStudents = [];
    let teacherClasses = [];
    let globalActivities = [];
    let currentClassFilter = '';
    let pollInterval;
    let classActivityChart = null;

    // Init
    function init() {
        if (!AUTH.requireRole('guru')) return;
        
        currentTeacher = AUTH.getCurrentUser();
        document.getElementById('teacher-name').textContent = currentTeacher.name;
        document.getElementById('teacher-avatar').textContent = getRandomAvatar(currentTeacher.name);
        
        loadInitialData();
        setupEventListeners();
        startRealtimePolling();
        populateClassSelectors();
        console.log('👨‍🏫 Advanced Teacher Dashboard loaded for', currentTeacher.name);
    }

    // Load all data
    function loadInitialData() {
        console.log('📊 Loading initial teacher dashboard data...');
        
        // Get real data from localStorage
        const allUsers = REALTIME.getAllUsersData();
        const users = AUTH.getStoredUsers();
        
        // Extract classes from student data
        const classMap = {};
        allStudents = Object.values(allUsers).filter(user => user.role === 'siswa');
        
        allStudents.forEach(student => {
            // Get class from registration data if not in realtime data
            if (!student.class && student.id) {
                const registrationUser = users.find(u => u.id === student.id);
                if (registrationUser && registrationUser.class) {
                    student.class = registrationUser.class;
                    // Update realtime data with class info
                    allUsers[student.id].class = registrationUser.class;
                }
            }
            
            if (student.class) {
                if (!classMap[student.class]) {
                    classMap[student.class] = { id: student.class, name: student.class, count: 0 };
                }
                classMap[student.class].count++;
            }
        });
        
        teacherClasses = Object.values(classMap);
        
        // Save updated data back to ensure class sync
        REALTIME.saveAllUsersData(allUsers);
        
        // Get activities
        globalActivities = REALTIME.getGlobalActivityLog().slice(0, 50) || [];
        
        // Update all UI components
        renderClassesList();
        renderStudentsTable(allStudents);
        renderActivitiesFeed(globalActivities);
        renderClassLeaderboards();
        updateStats();
        initializeClassAnalytics();
        populateClassSelectors();
        
        console.log('✅ Data loaded:', {
            students: allStudents.length,
            classes: teacherClasses.length,
            activities: globalActivities.length
        });
    }

    // Realtime polling
    function startRealtimePolling() {
        pollInterval = setInterval(() => {
            loadInitialData();
        }, 5000);
    }

    // Stats computation
    function updateStats() {
        const totalStudents = allStudents.length;
        const activeStudents = allStudents.filter(s => isUserOnline(s.lastActive)).length;
        const avgXP = allStudents.reduce((sum, s) => sum + (s.xp || 0), 0) / Math.max(totalStudents, 1);
        
        if (elements.stats.totalStudents) elements.stats.totalStudents.textContent = totalStudents;
        if (elements.stats.activeStudents) elements.stats.activeStudents.textContent = activeStudents;
        if (elements.stats.totalClasses) elements.stats.totalClasses.textContent = teacherClasses.length;
        if (elements.stats.avgXP) elements.stats.avgXP.textContent = Math.round(avgXP).toLocaleString();
        if (elements.stats.completionRate) elements.stats.completionRate.textContent = '85%'; // Placeholder
        
        document.getElementById('live-students-count').textContent = activeStudents;
        document.getElementById('class-count').textContent = teacherClasses.length;
    }

    // Classes List
    function renderClassesList() {
        if (!elements.classesList) return;
        elements.classesList.innerHTML = teacherClasses.map(cls => {
            const students = REALTIME.getStudentsByClass(cls.id || cls.name.split(' ')[0]) || [];
            const active = students.filter(s => isUserOnline(s.lastActive)).length;
            return `
                <div class="quick-action-card" onclick="selectClass('${cls.id || cls.name.split(' ')[0]}')" style="cursor:pointer;">
                    <i class="fas fa-chalkboard-teacher" style="font-size:32px;color:var(--primary);"></i>
                    <h3>${cls.name}</h3>
                    <div style="color:rgba(255,255,255,0.8);font-size:14px;">
                        ${students.length} siswa • ${active} aktif
                    </div>
                </div>
            `;
        }).join('');
    }

    // Students Table
    function renderStudentsTable(students = []) {
        if (!elements.studentsTable) return;
        elements.studentsTable.innerHTML = students.map(user => createStudentRow(user)).join('');
    }

    function createStudentRow(student) {
        const isOnline = isUserOnline(student.lastActive);
        const avatar = getRandomAvatar(student.name);
        const statsSummary = formatStudentStats(student);
        
        // Fix class display - get from multiple sources
        let className = student.class || 'N/A';
        if (className === 'N/A' || !className) {
            // Try to get from registration data
            const users = AUTH.getStoredUsers();
            const registrationUser = users.find(u => u.id === student.id);
            if (registrationUser && registrationUser.class) {
                className = registrationUser.class;
            }
        }
        
        return `
            <tr>
                <td>
                    <span class="user-avatar-mini" style="background: ${isOnline ? '#10B981' : '#6B7280'}">${avatar}</span>
                    <div style="display:inline-block">
                        <div style="font-weight:600">${student.name}</div>
                        <div style="font-size:11px;color:rgba(255,255,255,0.7)">${student.email || '-'}</div>
                    </div>
                </td>
                <td>${className}</td>
                <td>${student.xp?.toLocaleString() || 0} XP (Lv.${student.level || 1})</td>
                <td><span class="status-badge"><span class="status-dot ${isOnline ? 'active' : 'offline'}"></span>${isOnline ? 'Online' : 'Offline'}</span></td>
                <td>${formatLastActive(student.lastActive)}</td>
                <td>${statsSummary}</td>
                <td><div class="teacher-actions">
                    <button class="teacher-btn teacher-btn-primary" onclick="viewStudentDetails('${student.id}')" title="Detail"><i class="fas fa-eye"></i></button>
                </div></td>
            </tr>
        `;
    }

    // Filter students by class/search
    window.filterStudentsByClass = function() {
        let filtered = [...allStudents];
        const classId = elements.classFilter?.value || '';
        const search = elements.searchStudents?.value.toLowerCase() || '';

        if (classId) {
            filtered = filtered.filter(s => s.class === classId);
        }
        if (search) {
            filtered = filtered.filter(s => 
                s.name.toLowerCase().includes(search)
            );
        }
        renderStudentsTable(filtered);
    };

    // Sort students
    function sortStudents(sortBy) {
        allStudents.sort((a, b) => {
            switch (sortBy) {
                case 'xp': return (b.xp || 0) - (a.xp || 0);
                case 'lastActive': return new Date(b.lastActive) - new Date(a.lastActive);
                case 'name': return a.name.localeCompare(b.name);
                default: return 0;
            }
        });
        renderStudentsTable(allStudents);
    }

    // Select class
    window.selectClass = function(classId) {
        currentClassFilter = classId;
        document.getElementById('class-filter').value = classId;
        filterStudentsByClass();
        loadClassLeaderboard(classId);
        showTab('students');
    };

    // Activities Feed - filter by class
    function renderActivitiesFeed(activities) {
        if (!elements.activityFeed) return;
        let filteredActivities = activities.filter(a => {
            const student = allStudents.find(s => s.id === a.userId);
            return !currentClassFilter || (student && student.class === currentClassFilter);
        });
        elements.activityFeed.innerHTML = filteredActivities.slice(0, 20).map(activity => {
            const icon = getActivityIcon(activity.type);
            const time = formatActivityTime(activity.timestamp);
            const student = allStudents.find(s => s.id === activity.userId);
            const cls = student ? (student.class || 'N/A') : 'N/A';
            return `<div class="activity-item">
                <div class="activity-icon" style="background: ${icon.bg};">${icon.emoji}</div>
                <div class="activity-content">
                    <div class="activity-title">${activity.userName} ${activity.type === 'login' ? 'masuk aplikasi' : activity.type === 'logout' ? 'keluar aplikasi' : getActivityDescription(activity.type)} (${cls})</div>
                    <div class="activity-time">${time}</div>
                </div>
            </div>`;
        }).join('');
    }

    window.filterActivitiesByClass = function() {
        renderActivitiesFeed(REALTIME.getGlobalActivityLog());
    };

    // Leaderboard per class
    window.loadClassLeaderboard = function(classId = currentClassFilter) {
        const students = classId ? allStudents.filter(s => s.class === classId) : allStudents;
        
        const lb = students.map(user => {
            const score = Math.round(
                (user.xp || 0) * 0.4 +
                ((user.stats?.quizzesCompleted || 0) * 10) +
                ((user.stats?.plantsPlanted || 0) * 5) +
                ((user.streak || 0) * 20)
            );
            return { ...user, holisticScore: score };
        }).sort((a, b) => b.holisticScore - a.holisticScore).slice(0, 10);
        
        const lbContainer = elements.leaderboardContainer;
        const clsName = classId || 'Semua Kelas';
        lbContainer.innerHTML = `
            <h3 style="color:white;margin-bottom:20px;">${clsName}</h3>
            <div class="leaderboard-podium">
                ${lb.slice(0, 3).map((user, i) => `
                    <div class="podium-item podium-${i + 1}">
                        <div class="medal">${['🥇', '🥈', '🥉'][i]}</div>
                        <div class="podium-user">${user.name}</div>
                        <div class="podium-score">${user.holisticScore.toLocaleString()}</div>
                    </div>
                `).join('')}
            </div>
            <div class="leaderboard-table">
                ${lb.slice(3, 10).map((user, i) => `
                    <div class="lb-row">
                        <span>${i + 4}.</span>
                        <span>${user.name}</span>
                        <span>${user.holisticScore.toLocaleString()}</span>
                    </div>
                `).join('')}
            </div>
        `;
    };

    function renderClassLeaderboards() {
        teacherClasses.forEach(cls => loadClassLeaderboard(cls.id));
    }

    // Student details modal
    window.viewStudentDetails = function(studentId) {
        const student = allStudents.find(s => s.id === studentId);
        if (!student) return showToast('error', 'Siswa tidak ditemukan');
        
        const stats = student.stats || {};
        const className = student.class || 'N/A';
        const modalHTML = `
            <div class="user-detail-modal">
                <h3>Detail Siswa: ${student.name}</h3>
                <div style="font-size:12px;color:#60A5FA;margin-bottom:16px;">Kelas: ${className}</div>
                <div class="user-stats-grid">
                    <div>Level: ${student.level || 1}</div>
                    <div>XP: ${student.xp?.toLocaleString() || 0}</div>
                    <div>Streak: ${student.streak || 0} hari</div>
                    <div>Tanaman: ${stats.plantsPlanted || 0}/${stats.plantsHarvested || 0}</div>
                    <div>Kuis: ${stats.quizzesCompleted || 0}</div>
                    <div>Cuan: Rp ${formatNumber(stats.cuanCoins || 0)}</div>
                    <div>Buku: ${stats.booksRead || 0}</div>
                </div>
                <button onclick="closeModal()" class="btn-secondary">Tutup</button>
            </div>
        `;
        showModal(modalHTML);
    };

    // Export CSV
    window.exportStudentsCSV = function() {
        const students = currentClassFilter ? allStudents.filter(s => s.class === currentClassFilter) : allStudents;
        const csv = 'Nama,Kelas,XP,Level,Streak,Tanaman,Kuis,Cuan,Terakhir Aktif\n' + 
            students.map(s => {
                const cls = s.class || '';
                return `"${s.name}","${cls}",${s.xp || 0},${s.level || 1},${s.streak || 0},${s.stats?.plantsPlanted || 0},${s.stats?.quizzesCompleted || 0},"Rp${formatNumber(s.stats?.cuanCoins || 0)}","${formatLastActive(s.lastActive)}"`;
            }).join('\n');
        downloadCSV(`agroplay_${currentClassFilter || 'all'}_students.csv`, csv);
    };

    // Initialize Class Analytics Chart
    function initializeClassAnalytics() {
        const ctx = document.getElementById('classActivityChart');
        if (!ctx) return;
        
        // Destroy existing chart if it exists
        if (classActivityChart) {
            classActivityChart.destroy();
        }
        
        classActivityChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: []
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
        
        updateClassAnalytics();
    }

    // Update Class Analytics with real data
    window.updateClassAnalytics = function() {
        if (!classActivityChart) return;
        
        const classSelect = document.getElementById('analytics-class-select');
        const selectedClass = classSelect ? classSelect.value : '';
        
        // Get activity data for the last 7 days
        const days = 7;
        const labels = [];
        const datasets = {};
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' });
            labels.push(dateStr);
        }
        
        // Get classes to show
        const classesToShow = selectedClass ? [selectedClass] : teacherClasses.slice(0, 3).map(c => c.id);
        
        classesToShow.forEach((className, index) => {
            const data = [];
            const color = ['#10B981', '#F59E0B', '#3B82F6', '#EF4444'][index % 4];
            
            for (let i = days - 1; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const dateKey = date.toDateString();
                
                // Count activities for this class on this day
                const dayActivities = globalActivities.filter(activity => {
                    const student = allStudents.find(s => s.id === activity.userId);
                    return student && student.class === className && 
                           new Date(activity.timestamp).toDateString() === dateKey;
                });
                
                data.push(dayActivities.length);
            }
            
            datasets[className] = {
                label: className,
                data: data,
                borderColor: color,
                backgroundColor: color + '20',
                tension: 0.4
            };
        });
        
        classActivityChart.data.labels = labels;
        classActivityChart.data.datasets = Object.values(datasets);
        classActivityChart.update();
        
        // Update analytics summary
        updateAnalyticsSummary(selectedClass);
    };

    // Update analytics summary cards
    function updateAnalyticsSummary(selectedClass) {
        const summaryContainer = document.getElementById('analytics-summary');
        if (!summaryContainer) return;
        
        const studentsToShow = selectedClass ? 
            allStudents.filter(s => s.class === selectedClass) : allStudents;
        
        const activeCount = studentsToShow.filter(s => isUserOnline(s.lastActive)).length;
        const totalXP = studentsToShow.reduce((sum, s) => sum + (s.xp || 0), 0);
        const avgXP = studentsToShow.length > 0 ? Math.round(totalXP / studentsToShow.length) : 0;
        const totalQuizzes = studentsToShow.reduce((sum, s) => sum + (s.stats?.quizzesCompleted || 0), 0);
        
        summaryContainer.innerHTML = `
            <div class="teacher-stat-card">
                <div style="color:rgba(255,255,255,0.7);font-size:12px;">Siswa Aktif Hari Ini</div>
                <div style="font-size:24px;font-weight:700;color:white;">${activeCount}</div>
            </div>
            <div class="teacher-stat-card">
                <div style="color:rgba(255,255,255,0.7);font-size:12px;">Total XP</div>
                <div style="font-size:24px;font-weight:700;color:white;">${totalXP.toLocaleString()}</div>
            </div>
            <div class="teacher-stat-card">
                <div style="color:rgba(255,255,255,0.7);font-size:12px;">Rata-rata XP</div>
                <div style="font-size:24px;font-weight:700;color:white;">${avgXP.toLocaleString()}</div>
            </div>
            <div class="teacher-stat-card">
                <div style="color:rgba(255,255,255,0.7);font-size:12px;">Kuis Selesai</div>
                <div style="font-size:24px;font-weight:700;color:white;">${totalQuizzes}</div>
            </div>
        `;
    }
    window.showTab = function(tabName) {
        document.querySelectorAll('.teacher-tab-content').forEach(tab => tab.style.display = 'none');
        document.querySelectorAll('.teacher-tab').forEach(tab => tab.classList.remove('active'));
        document.getElementById(`tab-${tabName}`).style.display = 'block';
        event.target.classList.add('active');
        
        // Load tab-specific data
        switch(tabName) {
            case 'students': filterStudentsByClass(); break;
            case 'leaderboard': loadClassLeaderboard(); break;
            case 'activities': renderActivitiesFeed(globalActivities); break;
        }
    };

    // Event Listeners
    function setupEventListeners() {
        if (elements.searchStudents) elements.searchStudents.addEventListener('input', debounce(filterStudentsByClass, 300));
        if (elements.sortStudents) elements.sortStudents.addEventListener('change', (e) => sortStudents(e.target.value));
    }

    function populateClassSelectors() {
        const options = '<option value="">Semua Kelas</option>' + teacherClasses.map(cls => 
            `<option value="${cls.id || cls.name}">${cls.name}</option>`
        ).join('');
        
        if (elements.classFilter) elements.classFilter.innerHTML = options;
        if (elements.leaderboardClassSelect) elements.leaderboardClassSelect.innerHTML = options;
        if (elements.activityClassFilter) elements.activityClassFilter.innerHTML = options;
        
        // Also update analytics selector
        const analyticsSelect = document.getElementById('analytics-class-select');
        if (analyticsSelect) analyticsSelect.innerHTML = options;
    }

    // Utils (same as admin)
    function debounce(fn, delay) {
        let timeout;
        return function() { clearTimeout(timeout); timeout = setTimeout(fn, delay); };
    }

    function isUserOnline(lastActive) {
        if (!lastActive) return false;
        const fiveMinAgo = Date.now() - 5 * 60 * 1000;
        return new Date(lastActive).getTime() > fiveMinAgo;
    }

    function formatLastActive(timestamp) {
        if (!timestamp) return 'Belum';
        const diff = Date.now() - new Date(timestamp).getTime();
        const min = Math.floor(diff / 60000);
        if (min < 1) return 'Baru saja';
        if (min < 60) return min + ' menit lalu';
        const hr = Math.floor(min / 60);
        if (hr < 24) return hr + ' jam lalu';
        return new Date(timestamp).toLocaleDateString('id-ID');
    }

    function formatStudentStats(student) {
        const stats = student.stats || {};
        return `${stats.plantsPlanted || 0}p/${stats.plantsHarvested || 0}h/${stats.quizzesCompleted || 0}q`;
    }

    function getRandomAvatar(name) {
        const avatars = ['👦','👧','🧒','👩','👨'];
        const hash = name.split('').reduce((a,b) => a + b.charCodeAt(0), 0);
        return avatars[hash % avatars.length];
    }

    function getActivityIcon(type) {
        const icons = {
            login: { emoji: '🔑', bg: '#3B82F6' },
            logout: { emoji: '🚪', bg: '#6B7280' },
            play_game: { emoji: '🎮', bg: '#F59E0B' },
            complete_quiz: { emoji: '🧠', bg: '#10B981' },
            read_guide: { emoji: '📚', bg: '#FBBF24' },
            plant_crop: { emoji: '🌱', bg: '#10B981' },
            harvest_crop: { emoji: '🧺', bg: '#F59E0B' },
            earn_xp: { emoji: '📈', bg: '#8B5CF6' }
        };
        return icons[type] || { emoji: '📱', bg: '#6B7280' };
    }

    function getActivityDescription(type) {
        const desc = {
            'complete_quiz': 'selesai kuis',
            'plant_crop': 'menanam tanaman',
            'harvest_crop': 'panen tanaman',
            'earn_xp': 'dapat XP'
        };
        return desc[type] || 'aktivitas';
    }

    function formatNumber(num) {
        return num.toLocaleString('id-ID');
    }

    function downloadCSV(filename, csv) {
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    function showModal(html) {
        const modal = document.createElement('div');
        modal.id = 'modal-overlay';
        modal.className = 'modal-overlay';
        modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px;';
        modal.innerHTML = `<div id="modal-body" style="background:white;border-radius:20px;padding:32px;max-width:500px;max-height:80vh;overflow-y:auto;">${html}</div>`;
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    }

    window.closeModal = function() {
        const modal = document.getElementById('modal-overlay');
        if (modal) modal.remove();
    };

    window.showToast = function(type, message) {
        const toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;top:20px;right:20px;padding:16px 24px;border-radius:12px;color:white;font-weight:600;z-index:10001;transform:translateX(400px);transition:all 0.3s;';
        toast.textContent = message;
        if (type === 'success') toast.style.background = '#10B981';
        if (type === 'error') toast.style.background = '#EF4444';
        document.body.appendChild(toast);
        setTimeout(() => toast.style.transform = 'translateX(0)', 100);
        setTimeout(() => { toast.style.transform = 'translateX(400px)'; setTimeout(() => toast.remove(), 300); }, 3000);
    };

    // Tab system
    window.showTab = function(tabName) {
        // Hide all tabs
        document.querySelectorAll('.teacher-tab-content').forEach(tab => tab.style.display = 'none');
        document.querySelectorAll('.teacher-tab').forEach(btn => btn.classList.remove('active'));
        
        // Show selected
        document.getElementById(`tab-${tabName}`).style.display = 'block';
        event?.target.classList.add('active');
        
        // Load data
        switch(tabName) {
            case 'overview': 
                if (classActivityChart) {
                    updateClassAnalytics();
                } else {
                    setTimeout(initializeClassAnalytics, 100);
                }
                break;
            case 'classes': renderClassesList(); break;
            case 'students': filterStudentsByClass(); break;
            case 'leaderboard': loadClassLeaderboard(); break;
            case 'activities': renderActivitiesFeed(globalActivities); break;
        }
    };

    // Init on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

