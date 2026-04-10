/**
 * =====================================================
 * AGROPLAY - Ornamental Plants JavaScript
 * Tanaman Hias - Collection of Ornamental Plants
 * =====================================================
 */

// Ornamental Plants Database - Maximum 3 plants for display
const ORNAMENTAL_PLANTS = [
    {
        id: 'mawar',
        name: 'Mawar',
        icon: '🌹',
        category: 'flower',
        difficulty: 'Sedang',
        light: 'Sinar matahari penuh',
        water: 'Banyak',
        description: 'Ratu bunga dengan aroma harum. Symbol cinta dan keindahan!',
        suitableMethods: ['lahan'],
        care: ['Siram 2x sehari', 'Semprot pestisida', 'Pupuk sebulan sekali']
    },
    {
        id: 'bougenville',
        name: 'Bougenville',
        icon: '💐',
        category: 'flower',
        difficulty: 'Mudah',
        light: 'Sinar matahari penuh',
        water: 'Sedang',
        description: 'Tanaman bunga dengan warna-warna cerah. Sangat populer di Indonesia!',
        suitableMethods: ['tabulampot', 'lahan'],
        care: ['Siram setiap hari', 'Butuh sinar matahari penuh', 'Pupuk rutin']
    },
    {
        id: 'sansevieria',
        name: 'Lidah Mertua',
        icon: '🌵',
        category: 'indoor',
        difficulty: 'Sangat Mudah',
        light: 'Cahaya rendah - terang',
        water: 'Sedikit',
        description: 'Tanaman yang sangat tahan lama dan menyerap racun udara. Cocok untuk pemula!',
        suitableMethods: ['tabulampot'],
        care: ['Siram 2-3 minggu sekali', 'Tahan terhadap kondisi apapun', 'Tidak perlu pupuk banyak']
    }
];

// Current filter
let currentCategory = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderPlants();
});

