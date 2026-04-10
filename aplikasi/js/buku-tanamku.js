// 📚 BUKU TANAMKU - REALTIME INTEGRATION (Phase 3.11)
// Track book reading + bookmarking → booksRead/addXP

/**
 * Override showCategory for reading tracking
 */
const originalBukuShowCategory = (typeof showCategory !== 'undefined') ? showCategory : null;
if (originalBukuShowCategory) {
    showCategory = function(category) {
        console.log(`📚 Buku Tanamku: showCategory called with: ${category}`);
        
        // HANYA TRACKING KATEGORI VIEW - TANPA XP
        if (typeof REALTIME !== 'undefined' && REALTIME.getCurrentUserData()) {
            console.log(`📚 Buku Tanamku: Tracking category view: ${category}`);
            
            // Record activity tapi tanpa XP (XP hanya saat baca konten spesifik)
            REALTIME.recordActivity(REALTIME.ACTIVITY_TYPES.VIEW_PAGE, { 
                category: category, 
                type: 'buku_tanamku_category_view',
                virtual: true 
            });
        } else {
            console.warn(`📚 Buku Tanamku: Cannot track - REALTIME not available or no user data`);
        }
        
        // Call original function (which now includes auto scroll)
        originalBukuShowCategory(category);
        
        // Additional auto scroll for buku-tanamku specifically
        setTimeout(function() {
            var plantsGrid = document.getElementById('plants-grid');
            if (plantsGrid) {
                // Smooth scroll ke konten dengan sedikit delay untuk memastikan render selesai
                plantsGrid.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Tambah offset untuk header
                setTimeout(function() {
                    window.scrollBy({
                        top: -100, // Offset 100px untuk buku-tanamku
                        behavior: 'smooth'
                    });
                }, 400);
                
                console.log('📚 Buku Tanamku: Additional auto scroll applied for:', category);
            }
        }, 800); // Delay lebih lama untuk buku-tanamku
    };
    console.log('📚 Buku Tanamku: showCategory override installed successfully');
} else {
    console.warn('📚 Buku Tanamku: showCategory function not found - override failed');
}

/**
 * Track detail modal open as "deep read"
 */
const originalBukuShowDetail = showPlantDetail || showRecipe; // Compatible with both plant/food
if (typeof originalBukuShowDetail === 'function') {
    showPlantDetail = function(plantId) {
        // REALTIME TRACKING - Plant detail viewed
        if (typeof REALTIME !== 'undefined' && REALTIME.getCurrentUserData()) {
            REALTIME.incrementStat('booksRead');
            var result = REALTIME.addXP(15, `Buku Tanamku Detail: ${plantId}`);
            
            // Show notification
            if (typeof showToast === 'function') {
                showToast('success', `🔍 +15 XP - Detail tanaman!`);
            }
            
            REALTIME.recordActivity(REALTIME.ACTIVITY_TYPES.READ_GUIDE, { 
                plantId: plantId, 
                type: 'buku_tanamku_detail',
                virtual: true 
            });
        }
        
        originalBukuShowDetail(plantId);
    };
}
/**
 * Track bookmark/save as extra engagement
 */
const originalSaveFunction = typeof saveRecipe !== 'undefined' ? saveRecipe : null;
if (originalSaveFunction) {
    saveRecipe = function(id) {
        if (typeof REALTIME !== 'undefined') {
            REALTIME.incrementStat('booksRead');
            var result = REALTIME.addXP(35, `Buku Bookmark: ${id}`);
            
            // Show notification
            if (typeof showToast === 'function') {
                showToast('success', `🔖 +35 XP - Bookmark tersimpan!`);
            }
        }
        originalSaveFunction(id);
    };
}

// Auto-track on page load (entering Buku Tanamku = read session)
document.addEventListener('DOMContentLoaded', function() {
    console.log('📚 Buku Tanamku: Page loaded');
    
    // Fallback: Track page load regardless of override status
    if (typeof REALTIME !== 'undefined' && REALTIME.getCurrentUserData()) {
        REALTIME.incrementStat('booksRead');
        var result = REALTIME.addXP(10, 'Buku Tanamku session opened');
        
        // Show notification
        if (typeof showToast === 'function') {
            showToast('success', `📚 +10 XP - Selamat datang di Buku Tanamku!`);
        }
        
        REALTIME.recordActivity(REALTIME.ACTIVITY_TYPES.READ_GUIDE, { 
            session: 'buku_tanamku_page',
            pages: 1 
        });
        console.log('✅ Buku Tanamku: Session tracked (+10 XP, +1 booksRead)');
    } else {
        console.warn('⚠️ Buku Tanamku: REALTIME not available or no user data');
    }
    
    // Add direct click listeners to category items as additional fallback
    setTimeout(() => {
        const categoryItems = document.querySelectorAll('.content-menu-item[onclick*="showCategory"]');
        console.log(`📚 Buku Tanamku: Found ${categoryItems.length} category items`);
        
        categoryItems.forEach((item, index) => {
            const onclickAttr = item.getAttribute('onclick');
            if (onclickAttr && onclickAttr.includes('showCategory')) {
                // Extract category name from onclick
                const match = onclickAttr.match(/showCategory\('([^']+)'\)/);
                if (match) {
                    const category = match[1];
                    console.log(`📚 Buku Tanamku: Adding listener to category ${index + 1}: ${category}`);
                    
                    item.addEventListener('click', function(e) {
                        console.log(`📚 Buku Tanamku: Category clicked: ${category}`);
                        
                        // Direct tracking as fallback
                        if (typeof REALTIME !== 'undefined' && REALTIME.getCurrentUserData()) {
                            REALTIME.incrementStat('booksRead');
                            var result = REALTIME.addXP(25, `Buku Tanamku: ${category} (direct)`);
                            
                            // Show notification
                            if (typeof showToast === 'function') {
                                showToast('success', `📚 +25 XP - Membaca ${category}!`);
                            }
                            
                            REALTIME.recordActivity(REALTIME.ACTIVITY_TYPES.READ_GUIDE, { 
                                category: category, 
                                type: 'buku_tanamku_direct',
                                virtual: true 
                            });
                            console.log(`✅ Buku Tanamku: ${category} tracked (+25 XP, +1 booksRead)`);
                        } else {
                            console.warn('⚠️ Buku Tanamku: Cannot track - REALTIME not available');
                        }
                    });
                }
            }
        });
        console.log('✅ Buku Tanamku: Direct listeners installed');
    }, 1000);
});

// Export for HTML usage
window.trackBukuRead = function(category) {
    if (typeof REALTIME !== 'undefined') {
        REALTIME.incrementStat('booksRead');
        var result = REALTIME.addXP(20, `Manual Buku Read: ${category}`);
        
        // Show notification
        if (typeof showToast === 'function') {
            showToast('success', `📚 +20 XP - Membaca ${category}!`);
        }
    }
};
