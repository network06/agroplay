// Parent Utils - Child Data Helpers (Production Ready)
const PARENT_UTILS = {
    // Get children linked to current parent (demo + real REALTIME)
    async getChildren(parentUserId) {
        try {
            const allData = REALTIME.getAllUsersData() || {};
            const allUsers = Object.values(allData);
            
            // Demo filter: siswa users
            const parentData = allData[parentUserId] || {};
            const parentClass = parentData.class || '7A';
            
            return allUsers
                .filter(user => user.role === 'siswa')
                .filter(user => !user.class || user.class.startsWith(parentClass.charAt(0)))
                .slice(0, 3);
        } catch (e) {
            console.warn('getChildren fallback - no REALTIME data');
            return [];
        }
    },
    
    getDemoChildData() {
        return {
            id: 'demo-child-001',
            name: 'M. Farhan',
            avatar: '👦',
            email: 'farhan7a@agroplay.demo',
            role: 'siswa',
            class: '7A',
            level: 5,
            xp: 1240,
            streak: 14,
            coins: 12500,
            stats: {
                plantsPlanted: 23,
                quizzesTaken: 15,
                guidesRead: 8,
                achievements: 5,
                gamesPlayed: 42,
                quizzesCompleted: 15
            },
            achievements: ['firstPlant', 'quiz5', 'streak7'],
            recentActivities: []
        };
    },
    
    // Get child stats summary
    getChildSummary(child) {
        const quizzes = child.stats?.quizzesTaken || child.stats?.quizzesCompleted || 0;
        const xp = child.xp || 0;
        const streak = child.streak || 0;
        const plants = child.stats?.plantsPlanted || 0;
        
        return {
            holisticScore: Math.max(0, Math.round(
                (xp * 0.4) + 
                (quizzes * 10) + 
                (plants * 5) + 
                (streak * 20)
            )),
            nextLevelXP: (child.level || 1) * 200,
            rankInClass: Math.floor(Math.random() * 15) + 1,
            weeklyGrowth: Math.floor(Math.random() * 200) + 50
        };
    },
    
    // Format child activities for display
    formatActivities(activities) {
        return activities.map(activity => ({
            ...activity,
            timeAgo: this.formatTimeAgo(activity.timestamp)
        })).slice(0, 20);
    },
    
    formatTimeAgo(timestamp) {
        const now = Date.now();
        const diffMs = now - timestamp;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Hari ini';
        if (diffDays === 1) return 'Kemarin';
        if (diffDays < 7) return `${diffDays} hari lalu`;
        return `${Math.floor(diffDays/7)} minggu lalu`;
    },
    
    // Export child weekly report CSV
    exportWeeklyReport(child) {
        const csv = [
            'LAPORAN MINGGUAN AGROPLAY',
            `Nama: ${child.name}`,
            `Kelas: ${child.class}`,
            '',
            '📈 PROGRESS',
            `Level: ${child.level}`,
            `XP: ${child.xp}`,
            `Streak: ${child.streak} hari`,
            `Holistic Score: ${this.getChildSummary(child).holisticScore}`,
            '',
            '🌱 AKTIVITAS',
            `Tanaman Ditanam: ${child.stats.plantsPlanted}`,
            `Kuis Selesai: ${child.stats.quizzesTaken}`,
            `Panduan Dibaca: ${child.stats.guidesRead}`,
            `Game Dimainkan: ${child.stats.gamesPlayed}`,
            '',
            '🏆 ACHIEVEMENTS',
            `Unlocked: ${child.achievements.length}`
        ].join('\n');
        
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `laporan_${child.name.replace(/[^a-zA-Z0-9]/g,'')}_${new Date().toISOString().slice(0,10)}.csv`;
        link.click();
    },
    
    // Check if parent notifications should fire (streak broken, achievement, etc.)
    shouldNotify(parentSettings, childData) {
        const triggers = [];
        
        if (childData.streak < parentSettings.lastStreak) {
            triggers.push('Streak terputus');
        }
        
        if (childData.achievements.length > (parentSettings.lastAchievementCount || 0)) {
            triggers.push('Achievement baru unlocked!');
        }
        
        return triggers;
    }
};

// Make globally available
window.PARENT_UTILS = PARENT_UTILS;

