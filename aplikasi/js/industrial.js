/**
 * AGROPLAY - Industrial JavaScript
 * Industri - Pengolahan Hasil Bumi
 */

var INDUSTRIAL_PRODUCTS = {
    sayuran: [
        { name: 'Keripik Sayuran', icon: '🥔', desc: 'Keripik dari kentang, wortel, bayam', price: 'Rp 25.000' },
        { name: 'Sayur Kranggan', icon: '🥬', desc: 'Sayuran beku siap masak', price: 'Rp 15.000' },
        { name: 'Asinan Sayuran', icon: '🥒', desc: 'Sayuran asin tahan lama', price: 'Rp 12.000' },
        { name: 'Sayur Kering', icon: '🍂', desc: 'Sayuran dikeringkan untuk konsumsi', price: 'Rp 20.000' },
        { name: 'Sayur Bots', icon: '🥗', desc: 'Sayuran dalam botol', price: 'Rp 18.000' }
    ],
    buah: [
        { name: 'Jus Buah', icon: '🧃', desc: 'Jus segar berbagai buah', price: 'Rp 10.000' },
        { name: 'Selai Buah', icon: '🍯', desc: 'Selai handmade dari buah segar', price: 'Rp 22.000' },
        { name: 'Manisan Buah', icon: '🍬', desc: 'Buah yang dimaniskan', price: 'Rp 18.000' },
        { name: 'Dried Fruit', icon: '🍇', desc: 'Buah kering tanpa gula', price: 'Rp 30.000' },
        { name: 'Fruit Candy', icon: '🍭', desc: 'Permen dari buah', price: 'Rp 8.000' }
    ],
    cabe: [
        { name: 'Sambal Goreng', icon: '🌶️', desc: 'Sambal dari cabe merah', price: 'Rp 15.000' },
        { name: 'Cabe Kering', icon: '🌶️', desc: 'Cabe dirajang dan dikeringkan', price: 'Rp 35.000' },
        { name: 'Sambal Terasi', icon: '🫙', desc: 'Sambal tradisional terasi', price: 'Rp 12.000' }
    ],
    beras: [
        { name: 'Beras Merah', icon: '🍚', desc: 'Beras sehat tanpa pengawet', price: 'Rp 15.000' },
        { name: 'Beras Ketan', icon: '🍙', desc: 'Beras ketan untuk kue', price: 'Rp 14.000' },
        { name: 'Nasi Kernel', icon: '🌾', desc: 'Beras jagung', price: 'Rp 12.000' },
        { name: 'Beras Organik', icon: '🌱', desc: 'Bebas pestisida kimia', price: 'Rp 18.000' }
    ],
    singkong: [
        { name: 'Tapioka', icon: '🧼', desc: 'Pati dari singkong', price: 'Rp 12.000' },
        { name: 'Kerupuk Singkong', icon: '🍘', desc: 'Krupuk putih renyah', price: 'Rp 15.000' },
        { name: 'Getuk Singkong', icon: '🍠', desc: 'Kue singkong rebus', price: 'Rp 10.000' },
        { name: 'Klepon', icon: '🟢', desc: 'Kue ketan isi gula merah', price: 'Rp 8.000' }
    ],
    kelapa: [
        { name: 'Minyak Kelapa', icon: '🫗', desc: 'Minyak murni dari kelapa', price: 'Rp 25.000' },
        { name: 'Kopra', icon: '🥥', desc: 'Daging kelapa kering', price: 'Rp 20.000' },
        { name: 'Santan Instan', icon: '🥛', desc: 'Santan siap pakai', price: 'Rp 8.000' },
        { name: 'Akar Kelapa', icon: '🪵', desc: 'Kerajinan dari akar kelapa', price: 'Rp 15.000' }
    ]
};

var FEATURED = [
    { name: 'Madu Hutan', icon: '🍯', desc: 'Hasil hutan bernilai tinggi', price: 'Rp 150.000/kg' },
    { name: 'Kopi Luwak', icon: '☕', desc: 'Kopi elite dari biji luwak', price: 'Rp 500.000/kg' },
    { name: 'Vanili', icon: '🌸', desc: 'Parfum alami dari vanili', price: 'Rp 250.000/kg' }
];

document.addEventListener('DOMContentLoaded', function() {
    console.log('Agroplay Industri loaded!');
});

function showCategory(category) {
    var products = INDUSTRIAL_PRODUCTS[category];
    if (!products) return;

    var modal = document.getElementById('product-modal');
    var body = document.getElementById('modal-body');
    
    var categoryNames = {
        'sayuran': 'Pengolahan Sayuran',
        'buah': 'Pengolahan Buah',
        'cabe': 'Pengolahan Cabe',
        'beras': 'Pengolahan Beras',
        'singkong': 'Pengolahan Singkong',
        'kelapa': 'Pengolahan Kelapa'
    };

    var productsHtml = '';
    for (var i = 0; i < products.length; i++) {
        var p = products[i];
        productsHtml += '<div class="product-item">' +
            '<span class="product-icon">' + p.icon + '</span>' +
            '<div class="product-info"><h4>' + p.name + '</h4><p>' + p.desc + '</p></div>' +
            '<span class="product-price">' + p.price + '</span></div>';
    }
    
    body.innerHTML = '<div class="modal-header"><h2>' + categoryNames[category] + '</h2></div>' +
        '<div class="products-list">' + productsHtml + '</div>';
    
    modal.classList.add('active');
}

function closeModal() {
    var modal = document.getElementById('product-modal');
    if (modal) modal.classList.remove('active');
}

document.addEventListener('click', function(e) {
    var modal = document.getElementById('product-modal');
    if (modal && e.target === modal) closeModal();
});

// 🏭 REALTIME INTEGRATION - PHASE 3.9 (KEBUN AJAIB INDUSTRIAL)
// Track product view as "industrial plant interaction"
function trackIndustrialInteraction(category) {
    if (typeof REALTIME !== 'undefined' && REALTIME.getCurrentUserData()) {
        REALTIME.incrementStat('plantsPlanted');  // Virtual "industrial plant explored"
        REALTIME.addXP(20, `Industrial: ${category}`);
        REALTIME.recordActivity(REALTIME.ACTIVITY_TYPES.PLANT_CROP, { 
            category: 'industrial', 
            products: category,
            virtual: true 
        });
        console.log('✅ Industrial category tracked:', category);
    }
}

// Override showCategory to track interaction
const originalShowCategory = showCategory;
showCategory = function(category) {
    trackIndustrialInteraction(category);
    originalShowCategory(category);
};


