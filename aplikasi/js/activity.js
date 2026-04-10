/**
 * AGROPLAY - Enhanced Activity/Tanam Yuk JavaScript
 * Updated with Smart Method Selection based on Plant Type
 * More Interactive & Child-Friendly Features
 * FIXED: Watering slider and confirmation button issues
 */

        // ====================
        // PLANT DATA WITH APPROPRIATE METHODS
        // ====================

        var TANAM_YUK_PLANTS = [
            // === PANGAN (3) - All should be planted in Lahan ===
            { 
                id: 'padi', 
                name: 'Padi', 
                icon: '🌾', 
                category: 'pangan', 
                intro: "Hai! Aku Pak Padi! Aku perlu ditanam di sawah!",
                suitableMethods: ['lahan'],
                description: "Padi tumbuh di sawah dengan air yang cukup."
            },
            { 
                id: 'jagung', 
                name: 'Jagung', 
                icon: '🌽', 
                category: 'pangan', 
                intro: "Hai! Aku Pak Jagung! Aku butuh tanah yang subur!",
                suitableMethods: ['lahan'],
                description: "Jagung membutuhkan sinar matahari penuh."
            },
            { 
                id: 'kentang', 
                name: 'Kentang', 
                icon: '🥔', 
                category: 'pangan', 
                intro: "Hai! Aku Pak Kentang! Tanam aku di tanah yang gembur!",
                suitableMethods: ['lahan'],
                description: "Kentang tumbuh di dalam tanah yang lembut."
            },
            
            // === INDUSTRI (4) - All should be planted in Lahan ===
            { 
                id: 'kelapasawit', 
                name: 'Kelapa Sawit', 
                icon: '🥥', 
                category: 'industri', 
                intro: "Hai! Aku Kelapa Sawit! Aku butuh lahan yang luas!",
                suitableMethods: ['lahan'],
                description: "Kelapa Sawit menghasilkan minyak."
            },
            { 
                id: 'karet', 
                name: 'Karet', 
                icon: '🌳', 
                category: 'industri', 
                intro: "Hai! Aku Pak Karet! Tanam aku di tanah yang subur!",
                suitableMethods: ['lahan'],
                description: "Karet menghasilkan getah untuk ban."
            },
            { 
                id: 'tebu', 
                name: 'Tebu', 
                icon: '🎋', 
                category: 'industri', 
                intro: "Hai! Aku Pak Tebu! Aku suka tanah yang lembab!",
                suitableMethods: ['lahan'],
                description: "Tebu menghasilkan gula."
            },
            { 
                id: 'kapas', 
                name: 'Kapas', 
                icon: '☁️', 
                category: 'industri', 
                intro: "Hai! Aku Pak Kapas! Aku butuh sinar matahari!",
                suitableMethods: ['lahan'],
                description: "Kapas digunakan untuk membuat kain."
            },
            
        // === OBAT (2) ===
            { 
                id: 'jahe', 
                name: 'Jahe', 
                icon: '🫚', 
                category: 'obat', 
                intro: "Hai! Aku Pak Jahe! Aku hangat dan sehat!",
                suitableMethods: ['vertikultur', 'lahan'],
                description: "Jahe untuk obat dan rempah."
            },
            { 
                id: 'kunyit', 
                name: 'Kunyit', 
                icon: '🧡', 
                category: 'obat', 
                intro: "Hai! Aku Pak Kunyit! Aku warna kuning cerah!",
                suitableMethods: ['vertikultur', 'lahan'],
                description: "Kunyit untuk obat dan pewarna."
            },
            
            // === HIAS (3) - Tanaman Hias ===
            { 
                id: 'mawar', 
                name: 'Mawar', 
                icon: '🌹', 
                category: 'hias', 
                intro: "Hai! Aku Mawar! Aku ratu bunga yang indah!",
                suitableMethods: ['tabulampot', 'lahan'],
                description: "Mawar adalah ratu bunga dengan aroma harum."
            },
            { 
                id: 'bougenville', 
                name: 'Bougenville', 
                icon: '💐', 
                category: 'hias', 
                intro: "Hai! Aku Bougenville! Aku warna-warni dan indah!",
                suitableMethods: ['tabulampot', 'lahan'],
                description: "Bougenville populer di Indonesia dengan bunga warna-warni."
            },
            { 
                id: 'sansevieria', 
                name: 'Lidah Mertua', 
                icon: '🌵', 
                category: 'hias', 
                intro: "Hai! Aku Lidah Mertua! Aku tahan lama dan menyerap racun!",
                suitableMethods: ['tabulampot'],
                description: "Tanaman indoor paling mudah perawatan."
            },
            
            // === SERAT (5) - Mix of methods ===
            { 
                id: 'sisal', 
                name: 'Sisal', 
                icon: '🌵', 
                category: 'serat', 
                intro: "Hai! Aku Pak Sisal! Aku kuat dan tahan lama!",
                suitableMethods: ['lahan'],
                description: "Sisal untuk tali dan anyaman."
            },
            { 
                id: 'melok', 
                name: 'Melok', 
                icon: '🌴', 
                category: 'serat', 
                intro: "Hai! Aku Melok! Aku tinggi dan elegan!",
                suitableMethods: ['tabulampot', 'lahan'],
                description: "Melok untuk anyaman tradisional."
            },
            { 
                id: 'rumputserat', 
                name: 'Rumput Serat', 
                icon: '🌾', 
                category: 'serat', 
                intro: "Hai! Aku Rumput Serat! Aku lembut tapi kuat!",
                suitableMethods: ['vertikultur', 'lahan'],
                description: "Rumput Serat untuk kerajinan."
            },
            { 
                id: 'altpalea', 
                name: 'Altpalea', 
                icon: '🍃', 
                category: 'serat', 
                intro: "Hai! Aku Altpalea! Aku unik dan menarik!",
                suitableMethods: ['vertikultur', 'tabulampot'],
                description: "Altpalea tanaman hias unik."
            },
            { 
                id: 'rumputodod', 
                name: 'Rumput Odod', 
                icon: '🌿', 
                category: 'serat', 
                intro: "Hai! Aku Rumput Odod! Aku hijau sepanjang tahun!",
                suitableMethods: ['vertikultur', 'tabulampot'],
                description: "Rumput Odod untuk pagar hidup."
            }
        ];

// ====================
// PLANTING METHODS (4 Methods)
// ====================

var PLANTING_METHODS = [
    { 
        id: 'hidroponik', 
        name: 'Hidroponik', 
        icon: '💧',
        color: '#2196F3',
        description: 'Tanaman di wadah air + nutrisi',
        media: ['Air Nutrisi', 'Rockwool', 'Clay Pebbles'],
        suitableFor: 'Tanaman yang butuh banyak air'
    },
    { 
        id: 'tabulampot', 
        name: 'Tabulampot', 
        icon: '🪴',
        color: '#8D6E63',
        description: 'Pot gantung hemat tempat',
        media: ['Tanah Subur', 'Kompos', 'Sekam'],
        suitableFor: 'Tanaman hias dan obat'
    },
    { 
        id: 'vertikultur', 
        name: 'Vertikultur', 
        icon: '📦',
        color: '#4CAF50',
        description: 'Rak vertikal hemat lahan',
        media: ['Rockwool', 'Pasir', 'Kompos'],
        suitableFor: 'Tanaman obat dan sayuran'
    },
    { 
        id: 'lahan', 
        name: 'Menanam di Lahan', 
        icon: '🌍',
        color: '#FF9800',
        description: 'Penanaan konvensional di tanah',
        media: ['Tanah Subur', 'Pupuk Kandang', 'Kompos'],
        suitableFor: 'Padi, Jagung, Kelapa Sawit, Karet, dll'
    }
];

// ====================
// STATE VARIABLES
// ====================

