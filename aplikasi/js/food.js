/**
 * AGROPLAY - Food Recipes JavaScript
 * Olahan Makanan - Resep dari Hasil Bumi
 */

var RECIPES = {
    sayuran: [
        { id: 'sambal', name: 'Sambal Terasi', icon: '🌶️', time: '10 menit', difficulty: 'Mudah', bahan: ['10 buah cabe merah', '5 buah cabe rawit', '1 sachet terasi', '2 siung bawang putih'], cara: ['Panaskan minyak', 'Goreng cabe dan bawang', 'Haluskan semua bahan', 'Tambahkan garam dan gula'] },
        { id: 'keripik', name: 'Keripik Sayuran', icon: '🥔', time: '30 menit', difficulty: 'Mudah', bahan: ['1 buah kentang', 'Tepung serbaguna', 'Bumbu halus'], cara: ['Iris tipis sayuran', 'Celupkan ke adonan', 'Goreng hingga kuning'] },
        { id: 'lodeh', name: 'Sayur Lodeh', icon: '🥬', time: '45 menit', difficulty: 'Sedang', bahan: ['200g nangka muda', 'Kacang panjang', 'Labu siam', 'Santan'], cara: ['Potong sayuran', 'Tumis bumbu', 'Masak dengan santan'] },
        { id: 'asinan', name: 'Asinan Sayuran', icon: '🥒', time: '24 jam', difficulty: 'Sedang', bahan: ['Kol', 'Wortel', 'Timun', 'Cuka'], cara: ['Iris sayuran', 'Rendam garam', 'Buat larutan cuka', 'Diamkan 24 jam'] }
    ],
    buah: [
        { id: 'getuk', name: 'Getuk Singkong', icon: '🍠', time: '25 menit', difficulty: 'Mudah', bahan: ['500g singkong', 'Gula merah', 'Kelapa parut'], cara: ['Kukus singkong', 'Haluskan', 'Campur gula', 'Taburi kelapa'] },
        { id: 'klepon', name: 'Klepon', icon: '🟢', time: '40 menit', difficulty: 'Sedang', bahan: ['Tepung ketan', 'Gula merah', 'Pandan'], cara: ['Buat isian', 'Bulatkan', 'Kukus', 'Gulingkan di kelapa'] },
        { id: 'sale', name: 'Sale Pisang', icon: '🍌', time: '3 hari', difficulty: 'Sedang', bahan: ['Pisang kepok', 'Gula'], cara: ['Iris tipis', 'Rendam gula', 'Jemur 3 hari', 'Goreng'] },
        { id: 'dodol', name: 'Dodol', icon: '🍫', time: '4 jam', difficulty: 'Sulit', bahan: ['Beras ketan', 'Gula merah', 'Santan'], cara: ['Kukus ketan', 'Masak santan', 'Aduk 4 jam', 'Dinginkan'] }
    ],
    kelas: [
        { id: 'video1', name: 'Video: Sambal', icon: '📺', time: '10 menit', difficulty: 'Mudah', bahan: [], cara: ['Tonton video tutorial'] },
        { id: 'video2', name: 'Video: Keripik', icon: '📺', time: '15 menit', difficulty: 'Mudah', bahan: [], cara: ['Tonton video tutorial'] },
        { id: 'video3', name: 'Video: Getuk', icon: '📺', time: '12 menit', difficulty: 'Mudah', bahan: [], cara: ['Tonton video tutorial'] }
    ]
};

var currentCategory = 'all';

document.addEventListener('DOMContentLoaded', function() {
    renderRecipes();
});

