// ==================== SHOP DATA AND COMPLETE FUNCTIONS ====================

// Complete Shop Items Database
if (typeof SHOP_ITEMS === 'undefined') {
    var SHOP_ITEMS = {
    seeds: [
        { id: 'padi', name: 'Bibit Padi', icon: '🌾', price: 100, description: 'Bibit padi berkualitas tinggi' },
        { id: 'jagung', name: 'Bibit Jagung', icon: '🌽', price: 150, description: 'Bibit jagung manis' },
        { id: 'cabai', name: 'Bibit Cabai', icon: '🌶️', price: 200, description: 'Bibit cabai pedas' },
        { id: 'tomat', name: 'Bibit Tomat', icon: '🍅', price: 180, description: 'Bibit tomat segar' },
        { id: 'kentang', name: 'Bibit Kentang', icon: '🥔', price: 250, description: 'Bibit kentang premium' },
        { id: 'wortel', name: 'Bibit Wortel', icon: '🥕', price: 220, description: 'Bibit wortel organik' },
        { id: 'bayam', name: 'Bibit Bayam', icon: '🥬', price: 80, description: 'Bibit bayam hijau' },
        { id: 'stroberi', name: 'Bibit Stroberi', icon: '🍓', price: 300, description: 'Bibit stroberi manis' },
        { id: 'melon', name: 'Bibit Melon', icon: '🍈', price: 350, description: 'Bibit melon jumbo' },
        { id: 'tebu', name: 'Bibit Tebu', icon: '🎋', price: 120, description: 'Bibit tebu manis' },
        { id: 'kapas', name: 'Bibit Kapas', icon: '☁️', price: 200, description: 'Bibit kapas putih' },
        { id: 'kopi', name: 'Bibit Kopi', icon: '☕', price: 400, description: 'Bibit kopi arabika' },
        { id: 'jahe', name: 'Bibit Jahe', icon: '🫚', price: 180, description: 'Bibit jahe segar' },
        { id: 'kunyit', name: 'Bibit Kunyit', icon: '🟡', price: 160, description: 'Bibit kunyit alami' },
        { id: 'mawar', name: 'Bibit Mawar', icon: '🌹', price: 500, description: 'Bibit mawar merah' },
        { id: 'anggrek', name: 'Bibit Anggrek', icon: '🦋', price: 800, description: 'Bibit anggrek langka' }
    ],
    fertilizers: [
        { id: 'none', name: 'Tanpa Pupuk', icon: '🚫', price: 0, description: 'Tidak menggunakan pupuk' },
        { id: 'organik', name: 'Pupuk Organik', icon: '🌿', price: 50, description: 'Pupuk alami untuk tanaman' },
        { id: 'kimia', name: 'Pupuk Kimia', icon: '⚗️', price: 80, description: 'Pupuk kimia cepat bereaksi' },
        { id: 'kompos', name: 'Pupuk Kompos', icon: '♻️', price: 60, description: 'Pupuk dari kompos rumah tangga' },
        { id: 'premium', name: 'Pupuk Premium', icon: '⭐', price: 150, description: 'Pupuk kualitas tertinggi' }
    ],
    tools: [
        { id: 'cangkul', name: 'Cangkul', icon: '🔨', price: 500, description: 'Alat untuk mengolah tanah' },
        { id: 'garu', name: 'Garu', icon: '🔥', price: 300, description: 'Alat untuk meratakan tanah' },
        { id: 'sprayer', name: 'Sprayer', icon: '💨', price: 800, description: 'Alat untuk menyemprot pupuk' },
        { id: 'siram', name: 'Selang Siram', icon: '🚿', price: 200, description: 'Selang untuk menyiram tanaman' },
        { id: 'mulsa', name: 'Mulsa Plastik', icon: '🛡️', price: 100, description: 'Plastik penutup tanah' }
    ],
    upgrades: [
        { id: 'tanah_plus', name: 'Tanah Premium', icon: '🌍', price: 1000, description: 'Upgrade kualitas tanah' },
        { id: 'irigasi', name: 'Sistem Irigasi', icon: '💧', price: 2000, description: 'Sistem penyiraman otomatis' },
        { id: 'greenhouse', name: 'Greenhouse Mini', icon: '🏡', price: 5000, description: 'Rumah kaca mini' },
        { id: 'storage', name: 'Gudang Penyimpanan', icon: '🏭', price: 3000, description: 'Tempat penyimpanan hasil panen' }
    ]
};

// Make SHOP_ITEMS available globally
window.SHOP_ITEMS = SHOP_ITEMS;

// Complete Tutorial Function
function showTutorial() {
    console.log('Opening tutorial...');
    const tutorialHTML = `
        <div class="tutorial-container">
            <h3 class="text-xl font-bold mb-4">Tutorial Bermain</h3>
            
            <div class="tutorial-steps">
                <div class="tutorial-step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h4>Memilih Plot</h4>
                        <p>Klik pada salah satu plot kosong untuk memulai menanam</p>
                    </div>
                </div>
                
                <div class="tutorial-step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h4>Memilih Tanaman</h4>
                        <p>Pilih tanaman yang ingin ditanam dari 17 pilihan yang tersedia</p>
                    </div>
                </div>
                
                <div class="tutorial-step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h4>Menambah Pupuk</h4>
                        <p>Pilih jenis pupuk untuk meningkatkan hasil panen</p>
                    </div>
                </div>
                
                <div class="tutorial-step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                        <h4>Menyiram Tanaman</h4>
                        <p>Atur level air dan pilih metode penanaman</p>
                    </div>
                </div>
                
                <div class="tutorial-step">
                    <div class="step-number">5</div>
                    <div class="step-content">
                        <h4>Menunggu Pertumbuhan</h4>
                        <p>Tanaman akan tumbuh secara otomatis dalam beberapa waktu</p>
                    </div>
                </div>
                
                <div class="tutorial-step">
                    <div class="step-number">6</div>
                    <div class="step-content">
                        <h4>Memanen Hasil</h4>
                        <p>Klik pada tanaman yang sudah siap dipanen</p>
                    </div>
                </div>
            </div>
            
            <div class="tutorial-tips">
                <h4>Tips Tambahan:</h4>
                <ul>
                    <li>?? Gunakan pupuk organik untuk hasil yang lebih baik</li>
                    <li>?? Pantau level air tanaman secara teratur</li>
                    <li>?? Selesaikan tantangan harian untuk mendapatkan bonus</li>
                    <li>?? Kunjungi toko untuk membeli bibit dan alat pertanian</li>
                    <li>?? Cek pencapaian untuk melihat progress Anda</li>
                </ul>
            </div>
        </div>
    `;
    
    window.showModal('Tutorial Bermain', tutorialHTML);
};};

// Make showTutorial available globally
window.showTutorial = showTutorial;