var currentStep = 1;
var totalSteps = 4;
var selectedPlant = null;
var selectedMethod = null;
var selectedMedia = null;
var currentSimStep = 1;
var totalSimSteps = 5;
var isSeedDropped = false;
var isWatered = false;
var isGrowing = false;
var isFullyGrown = false;

// Character states
var plantCharacter = null;

// ====================
// INITIALIZATION
// ====================

document.addEventListener('DOMContentLoaded', function() {
    initializePlantSelection();
    setupDragAndDrop();
    updateProgress();
    initWeatherEffects();
    setupWateringSlider();
    
    // Check if plant was pre-selected from tanaman-hias.html
    var preselectedPlantId = localStorage.getItem('agroplay_selected_plant');
    if (preselectedPlantId) {
        var plant = TANAM_YUK_PLANTS.find(function(p) { return p.id === preselectedPlantId; });
        if (plant) {
            localStorage.removeItem('agroplay_selected_plant');
            selectPlant(plant);
            // NO duplicate toast here - selectPlant already shows character message
            // showToast('info', '🌱 ' + plant.name + ' telah dipilih dari Tanaman Hias!');
        }
    }
    
    // Debug: Log initialization
    console.log('Tanam Yuk initialized');
    
    // Force show first step
    showSimStep(1);
});

// ====================
// WATERING SLIDER SETUP - ENHANCED WITH TOUCH SUPPORT
// ====================

function setupWateringSlider() {
    var slider = document.getElementById('water-slider');
    if (slider) {
        // Remove any existing listeners to avoid duplicates
        slider.removeEventListener('input', handleSliderInput);
        slider.removeEventListener('touchmove', handleTouchMove, { passive: false });
        
        // Mouse/Touch input event
        slider.addEventListener('input', handleSliderInput);
        
        // Touch move for better mobile experience
        slider.addEventListener('touchmove', handleTouchMove, { passive: false });
        
        // Touch start to ensure slider is ready
        slider.addEventListener('touchstart', function() {
            console.log('Touch started on slider');
        }, { passive: true });
        
        console.log('Water slider initialized with touch support');
    } else {
        console.log('Water slider not found on init');
        // Try again after a delay
        setTimeout(function() {
            var slider = document.getElementById('water-slider');
            if (slider) {
                slider.addEventListener('input', handleSliderInput);
                slider.addEventListener('touchmove', handleTouchMove, { passive: false });
                console.log('Water slider initialized (delayed)');
            }
        }, 1000);
    }
}

function handleTouchMove(e) {
    // Prevent page scroll while sliding
    e.preventDefault();
    
    var slider = e.target;
    var value = slider.value;
    updateWatering(value);
}

function handleSliderInput(e) {
    updateWatering(e.target.value);
}

// ====================
// WEATHER EFFECTS
// ====================

function initWeatherEffects() {
    createSunEffect();
}

function createSunEffect() {
    var container = document.querySelector('.simulation-container');
    if (!container) return;
    
    // Check if already exists
    if (document.getElementById('sun-effect')) return;
    
    var sun = document.createElement('div');
    sun.id = 'sun-effect';
    sun.innerHTML = '☀️';
    sun.style.cssText = 'position: absolute; top: 10px; right: 20px; font-size: 48px; animation: sunShine 4s ease-in-out infinite; z-index: 10;';
    container.appendChild(sun);
}

// ====================
// PLANT SELECTION
// ====================

function initializePlantSelection() {
    var container = document.getElementById('plant-selection');
    if (!container) return;
    
    renderPlants('all');
}

function renderPlants(category) {
    var container = document.getElementById('plant-selection');
    if (!container) return;
    
    var filteredPlants = category === 'all' 
        ? TANAM_YUK_PLANTS 
        : TANAM_YUK_PLANTS.filter(function(p) { return p.category === category; });
    
    container.innerHTML = '';
    
    filteredPlants.forEach(function(plant) {
        var div = document.createElement('div');
        div.className = 'plant-option ' + plant.category; // Add category class for colored border
        div.dataset.id = plant.id;
        
        var categoryLabel = {
            'pangan': '🍚',
            'industri': '🏭',
            'hias': '🌸',
            'obat': '💊',
            'serat': '🧵'
        };
        
        var methodIcons = plant.suitableMethods.map(function(m) {
            var method = PLANTING_METHODS.find(function(pm) { return pm.id === m; });
            return method ? method.icon : '';
        }).join(' ');
        
        div.innerHTML = '<span class="plant-emoji">' + plant.icon + '</span>' +
                       '<span class="plant-name">' + plant.name + '</span>' +
                       '<span class="plant-category">' + (categoryLabel[plant.category] || '') + ' ' + plant.category.charAt(0).toUpperCase() + plant.category.slice(1) + '</span>' +
                       '<span class="plant-methods" style="font-size: 14px;">' + methodIcons + '</span>';
        
        div.onclick = function() { selectPlant(plant); };
        container.appendChild(div);
    });
    
    // Update tab active state
    document.querySelectorAll('.category-tab').forEach(function(tab) {
        tab.classList.remove('active');
        if (tab.dataset.category === category) {
            tab.classList.add('active');
        }
    });
}

function filterPlants(category) {
    renderPlants(category);
}

function selectPlant(plant) {
    selectedPlant = plant;
    
    // Update UI
    document.querySelectorAll('.plant-option').forEach(function(opt) {
        opt.classList.remove('selected');
    });
    var selectedEl = document.querySelector('.plant-option[data-id="' + plant.id + '"]');
    if (selectedEl) selectedEl.classList.add('selected');
    
    // Update display
    var display = document.getElementById('selected-plant-display');
    if (display) display.textContent = plant.icon + ' ' + plant.name;
    
    // Update seed icon in simulation
    var seedIcon = document.getElementById('sim-seed-icon');
    if (seedIcon) seedIcon.textContent = plant.icon;
    
    // Show smart method suggestion
    showSmartMethodSuggestion(plant);
    
    // Update character message (ONLY ONE - no duplicate toast)
    showCharacterMessage(plant.intro);
    
    // NO duplicate toast here - the character message serves as feedback
    // This prevents the double notification issue
}

function showSmartMethodSuggestion(plant) {
    var methodDisplay = document.getElementById('selected-method-display');
    if (!methodDisplay) return;
    
    // Get suitable methods
    var suitableMethods = plant.suitableMethods || [];
    var methodNames = suitableMethods.map(function(m) {
        var method = PLANTING_METHODS.find(function(pm) { return pm.id === m; });
        return method ? method.icon + ' ' + method.name : '';
    }).join(' atau ');
    
    methodDisplay.innerHTML = '<span style="color: var(--primary-orange);">' + 
        '<i class="fas fa-lightbulb"></i> Rekomendasi: ' + methodNames + 
        '</span><br><small style="color: #666;">' + plant.description + '</small>';
}

// ====================
// METHOD SELECTION - SMART FILTERING
// ====================

function selectMethod(methodId) {
    // Check if this method is suitable for selected plant
    if (selectedPlant && selectedPlant.suitableMethods) {
        if (!selectedPlant.suitableMethods.includes(methodId)) {
            showToast('error', '❌ Maaf! ' + selectedPlant.name + ' tidak cocok ditanam dengan metode ini!');
            return;
        }
    }
    
    var methodData = PLANTING_METHODS.find(function(m) { return m.id === methodId; });
    
    selectedMethod = {
        id: methodId,
        name: methodData.name,
        icon: methodData.icon,
        color: methodData.color,
        description: methodData.description
    };
    
    // Update UI
    document.querySelectorAll('.method-option').forEach(function(opt) {
        opt.classList.remove('selected');
    });
    
    var methodEl = document.querySelector('.method-option.' + methodId);
    if (methodEl) methodEl.classList.add('selected');
    
    // Update display
    var display = document.getElementById('selected-method-display');
    if (display) display.innerHTML = '<span style="color: ' + methodData.color + ';">' + 
        methodData.icon + ' ' + methodData.name + '</span><br><small>' + methodData.description + '</small>';
    
    // Update summary
    var summaryMethodName = document.getElementById('summary-method-name');
    if (summaryMethodName) summaryMethodName.textContent = methodData.name;
    
    var summaryMethodIcon = document.getElementById('summary-method-icon');
    if (summaryMethodIcon) summaryMethodIcon.textContent = methodData.icon;
    
    // Update visualization based on method
    updateMethodVisualization(methodId);
    
    // Show feedback - ONLY character message (not duplicate toast)
    showCharacterMessage('Wah cocok sekali! ' + selectedPlant.name + ' akan tumbuh dengan baik di ' + methodData.name + '! 🌱');
}

