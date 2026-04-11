// ==================== KEBUN AJAIB - GAME.JS ====================
// Main JavaScript for Kebun Ajaib page functionality
// Note: Main functionality is in HTML script, this file provides supplementary functions

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Kebun Ajaib: Initializing...');
    // Only initialize if not already initialized by HTML script
    if (typeof currentCategory === 'undefined') {
        initializeBackgroundParticles();
    }
});

// Background particles animation
function initializeBackgroundParticles() {
    const particlesContainer = document.getElementById('bg-particles');
    if (!particlesContainer) return;
    
    const particleEmojis = ['', '', '', '', '', ''];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.fontSize = (Math.random() * 10 + 15) + 'px';
        particlesContainer.appendChild(particle);
    }
}

// Load plants based on current category
function loadPlants() {
    const grid = document.getElementById('plants-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Use PLANTS_DATA from HTML (window scope) with proper error handling
    let plants = [];
    if (typeof window.PLANTS_DATA !== 'undefined' && window.PLANTS_DATA && typeof window.currentCategory !== 'undefined') {
        plants = window.PLANTS_DATA[window.currentCategory] || [];
    } else {
        // Fallback data if PLANTS_DATA is not available
        plants = [
            { id: 'padi', name: 'PADI', icon: '🌾', category: 'pangan', nameId: 'Padi - Penghasil Nasi' },
            { id: 'jagung', name: 'JAGUNG', icon: '🌽', category: 'pangan', nameId: 'Jagung - Biji Runcing' },
            { id: 'kentang', name: 'KENTANG', icon: '🥔', category: 'pangan', nameId: 'Kentang - Umbi Lezat' }
        ];
    }
    
    plants.forEach((plant, index) => {
        const card = createPlantCard(plant, index);
        grid.appendChild(card);
    });
}

// Create plant card element
function createPlantCard(plant, index) {
    const card = document.createElement('div');
    card.className = 'plant-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <div class="plant-card-wrapper">
            <span class="plant-card-icon">${plant.icon || ''}</span>
            <h3 class="plant-card-name">${plant.name || 'Tanaman'}</h3>
            <p class="plant-card-desc">${plant.nameId || plant.description || 'Deskripsi tanaman'}</p>
        </div>
        <div class="plant-card-glow"></div>
    `;
    
    card.onclick = () => {
        if (window.showPlantDetail) {
            window.showPlantDetail(plant.id, plant.category);
        }
    };
    
    return card;
}

// Functions are already implemented in HTML, no need for duplicates

// Close modal
function closeModal() {
    const modal = document.getElementById('detail-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Filter plants by category (only if not defined in HTML)
function filterCategory(category) {
    // Only run if filterCategory is not already defined in HTML
    if (typeof window.filterCategory === 'undefined') {
        if (typeof window.currentCategory !== 'undefined') {
            window.currentCategory = category;
        }
        loadPlants();
        
        // Update button states
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        if (event && event.target) {
            event.target.classList.add('active');
        }
    }
}

// Show all categories
function showAllCategories() {
    // This could open a modal or navigate to a categories page
    console.log('Show all categories clicked');
}

// Update user info
function updateUserInfo() {
    // Update streak from auth system
    if (window.currentUser && window.currentUser.streak) {
        const streakElement = document.getElementById('user-streak');
        if (streakElement) {
            streakElement.textContent = window.currentUser.streak;
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    // Close modal on backdrop click
    const modal = document.getElementById('detail-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Add missing showPlantDetail function (only if not defined in HTML)
if (typeof window.showPlantDetail === 'undefined') {
    window.showPlantDetail = function(plantId, category) {
        console.log('Showing plant detail for:', plantId, category);
        // Store selected plant data
        window.selectedPlantId = plantId;
        window.selectedPlantCategory = category;
        
        // Find plant data
        let plant = null;
        if (typeof window.PLANTS_DATA !== 'undefined' && window.PLANTS_DATA) {
            if (category && window.PLANTS_DATA[category]) {
                plant = window.PLANTS_DATA[category].find(p => p.id === plantId);
            }
        }
        
        if (plant) {
            // Show modal with plant details
            const modal = document.getElementById('detail-modal');
            if (modal) {
                // Update modal content
                const modalIcon = document.getElementById('modal-icon');
                const modalName = document.getElementById('modal-name');
                const modalCategory = document.getElementById('modal-category');
                
                if (modalIcon) modalIcon.textContent = plant.icon;
                if (modalName) modalName.textContent = plant.name;
                if (modalCategory) modalCategory.textContent = plant.categoryName || category;
                
                modal.classList.add('active');
            }
        }
    };
}

// Export functions for global access (only if not already defined)
if (typeof window.closeModal === 'undefined') {
    window.closeModal = closeModal;
}
if (typeof window.filterCategory === 'undefined') {
    window.filterCategory = filterCategory;
}
if (typeof window.showAllCategories === 'undefined') {
    window.showAllCategories = showAllCategories;
}
if (typeof window.showPlantDetail === 'undefined') {
    window.showPlantDetail = showPlantDetail;
}

console.log('Kebun Ajaib: Game.js loaded successfully');
