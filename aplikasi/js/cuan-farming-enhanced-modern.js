// ==================== ENHANCED MODAL & PLANTING SYSTEM ====================

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
                    <div class="modal-title-icon">🌱</div>
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

// Enhanced Plant Selection Modal
window.openPlantingModal = function(plotIndex) {
    console.log('Opening enhanced planting modal for plot:', plotIndex);
    window.sessionState.selectedPlotIndex = plotIndex;
    
    const plants = Object.entries(window.PLANTS || {});
    const categories = ['sayuran', 'buah', 'tanaman-obat', 'bunga'];
    
    const modalHTML = `
        <div class="enhanced-planting-container">
            <div class="planting-header">
                <div class="planting-title">
                    <span class="title-icon">🌾</span>
                    <span class="title-text">Pilih Tanaman</span>
                    <span class="title-badge">Plot ${plotIndex + 1}</span>
                </div>
                <div class="planting-subtitle">Pilih tanaman favorit Anda untuk ditanam</div>
            </div>
            
            <div class="planting-categories">
                ${categories.map(category => `
                    <button class="category-btn active" data-category="${category}" onclick="window.filterPlants('${category}')">
                        <span class="category-icon">${window.getCategoryIcon(category)}</span>
                        <span class="category-name">${window.getCategoryName(category)}</span>
                        <span class="category-count">0</span>
                    </button>
                `).join('')}
            </div>
            
            <div class="planting-search">
                <div class="search-wrapper">
                    <input type="text" class="plant-search-input" placeholder="Cari tanaman..." oninput="window.searchPlants(this.value)">
                    <span class="search-icon">🔍</span>
                </div>
            </div>
            
            <div class="planting-grid" id="planting-grid">
                ${plants.map(([plantId, plant]) => {
                    const isUnlocked = window.gameState.plantsUnlocked.has(plantId);
                    const canAfford = window.gameState.coins >= plant.seedPrice;
                    
                    return `
                        <div class="plant-card ${!isUnlocked ? 'locked' : ''} ${!canAfford ? 'cannot-afford' : ''}" 
                             data-plant-id="${plantId}" 
                             data-category="${plant.category}"
                             onclick="window.selectPlant('${plantId}')">
                            <div class="plant-card-header">
                                <div class="plant-icon">${plant.icon}</div>
                                <div class="plant-status">
                                    ${isUnlocked ? '<span class="status-unlocked">✅</span>' : '<span class="status-locked">🔒</span>'}
                                </div>
                            </div>
                            
                            <div class="plant-card-body">
                                <div class="plant-name">${plant.name}</div>
                                <div class="plant-info">
                                    <span class="plant-price">${window.formatNumber(plant.seedPrice)} 🪙</span>
                                    <span class="plant-time">⏱️ ${plant.growthTime}h</span>
                                </div>
                                <div class="plant-stats">
                                    <div class="stat-item">
                                        <span class="stat-label">Hasil:</span>
                                        <span class="stat-value">${plant.baseYield}kg</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Harga:</span>
                                        <span class="stat-value">${window.formatNumber(plant.sellPrice)} 🪙</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="plant-card-footer">
                                ${!isUnlocked ? 
                                    `<span class="unlock-requirement">🔓 Level ${plant.unlockLevel || 5}</span>` :
                                    canAfford ? 
                                        '<span class="plant-action">🌱 Tanam</span>' :
                                        '<span class="need-coins">💰 Kurang</span>'
                                }
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            
            <div class="planting-options">
                <div class="option-section">
                    <h4 class="option-title">🌿 Pupuk</h4>
                    <select class="option-select" id="fertilizer-select">
                        ${Object.entries(window.FERTILIZERS || {}).map(([id, fert]) => `
                            <option value="${id}">${fert.icon} ${fert.name} (+${(fert.yieldMult - 1) * 100}% hasil)</option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="option-section">
                    <h4 class="option-title">💧 Level Air</h4>
                    <div class="water-slider">
                        <input type="range" id="water-level" min="1" max="5" value="3" class="water-input">
                        <div class="water-display">
                            <span class="water-value">3</span>
                            <span class="water-label">Sedang</span>
                        </div>
                    </div>
                </div>
                
                <div class="option-section">
                    <h4 class="option-title">👨‍🌾 Metode</h4>
                    <select class="option-select" id="method-select">
                        ${Object.entries(window.METHODS || {}).map(([id, method]) => `
                            <option value="${id}">${method.icon} ${method.name} (+${(method.yieldMult - 1) * 100}% hasil)</option>
                        `).join('')}
                    </select>
                </div>
            </div>
            
            <div class="planting-actions">
                <button class="action-btn cancel-btn" onclick="window.closeModal()">
                    <span class="btn-icon">❌</span>
                    <span class="btn-text">Batal</span>
                </button>
                <button class="action-btn confirm-btn" onclick="window.confirmPlanting()" id="confirm-planting" disabled>
                    <span class="btn-icon">✅</span>
                    <span class="btn-text">Tanam Sekarang</span>
                </button>
            </div>
        </div>
    `;
    
    window.showModal('Pilih Tanaman untuk Ditanam', modalHTML);
    
    // Initialize plant selection
    window.updatePlantCounts();
    window.initializeWaterSlider();
};

// Enhanced Plant Filtering
window.filterPlants = function(category) {
    console.log('Filtering plants by category:', category);
    
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
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

// Enhanced Plant Search
window.searchPlants = function(query) {
    console.log('Searching plants:', query);
    
    const allPlants = document.querySelectorAll('.plant-card');
    const searchTerm = query.toLowerCase();
    
    allPlants.forEach(plant => {
        const plantName = plant.querySelector('.plant-name').textContent.toLowerCase();
        const plantId = plant.dataset.plantId;
        
        if (plantName.includes(searchTerm) || plantId.includes(searchTerm)) {
            plant.style.display = 'block';
            setTimeout(() => plant.classList.add('plant-visible'), 50);
        } else {
            plant.classList.remove('plant-visible');
            setTimeout(() => plant.style.display = 'none', 300);
        }
    });
    
    window.updatePlantCounts();
};

// Update Plant Counts
window.updatePlantCounts = function() {
    document.querySelectorAll('.category-btn').forEach(btn => {
        const category = btn.dataset.category;
        const visiblePlants = document.querySelectorAll(`.plant-card[data-category="${category}"]:not([style*="display: none"])`);
        btn.querySelector('.category-count').textContent = visiblePlants.length;
    });
};

// Initialize Water Slider
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

// Enhanced Plant Selection
window.selectPlant = function(plantId) {
    console.log('Selecting plant:', plantId);
    
    // Check if plant is unlocked and affordable
    const plant = window.PLANTS[plantId];
    if (!window.gameState.plantsUnlocked.has(plantId)) {
        window.showToast('error', `🔒 Tanaman ini terkunci! Level ${plant.unlockLevel || 5} diperlukan.`);
        return;
    }
    
    if (window.gameState.coins < plant.seedPrice) {
        window.showToast('error', `💰 Coins tidak cukup! Butuh ${window.formatNumber(plant.seedPrice - window.gameState.coins)} coins lagi.`);
        return;
    }
    
    // Remove previous selection
    document.querySelectorAll('.plant-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to current plant
    const selectedCard = document.querySelector(`[data-plant-id="${plantId}"]`);
    selectedCard.classList.add('selected');
    
    // Store selected plant
    window.sessionState.selectedPlant = plantId;
    
    // Enable confirm button
    const confirmBtn = document.getElementById('confirm-planting');
    if (confirmBtn) {
        confirmBtn.disabled = false;
        confirmBtn.innerHTML = `
            <span class="btn-icon">🌱</span>
            <span class="btn-text">Tanam ${plant.name} - ${window.formatNumber(plant.seedPrice)} 🪙</span>
        `;
    }
};

// Enhanced Confirm Planting
window.confirmPlanting = function() {
    if (!window.sessionState.selectedPlant || window.sessionState.selectedPlotIndex === null) {
        window.showToast('error', '❌ Pilih tanaman terlebih dahulu!');
        return;
    }
    
    const plant = window.PLANTS[window.sessionState.selectedPlant];
    const fertilizer = document.getElementById('fertilizer-select').value;
    const waterLevel = parseInt(document.getElementById('water-level').value);
    const method = document.getElementById('method-select').value;
    
    // Calculate total cost
    const fertilizerCost = window.FERTILIZERS[fertilizer].price;
    const totalCost = plant.seedPrice + fertilizerCost;
    
    if (window.gameState.coins < totalCost) {
        window.showToast('error', `💰 Coins tidak cukup! Butuh ${window.formatNumber(totalCost - window.gameState.coins)} coins lagi.`);
        return;
    }
    
    // Plant the crop
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
    window.gameState.totalPlanted++;
    window.gameState.xp += plant.xp || 10;
    
    // Check for new plant unlocks
    window.checkPlantUnlocks();
    
    // Save and update
    if (window.saveGameState) window.saveGameState();
    if (window.updateUI) window.updateUI();
    if (window.renderPlots) window.renderPlots();
    
    window.showToast('success', `🌱 ${plant.name} berhasil ditanam!`);
    window.closeModal();
};

// Check Plant Unlocks
window.checkPlantUnlocks = function() {
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
                if (window.PLANTS[plantId] && !window.gameState.plantsUnlocked.has(plantId)) {
                    window.gameState.plantsUnlocked.add(plantId);
                    window.showToast('success', `🎉 ${window.PLANTS[plantId].name} terbuka!`);
                }
            });
        }
    });
};

// Enhanced Error Handling - Prevent Toast Spam
let errorToastCount = 0;
const MAX_ERROR_TOASTS = 3;

// Override console.error to prevent spam
const originalConsoleError = console.error;
console.error = function(...args) {
    originalConsoleError.apply(console, args);
    
    // Only show toast for real errors, not for expected ones
    const message = args[0] || '';
    if (message.includes('Error') || message.includes('undefined') || message.includes('null')) {
        if (errorToastCount < MAX_ERROR_TOASTS) {
            if (window.showToast) {
                window.showToast('error', '⚠️ Terjadi kesalahan sistem');
            }
            errorToastCount++;
        }
    }
};

// Reset error counter after 10 seconds
setInterval(() => {
    errorToastCount = 0;
}, 10000);

// Enhanced Category Functions
window.getCategoryIcon = function(category) {
    const icons = {
        'sayuran': '🥬',
        'buah': '🍎',
        'tanaman-obat': '🌿',
        'bunga': '🌸'
    };
    return icons[category] || '🌱';
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
window.filterPlants = filterPlants;
window.searchPlants = searchPlants;
window.selectPlant = selectPlant;
window.confirmPlanting = confirmPlanting;
window.openPlantingModal = openPlantingModal;