function updateMethodVisualization(methodId) {
    var container = document.getElementById('method-visualization');
    if (!container) return;
    
    var methodData = PLANTING_METHODS.find(function(m) { return m.id === methodId; });
    var plantIcon = selectedPlant ? selectedPlant.icon : '🌱';
    
    var html = '';
    
    switch(methodId) {
        case 'hidroponik':
            html = '<div class="hydroponic-system" style="position: relative; height: 220px; background: linear-gradient(180deg, #87CEEB 0%, #E3F2FD 100%); border-radius: 16px; overflow: hidden; margin: 16px 0;">' +
                   '<div style="position: absolute; top: 10px; right: 10px; font-size: 40px; animation: sunShine 3s infinite;">☀️</div>' +
                   '<div style="position: absolute; top: 30%; left: 0; right: 0; height: 15px; background: #607D8B; border-radius: 8px;"></div>' +
                   '<div style="position: absolute; bottom: 0; left: 0; right: 0; height: 50%; background: linear-gradient(180deg, rgba(33,150,243,0.4), rgba(33,150,243,0.7)); animation: waterWave 2s ease-in-out infinite;"></div>' +
                   '<div style="position: absolute; bottom: 35%; left: 50%; transform: translateX(-50%); font-size: 50px; animation: plantFloat 3s ease-in-out infinite;">' + plantIcon + '</div>' +
                   '<div style="position: absolute; bottom: 10%; left: 50%; transform: translateX(-50%); font-size: 20px; color: #1565C0;">🫚🫚🫚</div>' +
                   '<div style="position: absolute; bottom: 5px; left: 0; right: 0; text-align: center; color: #1565C0; font-size: 12px; font-weight: bold;">AIR + NUTRISI</div>' +
                   '</div>';
            break;
            
        case 'tabulampot':
            html = '<div class="tabulampot-system" style="position: relative; height: 220px; background: linear-gradient(180deg, #87CEEB 0%, #E8F5E9 100%); border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: 20px;">' +
                   '<div style="position: absolute; top: 10px; right: 10px; font-size: 40px; animation: sunShine 3s infinite;">☀️</div>' +
                   '<div style="position: absolute; top: 20px; width: 4px; height: 50px; background: #795548;"></div>' +
                   '<div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 80px; height: 8px; background: #A1887F; border-radius: 4px;"></div>' +
                   '<div style="width: 90px; height: 70px; background: linear-gradient(180deg, #A1887F, #795548); border-radius: 10px 10px 25px 25px; display: flex; align-items: flex-end; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">' +
                   '<span style="font-size: 40px; position: absolute; bottom: 60%; animation: plantSway 3s ease-in-out infinite;">' + plantIcon + '</span>' +
                   '<span style="font-size: 16px; position: absolute; bottom: 15%; color: #5D4037;">🫚🫚</span>' +
                   '<div style="width: 100%; height: 35%; background: linear-gradient(180deg, #5D4037, #3E2723); border-radius: 0 0 20px 20px;"></div>' +
                   '</div>' +
                   '<div style="position: absolute; bottom: 10px; color: #4CAF50; font-size: 12px; font-weight: bold;">POT GANTUNG</div>' +
                   '</div>';
            break;
            
        case 'vertikultur':
            html = '<div class="vertikultur-system" style="position: relative; height: 220px; background: linear-gradient(180deg, #87CEEB 0%, #C8E6C9 100%); border-radius: 16px; padding: 16px; display: flex; flex-direction: column; justify-content: space-around;">' +
                   '<div style="position: absolute; top: 10px; right: 10px; font-size: 40px; animation: sunShine 3s infinite;">☀️</div>' +
                   '<div style="display: flex; align-items: center; gap: 12px; padding: 8px; background: rgba(255,255,255,0.8); border-radius: 10px;">' +
                   '<div style="width: 24px; height: 24px; background: #4CAF50; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">3</div>' +
                   '<div style="font-size: 28px;">' + plantIcon + '</div>' +
                   '</div>' +
                   '<div style="display: flex; align-items: center; gap: 12px; padding: 8px; background: rgba(255,255,255,0.8); border-radius: 10px;">' +
                   '<div style="width: 24px; height: 24px; background: #4CAF50; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">2</div>' +
                   '<div style="font-size: 28px;">🌿🌿</div>' +
                   '</div>' +
                   '<div style="display: flex; align-items: center; gap: 12px; padding: 8px; background: rgba(255,255,255,0.8); border-radius: 10px;">' +
                   '<div style="width: 24px; height: 24px; background: #4CAF50; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">1</div>' +
                   '<div style="font-size: 28px;">🌱🌱🌱</div>' +
                   '</div>' +
                   '<div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); color: #4CAF50; font-size: 12px; font-weight: bold;">RAK VERTIKULTUR</div>' +
                   '</div>';
            break;
            
        case 'lahan':
            html = '<div class="lahan-system" style="position: relative; height: 220px; background: linear-gradient(180deg, #87CEEB 0%, #81C784 50%, #4CAF50 100%); border-radius: 16px; overflow: hidden;">' +
                   '<div style="position: absolute; top: 10px; right: 10px; font-size: 50px; animation: sunShine 3s infinite;">☀️</div>' +
                   '<div style="position: absolute; top: 25%; left: 10px; font-size: 30px; animation: cloudMove 5s ease-in-out infinite;">☁️</div>' +
                   '<div style="position: absolute; top: 15%; left: 60%; font-size: 25px; animation: cloudMove 7s ease-in-out infinite; animation-delay: 1s;">☁️</div>' +
                   '<div style="position: absolute; bottom: 0; left: 0; right: 0; height: 55%; background: linear-gradient(180deg, #5D4037, #3E2723);"></div>' +
                   '<div style="position: absolute; bottom: 55%; left: 50%; transform: translateX(-50%); font-size: 45px; animation: plantGrow 2s ease-in-out infinite;">' + plantIcon + '</div>' +
                   '<div style="position: absolute; bottom: 45%; left: 20%; font-size: 30px; animation: plantGrow 2.5s ease-in-out infinite; animation-delay: 0.5s;">🌿</div>' +
                   '<div style="position: absolute; bottom: 45%; right: 20%; font-size: 30px; animation: plantGrow 2.5s ease-in-out infinite; animation-delay: 1s;">🌿</div>' +
                   '<div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); color: white; font-size: 14px; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">LAHAN PERTANIAN</div>' +
                   '</div>';
            break;
    }
    
    container.innerHTML = html;
    
    // Add custom animations if not exists
    addCustomAnimations();
}

function addCustomAnimations() {
    if (document.getElementById('custom-animations')) return;
    
    var style = document.createElement('style');
    style.id = 'custom-animations';
    style.textContent = `
        @keyframes sunShine {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        @keyframes waterWave {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        @keyframes plantFloat {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(-10px); }
        }
        @keyframes plantSway {
            0%, 100% { transform: translateY(0) rotate(-3deg); }
            50% { transform: translateY(-5px) rotate(3deg); }
        }
        @keyframes plantGrow {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        @keyframes cloudMove {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(20px); }
        }
    `;
    document.head.appendChild(style);
}

// ====================
// CHARACTER MESSAGE - FIXED: No more stacking
// ====================

