/**
 * AGROPLAY - Main Application JavaScript
 * Complete Version with all features
 */

(function() {
    'use strict';

    // Configuration
    var CONFIG = {
        SPLASH_DURATION: 2500,
        SEARCH_DEBOUNCE: 300,
        TOAST_DURATION: 3000
    };

    // User Data
    var userData = {
        name: 'Siswa Agroplay',
        level: 1,
        xp: 0,
        xpToNextLevel: 100,
        streak: 0,
        achievements: [],
        favorites: [],
        language: 'id',
        darkMode: false
    };

    // Menu Data for search
    var MENU_ITEMS = [
        { id: 'kebun-ajaib', title: 'Kebun Ajaib', desc: 'Game menanam sayuran' },
        { id: 'tanam-yuk', title: 'Tanam Yuk!', desc: 'Belajar menanam' },
        { id: 'kuis-seru', title: 'Kuis Seru Tani', desc: 'Tes pengetahuan' },
        { id: 'buku-tanamku', title: 'Buku Tanamku', desc: 'Panduan menanam' },
        { id: 'cuan-farming', title: 'Cuan Farming', desc: 'Farm virtual' },
        { id: 'tanaman-hias', title: 'Tanaman Hias', desc: 'Koleksi tanaman hias' },
        { id: 'industri', title: 'Industri', desc: 'Pengolahan hasil bumi' },
        { id: 'buku-olahan', title: 'Olahan Makanan', desc: 'Resep dari hasil bumi' }
    ];

    // DOM Elements
    var splashScreen, mainApp, searchInput, menuCards, toastContainer, modalOverlay;

    // Initialize
    function init() {
        loadUserData();
        cacheElements();
        setupSplashScreen();
        setupMenuCards();
        setupSearch();
        setupNavigation();
        setupQuickActions();
        console.log('Agroplay loaded!');
    }

    function loadUserData() {
        try {
            var saved = localStorage.getItem('agroplay_user');
            if (saved) {
                var parsed = JSON.parse(saved);
                if (parsed && typeof parsed === 'object') {
                    userData = Object.assign(userData, parsed);
                }
            }
        } catch (e) {
            console.error('Error loading user data:', e);
            // Reset to default if corrupted
            userData = {
                name: 'Siswa Agroplay',
                level: 1,
                xp: 0,
                xpToNextLevel: 100,
                streak: 0,
                achievements: [],
                favorites: [],
                language: 'id',
                darkMode: false
            };
        }
        updateUserUI();
    }

    function saveUserData() {
        try {
            localStorage.setItem('agroplay_user', JSON.stringify(userData));
        } catch (e) {
            console.error('Error saving user data:', e);
            showToast('error', 'Gagal menyimpan data pengguna');
        }
    }

    function cacheElements() {
        splashScreen = document.getElementById('splash-screen');
        mainApp = document.getElementById('main-app');
        searchInput = document.getElementById('search-input');
        menuCards = document.querySelectorAll('.menu-card');
        toastContainer = document.getElementById('toast-container');
        modalOverlay = document.getElementById('modal-overlay');
    }

    function updateUserUI() {
        var userNameEl = document.getElementById('user-name');
        var userLevelEl = document.getElementById('user-level');
        var levelNameEl = document.getElementById('level-name');
        var userXpEl = document.getElementById('user-xp');
        var xpNeededEl = document.getElementById('xp-needed');
        var xpProgressEl = document.getElementById('xp-progress');
        var userStreakEl = document.getElementById('user-streak');

        if (userNameEl) userNameEl.textContent = userData.name;
        if (userLevelEl) userLevelEl.textContent = userData.level;
        if (levelNameEl) levelNameEl.textContent = getLevelName();
        if (userXpEl) userXpEl.textContent = userData.xp;
        if (xpNeededEl) xpNeededEl.textContent = userData.xpToNextLevel;
        if (xpProgressEl) xpProgressEl.style.width = ((userData.xp / userData.xpToNextLevel) * 100) + '%';
        if (userStreakEl) userStreakEl.textContent = userData.streak;
    }

    function getLevelName() {
        var names = ['Petani Pemula', 'Petani Junior', 'Petani Aktif', 'Petani Ahli', 'Petani Pro'];
        var idx = Math.min(userData.level - 1, names.length - 1);
        return names[idx] || 'Petani Pemula';
    }

    // Splash Screen - ONLY for first login
    function setupSplashScreen() {
        if (!splashScreen || !mainApp) return;
        
        // Check if this is first login
        var isFirstLogin = sessionStorage.getItem('agroplay_first_login') === 'true';
        
        if (isFirstLogin) {
            // Show splash screen only for first login
            console.log('🎬 First login detected - showing splash screen');
            splashScreen.classList.add('show-splash');
            mainApp.classList.add('hidden');
            
            // Hide splash screen after duration
            setTimeout(function() {
                splashScreen.classList.remove('show-splash');
                mainApp.classList.remove('hidden');
                menuCards.forEach(function(card) {
                    card.style.opacity = '1';
                });
                
                // Clear first login flag
                sessionStorage.removeItem('agroplay_first_login');
                console.log('✅ Splash screen completed - first login flag cleared');
            }, CONFIG.SPLASH_DURATION);
        } else {
            // Hide splash screen immediately for returning users
            splashScreen.classList.remove('show-splash');
            mainApp.classList.remove('hidden');
            menuCards.forEach(function(card) {
                card.style.opacity = '1';
            });
            
            console.log('🚫 Returning user - splash screen disabled');
        }
    }

    // Menu Cards
    function setupMenuCards() {
        menuCards.forEach(function(card) {
            card.style.opacity = '1';
        });
    }

    // Search
    function setupSearch() {
        if (!searchInput) return;
        
        searchInput.addEventListener('input', function() {
            var query = this.value.toLowerCase().trim();
            if (query.length > 0) {
                menuCards.forEach(function(card) {
                    var title = card.querySelector('.card-title').textContent.toLowerCase();
                    var desc = card.querySelector('.card-desc').textContent.toLowerCase();
                    if (title.indexOf(query) !== -1 || desc.indexOf(query) !== -1) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            } else {
                menuCards.forEach(function(card) {
                    card.style.display = 'flex';
                });
            }
        });
    }

    // Navigation
    function setupNavigation() {
        var backBtn = document.getElementById('back-btn');
        var settingsBtn = document.getElementById('settings-btn');

        if (backBtn) {
            backBtn.addEventListener('click', function() {
                if (document.referrer && document.referrer.indexOf('agroplay') !== -1) {
                    history.back();
                } else {
                    showToast('info', 'Ini adalah halaman utama');
                }
            });
        }

        if (settingsBtn) {
            settingsBtn.addEventListener('click', function() {
                openSettings();
            });
        }

        // Bottom nav
        var navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(function(item) {
            item.addEventListener('click', function() {
                var navType = this.getAttribute('data-nav');
                navItems.forEach(function(nav) {
                    nav.classList.remove('active');
                });
                this.classList.add('active');
                
                if (navType === 'search') {
                    searchInput.focus();
                } else if (navType === 'profile') {
                    openProfile();
                } else if (navType === 'notification') {
                    showToast('info', '📬 Ada pesan terbaru untukmu! Cek di menu profil untuk melihat semua notifikasi.');
                }
            });
        });
    }

    // Quick Actions
    function setupQuickActions() {
        var actionBtns = document.querySelectorAll('.action-btn');
        actionBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var action = this.getAttribute('data-action');
                if (action === 'random') {
                    randomMenu();
                } else if (action === 'favorites') {
                    showFavorites();
                } else if (action === 'recent') {
                    showToast('info', 'Menu terakhir yang dikunjungi');
                }
            });
        });
    }

    // Random Menu
    function randomMenu() {
        var visibleCards = Array.from(menuCards).filter(function(c) {
            return c.style.display !== 'none';
        });
        if (visibleCards.length > 0) {
            var randomCard = visibleCards[Math.floor(Math.random() * visibleCards.length)];
            var link = randomCard.getAttribute('href');
            if (link) {
                window.location.href = link;
            }
        }
    }

    // Favorites
    function showFavorites() {
        if (userData.favorites.length === 0) {
            showToast('info', 'Belum ada menu favorit. Klik ❤️ untuk menambah!');
        } else {
            var favMenus = MENU_ITEMS.filter(function(m) {
                return userData.favorites.indexOf(m.id) !== -1;
            });
            var message = 'Menu Favorit:\n' + favMenus.map(function(m) {
                return '- ' + m.title;
            }).join('\n');
            alert(message);
        }
    }

    // Settings Modal
    function openSettings() {
        var modal = document.getElementById('modal-overlay');
        var modalContent = document.getElementById('modal-content');
        var modalBody = document.getElementById('modal-body');
        
        modalBody.innerHTML = 
            '<div class="settings-modal">' +
            '<h2>⚙️ Pengaturan</h2>' +
            '<div class="settings-item" onclick="toggleDarkMode()">' +
            '<i class="fas fa-moon"></i>' +
            '<span>Mode Gelap</span>' +
            '<label class="toggle"><input type="checkbox" ' + (userData.darkMode ? 'checked' : '') + '></label>' +
            '</div>' +
            '<div class="settings-item" onclick="changeName()">' +
            '<i class="fas fa-user"></i>' +
            '<span>Nama Profil</span>' +
            '<span class="settings-value">' + userData.name + '</span>' +
            '</div>' +
            '<div class="settings-item" onclick="resetProgress()">' +
            '<i class="fas fa-redo"></i>' +
            '<span>Reset Progress</span>' +
            '<i class="fas fa-chevron-right"></i>' +
            '</div>' +
            '<div class="settings-item" onclick="closeModal()">' +
            '<span>⬅️ Kembali</span>' +
            '</div>' +
            '</div>';
        
        modal.classList.add('active');
    }

    // Profile Modal
    function openProfile() {
        var modal = document.getElementById('modal-overlay');
        var modalBody = document.getElementById('modal-body');
        
        modalBody.innerHTML = 
            '<div class="profile-modal">' +
            '<div class="profile-avatar">🌱</div>' +
            '<h2>' + userData.name + '</h2>' +
            '<p class="profile-level">Level ' + userData.level + ' - ' + getLevelName() + '</p>' +
            '<div class="profile-stats">' +
            '<div class="stat"><span class="stat-value">' + userData.xp + '</span><span class="stat-label">XP</span></div>' +
            '<div class="stat"><span class="stat-value">' + userData.streak + '</span><span class="stat-label">Streak</span></div>' +
            '<div class="stat"><span class="stat-value">' + userData.achievements.length + '</span><span class="stat-label">Achievements</span></div>' +
            '</div>' +
            '<button class="btn-profile" onclick="closeModal()">Tutup</button>' +
            '</div>';
        
        modal.classList.add('active');
    }

    // Toggle Dark Mode
    window.toggleDarkMode = function() {
        userData.darkMode = !userData.darkMode;
        saveUserData();
        document.body.classList.toggle('dark-mode', userData.darkMode);
        showToast('success', userData.darkMode ? 'Mode gelap diaktifkan' : 'Mode terang diaktifkan');
    };

    // Change Name
    window.changeName = function() {
        var newName = prompt('Masukkan nama baru:', userData.name);
        if (newName && newName.trim()) {
            userData.name = newName.trim();
            saveUserData();
            updateUserUI();
            showToast('success', 'Nama berhasil diubah!');
        }
    };

    // Reset Progress
    window.resetProgress = function() {
        if (confirm('Apakah Anda yakin ingin mereset semua progress? Data tidak bisa dikembalikan!')) {
            userData = {
                name: 'Siswa Agroplay',
                level: 1,
                xp: 0,
                xpToNextLevel: 100,
                streak: 0,
                achievements: [],
                favorites: [],
                language: 'id',
                darkMode: false
            };
            saveUserData();
            updateUserUI();
            showToast('success', 'Progress berhasil direset!');
            closeModal();
        }
    };

    // Close Modal
    window.closeModal = function() {
        var modal = document.getElementById('modal-overlay');
        if (modal) modal.classList.remove('active');
    };

    // Toast
    function showToast(type, message) {
        if (!toastContainer) return;
        
        // Remove any existing toast first - ensures only one bubble at a time
        var existingToasts = toastContainer.querySelectorAll('.toast');
        existingToasts.forEach(function(oldToast) {
            if (oldToast && oldToast.parentNode) {
                oldToast.style.animation = 'toastSlideOut 0.3s ease forwards';
                setTimeout(function() {
                    if (oldToast && oldToast.parentNode) {
                        oldToast.parentNode.removeChild(oldToast);
                    }
                }, 300);
            }
        });
        
        var toast = document.createElement('div');
        toast.className = 'toast toast-' + type;
        
        var icon = type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-circle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle';
        
        toast.innerHTML = '<i class="fas ' + icon + '"></i><span class="toast-message">' + message + '</span>';
        toastContainer.appendChild(toast);
        
        // Add toast animation if not exists
        if (!document.getElementById('toast-global-styles')) {
            var style = document.createElement('style');
            style.id = 'toast-global-styles';
            style.textContent = `
                @keyframes toastSlideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(function() {
            if (toast && toast.parentNode) {
                toast.style.animation = 'toastSlideOut 0.3s ease forwards';
                setTimeout(function() {
                    if (toast && toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            }
        }, CONFIG.TOAST_DURATION);
    }

    // Expose to window
    window.showToast = showToast;

    // Start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