function renderRecipes() {
    var grid = document.getElementById('recipes-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    var allRecipes = [];
    if (currentCategory === 'all') {
        Object.keys(RECIPES).forEach(function(key) {
            allRecipes = allRecipes.concat(RECIPES[key]);
        });
    } else {
        allRecipes = RECIPES[currentCategory] || [];
    }
    
    allRecipes.forEach(function(recipe, index) {
        var card = document.createElement('div');
        card.className = 'recipe-card';
        card.style.animationDelay = (index * 0.1) + 's';
        card.onclick = function() { showRecipe(recipe.id); };
        
        var diffClass = recipe.difficulty === 'Mudah' ? 'easy' : recipe.difficulty === 'Sedang' ? 'medium' : 'hard';
        
        card.innerHTML = '<div class="recipe-icon">' + recipe.icon + '</div>' +
            '<div class="recipe-content"><h3>' + recipe.name + '</h3>' +
            '<div class="recipe-meta"><span><i class="fas fa-clock"></i> ' + recipe.time + '</span>' +
            '<span class="difficulty ' + diffClass + '">' + recipe.difficulty + '</span></div></div>';
        
        grid.appendChild(card);
    });
}

function filterRecipes(category) {
    currentCategory = category;
    document.querySelectorAll('.category-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    var btn = document.querySelector('[data-category="' + category + '"]');
    if (btn) btn.classList.add('active');
    renderRecipes();
}

function showRecipe(id) {
    var recipe = null;
    Object.keys(RECIPES).forEach(function(key) {
        RECIPES[key].forEach(function(r) {
            if (r.id === id) recipe = r;
        });
    });
    if (!recipe) return;
    
    var modal = document.getElementById('recipe-modal');
    var body = document.getElementById('modal-body');
    var diffClass = recipe.difficulty === 'Mudah' ? 'easy' : recipe.difficulty === 'Sedang' ? 'medium' : 'hard';
    
    var bahanHtml = '';
    if (recipe.bahan.length > 0) {
        bahanHtml = '<div class="recipe-section"><h3><i class="fas fa-shopping-basket"></i> Bahan</h3><ul class="ingredients-list">' +
            recipe.bahan.map(function(b) { return '<li>' + b + '</li>'; }).join('') + '</ul></div>';
    }
    
    body.innerHTML = '<div class="recipe-detail-header"><span class="recipe-detail-icon">' + recipe.icon + '</span>' +
        '<h2>' + recipe.name + '</h2><div class="recipe-detail-meta">' +
        '<span><i class="fas fa-clock"></i> ' + recipe.time + '</span>' +
        '<span class="difficulty ' + diffClass + '">' + recipe.difficulty + '</span></div></div>' +
        bahanHtml +
        '<div class="recipe-section"><h3><i class="fas fa-clipboard-list"></i> Cara Membuat</h3><ol class="steps-list">' +
        recipe.cara.map(function(c, i) { return '<li>' + c + '</li>'; }).join('') + '</ol></div>' +
        '<button class="btn-save-recipe" onclick="saveRecipe(\'' + recipe.id + '\')"><i class="fas fa-bookmark"></i> Simpan Resep</button>';
    
    modal.classList.add('active');
}

function saveRecipe(id) {
    alert('Resep disimpan! ❤️');
}

function closeModal() {
    var modal = document.getElementById('recipe-modal');
    if (modal) modal.classList.remove('active');
}

document.addEventListener('click', function(e) {
    var modal = document.getElementById('recipe-modal');
    if (modal && e.target === modal) closeModal();
});

// REALTIME INTEGRATION - PHASE 3.9 (KEBUN AJAIB FOOD)
// Track recipe view as "guide read" for food processing learning
function trackRecipeInteraction(recipeId) {
    if (typeof REALTIME !== 'undefined' && REALTIME.getCurrentUserData()) {
        REALTIME.incrementStat('guidesRead');  // Recipe = guide learning
        REALTIME.addXP(10, `Food Recipe: Viewed ${recipeId}`);
        REALTIME.recordActivity(REALTIME.ACTIVITY_TYPES.READ_GUIDE, { 
            recipe: recipeId, 
            category: 'food_processing',
            virtual: true 
        });
    }
    console.log(' Food recipe tracked:', recipeId);
}

// Override showRecipe to track learning interaction
const originalShowRecipe = showRecipe;
showRecipe = function(id) {
    trackRecipeInteraction(id);
    originalShowRecipe(id);
};

// Track recipe save as deeper engagement
const originalSaveRecipe = saveRecipe;
saveRecipe = function(id) {
    if (typeof REALTIME !== 'undefined') {
        REALTIME.incrementStat('guidesRead');  // Bonus for saving
        REALTIME.addXP(15, `Food Recipe: Saved ${id}`);
    }
    originalSaveRecipe(id);
};