function showCharacterMessage(message) {
    // Remove ANY existing character message first - prevents stacking
    var existingChar = document.getElementById('character-message');
    if (existingChar) {
        existingChar.style.animation = 'charPopOut 0.3s ease forwards';
        setTimeout(function() {
            if (existingChar && existingChar.parentNode) {
                existingChar.parentNode.removeChild(existingChar);
            }
            // After removing old one, show new message
            createCharacterMessage(message);
        }, 300);
    } else {
        // No existing message, create new one directly
        createCharacterMessage(message);
    }
}

function createCharacterMessage(message) {
    var charContainer = document.createElement('div');
    charContainer.id = 'character-message';
    charContainer.style.cssText = 'position: fixed; top: 80px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #FFF8E1, #FFECB3); padding: 14px 20px; border-radius: 20px; box-shadow: 0 6px 25px rgba(0,0,0,0.25); z-index: 9998; max-width: 90%; text-align: center; animation: charPopIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); border: 2px solid #FFB74D;';
    charContainer.innerHTML = '<div style="font-size: 28px; margin-bottom: 6px;">🌱</div><p style="font-size: 14px; color: #333; margin: 0; font-family: Nunito, sans-serif; font-weight: 600; line-height: 1.4;">' + message + '</p>';
    document.body.appendChild(charContainer);
    
    // Add animations
    var style = document.createElement('style');
    style.textContent = `
        @keyframes charPopIn {
            0% { transform: translateX(-50%) scale(0); opacity: 0; }
            50% { transform: translateX(-50%) scale(1.05); }
            100% { transform: translateX(-50%) scale(1); opacity: 1; }
        }
        @keyframes charPopOut {
            0% { transform: translateX(-50%) scale(1); opacity: 1; }
            100% { transform: translateX(-50%) scale(0); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Auto hide after 4 seconds
    setTimeout(function() {
        if (charContainer && charContainer.parentNode) {
            charContainer.style.animation = 'charPopOut 0.3s ease forwards';
            setTimeout(function() { 
                if (charContainer && charContainer.parentNode) {
                    charContainer.parentNode.removeChild(charContainer); 
                }
            }, 300);
        }
    }, 4000);
}

// ====================
// DRAG & DROP - ENHANCED TOUCH SUPPORT
// ====================

function setupDragAndDrop() {
    var seed = document.getElementById('seed-draggable');
    var pot = document.getElementById('pot-dropzone');
    
    if (!seed || !pot) return;
    
    // Drag start (desktop)
    seed.addEventListener('dragstart', function(e) {
        this.classList.add('dragging');
        e.dataTransfer.setData('text/plain', 'seed');
        e.dataTransfer.effectAllowed = 'move';
    });
    
    seed.addEventListener('dragend', function() {
        this.classList.remove('dragging');
    });
    
    // Drag over
    pot.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        this.classList.add('drag-over');
    });
    
    pot.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
    });
    
    // Drop
    pot.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        dropSeed();
    });
    
    // ============ ENHANCED TOUCH SUPPORT ============
    
    // Touch start - track initial touch
    seed.addEventListener('touchstart', function(e) {
        e.preventDefault(); // Prevent default touch behavior
        this.classList.add('dragging');
        
        // Add visual feedback immediately
        this.style.transform = 'scale(1.1)';
        this.style.opacity = '0.8';
        
        console.log('Touch start on seed');
    }, { passive: false });
    
    // Touch move - track movement for visual feedback
    seed.addEventListener('touchmove', function(e) {
        e.preventDefault(); // Prevent page scrolling while dragging
        
        var touch = e.touches[0];
        var seedRect = this.getBoundingClientRect();
        
        // Optional: Add floating effect during drag
        this.style.position = 'fixed';
        this.style.left = (touch.clientX - seedRect.width / 2) + 'px';
        this.style.top = (touch.clientY - seedRect.height / 2) + 'px';
        this.style.zIndex = '9999';
        
    }, { passive: false });
    
    // Touch end - check if dropped on pot
    seed.addEventListener('touchend', function(e) {
        e.preventDefault();
        
        // Reset styles
        this.classList.remove('dragging');
        this.style.transform = '';
        this.style.opacity = '';
        this.style.position = '';
        this.style.left = '';
        this.style.top = '';
        this.style.zIndex = '';
        
        // Get final touch position
        var touch = e.changedTouches[0];
        var pot = document.getElementById('pot-dropzone');
        
        if (pot) {
            var rect = pot.getBoundingClientRect();
            
            // Check if touch is within pot bounds
            if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
                touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
                
                // Visual feedback before dropping
                pot.classList.add('drag-over');
                setTimeout(function() {
                    pot.classList.remove('drag-over');
                    dropSeed();
                }, 200);
                
                console.log('Seed dropped on pot via touch');
            } else {
                console.log('Seed not dropped on pot - outside bounds');
            }
        }
    }, { passive: false });
    
    // Also support clicking/tapping as fallback
    seed.addEventListener('click', function(e) {
        // If touch didn't work, use click as fallback
        if (!isSeedDropped) {
            var pot = document.getElementById('pot-dropzone');
            if (pot) {
                pot.classList.add('drag-over');
                setTimeout(function() {
                    pot.classList.remove('drag-over');
                    dropSeed();
                }, 200);
            }
        }
    });
}

function dropSeed() {
    if (isSeedDropped) {
        showToast('warning', 'Biji sudah ditanam! 💡');
        return;
    }
    
    var soil = document.getElementById('sim-soil');
    var seedIcon = document.getElementById('sim-seed-icon');
    
    if (soil) {
        soil.classList.add('filled');
        
        // Hide seed and show seedling
        if (seedIcon) {
            seedIcon.style.animation = 'seedToSeedling 1s ease forwards';
        }
        
        isSeedDropped = true;
        
        // Add animation
        addSeedAnimation();
        
        showToast('success', '🎉 Biji berhasil ditanam! Sekarang wajib disiram!');
        
        // Character reaction
        setTimeout(function() {
            showCharacterMessage('Bagus sekali! Sekarang ayo kita siram tanaman ini! 💧');
        }, 1000);
        
        // Auto advance to watering step after short delay
        setTimeout(function() {
            goToWateringStep();
        }, 1500);
    }
}

function addSeedAnimation() {
    var style = document.createElement('style');
    style.textContent = `
        @keyframes seedToSeedling {
            0% { transform: scale(1); }
            50% { transform: scale(0.5) translateY(20px); }
            100% { transform: scale(1.2) translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
}

// ====================
// WATERING SIMULATION - FIXED
// ====================

function goToWateringStep() {
    // Go to step 2 first (media selection), then user needs to select media
    // Actually, let's go directly to step 3 (watering)
    currentSimStep = 3;
    showSimStep(3);
}

function selectMedia(mediaId, name, icon) {
    selectedMedia = {
        id: mediaId,
        name: name,
        icon: icon
    };
    
    // Update UI
    document.querySelectorAll('.media-option').forEach(function(opt) {
        opt.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    showToast('success', icon + ' ' + name + ' dipilih! 💧');
    
    // After selecting media, automatically show and enable watering
    setTimeout(function() {
        showWateringPrompt();
    }, 500);
}

function showWateringPrompt() {
    // Force show watering section
    forceShowWateringSection();
    
    // Show message to user
    showToast('info', '💧 Gulirkan slider untuk menyiram tanaman, lalu klik tombol konfirmasi!');
}

function updateWatering(value) {
    var waterFill = document.getElementById('water-fill');
    var waterPercent = document.getElementById('water-percent');
    var waterDrops = document.getElementById('water-drops');
    var waterBtn = document.getElementById('water-btn');
    var waterBtnText = document.getElementById('water-btn-text');
    
    if (waterFill) waterFill.style.width = value + '%';
    if (waterPercent) waterPercent.textContent = value;
    
    // Update water drops animation
    if (waterDrops) {
        var drops = '';
        for (var i = 0; i < Math.ceil(value / 20); i++) {
            drops += '💧';
        }
        waterDrops.innerHTML = drops;
    }
    
    // Enable button when water is sufficient (50% or more)
    if (waterBtn) {
        if (value >= 50) {
            waterBtn.disabled = false;
            waterBtn.style.background = 'linear-gradient(135deg, #4CAF50, #388E3C)';
            waterBtn.style.opacity = '1';
            waterBtn.style.cursor = 'pointer';
            if (waterBtnText) waterBtnText.textContent = 'Klik untuk konfirmasi!';
        } else {
            waterBtn.disabled = true;
            waterBtn.style.background = '#ccc';
            waterBtn.style.opacity = '0.6';
            waterBtn.style.cursor = 'not-allowed';
            if (waterBtnText) waterBtnText.textContent = 'Gulirkan slider dulu ya!';
        }
    }
}


function confirmWatering() {
    if (isWatered) {
        showToast('warning', 'Tanaman sudah disiram! 🌱');
        return;
    }
    
    // Check if slider has enough water
    var slider = document.getElementById('water-slider');
    if (slider && parseInt(slider.value) < 50) {
        showToast('warning', 'Air masih kurang! Gulirkan slider sampai 50% atau lebih! 💧');
        return;
    }
    
    isWatered = true;
    
    // Update UI
    var waterBtn = document.getElementById('water-btn');
    if (waterBtn) {
        waterBtn.innerHTML = '<i class="fas fa-check-circle"></i> Tersiram!';
        waterBtn.disabled = true;
    }
    
    // Add water animation effect
    showWaterAnimation();
    
    // Show ONLY character message (not duplicate toast) - prevents double notification
    showCharacterMessage('Wahhh! Tanamanminum air segarrr! Mari kita lihat pertumbuhannya! 🌱🌱🌱');
    
    // Auto advance to growth step
    setTimeout(function() {
        goToGrowthStep();
    }, 2000);
}

function showWaterAnimation() {
    // Find the correct container in the current active sim-step
    var currentSimStepEl = document.getElementById('sim-step-3');
    if (!currentSimStepEl) return;
    
    var container = currentSimStepEl.querySelector('#method-visualization-watering') || 
                   currentSimStepEl.querySelector('#method-visualization') ||
                   currentSimStepEl;
    
    if (!container) return;
    
    var waterOverlay = document.createElement('div');
    waterOverlay.id = 'water-overlay';
    waterOverlay.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(33, 150, 243, 0.3); border-radius: 16px; animation: waterSplash 1s ease; pointer-events: none; z-index: 100;';
    waterOverlay.innerHTML = '<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 60px; animation: dropIn 0.5s ease;">💧</div>';
    container.appendChild(waterOverlay);
    
    var style = document.createElement('style');
    style.textContent = `
        @keyframes waterSplash {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
        @keyframes dropIn {
            0% { transform: translate(-50%, -100px); opacity: 0; }
            100% { transform: translate(-50%, -50%); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(function() {
        waterOverlay.remove();
    }, 1000);
}

function goToGrowthStep() {
    currentSimStep = 4;
    showSimStep(4);
}

// Update summary when showing sim-step-5 (completion)
function updateSummaryOnCompletion() {
    // Update plant info
    var summaryPlantNameSim = document.getElementById('summary-plant-name-sim');
    var summaryPlantIconSim = document.getElementById('summary-plant-icon-sim');
    if (summaryPlantNameSim && selectedPlant) {
        summaryPlantNameSim.textContent = selectedPlant.name;
    }
    if (summaryPlantIconSim && selectedPlant) {
        summaryPlantIconSim.textContent = selectedPlant.icon;
    }
    
    // Update method info
    var summaryMethodNameSim = document.getElementById('summary-method-name-sim');
    var summaryMethodIconSim = document.getElementById('summary-method-icon-sim');
    if (summaryMethodNameSim && selectedMethod) {
        summaryMethodNameSim.textContent = selectedMethod.name;
    }
    if (summaryMethodIconSim && selectedMethod) {
        summaryMethodIconSim.textContent = selectedMethod.icon;
    }
    
    // Update media info
    var summaryMediaNameSim = document.getElementById('summary-media-name-sim');
    var summaryMediaIconSim = document.getElementById('summary-media-icon-sim');
    if (summaryMediaNameSim && selectedMedia) {
        summaryMediaNameSim.textContent = selectedMedia.name;
    }
    if (summaryMediaIconSim && selectedMedia) {
        summaryMediaIconSim.textContent = selectedMedia.icon;
    }
    
    // Update watering status
    var summaryWaterStatusSim = document.getElementById('summary-water-status-sim');
    var summaryWaterIconSim = document.getElementById('summary-water-icon-sim');
    if (summaryWaterStatusSim) {
        if (isWatered) {
            summaryWaterStatusSim.textContent = 'Sudah Disiram ✓';
            summaryWaterStatusSim.style.color = 'var(--primary-green)';
        } else {
            summaryWaterStatusSim.textContent = 'Belum Disiram';
            summaryWaterStatusSim.style.color = 'var(--primary-orange)';
        }
    }
    if (summaryWaterIconSim) {
        summaryWaterIconSim.textContent = isWatered ? '💧' : '💦';
    }
    
    // Calculate and update XP
    var baseXP = 30;
    var methodBonus = selectedMethod ? 10 : 0;
    var mediaBonus = selectedMedia ? 10 : 0;
    var wateringBonus = isWatered ? 5 : 0;
    var totalXP = baseXP + methodBonus + mediaBonus + wateringBonus;
    
    var summaryXpSim = document.getElementById('summary-xp-sim');
    if (summaryXpSim) {
        summaryXpSim.textContent = '+' + totalXP + ' XP';
    }
    
    // Also update step-4 summary for consistency
    var step4PlantName = document.getElementById('summary-plant-name');
    var step4PlantIcon = document.getElementById('summary-plant-icon');
    var step4MethodName = document.getElementById('summary-method-name');
    var step4MethodIcon = document.getElementById('summary-method-icon');
    
    if (step4PlantName && selectedPlant) step4PlantName.textContent = selectedPlant.name;
    if (step4PlantIcon && selectedPlant) step4PlantIcon.textContent = selectedPlant.icon;
    if (step4MethodName && selectedMethod) step4MethodName.textContent = selectedMethod.name;
    if (step4MethodIcon && selectedMethod) step4MethodIcon.textContent = selectedMethod.icon;
}

// ====================
// GROWTH ANIMATION
// ====================

function startGrowth() {
    if (isGrowing) return;
    
    if (!isWatered) {
        showToast('warning', 'Siram tanaman terlebih dahulu! 💧');
        // Force show watering
        forceShowWateringSection();
        return;
    }
    
    isGrowing = true;
    var growthFill = document.getElementById('growth-fill');
    var timerText = document.getElementById('timer-text');
    var growingPlantDisplay = document.getElementById('growing-plant-display');
    var growthStatus = document.getElementById('growth-status');
    
    var stages = [
        { icon: '🌱', label: 'Menyemaikan...', percent: 25 },
        { icon: '🌿', label: 'Tunas mulai tumbuh...', percent: 50 },
        { icon: '🌸', label: 'Mekar bunga...', percent: 75 },
        { icon: selectedPlant ? selectedPlant.icon : '🍎', label: 'Buah terbentuk!', percent: 100 }
    ];
    
    var currentStage = 0;
    var progress = 0;
    
    // Reset stages
    document.querySelectorAll('.stage-icon').forEach(function(el, idx) {
        el.classList.remove('active', 'completed');
        if (idx === 0) el.classList.add('active');
    });
    
    var growthInterval = setInterval(function() {
        progress += 2;
        
        if (growthFill) growthFill.style.width = progress + '%';
        if (timerText) timerText.textContent = 'Pertumbuhan: ' + progress + '%';
        
        // Update stage
        var stageIndex = Math.floor(progress / 25);
        if (stageIndex > currentStage && stageIndex < stages.length) {
            currentStage = stageIndex;
            
            // Update stage icons
            document.querySelectorAll('.stage-icon').forEach(function(el, idx) {
                el.classList.remove('active');
                if (idx < currentStage) {
                    el.classList.add('completed');
                } else if (idx === currentStage) {
                    el.classList.add('active');
                }
            });
            
            // Update plant display
            if (growingPlantDisplay) growingPlantDisplay.textContent = stages[currentStage].icon;
            if (growthStatus) growthStatus.textContent = stages[currentStage].label;
        }
        
        if (progress >= 100) {
            clearInterval(growthInterval);
            isGrowing = false;
            isFullyGrown = true;
            
            // Update final display
            if (growingPlantDisplay) growingPlantDisplay.textContent = selectedPlant ? selectedPlant.icon : '🍎';
            
            showToast('success', '🎉 Pertumbuhan selesai! Tanamanmu sudah besar!');
            
            // Auto advance
            setTimeout(function() {
                nextSimStep();
            }, 1500);
        }
    }, 100);
}

// ====================
// SIMULATION NAVIGATION - FIXED
// ====================

function nextSimStep() {
    // Validation per step - CHECK BEFORE INCREMENTING
    if (currentSimStep === 1 && !isSeedDropped) {
        showToast('warning', 'Tanam biji terlebih dahulu! 🌱');
        return;
    }
    if (currentSimStep === 2 && !selectedMedia) {
        showToast('warning', 'Pilih media tanam terlebih dahulu! 🌍');
        return;
    }
    // Check watering BEFORE allowing to proceed from step 2 or step 3
    if ((currentSimStep === 2 || currentSimStep === 3) && !isWatered) {
        showToast('warning', 'Siram tanaman terlebih dahulu! 💧 Gulirkan slider dan klik tombol konfirmasi!');
        // Force show the watering section
        forceShowWateringSection();
        return;
    }
    
    if (currentSimStep < totalSimSteps) {
        currentSimStep++;
        showSimStep(currentSimStep);
    } else {
        nextStep();
    }
}

function prevSimStep() {
    if (currentSimStep > 1) {
        currentSimStep--;
        showSimStep(currentSimStep);
    }
}

function showSimStep(stepNum) {
    console.log('Showing simulation step:', stepNum);
    
    // First, hide ALL sim substeps completely with inline style
    document.querySelectorAll('.sim-substep').forEach(function(el) {
        el.style.display = 'none';
        el.classList.remove('active');
    });
    
    // Show current step
    var currentEl = document.getElementById('sim-step-' + stepNum);
    if (currentEl) {
        currentEl.style.display = 'block';
        // Small delay to ensure DOM is ready
        setTimeout(function() {
            currentEl.classList.add('active');
        }, 10);
    } else {
        console.log('Step element not found: sim-step-' + stepNum);
    }
    
    // For watering steps (2 and 3), force show the watering section
    if (stepNum === 2 || stepNum === 3) {
        setTimeout(function() {
            forceShowWateringSection();
            // Also update method visualization
            updateMethodVisualizationInCurrentStep();
        }, 500);
    }
    
    // Update summary when showing sim-step-5 (completion screen)
    if (stepNum === 5) {
        setTimeout(function() {
            updateSummaryOnCompletion();
        }, 100);
    }
    
    // Update step dots
    document.querySelectorAll('.step-dot').forEach(function(el, idx) {
        el.classList.remove('active', 'completed');
        if (idx + 1 < stepNum) {
            el.classList.add('completed');
        } else if (idx + 1 === stepNum) {
            el.classList.add('active');
        }
    });
    
    // Update navigation buttons
    var prevBtn = document.getElementById('sim-prev-btn');
    var nextBtn = document.getElementById('sim-next-btn');
    
    if (prevBtn) prevBtn.disabled = (stepNum === 1);
    if (nextBtn) {
        if (stepNum === totalSimSteps) {
            nextBtn.innerHTML = '<i class="fas fa-check"></i> Selesai';
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
        }
    }
}

// Force show watering section - FIX FOR THE BUG
function forceShowWateringSection() {
    var wateringSection = document.getElementById('watering-section');
    if (wateringSection) {
        // Force display block with inline styles
        wateringSection.style.display = 'block';
        wateringSection.style.visibility = 'visible';
        wateringSection.style.opacity = '1';
        
        // Ensure slider is properly set up
        setupWateringSlider();
        
        // Scroll to make it visible
        setTimeout(function() {
            wateringSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
        
        console.log('Watering section shown');
    } else {
        console.log('Watering section not found!');
    }
}

// Update method visualization in current step
function updateMethodVisualizationInCurrentStep() {
    // Find the current visible step
    var currentSubstep = null;
    for (var i = 1; i <= totalSimSteps; i++) {
        var el = document.getElementById('sim-step-' + i);
        if (el && (el.style.display === 'block' || el.classList.contains('active'))) {
            currentSubstep = el;
            break;
        }
    }
    
    if (!currentSubstep) {
        currentSubstep = document.querySelector('.sim-substep.active');
    }
    
    if (currentSubstep && selectedMethod) {
        // Find method visualization containers in current step
        var vizContainers = currentSubstep.querySelectorAll('#method-visualization, #method-visualization-watering');
        
        if (vizContainers.length > 0) {
            vizContainers.forEach(function(container) {
                if (container && selectedPlant && selectedMethod) {
                    var methodData = PLANTING_METHODS.find(function(m) { return m.id === selectedMethod.id; });
                    if (methodData) {
                        container.innerHTML = getMethodVisualizationHTML(selectedMethod.id, selectedPlant.icon);
                    }
                }
            });
        }
    }
}

// Helper function to get method visualization HTML
function getMethodVisualizationHTML(methodId, plantIcon) {
    var methodData = PLANTING_METHODS.find(function(m) { return m.id === methodId; });
    if (!methodData) return '';
    
    var html = '';
    
    switch(methodId) {
        case 'hidroponik':
            html = '<div class="hydroponic-system" style="position: relative; height: 180px; background: linear-gradient(180deg, #87CEEB 0%, #E3F2FD 100%); border-radius: 16px; overflow: hidden; margin: 10px 0;">' +
                   '<div style="position: absolute; top: 10px; right: 10px; font-size: 32px; animation: sunShine 3s infinite;">☀️</div>' +
                   '<div style="position: absolute; top: 30%; left: 0; right: 0; height: 12px; background: #607D8B; border-radius: 6px;"></div>' +
                   '<div style="position: absolute; bottom: 0; left: 0; right: 0; height: 50%; background: linear-gradient(180deg, rgba(33,150,243,0.4), rgba(33,150,243,0.7)); animation: waterWave 2s ease-in-out infinite;"></div>' +
                   '<div style="position: absolute; bottom: 40%; left: 50%; transform: translateX(-50%); font-size: 40px; animation: plantFloat 3s ease-in-out infinite;">' + plantIcon + '</div>' +
                   '<div style="position: absolute; bottom: 10px; left: 0; right: 0; text-align: center; color: #1565C0; font-size: 11px; font-weight: bold;">AIR + NUTRISI</div>' +
                   '</div>';
            break;
            
        case 'tabulampot':
            html = '<div class="tabulampot-system" style="position: relative; height: 180px; background: linear-gradient(180deg, #87CEEB 0%, #E8F5E9 100%); border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: 15px;">' +
                   '<div style="position: absolute; top: 10px; right: 10px; font-size: 32px; animation: sunShine 3s infinite;">☀️</div>' +
                   '<div style="position: absolute; top: 20px; width: 4px; height: 40px; background: #795548;"></div>' +
                   '<div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 70px; height: 6px; background: #A1887F; border-radius: 3px;"></div>' +
                   '<div style="width: 80px; height: 60px; background: linear-gradient(180deg, #A1887F, #795548); border-radius: 8px 8px 20px 20px; display: flex; align-items: flex-end; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">' +
                   '<span style="font-size: 32px; position: absolute; bottom: 55%; animation: plantSway 3s ease-in-out infinite;">' + plantIcon + '</span>' +
                   '<div style="width: 100%; height: 30%; background: linear-gradient(180deg, #5D4037, #3E2723); border-radius: 0 0 18px 18px;"></div>' +
                   '</div>' +
                   '<div style="position: absolute; bottom: 8px; color: #4CAF50; font-size: 11px; font-weight: bold;">POT GANTUNG</div>' +
                   '</div>';
            break;
            
        case 'vertikultur':
            html = '<div class="vertikultur-system" style="position: relative; height: 180px; background: linear-gradient(180deg, #87CEEB 0%, #C8E6C9 100%); border-radius: 16px; padding: 12px; display: flex; flex-direction: column; justify-content: space-around;">' +
                   '<div style="position: absolute; top: 10px; right: 10px; font-size: 32px; animation: sunShine 3s infinite;">☀️</div>' +
                   '<div style="display: flex; align-items: center; gap: 8px; padding: 6px; background: rgba(255,255,255,0.8); border-radius: 8px;">' +
                   '<div style="width: 20px; height: 20px; background: #4CAF50; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold;">3</div>' +
                   '<div style="font-size: 22px;">' + plantIcon + '</div>' +
                   '</div>' +
                   '<div style="display: flex; align-items: center; gap: 8px; padding: 6px; background: rgba(255,255,255,0.8); border-radius: 8px;">' +
                   '<div style="width: 20px; height: 20px; background: #4CAF50; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold;">2</div>' +
                   '<div style="font-size: 22px;">🌿🌿</div>' +
                   '</div>' +
                   '<div style="display: flex; align-items: center; gap: 8px; padding: 6px; background: rgba(255,255,255,0.8); border-radius: 8px;">' +
                   '<div style="width: 20px; height: 20px; background: #4CAF50; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold;">1</div>' +
                   '<div style="font-size: 22px;">🌱🌱🌱</div>' +
                   '</div>' +
                   '<div style="position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); color: #4CAF50; font-size: 10px; font-weight: bold;">RAK VERTIKULTUR</div>' +
                   '</div>';
            break;
            
        case 'lahan':
            html = '<div class="lahan-system" style="position: relative; height: 180px; background: linear-gradient(180deg, #87CEEB 0%, #81C784 50%, #4CAF50 100%); border-radius: 16px; overflow: hidden;">' +
                   '<div style="position: absolute; top: 10px; right: 10px; font-size: 40px; animation: sunShine 3s infinite;">☀️</div>' +
                   '<div style="position: absolute; top: 20%; left: 10px; font-size: 24px; animation: cloudMove 5s ease-in-out infinite;">☁️</div>' +
                   '<div style="position: absolute; top: 12%; left: 55%; font-size: 20px; animation: cloudMove 7s ease-in-out infinite; animation-delay: 1s;">☁️</div>' +
                   '<div style="position: absolute; bottom: 0; left: 0; right: 0; height: 50%; background: linear-gradient(180deg, #5D4037, #3E2723);"></div>' +
                   '<div style="position: absolute; bottom: 50%; left: 50%; transform: translateX(-50%); font-size: 36px; animation: plantGrow 2s ease-in-out infinite;">' + plantIcon + '</div>' +
                   '<div style="position: absolute; bottom: 42%; left: 20%; font-size: 24px; animation: plantGrow 2.5s ease-in-out infinite; animation-delay: 0.5s;">🌿</div>' +
                   '<div style="position: absolute; bottom: 42%; right: 20%; font-size: 24px; animation: plantGrow 2.5s ease-in-out infinite; animation-delay: 1s;">🌿</div>' +
                   '<div style="position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); color: white; font-size: 12px; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">LAHAN PERTANIAN</div>' +
                   '</div>';
            break;
            
        default:
            html = '<div style="text-align: center; padding: 40px; color: #999;"><i class="fas fa-seedling" style="font-size: 48px;"></i><p>Pilih metode dulu ya!</p></div>';
    }
    
    return html;
}

function finishSimulation() {
    // Calculate XP reward
    var baseXP = 30;
    var methodBonus = selectedMethod ? 10 : 0;
    var mediaBonus = selectedMedia ? 10 : 0;
    var wateringBonus = isWatered ? 5 : 0;
    var totalXP = baseXP + methodBonus + mediaBonus + wateringBonus;
    
    // Show celebration
    showCelebration();
    
// Save XP & stats - genuine integration
    if (typeof REALTIME !== 'undefined') {
        var result = REALTIME.addXP(totalXP, 'Tanam Yuk: ' + (selectedPlant ? selectedPlant.name : 'Tanaman'));
        REALTIME.incrementStat('plantsPlanted');
        REALTIME.incrementStat('gamesPlayed');
        REALTIME.recordActivity(REALTIME.ACTIVITY_TYPES.PLANT_CROP, {
            plant: selectedPlant ? selectedPlant.id : null,
            plantName: selectedPlant ? selectedPlant.name : null,
            method: selectedMethod ? selectedMethod.id : null,
            media: selectedMedia ? selectedMedia.id : null,
            xp: totalXP
        });
        ['firstPlant', 'planter10', 'planter50'].forEach(id => REALTIME.checkAchievement(id));
        showToast('success', '🎉 +' + totalXP + ' XP - Tanaman berhasil!');
        if (result.level > 1) showToast('success', '🎊 Level Up ke ' + result.level + '!');
    }
    
    // Update final displays
    var finalPlantName = document.getElementById('final-plant-name');
    if (finalPlantName) finalPlantName.textContent = selectedPlant ? selectedPlant.name : 'Tanaman';
    
    var finalPlantIcon = document.getElementById('final-plant-display');
    if (finalPlantIcon) finalPlantIcon.textContent = selectedPlant ? selectedPlant.icon : '🍎';
    
    var summaryPlantName = document.getElementById('summary-plant-name');
    if (summaryPlantName) summaryPlantName.textContent = selectedPlant ? selectedPlant.name : '-';
    
    var summaryPlantIcon = document.getElementById('summary-plant-icon');
    if (summaryPlantIcon) summaryPlantIcon.textContent = selectedPlant ? selectedPlant.icon : '🌱';
    
    setTimeout(function() {
        nextStep();
    }, 3000);
}

// ====================
// CELEBRATION EFFECTS
// ====================

function showCelebration() {
    // Create confetti
    var colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
    var container = document.body;
    
    for (var i = 0; i < 50; i++) {
        setTimeout(function() {
            var confetti = document.createElement('div');
            confetti.style.cssText = 'position: fixed; width: 10px; height: 10px; background: ' + 
                colors[Math.floor(Math.random() * colors.length)] + 
                '; border-radius: 50%; pointer-events: none; z-index: 9999; animation: confettiFall 3s ease forwards;';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
            container.appendChild(confetti);
            
            setTimeout(function() { confetti.remove(); }, 4000);
        }, i * 50);
    }
    
    // Add confetti animation
    var style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Character celebration message
    setTimeout(function() {
        showCharacterMessage('🎉 YAYYYY! Tanamanmu berhasil tumbuh! Kamu luar biasa! 🌟🌟🌟');
    }, 1000);
}

// ====================
// MAIN STEP NAVIGATION
// ====================

function updateProgress() {
    var progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    var progressFill = document.getElementById('progress-fill');
    var progressText = document.getElementById('progress-text');
    var prevBtn = document.getElementById('prev-btn');
    var nextBtn = document.getElementById('next-btn');
    
    if (progressFill) progressFill.style.width = progress + '%';
    if (progressText) progressText.textContent = 'Langkah ' + currentStep + ' dari ' + totalSteps;
    if (prevBtn) prevBtn.disabled = (currentStep === 1);
    if (nextBtn) {
        if (currentStep === totalSteps) {
            nextBtn.innerHTML = '<i class="fas fa-home"></i> Selesai';
        } else {
            nextBtn.innerHTML = 'Selanjutnya <i class="fas fa-arrow-right"></i>';
        }
    }
}

function showStep(stepNum) {
    document.querySelectorAll('.step').forEach(function(el) {
        el.classList.remove('active');
    });
    var stepEl = document.getElementById('step-' + stepNum);
    if (stepEl) stepEl.classList.add('active');
    currentStep = stepNum;
    updateProgress();
}

function nextStep() {
    if (currentStep < totalSteps) {
        // Validation per step
        if (currentStep === 1 && !selectedPlant) {
            showToast('warning', 'Pilih tanaman terlebih dahulu! 🌱');
            return;
        }
        if (currentStep === 2 && !selectedMethod) {
            showToast('warning', 'Pilih metode penanaan terlebih dahulu! 🔧');
            return;
        }
        
        showStep(currentStep + 1);
    } else {
        // Show step 5 (summary) first
        currentStep = 5;
        showStep(5);
        
        // Update summary with plant and method info
        var summaryPlantName = document.getElementById('summary-plant-name');
        if (summaryPlantName) summaryPlantName.textContent = selectedPlant ? selectedPlant.name : '-';

        var summaryPlantIcon = document.getElementById('summary-plant-icon');
        if (summaryPlantIcon) summaryPlantIcon.textContent = selectedPlant ? selectedPlant.icon : '🌱';

        var summaryMethodName = document.getElementById('summary-method-name');
        if (summaryMethodName) summaryMethodName.textContent = selectedMethod ? selectedMethod.name : '-';

        var summaryMethodIcon = document.getElementById('summary-method-icon');
        if (summaryMethodIcon) summaryMethodIcon.textContent = selectedMethod ? selectedMethod.icon : '💧';
        
        // Show celebration and XP
        var baseXP = 30;
        var methodBonus = selectedMethod ? 10 : 0;
        var totalXP = baseXP + methodBonus;
        
        showToast('success', '🎉 Selamat! +' + totalXP + ' XP');
        
        // Also trigger finishSimulation for XP tracking
        if (typeof REALTIME !== 'undefined' && typeof REALTIME.addXP === 'function') {
            REALTIME.addXP(totalXP, 'Tanam Yuk: ' + (selectedPlant ? selectedPlant.name : 'Tanaman'));
            REALTIME.incrementStat('plantsPlanted');
        }
        
        // Update button to go home
        var nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.innerHTML = '<i class="fas fa-home"></i> Ke Menu';
            nextBtn.onclick = function() {
                window.location.href = 'index.html';
            };
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

function goHome() {
    if (confirm('Kembali ke menu utama?')) {
        window.location.href = 'index.html';
    }
}

// Better back button - goes to previous step OR to menu
function goBack() {
    if (currentStep > 1) {
        prevStep();
    } else {
        // If at step 1, ask if they want to go to menu
        if (confirm('Kembali ke menu utama?')) {
            window.location.href = 'index.html';
        }
    }
}

// ====================
// NAVIGATION CONTROL - Hide main nav when in simulation
// ====================

function updateNavigationVisibility() {
    var mainNav = document.querySelector('.step-navigation');
    var step3 = document.getElementById('step-3');
    
    if (step3 && (step3.classList.contains('active') || step3.style.display === 'block')) {
        // Hide main navigation when in simulation (step 3)
        if (mainNav) {
            mainNav.style.display = 'none';
        }
    } else {
        // Show main navigation in other steps
        if (mainNav) {
            mainNav.style.display = 'flex';
        }
    }
}

// Override showStep to also update navigation visibility
var originalShowStep = showStep;
showStep = function(stepNum) {
    originalShowStep(stepNum);
    // Update navigation visibility after step change
    setTimeout(updateNavigationVisibility, 100);
};

// ====================
// TOAST NOTIFICATIONS - Fixed: No More Stacking/Overlapping
// New system: Only ONE toast at a time, old one is removed before new one appears
// ====================

var currentToastTimeout = null;

function showToast(type, message) {
    var container = document.getElementById('toast-container');
    if (!container) return;
    
    // Cancel any existing timeout to prevent auto-dismiss conflicts
    if (currentToastTimeout) {
        clearTimeout(currentToastTimeout);
        currentToastTimeout = null;
    }
    
    // Remove ANY existing toast immediately - prevents stacking/overlapping
    var existingToasts = container.querySelectorAll('.toast');
    existingToasts.forEach(function(oldToast) {
        if (oldToast && oldToast.parentNode) {
            // Quick fade out animation
            oldToast.style.transition = 'all 0.15s ease';
            oldToast.style.opacity = '0';
            oldToast.style.transform = 'translateX(-50%) scale(0.8)';
            setTimeout(function() {
                if (oldToast && oldToast.parentNode) {
                    oldToast.parentNode.removeChild(oldToast);
                }
            }, 150);
        }
    });
    
    // Get color based on type
    var color = type === 'success' ? '#4CAF50' : 
                type === 'warning' ? '#FF9800' : 
                type === 'error' ? '#F44336' : 
                type === 'info' ? '#2196F3' : '#2196F3';
    
    // Get icon based on type
    var icon = type === 'success' ? 'fa-check-circle' : 
               type === 'warning' ? 'fa-exclamation-circle' : 
               type === 'error' ? 'fa-times-circle' : 
               type === 'info' ? 'fa-info-circle' : 'fa-info-circle';
    
    // Create toast element
    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    
    toast.innerHTML = '<div style="display: flex; align-items: center; gap: 12px; width: 100%;">' +
        '<div style="width: 36px; height: 36px; border-radius: 50%; background: ' + color + '20; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">' +
        '<i class="fas ' + icon + '" style="color: ' + color + '; font-size: 18px;"></i></div>' +
        '<div style="flex: 1; min-width: 0;">' +
        '<p style="margin: 0; font-size: 13px; color: #333; font-weight: 600; font-family: Nunito, sans-serif; word-wrap: break-word;">' + message + '</p>' +
        '</div>' +
        '<button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: #999; cursor: pointer; padding: 4px; font-size: 14px;">&times;</button>' +
        '</div>';
    
    // Custom styling
    toast.style.cssText = 'background: white; border-radius: 12px; padding: 10px 14px; box-shadow: 0 4px 20px rgba(0,0,0,0.2); border-left: 4px solid ' + color + '; max-width: 85%; position: fixed; left: 50%; top: 80px; transform: translateX(-50%); z-index: 9999; animation: toastPopIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);';
    
    // Add animations
    var style = document.createElement('style');
    style.id = 'toast-animations-fixed-' + Date.now();
    style.textContent = `
        @keyframes toastPopIn {
            0% { transform: translateX(-50%) scale(0.8); opacity: 0; }
            100% { transform: translateX(-50%) scale(1); opacity: 1; }
        }
        @keyframes toastPopOut {
            0% { transform: translateX(-50%) scale(1); opacity: 1; }
            100% { transform: translateX(-50%) scale(0.8); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Add toast to container
    container.appendChild(toast);
    
    // Auto dismiss after 3 seconds
    currentToastTimeout = setTimeout(function() {
        if (toast && toast.parentNode) {
            toast.style.animation = 'toastPopOut 0.3s ease forwards';
            setTimeout(function() {
                if (toast && toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }
    }, 3000);
    
    // Allow clicking to dismiss early
    toast.onclick = function() {
        if (currentToastTimeout) {
            clearTimeout(currentToastTimeout);
            currentToastTimeout = null;
        }
        toast.style.animation = 'toastPopOut 0.2s ease forwards';
        setTimeout(function() {
            if (toast && toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 200);
    };
}
