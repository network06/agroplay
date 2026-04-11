// ==================== COMPLETE FIXED MODAL & PLANTING SYSTEM ====================

// Enhanced Modal System with Modern Design
window.showModal = function(title, content) {
    console.log('Enhanced showModal called:', title);
    const modal = document.getElementById('game-modal');
    const body = document.getElementById('modal-body');
    const titleElement = document.getElementById('modal-title');
    
    if (modal && body) {
        // Enhanced title with modern design
        if (titleElement) {
            titleElement.innerHTML = `
                <div class="modal-header-enhanced">
                    <div class="modal-title-icon">??</div>
                    <div class="modal-title-text">${title}</div>
                    <div class="modal-title-decoration"></div>
                </div>
            `;
        }
        
        body.innerHTML = content;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // Add entrance animation
        setTimeout(() => {
            modal.classList.add('modal-enter');
        }, 10);
    }
};

// Enhanced Plant Selection Modal - FIXED
window.openPlantingModal = function(plotIndex) {
    console.log('Opening enhanced planting modal for plot:', plotIndex);
    window.sessionState.selectedPlotIndex = plotIndex;
    
    // Ensure PLANTS data exists
    if (!window.PLANTS || Object.keys(window.PLANTS).length === 0) {
        console.log('PLANTS data not available, using fallback data');
        window.PLANTS = {
            'padi': { id: 'padi', name: 'Padi', icon: '??', category: 'sayuran', seedPrice: 100, sellPrice: 200, baseYield: 10, growthTime: 24, xp: 10, unlockLevel: 1 },
            'jagung': { id: 'jagung', name: 'Jagung', icon: '??', category: 'sayuran', seedPrice: 150, sellPrice: 300, baseYield: 8, growthTime: 18, xp: 12, unlockLevel: 1 },
            'cabai': { id: 'cabai', name: 'Cabai', icon: '??', category: 'sayuran', seedPrice: 200, sellPrice: 400, baseYield: 6, growthTime: 20, xp: 15, unlockLevel: 1 },
            'tomat': { id: 'tomat', name: 'Tomat', icon: '??', category: 'sayuran', seedPrice: 180, sellPrice: 360, baseYield: 7, growthTime: 16, xp: 14, unlockLevel: 3 },
            'kentang': { id: 'kentang', name: 'Kentang', icon: '??', category: 'sayuran', seedPrice: 250, sellPrice: 500, baseYield: 12, growthTime: 30, xp: 18, unlockLevel: 3 },
            'wortel': { id: 'wortel', name: 'Wortel', icon: '??', category: 'sayuran', seedPrice: 220, sellPrice: 440, baseYield: 9, growthTime: 25, xp: 16, unlockLevel: 5 },
            'bayam': { id: 'bayam', name: 'Bayam', icon: '??', category: 'sayuran', seedPrice: 80, sellPrice: 160, baseYield: 5, growthTime: 12, xp: 8, unlockLevel: 5 },
            'stroberi': { id: 'stroberi', name: 'Stroberi', icon: '??', category: 'buah', seedPrice: 300, sellPrice: 600, baseYield: 4, growthTime: 35, xp: 20, unlockLevel: 10 },
            'melon': { id: 'melon', name: 'Melon', icon: '??', category: 'buah', seedPrice: 350, sellPrice: 700, baseYield: 8, growthTime: 40, xp: 22, unlockLevel: 10 },
            'tebu': { id: 'tebu', name: 'Tebu', icon: '??', category: 'sayuran', seedPrice: 120, sellPrice: 240, baseYield: 15, growthTime: 28, xp: 11, unlockLevel: 15 },
            'kapas': { id: 'kapas', name: 'Kapas', icon: '??', category: 'tanaman-obat', seedPrice: 200, sellPrice: 400, baseYield: 6, growthTime: 22, xp: 15, unlockLevel: 15 },
            'kopi': { id: 'kopi', name: 'Kopi', icon: '??', category: 'tanaman-obat', seedPrice: 400, sellPrice: 800, baseYield: 3, growthTime: 45, xp: 25, unlockLevel: 20 },
            'jahe': { id: 'jahe', name: 'Jahe', icon: '??', category: 'tanaman-obat', seedPrice: 180, sellPrice: 360, baseYield: 4, growthTime: 26, xp: 17, unlockLevel: 20 },
            'kunyit': { id: 'kunyit', name: 'Kunyit', icon: '??', category: 'tanaman-obat', seedPrice: 160, sellPrice: 320, baseYield: 3, growthTime: 24, xp: 16, unlockLevel: 25 },
            'mawar': { id: 'mawar', name: 'Mawar', icon: '??', category: 'bunga', seedPrice: 500, sellPrice: 1000, baseYield: 2, growthTime: 50, xp: 30, unlockLevel: 30 },
            'anggrek': { id: 'anggrek', name: 'Anggrek', icon: '??', category: 'bunga', seedPrice: 800, sellPrice: 1600, baseYield: 1, growthTime: 60, xp: 35, unlockLevel: 35 }
        };
    }
    
    // Ensure FERTILIZERS data exists
    if (!window.FERTILIZERS) {
        window.FERTILIZERS = {
            'none': { id: 'none', name: 'Tanpa Pupuk', icon: '??', price: 0, yieldMult: 1.0 },
            'organik': { id: 'organik', name: 'Pupuk Organik', icon: '??', price: 50, yieldMult: 1.2 },
            'kimia': { id: 'kimia', name: 'Pupuk Kimia', icon: '??', price: 80, yieldMult: 1.3 },
            'kompos': { id: 'kompos', name: 'Pupuk Kompos', icon: '??', price: 60, yieldMult: 1.15 },
            'premium': { id: 'premium', name: 'Pupuk Premium', icon: '??', price: 150, yieldMult: 1.5 }
        };
    }
    
    // Ensure METHODS data exists
    if (!window.METHODS) {
        window.METHODS = {
            'tradisional': { id: 'tradisional', name: 'Tradisional', icon: '??', yieldMult: 1.0 },
            'modern': { id: 'modern', name: 'Modern', icon: '??', yieldMult: 1.1 },
            'hidroponik': { id: 'hidroponik', name: 'Hidroponik', icon: '??', yieldMult: 1.25 },
            'organik': { id: 'organik', name: 'Organik', icon: '??', yieldMult: 1.15 }
        };
    }
    
    const plants = Object.entries(window.PLANTS);
    const categories = ['sayuran', 'buah', 'tanaman-obat', 'bunga'];
    
    const modalHTML = `
        <div class="enhanced-planting-container">
            <div class="planting-header">
                <div class="planting-title">
                    <span class="title-icon">??</span>
                    <span class="title-text">Pilih Tanaman</span>
                    <span class="title-badge">Plot ${plotIndex + 1}</span>
                </div>
                <div class="planting-subtitle">Pilih tanaman favorit Anda untuk ditanam</div>
            </div>
            
            <div class="planting-categories">
                ${categories.map(category => `
                    <button class="category-btn ${category === 'sayuran' ? 'active' : ''}" data-category="${category}" onclick="window.filterPlants('${category}')">
                        <span class="category-icon">${window.getCategoryIcon(category)}</span>
                        <span class="category-name">${window.getCategoryName(category)}</span>
                        <span class="category-count">0</span>
                    </button>
                `).join('')}
            </div>
            
            <div class="planting-search">
                <div class="search-wrapper">
                    <input type="text" class="plant-search-input" placeholder="Cari tanaman..." oninput="window.searchPlants(this.value)">
                    <span class="search-icon">??</span>
                </div>
            </div>
            
            <div class="planting-grid" id="planting-grid">
                ${plants.map(([plantId, plant]) => {
                    const isUnlocked = window.gameState && window.gameState.plantsUnlocked && window.gameState.plantsUnlocked.has(plantId);
                    const canAfford = window.gameState && window.gameState.coins >= plant.seedPrice;
                    
                    return `
                        <div class="plant-card ${!isUnlocked ? 'locked' : ''} ${!canAfford ? 'cannot-afford' : ''} plant-visible" 
                             data-plant-id="${plantId}" 
                             data-category="${plant.category}"
                             onclick="window.selectPlant('${plantId}')">
                            <div class="plant-card-header">
                                <div class="plant-icon">${plant.icon}</div>
                                <div class="plant-status">
                                    ${isUnlocked ? '<span class="status-unlocked">??</span>' : '<span class="status-locked">??</span>'}
                                </div>
                            </div>
                            
                            <div class="plant-card-body">
                                <div class="plant-name">${plant.name}</div>
                                <div class="plant-info">
                                    <span class="plant-price">${window.formatNumber ? window.formatNumber(plant.seedPrice) : plant.seedPrice} ??</span>
                                    <span class="plant-time">?? ${plant.growthTime}h</span>
                                </div>
                                <div class="plant-stats">
                                    <div class="stat-item">
                                        <span class="stat-label">Hasil:</span>
                                        <span class="stat-value">${plant.baseYield}kg</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Harga:</span>
                                        <span class="stat-value">${window.formatNumber ? window.formatNumber(plant.sellPrice) : plant.sellPrice} ??</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="plant-card-footer">
                                ${!isUnlocked ? 
                                    `<span class="unlock-requirement">?? Level ${plant.unlockLevel || 5}</span>` :
                                    canAfford ? 
                                        '<span class="plant-action">?? Tanam</span>' :
                                        '<span class="need-coins">?? Kurang</span>'
                                }
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            
            <div class="planting-options">
                <div class="option-section">
                    <h4 class="option-title">?? Pupuk</h4>
                    <select class="option-select" id="fertilizer-select">
                        ${Object.entries(window.FERTILIZERS).map(([id, fert]) => `
                            <option value="${id}">${fert.icon} ${fert.name} (+${(fert.yieldMult - 1) * 100}% hasil)</option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="option-section">
                    <h4 class="option-title">?? Level Air</h4>
                    <div class="water-slider">
                        <input type="range" id="water-level" min="1" max="5" value="3" class="water-input">
                        <div class="water-display">
                            <span class="water-value">3</span>
                            <span class="water-label">Sedang</span>
                        </div>
                    </div>
                </div>
                
                <div class="option-section">
                    <h4 class="option-title">?? Metode</h4>
                    <select class="option-select" id="method-select">
                        ${Object.entries(window.METHODS).map(([id, method]) => `
                            <option value="${id}">${method.icon} ${method.name} (+${(method.yieldMult - 1) * 100}% hasil)</option>
                        `).join('')}
                    </select>
                </div>
            </div>
            
            <div class="planting-actions">
                <button class="action-btn cancel-btn" onclick="window.closeModal()">
                    <span class="btn-icon">??</span>
                    <span class="btn-text">Batal</span>
                </button>
                <button class="action-btn confirm-btn" onclick="window.confirmPlanting()" id="confirm-planting" disabled>
                    <span class="btn-icon">??</span>
                    <span class="btn-text">Tanam Sekarang</span>
                </button>
            </div>
        </div>
    `;
    
    window.showModal('Pilih Tanaman untuk Ditanam', modalHTML);
    
    // Initialize plant selection
    setTimeout(() => {
        window.updatePlantCounts();
        window.initializeWaterSlider();
    }, 100);
};

// Enhanced Plant Filtering - FIXED
window.filterPlants = function(category) {
    console.log('Filtering plants by category:', category);
    
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-category="${category}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Filter plants
    const allPlants = document.querySelectorAll('.plant-card');
    allPlants.forEach(plant => {
        if (plant.dataset.category === category) {
            plant.style.display = 'block';
            setTimeout(() => plant.classList.add('plant-visible'), 50);
        } else {
            plant.classList.remove('plant-visible');
            setTimeout(() => plant.style.display = 'none', 300);
        }
    });
    
    window.updatePlantCounts();
};

// Enhanced Plant Search - FIXED
window.searchPlants = function(query) {
    console.log('Searching plants:', query);
    
    const allPlants = document.querySelectorAll('.plant-card');
    const searchTerm = query.toLowerCase();
    
    allPlants.forEach(plant => {
        const plantName = plant.querySelector('.plant-name');
        if (plantName) {
            const nameText = plantName.textContent.toLowerCase();
            const plantId = plant.dataset.plantId;
            
            if (nameText.includes(searchTerm) || plantId.includes(searchTerm)) {
                plant.style.display = 'block';
                setTimeout(() => plant.classList.add('plant-visible'), 50);
            } else {
                plant.classList.remove('plant-visible');
                setTimeout(() => plant.style.display = 'none', 300);
            }
        }
    });
    
    window.updatePlantCounts();
};

// Update Plant Counts - FIXED
window.updatePlantCounts = function() {
    document.querySelectorAll('.category-btn').forEach(btn => {
        const category = btn.dataset.category;
        const visiblePlants = document.querySelectorAll(`.plant-card[data-category="${category}"]:not([style*="display: none"])`);
        const countElement = btn.querySelector('.category-count');
        if (countElement) {
            countElement.textContent = visiblePlants.length;
        }
    });
};

// Initialize Water Slider - FIXED
window.initializeWaterSlider = function() {
    const slider = document.getElementById('water-level');
    const display = document.querySelector('.water-value');
    const label = document.querySelector('.water-label');
    
    if (slider && display && label) {
        const labels = ['Rendah', 'Rendah', 'Sedang', 'Tinggi', 'Tinggi'];
        
        slider.addEventListener('input', function() {
            const value = parseInt(this.value);
            display.textContent = value;
            label.textContent = labels[value - 1];
        });
    }
};

// Enhanced Plant Selection - FIXED
window.selectPlant = function(plantId) {
    console.log('Selecting plant:', plantId);
    
    // Check if plant exists
    const plant = window.PLANTS[plantId];
    if (!plant) {
        window.showToast('error', '?? Tanaman tidak ditemukan!');
        return;
    }
    
    // Check if plant is unlocked and affordable
    const isUnlocked = window.gameState && window.gameState.plantsUnlocked && window.gameState.plantsUnlocked.has(plantId);
    if (!isUnlocked) {
        window.showToast('error', `?? Tanaman ini terkunci! Level ${plant.unlockLevel || 5} diperlukan.`);
        return;
    }
    
    const canAfford = window.gameState && window.gameState.coins >= plant.seedPrice;
    if (!canAfford) {
        const needed = plant.seedPrice - (window.gameState ? window.gameState.coins : 0);
        window.showToast('error', `?? Coins tidak cukup! Butuh ${window.formatNumber ? window.formatNumber(needed) : needed} coins lagi.`);
        return;
    }
    
    // Remove previous selection
    document.querySelectorAll('.plant-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to current plant
    const selectedCard = document.querySelector(`[data-plant-id="${plantId}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    
    // Store selected plant
    window.sessionState.selectedPlant = plantId;
    
    // Enable confirm button
    const confirmBtn = document.getElementById('confirm-planting');
    if (confirmBtn) {
        confirmBtn.disabled = false;
        confirmBtn.innerHTML = `
            <span class="btn-icon">??</span>
            <span class="btn-text">Tanam ${plant.name} - ${window.formatNumber ? window.formatNumber(plant.seedPrice) : plant.seedPrice} ??</span>
        `;
    }
};

// Enhanced Confirm Planting - FIXED
window.confirmPlanting = function() {
    if (!window.sessionState.selectedPlant || window.sessionState.selectedPlotIndex === null) {
        window.showToast('error', '?? Pilih tanaman terlebih dahulu!');
        return;
    }
    
    const plant = window.PLANTS[window.sessionState.selectedPlant];
    if (!plant) {
        window.showToast('error', '?? Tanaman tidak valid!');
        return;
    }
    
    const fertilizerSelect = document.getElementById('fertilizer-select');
    const waterLevelInput = document.getElementById('water-level');
    const methodSelect = document.getElementById('method-select');
    
    const fertilizer = fertilizerSelect ? fertilizerSelect.value : 'none';
    const waterLevel = waterLevelInput ? parseInt(waterLevelInput.value) : 3;
    const method = methodSelect ? methodSelect.value : 'tradisional';
    
    // Calculate total cost
    const fertilizerData = window.FERTILIZERS[fertilizer] || window.FERTILIZERS.none;
    const fertilizerCost = fertilizerData.price;
    const totalCost = plant.seedPrice + fertilizerCost;
    
    if (!window.gameState || window.gameState.coins < totalCost) {
        const needed = totalCost - (window.gameState ? window.gameState.coins : 0);
        window.showToast('error', `?? Coins tidak cukup! Butuh ${window.formatNumber ? window.formatNumber(needed) : needed} coins lagi.`);
        return;
    }
    
    // Plant the crop
    if (!window.sessionState.plots) {
        window.sessionState.plots = [null, null, null, null, null, null];
    }
    
    window.sessionState.plots[window.sessionState.selectedPlotIndex] = {
        plantId: window.sessionState.selectedPlant,
        fertilizer: fertilizer,
        waterLevel: waterLevel,
        method: method,
        progress: 0,
        plantedAt: Date.now()
    };
    
    // Deduct coins
    window.gameState.coins -= totalCost;
    window.gameState.totalPlanted = (window.gameState.totalPlanted || 0) + 1;
    window.gameState.xp = (window.gameState.xp || 0) + (plant.xp || 10);
    
    // Check for new plant unlocks
    window.checkPlantUnlocks();
    
    // Save and update
    if (window.saveGameState) window.saveGameState();
    if (window.updateUI) window.updateUI();
    if (window.renderPlots) window.renderPlots();
    
    window.showToast('success', `?? ${plant.name} berhasil ditanam!`);
    window.closeModal();
};

// Check Plant Unlocks - FIXED
window.checkPlantUnlocks = function() {
    if (!window.gameState || !window.gameState.totalPlanted) return;
    
    const milestones = [
        { count: 1, plants: ['jagung', 'cabai'] },
        { count: 3, plants: ['tomat', 'kentang'] },
        { count: 5, plants: ['wortel', 'bayam'] },
        { count: 10, plants: ['stroberi', 'melon'] },
        { count: 15, plants: ['tebu', 'kapas'] },
        { count: 20, plants: ['kopi', 'jahe'] },
        { count: 25, plants: ['kunyit'] },
        { count: 30, plants: ['mawar'] },
        { count: 35, plants: ['anggrek'] }
    ];
    
    milestones.forEach(milestone => {
        if (window.gameState.totalPlanted >= milestone.count) {
            milestone.plants.forEach(plantId => {
                if (window.PLANTS[plantId] && window.gameState.plantsUnlocked && !window.gameState.plantsUnlocked.has(plantId)) {
                    window.gameState.plantsUnlocked.add(plantId);
                    window.showToast('success', `?? ${window.PLANTS[plantId].name} terbuka!`);
                }
            });
        }
    });
};

// Enhanced Error Handling - Prevent Toast Spam - FIXED
let errorToastCount = 0;
const MAX_ERROR_TOASTS = 3;

// Override console.error to prevent spam
const originalConsoleError = console.error;
console.error = function(...args) {
    originalConsoleError.apply(console, args);
    
    // Only show toast for real errors, not for expected ones
    const message = args[0] || '';
    if (typeof message === 'string' && (message.includes('Error') || message.includes('undefined') || message.includes('null'))) {
        if (errorToastCount < MAX_ERROR_TOASTS) {
            if (window.showToast) {
                window.showToast('error', '?? Terjadi kesalahan sistem');
            }
            errorToastCount++;
        }
    }
};

// Reset error counter after 10 seconds
setInterval(() => {
    errorToastCount = 0;
}, 10000);

// Enhanced Category Functions - FIXED
window.getCategoryIcon = function(category) {
    const icons = {
        'sayuran': '??',
        'buah': '??',
        'tanaman-obat': '??',
        'bunga': '??'
    };
    return icons[category] || '??';
};

window.getCategoryName = function(category) {
    const names = {
        'sayuran': 'Sayuran',
        'buah': 'Buah',
        'tanaman-obat': 'Tanaman Obat',
        'bunga': 'Bunga'
    };
    return names[category] || 'Lainnya';
};

// Make functions available globally
window.filterPlants = window.filterPlants;
window.searchPlants = window.searchPlants;
window.selectPlant = window.selectPlant;
window.confirmPlanting = window.confirmPlanting;
window.openPlantingModal = window.openPlantingModal;
window.updatePlantCounts = window.updatePlantCounts;
window.initializeWaterSlider = window.initializeWaterSlider;
window.checkPlantUnlocks = window.checkPlantUnlocks;
window.getCategoryIcon = window.getCategoryIcon;
window.getCategoryName = window.getCategoryName;