// Render Plants
function renderPlants() {
    const grid = document.getElementById('plants-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const filtered = currentCategory === 'all' 
        ? ORNAMENTAL_PLANTS 
        : ORNAMENTAL_PLANTS.filter(p => p.category === currentCategory);
    
    filtered.forEach((plant, index) => {
        const card = document.createElement('div');
        card.className = 'plant-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.onclick = () => showPlantDetail(plant.id);
        
        card.innerHTML = `
            <div class="plant-icon">${plant.icon}</div>
            <h3 class="plant-name">${plant.name}</h3>
            <span class="plant-category">${getCategoryLabel(plant.category)}</span>
            <div class="plant-difficulty ${getDifficultyClass(plant.difficulty)}">${plant.difficulty}</div>
        `;
        
        grid.appendChild(card);
    });
}

// Get category label
function getCategoryLabel(category) {
    const labels = {
        'indoor': '🌿 Indoor',
        'outdoor': '☀️ Outdoor',
        'flower': '🌸 Bunga'
    };
    return labels[category] || category;
}

// Get difficulty class
function getDifficultyClass(difficulty) {
    if (difficulty.includes('Sangat')) return 'easy';
    if (difficulty === 'Mudah') return 'easy';
    if (difficulty === 'Sedang') return 'medium';
    return 'hard';
}

// Filter Plants
function filterPlants(category) {
    currentCategory = category;
    
    // Update tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    renderPlants();
}

// Show Plant Detail
function showPlantDetail(plantId) {
    const plant = ORNAMENTAL_PLANTS.find(p => p.id === plantId);
    if (!plant) return;
    
    const modal = document.getElementById('plant-modal');
    const body = document.getElementById('modal-body');
    
    // Get suitable methods text
    const methodsText = plant.suitableMethods.map(m => {
        const methodNames = {
            'tabulampot': 'Tabulampot',
            'lahan': 'Lahan',
            'vertikultur': 'Vertikultur',
            'hidroponik': 'Hidroponik'
        };
        return methodNames[m] || m;
    }).join(' atau ');
    
    body.innerHTML = `
        <div class="plant-detail-header">
            <div class="plant-detail-icon">${plant.icon}</div>
            <h2 class="plant-detail-name">${plant.name}</h2>
            <span class="plant-detail-category">${getCategoryLabel(plant.category)}</span>
        </div>
        
        <p class="plant-description">${plant.description}</p>
        
        <div class="plant-info-grid">
            <div class="info-item">
                <i class="fas fa-star"></i>
                <span>Kesulitan</span>
                <strong>${plant.difficulty}</strong>
            </div>
            <div class="info-item">
                <i class="fas fa-sun"></i>
                <span>Cahaya</span>
                <strong>${plant.light}</strong>
            </div>
            <div class="info-item">
                <i class="fas fa-tint"></i>
                <span>Air</span>
                <strong>${plant.water}</strong>
            </div>
        
        <div class="plant-care-section">
            <h3><i class="fas fa-heart"></i> Cara Perawatan</h3>
            <ul class="care-list">
                ${plant.care.map(care => `<li>${care}</li>`).join('')}
            </ul>
        </div>
        
        <div class="plant-method-section" style="margin-top: 16px; padding: 16px; background: #FFF3E0; border-radius: 12px;">
            <h3 style="font-size: 14px; color: #E65100; margin-bottom: 8px;"><i class="fas fa-seedling"></i> Metode Tanam</h3>
            <p style="font-size: 13px; color: #666;">Bisa ditanam dengan: <strong>${methodsText}</strong></p>
        </div>
        
        <button onclick="goToTanamYuk('${plant.id}')" style="width: 100%; margin-top: 20px; padding: 16px; background: linear-gradient(135deg, #FF9800, #F57C00); color: white; border: none; border-radius: 16px; font-size: 16px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;">
            <i class="fas fa-seedling"></i> Tanam Sekarang!
        </button>
    `;
    
    modal.classList.add('active');
}

// Go to Tanam Yuk with selected plant
function goToTanamYuk(plantId) {
    // Store selected plant in localStorage for Tanam Yuk
    localStorage.setItem('agroplay_selected_plant', plantId);
    // Redirect to Tanam Yuk
    window.location.href = 'tanam-yuk.html';
}

// Close Modal
function closeModal() {
    document.getElementById('plant-modal').classList.remove('active');
}

// Close modal when clicking outside
document.getElementById('plant-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// 🌱 REALTIME INTEGRATION - PHASE 3.9 (KEBUN AJAIB ORNAMENTAL)
// Track plant view as "plant interaction" for achievements
function trackPlantInteraction(plantId) {
    if (typeof REALTIME !== 'undefined' && REALTIME.getCurrentUserData()) {
        REALTIME.incrementStat('plantsPlanted');  // Virtual "plant viewed"
        REALTIME.addXP(15, `Ornamental: ${ORNAMENTAL_PLANTS.find(p => p.id === plantId)?.name}`);
        REALTIME.recordActivity(REALTIME.ACTIVITY_TYPES.PLANT_CROP, { 
            plant: plantId, 
            category: 'ornamental',
            virtual: true 
        });
        console.log('✅ Ornamental plant tracked:', plantId);
    }
}

// Override showPlantDetail to track interaction
const originalShowPlantDetail = showPlantDetail;
showPlantDetail = function(plantId) {
    trackPlantInteraction(plantId);
    originalShowPlantDetail(plantId);
};

// Track "plant" when going to Tanam Yuk (as planting intent)
const originalGoToTanamYuk = goToTanamYuk;
goToTanamYuk = function(plantId) {
    if (typeof REALTIME !== 'undefined') {
        REALTIME.incrementStat('plantsPlanted');
        REALTIME.addXP(25, `Ornamental → Tanam Yuk: ${ORNAMENTAL_PLANTS.find(p => p.id === plantId)?.name}`);
        REALTIME.recordActivity(REALTIME.ACTIVITY_TYPES.PLANT_CROP, { 
            plant: plantId, 
            category: 'ornamental_to_tanam_yuk' 
        });
    }
    originalGoToTanamYuk(plantId);
};


// Toast notification function (if not already defined)
function showToast(type, message) {
    const container = document.getElementById('toast-container');
    if (!container) {
        // Create toast container if not exists
        const newContainer = document.createElement('div');
        newContainer.id = 'toast-container';
        newContainer.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:2000;display:flex;flex-direction:column;gap:10px;';
        document.body.appendChild(newContainer);
    }
    
    const toast = document.createElement('div');
    toast.style.cssText = 'background:white;padding:14px 20px;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.15);display:flex;align-items:center;gap:10px;animation:toastSlide 0.3s ease;min-width:250px;border-left:4px solid ' + (type === 'success' ? '#4CAF50' : '#F44336') + ';';
    toast.innerHTML = '<span style="font-size:20px;">' + (type === 'success' ? '✅' : '❌') + '</span><span style="color:#333;font-size:14px;">' + message + '</span>';
    
    const toastContainer = document.getElementById('toast-container');
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
