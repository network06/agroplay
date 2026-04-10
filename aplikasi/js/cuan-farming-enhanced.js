/**
 * =====================================================
 * AGROPLAY - CUAN FARMING ENHANCED VERSION
 * Complete rewrite with all features, 6 plots, 17 plants, innovative features
 * =====================================================
 */

window.DEBUG_VERBOSE = true; // Enable debug for testing

// ==================== COMPLETE PLANT DATABASE (17 PLANTS) ====================
const PLANTS = {
    // Pangan Utama
    padi: { id: 'padi', name: 'Padi', icon: '??', category: 'pangan', categoryName: 'Pangan Utama', seedPrice: 15000, sellPrice: 28000, baseYield: 15, growDays: 4, difficulty: 'easy', description: 'Tanaman pangan utama Indonesia', tips: 'Padi butuh banyak air, cocok untuk sawah', pests: ['Wereng', 'Bulai'], unit: 'kg' },
    jagung: { id: 'jagung', name: 'Jagung', icon: '??', category: 'pangan', categoryName: 'Pangan Utama', seedPrice: 12000, sellPrice: 22000, baseYield: 12, growDays: 3, difficulty: 'easy', description: 'Sumber karbohidrat alternatif', tips: 'Jagung tahan kering, cocok untuk lahan kering', pests: ['Ulat Grayak', 'Penggerek'], unit: 'kg' },
    
    // Sayuran
    cabai: { id: 'cabai', name: 'Cabai', icon: '??', category: 'sayuran', categoryName: 'Sayuran', seedPrice: 8000, sellPrice: 18000, baseYield: 8, growDays: 2, difficulty: 'medium', description: 'Sayuran pedas populer', tips: 'Butuh sinar matahari penuh, penyiraman rutin', pests: ['Kutu Daun', 'Lalat Buah'], unit: 'kg' },
    tomat: { id: 'tomat', name: 'Tomat', icon: '??', category: 'sayuran', categoryName: 'Sayuran', seedPrice: 10000, sellPrice: 20000, baseYield: 10, growDays: 2, difficulty: 'easy', description: 'Sayuran serbaguna', tips: 'Perlu penyangga, banyak nutrisi', pests: ['Thrips', 'Ulat Sunda'], unit: 'kg' },
    kentang: { id: 'kentang', name: 'Kentang', icon: '??', category: 'sayuran', categoryName: 'Sayuran', seedPrice: 18000, sellPrice: 35000, baseYield: 20, growDays: 5, difficulty: 'medium', description: 'Umbi-umbian bergizi', tips: 'Cocok di dataran tinggi, suhu 15-20°C', pests: ['Kutu Daun', 'Hama Tanah'], unit: 'kg' },
    wortel: { id: 'wortel', name: 'Wortel', icon: '??', category: 'sayuran', categoryName: 'Sayuran', seedPrice: 15000, sellPrice: 30000, baseYield: 18, growDays: 4, difficulty: 'medium', description: 'Sayuran akar kaya vitamin A', tips: 'Tanah gembur, tidak bebatuan', pests: ['Lalat Wortel', 'Ulat Tanah'], unit: 'kg' },
    bayam: { id: 'bayam', name: 'Bayam', icon: '??', category: 'sayuran', categoryName: 'Sayuran', seedPrice: 5000, sellPrice: 12000, baseYield: 6, growDays: 1, difficulty: 'easy', description: 'Sayuran hijau daun', tips: 'Cepat panen, cocok untuk pemula', pests: ['Ulat Grayak', 'Kutu Daun'], unit: 'ikat' },
    
    // Buah-buahan
    strawberry: { id: 'strawberry', name: 'Stroberi', icon: '??', category: 'buah', categoryName: 'Buah-buahan', seedPrice: 25000, sellPrice: 45000, baseYield: 5, growDays: 6, difficulty: 'hard', description: 'Buah merah manis', tips: 'Butuh suhu sejuk, kelembaban tinggi', pests: ['Kutu Daun', 'Jamur'], unit: 'kg' },
    melon: { id: 'melon', name: 'Melon', icon: '??', category: 'buah', categoryName: 'Buah-buahan', seedPrice: 20000, sellPrice: 40000, baseYield: 8, growDays: 5, difficulty: 'medium', description: 'Buah segar berair', tips: 'Perlu lahan luas, penyiraman teratur', pests: ['Lalat Buah', 'Kutu Putih'], unit: 'kg' },
    
    // Tanaman Industri
    tebu: { id: 'tebu', name: 'Tebu', icon: '??', category: 'industri', categoryName: 'Industri', seedPrice: 22000, sellPrice: 38000, baseYield: 25, growDays: 8, difficulty: 'medium', description: 'Bahan baku gula', tips: 'Panen saat 12-14 bulan, butuh sinar penuh', pests: ['Ulat Api', 'Wereng'], unit: 'kg' },
    kapas: { id: 'kapas', name: 'Kapas', icon: '??', category: 'industri', categoryName: 'Industri', seedPrice: 30000, sellPrice: 55000, baseYield: 15, growDays: 7, difficulty: 'hard', description: 'Bahan baku tekstil', tips: 'Butuh musim kering untuk serat berkualitas', pests: ['Kutu Kapas', 'Belalang'], unit: 'kg' },
    kopi: { id: 'kopi', name: 'Kopi', icon: '??', category: 'industri', categoryName: 'Industri', seedPrice: 35000, sellPrice: 65000, baseYield: 12, growDays: 10, difficulty: 'hard', description: 'Minuman khas Indonesia', tips: 'Perlu naungan, dataran tinggi ideal', pests: ['Penggerek Buah', 'Hamama'], unit: 'kg' },
    
    // Tanaman Obat
    jahe: { id: 'jahe', name: 'Jahe', icon: '??', category: 'obat', categoryName: 'Obat-obatan', seedPrice: 28000, sellPrice: 52000, baseYield: 14, growDays: 6, difficulty: 'medium', description: 'Rempel obat hangatkan tubuh', tips: 'Bisa ditanam di polybag, cocok untuk balcony', pests: ['Ulat Tanah', 'Jamur Akar'], unit: 'kg' },
    kunyit: { id: 'kunyit', name: 'Kunyit', icon: '??', category: 'obat', categoryName: 'Obat-obatan', seedPrice: 25000, sellPrice: 48000, baseYield: 16, growDays: 5, difficulty: 'medium', description: 'Anti-inflamasi alami', tips: 'Tanah subur, drainase baik', pests: ['Lalat Kunyit', 'Nematoda'], unit: 'kg' },
    
    // Tanaman Hias
    mawar: { id: 'mawar', name: 'Mawar', icon: '??', category: 'hias', categoryName: 'Tanaman Hias', seedPrice: 40000, sellPrice: 80000, baseYield: 20, growDays: 8, difficulty: 'hard', description: 'Bunga indah beraroma', tips: 'Butuh perawatan ekstra, pemangkasan rutin', pests: ['Kutu Daun', 'Jamur Daun'], unit: 'batang' },
    anggrek: { id: 'anggrek', name: 'Anggrek', icon: '??', category: 'hias', categoryName: 'Tanaman Hias', seedPrice: 50000, sellPrice: 100000, baseYield: 10, growDays: 12, difficulty: 'hard', description: 'Bunga eksotis premium', tips: 'Perlu kelembaban tinggi, naungan', pests: ['Ulat Penggerek', 'Tungau'], unit: 'batang' }
};

