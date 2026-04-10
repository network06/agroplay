/**
 * AGROPLAY - Universal Navigation System
 * Memungkinkan semua role mengakses semua fitur aplikasi
 */

(function() {
    'use strict';
    
    // Universal navigation helper
    const universalNav = {
        // Get all available pages
        getAllPages: function() {
            return [
                { id: 'home', name: 'Beranda', url: 'index.html', icon: 'fas fa-home', roles: ['all'] },
                { id: 'kebun', name: 'Kebun Ajaib', url: 'kebun-ajaib.html', icon: 'fas fa-seedling', roles: ['all'] },
                { id: 'tanam', name: 'Tanam Yuk!', url: 'tanam-yuk.html', icon: 'fas fa-hand-holding-seedling', roles: ['all'] },
                { id: 'kuis', name: 'Kuis Seru', url: 'kuis-seru.html', icon: 'fas fa-brain', roles: ['all'] },
                { id: 'buku', name: 'Buku Tanamku', url: 'buku-tanamku.html', icon: 'fas fa-book', roles: ['all'] },
                { id: 'cuan', name: 'Cuan Farming', url: 'cuan-farming.html', icon: 'fas fa-coins', roles: ['all'] },
                { id: 'profil', name: 'Profil Saya', url: 'profil-simple.html', icon: 'fas fa-user', roles: ['all'] },
                { id: 'admin', name: 'Dashboard Admin', url: 'admin-dashboard.html', icon: 'fas fa-user-shield', roles: ['admin'] },
                { id: 'teacher', name: 'Dashboard Guru', url: 'teacher-dashboard.html', icon: 'fas fa-chalkboard-teacher', roles: ['guru'] },
                { id: 'parent', name: 'Dashboard Orang Tua', url: 'parent-dashboard.html', icon: 'fas fa-user-friends', roles: ['orangtua'] }
            ];
        },
        
        // Create universal navigation menu
        createUniversalNav: function() {
            const user = typeof AUTH !== 'undefined' ? AUTH.getCurrentUser() : null;
            if (!user) return '';
            
            const pages = this.getAllPages();
            const userRole = user.role.trim().toLowerCase();
            
            let navHTML = '<div class="universal-nav-container">';
            navHTML += '<h3 class="nav-title">🌱 Semua Menu Agroplay</h3>';
            navHTML += '<div class="nav-grid">';
            
            pages.forEach(page => {
                // Allow access if page is for all roles or matches user role
                const canAccess = page.roles.includes('all') || page.roles.includes(userRole);
                
                if (canAccess) {
                    const isActive = window.location.pathname.includes(page.url);
                    navHTML += `
                        <a href="${page.url}" class="nav-item ${isActive ? 'active' : ''}" data-page="${page.id}">
                            <div class="nav-icon">
                                <i class="${page.icon}"></i>
                            </div>
                            <div class="nav-label">${page.name}</div>
                            ${page.roles.includes(userRole) && !page.roles.includes('all') ? '<div class="nav-badge">Dashboard</div>' : ''}
                        </a>
                    `;
                }
            });
            
            navHTML += '</div>';
            navHTML += '</div>';
            
            return navHTML;
        },
        
        // Add universal navigation to current page - DISABLED
        injectUniversalNav: function() {
            return; // Completely disabled to prevent duplicate menu
            // const user = typeof AUTH !== 'undefined' ? AUTH.getCurrentUser() : null;
            // if (!user) return;
            
            // // Find appropriate container for navigation
            // let container = document.querySelector('.menu-section');
            // if (!container) {
            //     container = document.querySelector('main') || document.querySelector('.admin-container') || document.querySelector('body');
            // }
            
            // if (container) {
            //     const navHTML = this.createUniversalNav();
            //     const navElement = document.createElement('div');
            //     navElement.innerHTML = navHTML;
            //     container.insertBefore(navElement.firstElementChild, container.firstChild);
            // }
        },
        
        // Add floating quick access button
        addFloatingQuickAccess: function() {
            const user = typeof AUTH !== 'undefined' ? AUTH.getCurrentUser() : null;
            if (!user) return;
            
            const quickAccessHTML = `
                <div class="floating-quick-access" id="floating-quick-access">
                    <button class="quick-access-btn" onclick="universalNav.toggleQuickMenu()">
                        <i class="fas fa-th"></i>
                    </button>
                    <div class="quick-menu" id="quick-menu">
                        <div class="quick-menu-header">
                            <span>🌱 Quick Access</span>
                            <button class="close-quick-menu" onclick="universalNav.toggleQuickMenu()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="quick-menu-grid">
                            ${this.getAllPages().filter(page => 
                                page.roles.includes('all') || page.roles.includes(user.role.trim().toLowerCase())
                            ).map(page => `
                                <a href="${page.url}" class="quick-menu-item">
                                    <i class="${page.icon}"></i>
                                    <span>${page.name}</span>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            const quickAccessElement = document.createElement('div');
            quickAccessElement.innerHTML = quickAccessHTML;
            document.body.appendChild(quickAccessElement.firstElementChild);
        },
        
        // Toggle quick menu
        toggleQuickMenu: function() {
            const quickMenu = document.getElementById('quick-menu');
            if (quickMenu) {
                quickMenu.classList.toggle('show');
            }
        },
        
        // Initialize universal navigation
        init: function() {
            // Wait for DOM and AUTH
            function tryInit() {
                if (typeof AUTH !== 'undefined' && AUTH.getCurrentUser()) {
                    // this.injectUniversalNav(); // Commented out to remove duplicate menu
                    this.addFloatingQuickAccess();
                    console.log('🌱 Universal Navigation initialized for all roles');
                } else {
                    setTimeout(() => tryInit.call(this), 100);
                }
            }
            tryInit.call(this);
        }
    };
    
    // Add CSS styles
    const universalNavCSS = `
        <style id="universal-nav-styles">
        .universal-nav-container {
            background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(255, 255, 255, 0.05));
            border-radius: 20px;
            padding: 20px;
            margin-bottom: 24px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(76, 175, 80, 0.2);
        }
        
        .nav-title {
            color: #4CAF50;
            font-family: 'Fredoka', sans-serif;
            font-size: 20px;
            margin-bottom: 16px;
            text-align: center;
        }
        
        .nav-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 12px;
        }
        
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 16px 12px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 16px;
            text-decoration: none;
            color: #333;
            transition: all 0.3s ease;
            position: relative;
            border: 2px solid transparent;
        }
        
        .nav-item:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
            border-color: #4CAF50;
            background: rgba(255, 255, 255, 0.95);
        }
        
        .nav-item.active {
            background: linear-gradient(135deg, #4CAF50, #45a049);
            color: white;
            border-color: #45a049;
        }
        
        .nav-icon {
            font-size: 24px;
            margin-bottom: 8px;
            color: #4CAF50;
        }
        
        .nav-item.active .nav-icon {
            color: white;
        }
        
        .nav-label {
            font-size: 12px;
            font-weight: 600;
            text-align: center;
            line-height: 1.2;
        }
        
        .nav-badge {
            position: absolute;
            top: 8px;
            right: 8px;
            background: #FF5722;
            color: white;
            font-size: 9px;
            padding: 2px 6px;
            border-radius: 10px;
            font-weight: 700;
        }
        
        .floating-quick-access {
            position: fixed;
            bottom: 80px;
            right: 20px;
            z-index: 1000;
        }
        
        .quick-access-btn {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: linear-gradient(135deg, #4CAF50, #45a049);
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(76, 175, 80, 0.4);
            transition: all 0.3s ease;
        }
        
        .quick-access-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 25px rgba(76, 175, 80, 0.6);
        }
        
        .quick-menu {
            position: absolute;
            bottom: 70px;
            right: 0;
            width: 320px;
            max-height: 400px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease;
            overflow: hidden;
        }
        
        .quick-menu.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .quick-menu-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            background: linear-gradient(135deg, #4CAF50, #45a049);
            color: white;
            font-weight: 600;
        }
        
        .close-quick-menu {
            background: none;
            border: none;
            color: white;
            font-size: 16px;
            cursor: pointer;
            padding: 4px;
        }
        
        .quick-menu-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            padding: 16px;
            max-height: 300px;
            overflow-y: auto;
        }
        
        .quick-menu-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
            background: rgba(76, 175, 80, 0.1);
            border-radius: 12px;
            text-decoration: none;
            color: #333;
            transition: all 0.2s ease;
        }
        
        .quick-menu-item:hover {
            background: rgba(76, 175, 80, 0.2);
            transform: translateX(4px);
        }
        
        .quick-menu-item i {
            font-size: 16px;
            color: #4CAF50;
        }
        
        .quick-menu-item span {
            font-size: 12px;
            font-weight: 600;
        }
        
        @media (max-width: 768px) {
            .nav-grid {
                grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            }
            
            .quick-menu {
                width: 280px;
                right: -10px;
            }
        }
        </style>
    `;
    
    // Inject CSS
    if (document.head) {
        document.head.insertAdjacentHTML('beforeend', universalNavCSS);
    }
    
    // Make it global
    window.universalNav = universalNav;
    
    // Auto-initialize when DOM is ready - DISABLED to remove duplicate menu
    // if (document.readyState === 'loading') {
    //     document.addEventListener('DOMContentLoaded', () => universalNav.init());
    // } else {
    //     universalNav.init();
    // }
    
    console.log('🌱 Universal Navigation System loaded');
})();
