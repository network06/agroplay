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
    
    const particles = ['leaf', 'flower', 'seed', 'sparkle'];
    const particleEmojis = ['leaf', 'flower', 'seed', 'sparkle'];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = ['leaf', 'flower', 'seed', 'sparkle'][Math.floor(Math.random() * 4)];
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
    if (typeof PLANTS_DATA !== 'undefined' && PLANTS_DATA && typeof currentCategory !== 'undefined') {
        plants = PLANTS_DATA[currentCategory] || [];
    }
    
    plants.forEach((plant, index) => {
        const card = createPlantCard(plant, index);
        grid.appendChild(card);
    });
}

// Create plant card element
function createPlantCard(plant, index) {
    const card = document.createElement('div');
    card.className = 'plant-card bg-white rounded-2xl p-5 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-3 border-transparent hover:border-primary-green/30';
    card.style.animationDelay = `${index * 0.1}s`;
    card.style.animation = 'plantCardEntrance 0.5s ease forwards';
    
    card.innerHTML = `
        <div class="text-5xl mb-3 plant-card-icon">${plant.icon}</div>
        <div class="font-fredoka font-bold text-lg mb-1 plant-card-name">${plant.name}</div>
        <div class="text-xs text-gray-600 font-nunito plant-card-desc">${plant.nameId}</div>
    `;
    
    card.onclick = () => showPlantDetail(plant.id, plant.category);
    
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
        if (typeof currentCategory !== 'undefined') {
            window.currentCategory = category;
        }
        loadPlants();
        
        // Update button states
        document.querySelectorAll('.category-btn').forEach(btn => {
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

console.log('Kebun Ajaib: Game.js loaded successfully');