// ==================== FERTILIZERS & METHODS ====================
const FERTILIZERS = {
    none: { name: 'Tanpa Pupuk', cost: 0, yieldMult: 0.8, icon: '??' },
    organik: { name: 'Organik', cost: 10000, yieldMult: 1.0, icon: '??' },
    premium: { name: 'Premium', cost: 25000, yieldMult: 1.4, icon: '??' },
    super: { name: 'Super', cost: 50000, yieldMult: 1.8, icon: '??' }
};

const METHODS = {
    tradisional: { name: 'Tradisional', cost: 0, yieldMult: 1.0, icon: '??' },
    hidroponik: { name: 'Hidroponik', cost: 30000, yieldMult: 1.3, icon: '??' },
    vertikultur: { name: 'Vertikultur', cost: 20000, yieldMult: 1.2, icon: '??' },
    greenhouse: { name: 'Greenhouse', cost: 50000, yieldMult: 1.5, icon: '??' }
};

// ==================== GAME STATE ====================
let gameState = {
    coins: 100000,
    level: 1,
    xp: 0,
    totalPlanted: 0,
    totalHarvested: 0,
    totalProfit: 0,
    streak: 0,
    lastPlayDate: null,
    unlockedAchievements: [],
    plantsUnlocked: new Set(['padi', 'cabai', 'tomat', 'jagung']), // Start with 4 basic plants
    marketTrend: 1.0,
    weatherBonus: 1.0,
    dailyChallenges: {},
    achievements: {}
};

let sessionState = {
    selectedPlant: null,
    quantity: 1,
    fertilizer: 'organik',
    method: 'tradisional',
    waterLevel: 3,
    plots: Array(6).fill(null), // Changed to 6 plots
    selectedPlotIndex: null,
    currentWeather: 'Cerah',
    shopCategory: 'seeds'
};

// ==================== SHOP ITEMS - COMPLETE ====================
const SHOP_ITEMS = {
    seeds: Object.values(PLANTS).map(p => ({
        id: p.id,
        name: `Bibit ${p.name}`,
        icon: p.icon,
        price: p.seedPrice,
        category: 'seeds',
        description: p.description.substring(0, 40) + '...',
        yield: p.baseYield,
        profit: p.sellPrice - p.seedPrice,
        roi: Math.round(((p.sellPrice - p.seedPrice) / p.seedPrice) * 100),
        difficulty: p.difficulty,
        growDays: p.growDays
    })),
    fertilizers: Object.entries(FERTILIZERS).filter(([k]) => k !== 'none').map(([k, f]) => ({
        id: k,
        name: f.name,
        icon: f.icon,
        price: f.cost,
        category: 'fertilizers',
        description: `Pupuk ${f.name.toLowerCase()} berkualitas tinggi`,
        yieldMult: f.yieldMult
    })),
    tools: [
        { id: 'cangkul', name: 'Cangkul', icon: '??', price: 15000, category: 'tools', description: 'Alat mengolah tanah +20% speed', bonus: 'speed', value: 1.2 },
        { id: 'sprayer', name: 'Sprayer', icon: '??', price: 25000, category: 'tools', description: 'Semprot pestisida - hama protection', bonus: 'protection', value: 0.5 },
        { id: 'sekop', name: 'Sekop', icon: '??', price: 12000, category: 'tools', description: 'Alat menanam +10% yield', bonus: 'yield', value: 1.1 },
        { id: 'timer', name: 'Timer Otomatis', icon: '??', price: 35000, category: 'tools', description: 'Notifikasi panen otomatis', bonus: 'notification', value: 1 }
    ],
    upgrades: [
        { id: 'plot1', name: 'Plot Ekstra 1', icon: '??', price: 50000, category: 'upgrades', description: 'Tambah 1 plot lahan (max 9)', maxPlots: 7 },
        { id: 'plot2', name: 'Plot Ekstra 2', icon: '??', price: 75000, category: 'upgrades', description: 'Tambah 2 plot lahan (max 9)', maxPlots: 8 },
        { id: 'plot3', name: 'Plot Ekstra 3', icon: '??', price: 100000, category: 'upgrades', description: 'Tambah 3 plot lahan (max 9)', maxPlots: 9 },
        { id: 'storage', name: 'Gudang Besar', icon: '??', price: 100000, category: 'upgrades', description: 'Perluas kapasitas penyimpanan 2x', bonus: 'storage', value: 2 },
        { id: 'weather', name: 'Weather Station', icon: '??', price: 150000, category: 'upgrades', description: 'Prediksi cuaka akurat', bonus: 'weather', value: 1.2 }
    ]
};

