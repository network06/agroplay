/**
 * =====================================================
 * AGROPLAY - Menu Component JavaScript
 * Interactive Educational App for SMP Students (Grade 7-8)
 * Based on Sketsa & RAB Agreement
 * =====================================================
 */

(function() {
    'use strict';

    // ======================
    // CONFIGURATION
    // ======================
    const CONFIG = {
        SPLASH_DURATION: 2000,
        SEARCH_DEBOUNCE: 300,
        TOAST_DURATION: 3000
    };

    // Menu Data
    const MENU_DATA = {
        'kebun-ajaib': { title: 'Kebun Ajaib', description: 'Main game menanam sayuran!', icon: '🎮' },
        'tanam-yuk': { title: 'Tanam Yuk!', description: 'Mari menanam bersama!', icon: '🌱' },
        'kuis-seru': { title: 'Kuis Seru Tani', description: 'Tes pengetahuanmu!', icon: '🧠' },
        'buku-tanamku': { title: 'Buku Tanamku', description: 'Panduan menanam sayuran', icon: '📚' },
        'cuan-farming': { title: 'Cuan Farming', description: 'Farm virtual yang seru!', icon: '💰' }
    };

    // Search suggestions
    const SEARCH_SUGGESTIONS = [
        'Kebun Ajaib', 'Tanam Yuk', 'Kuis Seru Tani', 'Buku Tanamku', 'Cuan Farming',
        'Cara menanam cabe', 'Cara menanam tomat', 'Cara menanam sawi', 'Game hortikultura'
    ];

    // ======================
    // DOM ELEMENTS
    // ======================
    let splashScreen, mainApp, searchInput, searchClear, menuItems, navItems, toastContainer;

    // ======================
    // INITIALIZATION
    // ======================
    function init() {
        cacheElements();
        setupSplashScreen();
        setupSearch();
        setupMenuItems();
        setupNavigation();
        setupQuickActions();
        setupKeyboardNav();
        console.log('🚀 Agroplay Menu initialized!');
    }

    // Cache DOM elements
    function cacheElements() {
        splashScreen = document.getElementById('splash-screen');
        mainApp = document.getElementById('main-app');
        searchInput = document.getElementById('search-input');
        searchClear = document.getElementById('search-clear');
        menuItems = document.querySelectorAll('.menu-item');
        navItems = document.querySelectorAll('.nav-item');
        toastContainer = document.getElementById('toast-container');
    }

    // ======================
    // SPLASH SCREEN
    // ======================
    function setupSplashScreen() {
        if (!splashScreen || !mainApp) return;

        mainApp.classList.add('hidden');

        setTimeout(() => {
            splashScreen.classList.add('fade-out');
            
            setTimeout(() => {
                splashScreen.style.display = 'none';
                mainApp.classList.remove('hidden');
                showToast('success', 'Selamat datang di Agroplay! 🌱');
            }, 500);
        }, CONFIG.SPLASH_DURATION);
    }

    // ======================
    // SEARCH FUNCTIONALITY
    // ======================
    function setupSearch() {
        if (!searchInput) return;

        let debounceTimer;
        searchInput.addEventListener('input', function() {
            const value = this.value.trim();
            
            if (value.length > 0) {
                searchClear.style.display = 'flex';
                searchClear.classList.add('visible');
            } else {
                searchClear.classList.remove('visible');
                setTimeout(() => { searchClear.style.display = 'none'; }, 200);
            }

            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => { performSearch(value); }, CONFIG.SEARCH_DEBOUNCE);
        });

        if (searchClear) {
            searchClear.addEventListener('click', function() {
                searchInput.value = '';
                searchInput.focus();
                this.classList.remove('visible');
                resetMenuDisplay();
            });
        }

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const value = this.value.trim();
                if (value) executeSearch(value);
            }
        });
    }

    // Perform search
    function performSearch(term) {
        if (term.length === 0) {
            resetMenuDisplay();
            return;
        }

        const termLower = term.toLowerCase();
        
        menuItems.forEach(item => {
            const title = item.querySelector('.menu-item-title').textContent.toLowerCase();
            const desc = item.querySelector('.menu-item-desc').textContent.toLowerCase();
            
            if (title.includes(termLower) || desc.includes(termLower)) {
                item.style.display = 'flex';
                item.style.animation = 'cardEntrance 0.3s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Execute search
    function executeSearch(term) {
        let found = false;
        menuItems.forEach(item => {
            const title = item.querySelector('.menu-item-title').textContent.toLowerCase();
            if (title.includes(term.toLowerCase())) {
                found = true;
                item.click();
            }
        });

        if (!found) {
            showToast('info', `Hasil pencarian: "${term}"`);
        }

        console.log(`🔍 Search: ${term}`);
    }

    // Reset menu display
    function resetMenuDisplay() {
        menuItems.forEach(item => { item.style.display = 'flex'; });
    }

    // ======================
    // MENU ITEMS
    // ======================
    function setupMenuItems() {
        menuItems.forEach(item => {
            const menuType = item.getAttribute('data-menu');
            
            item.addEventListener('click', function(e) {
                e.preventDefault();
                handleMenuClick(menuType);
            });

            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleMenuClick(menuType);
                }
            });

            item.addEventListener('touchstart', function() { this.classList.add('touching'); });
            item.addEventListener('touchend', function() { this.classList.remove('touching'); });
        });
    }

    // Handle menu click
    function handleMenuClick(menuType) {
        const data = MENU_DATA[menuType];
        if (!data) return;

        const item = document.querySelector(`[data-menu="${menuType}"]`);
        if (item) {
            item.style.transform = 'scale(0.95)';
            setTimeout(() => { item.style.transform = ''; }, 150);
        }

        showToast('success', `${data.icon} ${data.title} - Dibuka!`);
        console.log(`📱 Menu clicked: ${data.title}`);
    }

    // ======================
    // NAVIGATION
    // ======================
    function setupNavigation() {
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                const navType = this.getAttribute('data-nav');
                
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');

                handleNavigation(navType);
            });
        });

        // Header buttons
        const backBtn = document.getElementById('back-button');
        const settingsBtn = document.getElementById('settings-button');

        if (backBtn) {
            backBtn.addEventListener('click', () => {
                if (document.referrer) history.back();
                else showToast('info', '🚧 Ini adalah halaman utama');
            });
        }

        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                showToast('info', '⚙️ Pengaturan - Coming Soon!');
            });
        }
    }

    // Handle navigation
    function handleNavigation(navType) {
        const navNames = {
            'home': 'Home', 'search': 'Pencarian', 'notification': 'Notifikasi', 'profile': 'Profil'
        };

        const message = navNames[navType] || navType;
        
        if (navType === 'home') showToast('info', `🏠 ${message}`);
        else if (navType === 'search') searchInput.focus();
        else if (navType === 'notification') showToast('info', `🔔 ${message} - 3 pesan baru`);
        else if (navType === 'profile') showToast('info', '👤 Profil - Coming Soon!');

        console.log(`🧭 Navigation: ${navType}`);
    }

    // ======================
    // QUICK ACTIONS
    // ======================
    function setupQuickActions() {
        const actionBtns = document.querySelectorAll('.action-btn');
        
        actionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                
                switch(action) {
                    case 'random': randomMenu(); break;
                    case 'favorites': showToast('info', '❤️ Menu favoritmu'); break;
                    case 'recent': showToast('info', '🕐 Menu terbaru'); break;
                }
            });
        });
    }

    // Random menu selector
    function randomMenu() {
        const randomIndex = Math.floor(Math.random() * menuItems.length);
        const randomCard = menuItems[randomIndex];
        
        menuItems.forEach(card => {
            card.style.opacity = '0.5';
            card.style.transform = 'scale(0.95)';
        });

        setTimeout(() => {
            menuItems.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = '';
            });
            
            randomCard.style.opacity = '1';
            randomCard.style.transform = 'scale(1.05)';
            
            const menuType = randomCard.getAttribute('data-menu');
            const data = MENU_DATA[menuType];
            
            showToast('success', `🎲 Kamu dapat: ${data.title}!`);
            
            setTimeout(() => { randomCard.style.transform = ''; }, 500);
        }, 300);
    }

    // ======================
    // KEYBOARD NAVIGATION
    // ======================
    function setupKeyboardNav() {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (searchInput) {
                    searchInput.blur();
                    resetMenuDisplay();
                }
            }

            if (e.key >= '1' && e.key <= '5') {
                const index = parseInt(e.key) - 1;
                if (menuItems[index]) menuItems[index].click();
            }
        });
    }

    // ======================
    // TOAST NOTIFICATIONS
    // ======================
    function showToast(type, message) {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let icon = '';
        switch(type) {
            case 'success': icon = 'fa-check-circle'; break;
            case 'error': icon = 'fa-exclamation-circle'; break;
            case 'info': icon = 'fa-info-circle'; break;
            default: icon = 'fa-info-circle';
        }

        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <span class="toast-message">${message}</span>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast-out');
            setTimeout(() => { toast.remove(); }, 300);
        }, CONFIG.TOAST_DURATION);
    }

    // ======================
    // INITIALIZE ON DOM READY
    // ======================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();