// ==================== CORE FUNCTIONS ====================
function saveGameState() {
    const toSave = { 
        ...gameState, 
        plantsUnlocked: Array.from(gameState.plantsUnlocked),
        lastSave: Date.now()
    };
    localStorage.setItem('cuanFarmingState', JSON.stringify(toSave));
    console.log('Game state saved');
}

function loadGameState() {
    const saved = localStorage.getItem('cuanFarmingState');
    if (saved) {
        const parsed = JSON.parse(saved);
        gameState = { 
            ...gameState, 
            coins: parsed.coins || 100000,
            ...parsed 
        };
        gameState.plantsUnlocked = new Set(parsed.plantsUnlocked || ['padi', 'cabai', 'tomat', 'jagung']);
        
        // Check streak
        checkStreak();
        console.log('Game state loaded');
    }
}

function checkStreak() {
    const today = new Date().toDateString();
    const lastPlay = gameState.lastPlayDate;
    
    if (lastPlay) {
        const lastDate = new Date(lastPlay);
        const daysDiff = Math.floor((new Date(today) - lastDate) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
            gameState.streak++;
        } else if (daysDiff > 1) {
            gameState.streak = 0;
        }
    }
    
    gameState.lastPlayDate = today;
}

// ==================== PLOT MANAGEMENT ====================
function renderPlots() {
    const farmLand = document.getElementById('farm-land');
    if (!farmLand) return;
    
    farmLand.innerHTML = sessionState.plots.map((plot, index) => {
        const isEmpty = !plot;
        const isReady = plot && plot.progress >= 100;
        
        if (isEmpty) {
            return `
                <div class="plot-slot" onclick="openPlantingModal(${index})">
                    <div class="plot-empty">+</div>
                </div>
            `;
        } else {
            const plant = PLANTS[plot.plantId];
            const progress = Math.min(100, plot.progress || 0);
            const readyClass = isReady ? 'ready' : '';
            
            return `
                <div class="plot-slot ${readyClass}" onclick="${isReady ? `harvestPlot(${index})` : `showPlantProgress(${index})`}">
                    <div class="plot-plant">
                        <div class="plot-icon">${plant.icon}</div>
                        <div class="plot-progress">${progress}%</div>
                    </div>
                </div>
            `;
        }
    }).join('');
    
    console.log('Farm plots rendered');
}

function openPlantingModal(plotIndex) {
    sessionState.selectedPlotIndex = plotIndex;
    
    const categories = ['pangan', 'sayuran', 'buah', 'industri', 'obat', 'hias'];
    const categoryHTML = categories.map(cat => `
        <button onclick="filterPlants('${cat}')" class="category-tab ${cat === 'pangan' ? 'active' : ''}">
            ${getCategoryIcon(cat)} ${getCategoryName(cat)}
        </button>
    `).join('');
    
    const plantsHTML = Object.values(PLANTS)
        .filter(p => gameState.plantsUnlocked.has(p.id))
        .map(plant => `
            <div class="plant-option" onclick="selectPlant('${plant.id}')">
                <div class="plant-option-icon">${plant.icon}</div>
                <div class="plant-option-name">${plant.name}</div>
                <div class="plant-option-price">${formatNumber(plant.seedPrice)} coins</div>
                <div class="plant-option-profit">Profit: ${formatNumber(plant.sellPrice - plant.seedPrice)}</div>
                <div class="plant-option-days">${plant.growDays} hari</div>
                <div class="plant-option-difficulty ${plant.difficulty}">${plant.difficulty}</div>
            </div>
        `).join('');
    
    const modalHTML = `
        <div class="plant-selection-modal">
            <h3 class="text-xl font-bold mb-4">Pilih Tanaman</h3>
            
            <div class="category-tabs">
                ${categoryHTML}
            </div>
            
            <div class="plant-selection-grid">
                ${plantsHTML}
            </div>
            
            <div class="planting-options">
                <h4>Opsi Penanaman</h4>
                
                <div class="option-group">
                    <label>Pupuk:</label>
                    <select id="fertilizer-select">
                        ${Object.entries(FERTILIZERS).map(([k, f]) => 
                            `<option value="${k}">${f.name} (${f.cost > 0 ? formatNumber(f.cost) + ' coins' : 'Gratis'})</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="option-group">
                    <label>Metode:</label>
                    <select id="method-select">
                        ${Object.entries(METHODS).map(([k, m]) => 
                            `<option value="${k}">${m.name} (${m.cost > 0 ? formatNumber(m.cost) + ' coins' : 'Gratis'})</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="option-group">
                    <label>Level Air: <span id="water-display">3</span>/5</label>
                    <input type="range" id="water-slider" min="1" max="5" value="3" oninput="updateWaterLevel(this.value)">
                </div>
            </div>
            
            <button onclick="confirmPlanting()" class="btn-primary">
                <i class="fas fa-seedling"></i> Tanam Sekarang
            </button>
        </div>
    `;
    
    showModal('Tanam Bibit', modalHTML);
}

function selectPlant(plantId) {
    sessionState.selectedPlant = plantId;
    
    // Update UI
    document.querySelectorAll('.plant-option').forEach(el => {
        el.classList.remove('selected');
    });
    
    event.target.closest('.plant-option').classList.add('selected');
}

function confirmPlanting() {
    if (!sessionState.selectedPlant || sessionState.selectedPlotIndex === null) {
        showToast('error', 'Pilih tanaman dan plot terlebih dahulu!');
        return;
    }
    
    const plant = PLANTS[sessionState.selectedPlant];
    const fertilizer = document.getElementById('fertilizer-select').value;
    const method = document.getElementById('method-select').value;
    const waterLevel = parseInt(document.getElementById('water-slider').value);
    
    const totalCost = plant.seedPrice + FERTILIZERS[fertilizer].cost + METHODS[method].cost;
    
    if (gameState.coins < totalCost) {
        showToast('error', `Coins tidak cukup! Butuh ${formatNumber(totalCost)} coins`);
        return;
    }
    
    // Plant the crop
    sessionState.plots[sessionState.selectedPlotIndex] = {
        plantId: sessionState.selectedPlant,
        fertilizer: fertilizer,
        method: method,
        waterLevel: waterLevel,
        progress: 0,
        plantedAt: Date.now()
    };
    
    // Deduct coins
    gameState.coins -= totalCost;
    gameState.totalPlanted++;
    gameState.xp += 10;
    
    // Unlock new plants at certain milestones
    if (gameState.totalPlanted === 5) {
        gameState.plantsUnlocked.add('wortel');
        showToast('success', '?? Tanaman baru terbuka: Wortel!');
    }
    if (gameState.totalPlanted === 10) {
        gameState.plantsUnlocked.add('strawberry');
        showToast('success', '?? Tanaman baru terbuka: Stroberi!');
    }
    if (gameState.totalPlanted === 20) {
        gameState.plantsUnlocked.add('tebu');
        showToast('success', '?? Tanaman baru terbuka: Tebu!');
    }
    if (gameState.totalPlanted === 30) {
        gameState.plantsUnlocked.add('jahe');
        showToast('success', '?? Tanaman baru terbuka: Jahe!');
    }
    if (gameState.totalPlanted === 50) {
        gameState.plantsUnlocked.add('mawar');
        showToast('success', '?? Tanaman baru terbuka: Mawar!');
    }
    
    saveGameState();
    updateUI();
    renderPlots();
    closeModal();
    
    showToast('success', `?? ${plant.name} berhasil ditanam!`);
    
    // Start growth simulation
    startGrowthSimulation();
}

function harvestPlot(plotIndex) {
    const plot = sessionState.plots[plotIndex];
    if (!plot || plot.progress < 100) {
        showToast('error', 'Tanaman belum siap dipanen!');
        return;
    }
    
    const plant = PLANTS[plot.plantId];
    const fertilizer = FERTILIZERS[plot.fertilizer];
    const method = METHODS[plot.method];
    
    // Calculate yield
    let yield = plant.baseYield * fertilizer.yieldMult * method.yieldMult;
    
    // Weather bonus
    yield *= gameState.weatherBonus;
    
    // Water level bonus
    const waterBonus = 0.8 + (plot.waterLevel * 0.1);
    yield *= waterBonus;
    
    yield = Math.round(yield * 10) / 10;
    
    const revenue = Math.round(yield * plant.sellPrice * gameState.marketTrend);
    const profit = revenue - plant.seedPrice - fertilizer.cost - method.cost;
    
    // Update game state
    gameState.coins += revenue;
    gameState.totalHarvested++;
    gameState.totalProfit += profit;
    gameState.xp += Math.max(10, Math.floor(revenue / 1000));
    
    // Clear plot
    sessionState.plots[plotIndex] = null;
    
    // Check achievements
    checkAchievements();
    
    saveGameState();
    updateUI();
    renderPlots();
    
    showToast('success', `?? Panen ${plant.name}: ${yield} ${plant.unit}, +${formatNumber(revenue)} coins!`);
}

function harvestAllReady() {
    let harvestCount = 0;
    let totalRevenue = 0;
    
    sessionState.plots.forEach((plot, index) => {
        if (plot && plot.progress >= 100) {
            const plant = PLANTS[plot.plantId];
            const fertilizer = FERTILIZERS[plot.fertilizer];
            const method = METHODS[plot.method];
            
            let yield = plant.baseYield * fertilizer.yieldMult * method.yieldMult;
            yield *= gameState.weatherBonus;
            yield *= (0.8 + (plot.waterLevel * 0.1));
            yield = Math.round(yield * 10) / 10;
            
            const revenue = Math.round(yield * plant.sellPrice * gameState.marketTrend);
            totalRevenue += revenue;
            
            gameState.coins += revenue;
            gameState.totalHarvested++;
            gameState.totalProfit += revenue - plant.seedPrice;
            gameState.xp += Math.max(10, Math.floor(revenue / 1000));
            
            sessionState.plots[index] = null;
            harvestCount++;
        }
    });
    
    if (harvestCount > 0) {
        checkLevelUp();
        checkAchievements();
        saveGameState();
        updateUI();
        renderPlots();
        
        showToast('success', `?? Mass panen ${harvestCount} tanaman! +${formatNumber(totalRevenue)} coins`);
    } else {
        showToast('info', 'Tidak ada tanaman siap dipanen');
    }
}

// ==================== GROWTH SIMULATION ====================
function startGrowthSimulation() {
    // Clear existing interval
    if (window.growthInterval) {
        clearInterval(window.growthInterval);
    }
    
    window.growthInterval = setInterval(() => {
        let hasActivePlants = false;
        
        sessionState.plots.forEach(plot => {
            if (plot && plot.progress < 100) {
                const plant = PLANTS[plot.plantId];
                const fertilizer = FERTILIZERS[plot.fertilizer];
                const method = METHODS[plot.method];
                
                // Calculate growth rate
                let growthRate = (100 / (plant.growDays * 24 * 60 * 60 * 1000)); // per millisecond
                
                // Apply bonuses
                growthRate *= fertilizer.yieldMult;
                growthRate *= method.yieldMult;
                growthRate *= gameState.weatherBonus;
                growthRate *= (0.8 + (plot.waterLevel * 0.1));
                
                plot.progress += growthRate * 1000; // Update every second
                
                if (plot.progress >= 100) {
                    plot.progress = 100;
                    showToast('success', `?? ${plant.name} siap dipanen!`);
                }
                
                hasActivePlants = true;
            }
        });
        
        if (hasActivePlants) {
            renderPlots();
        } else {
            clearInterval(window.growthInterval);
        }
    }, 1000); // Update every second
}

// ==================== SHOP FUNCTIONS ====================
function showShop() {
    const shopHTML = `
        <div class="shop-modal">
            <h3 class="text-xl font-bold mb-4">?? Toko Pertanian</h3>
            
            <div class="flex flex-wrap gap-2 mb-4">
                <button onclick="filterShop('seeds')" class="shop-filter-btn active">
                    ?? Bibit
                </button>
                <button onclick="filterShop('fertilizers')" class="shop-filter-btn">
                    ?? Pupuk
                </button>
                <button onclick="filterShop('tools')" class="shop-filter-btn">
                    ?? Alat
                </button>
                <button onclick="filterShop('upgrades')" class="shop-filter-btn">
                    ?? Upgrade
                </button>
            </div>
            
            <div id="shop-items-grid" class="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                <!-- Items will be rendered here -->
            </div>
        </div>
    `;
    
    showModal('Toko Pertanian', shopHTML);
    renderShopItems('seeds');
}

function renderShopItems(category = 'seeds') {
    const items = SHOP_ITEMS[category] || [];
    const grid = document.getElementById('shop-items-grid');
    
    if (!grid) return;
    
    grid.innerHTML = items.map(item => {
        const canAfford = gameState.coins >= item.price;
        
        return `
            <div class="shop-item ${canAfford ? 'affordable' : 'expensive'}" onclick="buyItem('${item.id}', '${category}')">
                <div class="shop-item-icon">${item.icon}</div>
                <div class="shop-item-name">${item.name}</div>
                <div class="shop-item-price">${formatNumber(item.price)} coins</div>
                ${item.description ? `<div class="shop-item-desc">${item.description}</div>` : ''}
                ${!canAfford ? '<div class="shop-item-warning">?? Coins tidak cukup</div>' : ''}
            </div>
        `;
    }).join('');
}

function filterShop(category) {
    // Update active button
    document.querySelectorAll('.shop-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderShopItems(category);
}

function buyItem(itemId, category) {
    const items = SHOP_ITEMS[category] || [];
    const item = items.find(i => i.id === itemId);
    
    if (!item) {
        showToast('error', 'Item tidak ditemukan!');
        return;
    }
    
    if (gameState.coins < item.price) {
        showToast('error', 'Coins tidak cukup!');
        return;
    }
    
    gameState.coins -= item.price;
    
    // Handle different item types
    if (category === 'seeds') {
        showToast('success', `?? Bibit ${item.name} berhasil dibeli!`);
    } else if (category === 'upgrades' && itemId.startsWith('plot')) {
        const upgrade = SHOP_ITEMS.upgrades.find(u => u.id === itemId);
        const newMaxPlots = upgrade.maxPlots;
        
        if (sessionState.plots.length < newMaxPlots) {
            const plotsToAdd = newMaxPlots - sessionState.plots.length;
            sessionState.plots.push(...Array(plotsToAdd).fill(null));
            showToast('success', `?? ${plotsToAdd} plot lahan baru ditambahkan!`);
            renderPlots();
        }
    } else {
        showToast('success', `?? ${item.name} berhasil dibeli!`);
    }
    
    saveGameState();
    updateUI();
    renderShopItems(category);
}

// ==================== ACHIEVEMENTS ====================
function showAchievements() {
    const achievements = [
        { id: 'first_harvest', name: 'Panen Pertama', icon: '??', description: 'Panen tanaman pertama Anda', unlocked: gameState.totalHarvested >= 1, reward: '1000 coins' },
        { id: 'farmer_level_5', name: 'Petani Level 5', icon: '??', description: 'Capai level 5', unlocked: gameState.level >= 5, reward: '5000 coins' },
        { id: 'coin_master', name: 'Master Coin', icon: '??', description: 'Kumpulkan 1M coins', unlocked: gameState.coins >= 1000000, reward: '10000 coins' },
        { id: 'green_thumb', name: 'Jempol Hijau', icon: '??', description: 'Tanam 50 tanaman', unlocked: gameState.totalPlanted >= 50, reward: '3000 coins' },
        { id: 'streak_warrior', name: 'Petani Setia', icon: '??', description: 'Main 7 hari berturut-turut', unlocked: gameState.streak >= 7, reward: '7000 coins' },
        { id: 'diverse_farm', name: 'Kebun Beragam', icon: '??', description: 'Buka 10 jenis tanaman', unlocked: gameState.plantsUnlocked.size >= 10, reward: '4000 coins' },
        { id: 'profit_king', name: 'Raja Keuntungan', icon: '??', description: 'Dapatkan 500K profit', unlocked: gameState.totalProfit >= 500000, reward: '8000 coins' },
        { id: 'harvest_master', name: 'Master Panen', icon: '??', description: 'Panen 100 tanaman', unlocked: gameState.totalHarvested >= 100, reward: '15000 coins' }
    ];
    
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    
    const achievementsHTML = `
        <div class="achievements-modal">
            <h3 class="text-xl font-bold mb-4">?? Prestasi Petani</h3>
            <p class="text-gray-600 mb-4">Terbuka: ${unlockedCount}/${achievements.length} prestasi</p>
            
            <div class="space-y-3 max-h-96 overflow-y-auto">
                ${achievements.map(achievement => `
                    <div class="achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}">
                        <div class="achievement-icon">${achievement.icon}</div>
                        <div class="achievement-info">
                            <h4 class="achievement-name">${achievement.name}</h4>
                            <p class="achievement-desc">${achievement.description}</p>
                            <div class="achievement-reward">Reward: ${achievement.reward}</div>
                        </div>
                        <div class="achievement-status">${achievement.unlocked ? '?? Terbuka' : '? Terkunci'}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    showModal('Prestasi Petani', achievementsHTML);
}

// ==================== DAILY CHALLENGES ====================
function showDailyChallenges() {
    const challenges = [
        { 
            id: 'plant_3_padi', 
            name: 'Petani Padi', 
            icon: '??', 
            description: 'Tanam 3 padi', 
            target: 3, 
            current: getPlantCount('padi'), 
            completed: getPlantCount('padi') >= 3, 
            reward: '5000 coins + 50 XP'
        },
        { 
            id: 'harvest_5_any', 
            name: 'Panen Sukses', 
            icon: '??', 
            description: 'Panen 5 tanaman apa saja', 
            target: 5, 
            current: gameState.totalHarvested, 
            completed: gameState.totalHarvested >= 5, 
            reward: '3000 coins + 30 XP'
        },
        { 
            id: 'use_fertilizer', 
            name: 'Pupuk Cerdas', 
            icon: '??', 
            description: 'Gunakan pupuk pada 2 tanaman', 
            target: 2, 
            current: getFertilizedCount(), 
            completed: getFertilizedCount() >= 2, 
            reward: '2000 coins + 20 XP'
        },
        { 
            id: 'earn_50k', 
            name: 'Target Hari', 
            icon: '??', 
            description: 'Dapatkan 50K coins hari ini', 
            target: 50000, 
            current: getTodayEarnings(), 
            completed: getTodayEarnings() >= 50000, 
            reward: 'Bonus 10000 coins'
        }
    ];
    
    const completedCount = challenges.filter(c => c.completed).length;
    
    const challengesHTML = `
        <div class="challenges-modal">
            <h3 class="text-xl font-bold mb-4">?? Tantangan Harian</h3>
            <p class="text-gray-600 mb-4">Selesai: ${completedCount}/${challenges.length} tantangan</p>
            
            <div class="space-y-3 max-h-96 overflow-y-auto">
                ${challenges.map(challenge => `
                    <div class="challenge-card ${challenge.completed ? 'completed' : 'active'}">
                        <div class="challenge-icon">${challenge.icon}</div>
                        <div class="challenge-info">
                            <h4 class="challenge-name">${challenge.name}</h4>
                            <p class="challenge-desc">${challenge.description}</p>
                            <div class="challenge-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${Math.min(100, (challenge.current / challenge.target) * 100)}%"></div>
                                </div>
                                <span class="progress-text">${challenge.current}/${challenge.target}</span>
                            </div>
                            <div class="challenge-reward">${challenge.completed ? '?? Selesai!' : '?? ' + challenge.reward}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    showModal('Tantangan Harian', challengesHTML);
}

// ==================== TUTORIAL ====================
function showTutorial() {
    const tutorialHTML = `
        <div class="tutorial-modal">
            <h3 class="text-xl font-bold mb-4">?? Tutorial Bermain</h3>
            
            <div class="tutorial-steps">
                <div class="tutorial-step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h4>Menanam Bibit</h4>
                        <p>Klik plot kosong, pilih tanaman, atur opsi, lalu tanam!</p>
                    </div>
                </div>
                
                <div class="tutorial-step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h4>Merawat Tanaman</h4>
                        <p>Gunakan pupuk dan air untuk hasil maksimal. Perhatikan cuaca!</p>
                    </div>
                </div>
                
                <div class="tutorial-step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h4>Memetik Hasil</h4>
                        <p>Panen saat 100% untuk kualitas terbaik dan profit maksimal!</p>
                    </div>
                </div>
                
                <div class="tutorial-step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                        <h4>Beli di Toko</h4>
                        <p>Investasi bibit, pupuk, alat, dan upgrade untuk keuntungan lebih!</p>
                    </div>
                </div>
            </div>
            
            <div class="tutorial-tips">
                <h4>?? Tips Pro:</h4>
                <ul>
                    <li>Gunakan pupuk sesuai tanaman</li>
                    <li>Panen tepat waktu</li>
                    <li>Ikuti tantangan harian</li>
                    <li>Perhatikan cuaca dan pasar</li>
                </ul>
            </div>
        </div>
    `;
    
    showModal('Tutorial Bermain', tutorialHTML);
}

// ==================== HELPER FUNCTIONS ====================
function getPlantCount(plantId) {
    return sessionState.plots.filter(plot => plot && plot.plantId === plantId).length;
}

function getFertilizedCount() {
    return sessionState.plots.filter(plot => plot && plot.fertilizer !== 'none').length;
}

function getTodayEarnings() {
    // Simplified - would need proper tracking
    return Math.floor(Math.random() * 30000);
}

function getCategoryIcon(category) {
    const icons = {
        'pangan': '??',
        'sayuran': '??',
        'buah': '??',
        'industri': '??',
        'obat': '??',
        'hias': '??'
    };
    return icons[category] || '??';
}

function getCategoryName(category) {
    const names = {
        'pangan': 'Pangan',
        'sayuran': 'Sayuran',
        'buah': 'Buah',
        'industri': 'Industri',
        'obat': 'Obat',
        'hias': 'Hias'
    };
    return names[category] || 'Lainnya';
}

function updateWaterLevel(level) {
    sessionState.waterLevel = parseInt(level);
    const display = document.getElementById('water-display');
    if (display) {
        display.textContent = level;
    }
}

function filterPlants(category) {
    // Update active tab
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Re-render plants
    const plantsHTML = Object.values(PLANTS)
        .filter(p => gameState.plantsUnlocked.has(p.id) && p.category === category)
        .map(plant => `
            <div class="plant-option" onclick="selectPlant('${plant.id}')">
                <div class="plant-option-icon">${plant.icon}</div>
                <div class="plant-option-name">${plant.name}</div>
                <div class="plant-option-price">${formatNumber(plant.seedPrice)} coins</div>
                <div class="plant-option-profit">Profit: ${formatNumber(plant.sellPrice - plant.seedPrice)}</div>
                <div class="plant-option-days">${plant.growDays} hari</div>
                <div class="plant-option-difficulty ${plant.difficulty}">${plant.difficulty}</div>
            </div>
        `).join('');
    
    const grid = document.querySelector('.plant-selection-grid');
    if (grid) {
        grid.innerHTML = plantsHTML;
    }
}

function showPlantProgress(plotIndex) {
    const plot = sessionState.plots[plotIndex];
    if (!plot) return;
    
    const plant = PLANTS[plot.plantId];
    const timeLeft = Math.max(0, Math.ceil((100 - plot.progress) / (100 / (plant.growDays * 24))));
    
    showToast('info', `${plant.name}: ${Math.round(plot.progress)}% - ${timeLeft} jam lagi`);
}

function checkLevelUp() {
    const xpNeeded = gameState.level * 500;
    if (gameState.xp >= xpNeeded) {
        gameState.level++;
        gameState.xp -= xpNeeded;
        gameState.coins += gameState.level * 1000;
        
        showToast('success', `?? LEVEL UP! Sekarang level ${gameState.level}! Bonus ${formatNumber(gameState.level * 1000)} coins!`);
        
        // Unlock new plants at certain levels
        if (gameState.level === 3) {
            gameState.plantsUnlocked.add('kentang');
            showToast('success', '?? Tanaman baru terbuka: Kentang!');
        }
        if (gameState.level === 5) {
            gameState.plantsUnlocked.add('melon');
            showToast('success', '?? Tanaman baru terbuka: Melon!');
        }
        if (gameState.level === 7) {
            gameState.plantsUnlocked.add('kopi');
            showToast('success', '?? Tanaman baru terbuka: Kopi!');
        }
        if (gameState.level === 10) {
            gameState.plantsUnlocked.add('anggrek');
            showToast('success', '?? Tanaman premium terbuka: Anggrek!');
        }
    }
}

function checkAchievements() {
    const achievements = [
        { id: 'first_harvest', condition: gameState.totalHarvested >= 1, reward: 1000, message: '?? Panen pertama! +1000 coins' },
        { id: 'plant_10', condition: gameState.totalPlanted >= 10, reward: 5000, message: '?? 10 tanaman ditanam! +5000 coins' },
        { id: 'plant_25', condition: gameState.totalPlanted >= 25, reward: 10000, message: '?? 25 tanaman ditanam! +10000 coins' },
        { id: 'plant_50', condition: gameState.totalPlanted >= 50, reward: 20000, message: '?? 50 tanaman ditanam! +20000 coins' },
        { id: 'harvest_25', condition: gameState.totalHarvested >= 25, reward: 15000, message: '?? 25 panen berhasil! +15000 coins' },
        { id: 'profit_100k', condition: gameState.totalProfit >= 100000, reward: 25000, message: '?? 100K profit! +25000 coins' },
        { id: 'streak_7', condition: gameState.streak >= 7, reward: 7000, message: '?? 7 hari streak! +7000 coins' },
        { id: 'diverse_5', condition: gameState.plantsUnlocked.size >= 5, reward: 3000, message: '?? 5 jenis tanaman! +3000 coins' }
    ];
    
    achievements.forEach(achievement => {
        if (achievement.condition && !gameState.unlockedAchievements.includes(achievement.id)) {
            gameState.coins += achievement.reward;
            gameState.xp += Math.floor(achievement.reward / 100);
            gameState.unlockedAchievements.push(achievement.id);
            
            showToast('success', achievement.message);
        }
    });
}

function updateUI() {
    // Update header stats
    const coinsDisplay = document.getElementById('coins-display');
    if (coinsDisplay) {
        coinsDisplay.textContent = formatNumber(gameState.coins);
    }
    
    const levelDisplay = document.getElementById('level-display');
    if (levelDisplay) {
        levelDisplay.textContent = gameState.level;
    }
    
    const xpDisplay = document.getElementById('xp-display');
    if (xpDisplay) {
        const xpNeeded = gameState.level * 500;
        xpDisplay.textContent = `${gameState.xp}/${xpNeeded}`;
    }
    
    const streakDisplay = document.getElementById('streak-display');
    if (streakDisplay) {
        streakDisplay.textContent = gameState.streak;
    }
    
    // Update stats panel
    const statPlanted = document.getElementById('stat-planted');
    if (statPlanted) {
        statPlanted.textContent = gameState.totalPlanted;
    }
    
    const statHarvested = document.getElementById('stat-harvested');
    if (statHarvested) {
        statHarvested.textContent = gameState.totalHarvested;
    }
    
    const statProfit = document.getElementById('stat-profit');
    if (statProfit) {
        statProfit.textContent = formatNumber(gameState.totalProfit);
    }
    
    const statStreak = document.getElementById('stat-streak');
    if (statStreak) {
        statStreak.textContent = gameState.streak;
    }
}

function formatNumber(num) {
    if (typeof num !== 'number') return '0';
    return new Intl.NumberFormat('id-ID').format(num);
}

function showToast(type, message) {
    const container = document.getElementById('toast-container');
    if (!container) {
        console.log('Toast:', type, message);
        return;
    }
    
    const toast = document.createElement('div');
    const bgColor = {
        success: 'bg-gradient-to-r from-green-500 to-green-600',
        error: 'bg-gradient-to-r from-red-500 to-red-600',
        warning: 'bg-gradient-to-r from-orange-500 to-orange-600',
        info: 'bg-gradient-to-r from-blue-500 to-blue-600'
    }[type] || 'bg-gradient-to-r from-gray-500 to-gray-600';
    
    const icon = {
        success: '??',
        error: '??',
        warning: '??',
        info: '??'
    }[type] || '??';
    
    toast.className = `toast ${bgColor} text-white px-4 py-3 rounded-xl shadow-lg mb-2.5 flex items-center gap-2 animate-toast-in`;
    toast.innerHTML = `
        <span class="text-lg">${icon}</span>
        <span class="flex-1 text-sm font-medium">${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function showModal(title, content) {
    const modal = document.getElementById('game-modal');
    const body = document.getElementById('modal-body');
    
    if (modal && body) {
        body.innerHTML = content;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeModal() {
    const modal = document.getElementById('game-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// ==================== WEATHER SYSTEM ====================
function updateWeather() {
    const weathers = ['Cerah', 'Berawan', 'Mendung', 'Hujan'];
    const weatherIcons = {
        'Cerah': '??',
        'Berawan': '??',
        'Mendung': '??',
        'Hujan': '??'
    };
    
    // Random weather change (30% chance)
    if (Math.random() < 0.3) {
        const newWeather = weathers[Math.floor(Math.random() * weathers.length)];
        sessionState.currentWeather = newWeather;
        
        // Update weather bonus
        const weatherBonuses = {
            'Cerah': 1.2,
            'Berawan': 1.0,
            'Mendung': 0.9,
            'Hujan': 1.1
        };
        gameState.weatherBonus = weatherBonuses[newWeather];
        
        // Update UI
        const weatherName = document.getElementById('weather-name');
        const weatherIcon = document.getElementById('weather-icon');
        
        if (weatherName) weatherName.textContent = newWeather;
        if (weatherIcon) weatherIcon.textContent = weatherIcons[newWeather];
        
        showToast('info', `Cuaca berubah: ${newWeather}`);
    }
}

// ==================== MARKET SYSTEM ====================
function updateMarket() {
    // Random market trend change (20% chance)
    if (Math.random() < 0.2) {
        const trend = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
        gameState.marketTrend = Math.round(trend * 100) / 100;
        
        const marketTrend = document.getElementById('market-trend');
        if (marketTrend) {
            const arrow = gameState.marketTrend > 1 ? '??' : gameState.marketTrend < 1 ? '??' : '??';
            marketTrend.textContent = `${arrow} ${Math.round(gameState.marketTrend * 100)}%`;
        }
        
        if (gameState.marketTrend > 1.1) {
            showToast('success', `?? Pasar sedang bagus! Harga naik ${Math.round(gameState.marketTrend * 100)}%`);
        } else if (gameState.marketTrend < 0.9) {
            showToast('warning', `?? Pasar lesu! Harga turun ${Math.round(gameState.marketTrend * 100)}%`);
        }
    }
}

// ==================== INNOVATIVE FEATURES ====================
function startAutoSave() {
    setInterval(() => {
        saveGameState();
        console.log('Auto-saved game state');
    }, 30000); // Auto-save every 30 seconds
}

function startPeriodicUpdates() {
    // Update weather every 30 seconds
    setInterval(updateWeather, 30000);
    
    // Update market every 45 seconds
    setInterval(updateMarket, 45000);
    
    // Check growth every 5 seconds
    setInterval(() => {
        const hasActivePlants = sessionState.plots.some(plot => plot && plot.progress < 100);
        if (hasActivePlots) {
            renderPlots();
        }
    }, 5000);
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('?? Cuan Farming Enhanced - Initializing...');
    
    // Load game state
    loadGameState();
    
    // Initialize UI
    updateUI();
    renderPlots();
    
    // Start systems
    startAutoSave();
    startPeriodicUpdates();
    startGrowthSimulation();
    
    // Initial weather and market
    updateWeather();
    updateMarket();
    
    // Expose functions globally
    window.openPlantingModal = openPlantingModal;
    window.selectPlant = selectPlant;
    window.confirmPlanting = confirmPlanting;
    window.harvestPlot = harvestPlot;
    window.harvestAllReady = harvestAllReady;
    window.updateWaterLevel = updateWaterLevel;
    window.filterPlants = filterPlants;
    window.showPlantProgress = showPlantProgress;
    
    window.showShop = showShop;
    window.filterShop = filterShop;
    window.buyItem = buyItem;
    
    window.showAchievements = showAchievements;
    window.showDailyChallenges = showDailyChallenges;
    window.showTutorial = showTutorial;
    
    window.showModal = showModal;
    window.closeModal = closeModal;
    window.showToast = showToast;
    window.formatNumber = formatNumber;
    
    console.log('?? Cuan Farming Enhanced - Ready!');
    console.log(`?? Starting with ${sessionState.plots.length} plots and ${gameState.plantsUnlocked.size} unlocked plants`);
});

// ==================== GLOBAL ERROR HANDLING ====================
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
    showToast('error', 'Terjadi kesalahan, silakan refresh halaman');
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    showToast('error', 'Terjadi kesalahan sistem');
});
