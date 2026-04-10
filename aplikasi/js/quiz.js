/**
 * AGROPLAY - Kuis Seru Tani JavaScript
 * Complete with Category & Plant Selection
 * Based on the Roadmap: IV. DETAIL ALUR KUIS SERU TANI
 * 
 * REVISED: Now with 10 questions per plant (expanded from 3)
 * Tanaman Hias reduced to 3 plants (reduced from many)
 * Total 17 plants remain unchanged
 */

// ==================== DATA ====================

// Category Data - Updated with fewer ornamental plants + makanan
var CATEGORIES = {
    pangan: { 
        id: 'pangan', 
        name: 'Pangan', 
        icon: '🍚', 
        plants: ['padi', 'jagung', 'kentang']
    },
    industri: { 
        id: 'industri', 
        name: 'Industri', 
        icon: '🏭', 
        plants: ['kelapa_sawit', 'karet', 'tebu', 'kapas']
    },
    hias: { 
        id: 'hias', 
        name: 'Hias', 
        icon: '🌸', 
        plants: ['kembang_sepatu', 'rumput_bojosh', 'monstera']
    },
    obat: { 
        id: 'obat', 
        name: 'Obat', 
        icon: '💊', 
        plants: ['lidah_buaya', 'jahe', 'kunyit']
    },
    serat: { 
        id: 'serat', 
        name: 'Serat', 
        icon: '🧵', 
        plants: ['melok', 'rumput_odod', 'sisal', 'rami']
    },
    makanan: { 
        id: 'makanan', 
        name: 'Makanan', 
        icon: '🍽️', 
        plants: ['nasi', 'lontong', 'ketoprak', 'gado_gado', 'sambal', 'getuk']
    },
    hama: {
        id: 'hama',
        name: 'Hama',
        icon: '🐛',
        plants: ['kutu_daen', 'ulat_daun', 'kutu_kebul', 'tungau', 'wereng']
    }
};

// Plant Data (for selection display) - Updated to match categories
var PLANTS_DATA = {
    // PANGAN (3)
    'padi': { id: 'padi', name: 'Padi', emoji: '🌾', category: 'pangan' },
    'jagung': { id: 'jagung', name: 'Jagung', emoji: '🌽', category: 'pangan' },
    'kentang': { id: 'kentang', name: 'Kentang', emoji: '🥔', category: 'pangan' },
    
    // INDUSTRI (4)
    'kelapa_sawit': { id: 'kelapa_sawit', name: 'Kelapa Sawit', emoji: '🥥', category: 'industri' },
    'karet': { id: 'karet', name: 'Karet', emoji: '🌳', category: 'industri' },
    'tebu': { id: 'tebu', name: 'Tebu', emoji: '🎋', category: 'industri' },
    'kapas': { id: 'kapas', name: 'Kapas', emoji: '☁️', category: 'industri' },
    
    // HIAS (3 - reduced from many)
    'kembang_sepatu': { id: 'kembang_sepatu', name: 'Kembang Sepatu', emoji: '🌺', category: 'hias' },
    'rumput_bojosh': { id: 'rumput_bojosh', name: 'Rumput Bojosh', emoji: '🌿', category: 'hias' },
    'monstera': { id: 'monstera', name: 'Monstera', emoji: '🌱', category: 'hias' },
    
    // OBAT (3)
    'lidah_buaya': { id: 'lidah_buaya', name: 'Lidah Buaya', emoji: '🪴', category: 'obat' },
    'jahe': { id: 'jahe', name: 'Jahe', emoji: '🫚', category: 'obat' },
    'kunyit': { id: 'kunyit', name: 'Kunyit', emoji: '🧡', category: 'obat' },
    
// SERAT (4)
    'melok': { id: 'melok', name: 'Melok', emoji: '🌴', category: 'serat' },
    'rumput_odod': { id: 'rumput_odod', name: 'Rumput Odod', emoji: '🌾', category: 'serat' },
    'sisal': { id: 'sisal', name: 'Sisal', emoji: '🌵', category: 'serat' },
    'rami': { id: 'rami', name: 'Rami', emoji: '🌿', category: 'serat' },
    
    // MAKANAN (6)
    'nasi': { id: 'nasi', name: 'Nasi', emoji: '🍚', category: 'makanan' },
    'lontong': { id: 'lontong', name: 'Lontong', emoji: '🥣', category: 'makanan' },
    'ketoprak': { id: 'ketoprak', name: 'Ketoprak', emoji: '🥜', category: 'makanan' },
    'gado_gado': { id: 'gado_gado', name: 'Gado-gado', emoji: '🥗', category: 'makanan' },
    'sambal': { id: 'sambal', name: 'Sambal', emoji: '🌶️', category: 'makanan' },
    'getuk': { id: 'getuk', name: 'Getuk', emoji: '🍠', category: 'makanan' },
    
    // HAMA (5)
    'kutu_daun': { id: 'kutu_daun', name: 'Kutu Daun', emoji: '🐜', category: 'hama' },
    'ulat_daun': { id: 'ulat_daun', name: 'Ulat Daun', emoji: '🐛', category: 'hama' },
    'kutu_kebul': { id: 'kutu_kebul', name: 'Kutu Kebul', emoji: '🦟', category: 'hama' },
    'tungau': { id: 'tungau', name: 'Tungau', emoji: '🕷️', category: 'hama' },
    'wereng': { id: 'wereng', name: 'Wereng', emoji: '🐝', category: 'hama' }
};

// Questions Database - 10 Questions per plant (Expanded from 3)
// Total: 16 plants x 10 questions = 160 questions
var QUESTIONS_DB = {
    // === PANGAN (3 plants x 10 questions) ===
    'padi': [
        { question: "Bagian mana dari padi yang menjadi nasi?", options: ["Akar", "Batang", "Biji", "Daun"], correct: 2, explanation: "Biji padi yang menjadi beras, lalu dimasak menjadi nasi" },
        { question: "Tinggi tanaman padi biasanya...", options: ["50-100 cm", "60-120 cm", "10-20 meter", "2-6 meter"], correct: 1, explanation: "Padi dapat tumbuh tinggi sekitar 60-120 cm" },
        { question: "Padi termasuk tanaman...", options: ["Semak", "Pohon", "Herba", "Liana"], correct: 2, explanation: "Padi adalah tanaman herba dengan batang kosong di dalam" },
        { question: "Apa nama ilmiah tanaman padi?", options: ["Oryza sativa", "Zea mays", "Solanum tuberosum", "Glycine max"], correct: 0, explanation: "Nama ilmiah tanaman padi adalah Oryza sativa" },
        { question: "Padi membutuhkan air yang...", options: ["Sedikit", "Sangat banyak", "Tidak perlu", "Sedang"], correct: 1, explanation: "Padi membutuhkan banyak air, terutama pada fase awal pertumbuhan" },
        { question: "Bunga padi disebut...", options: ["Malai", "Kembang", "Jumbai", "Setrip"], correct: 0, explanation: "Bunga padi disebut malai, terletak di ujung batang" },
        { question: "Padi dipanen saat berwarna...", options: ["Hijau", "Kuning keemasan", "Coklat", "Merah"], correct: 1, explanation: "Padi dipanen saat warna berubah menjadi kuning keemasan" },
        { question: "Apa kegunaan jerami padi?", options: ["Makanan utama", "Pupuk hijau", "Bahan bakar", "Semua benar"], correct: 3, explanation: "Jerami dapat digunakan untuk pupuk, bahan bakar, dan kerajinan" },
        { question: "Indonesia merupakan negara...", options: ["Penghasil padi terbesar", "Importir beras terbesar", "Produsen gandum", "Penghasil jagung"], correct: 0, explanation: "Indonesia adalah salah satu negara penghasil padi terbesar di dunia" },
        { question: "Padi tumbuh terbaik di daerah...", options: ["Pegunungan tinggi", "Dataran rendah berair", "Gurun", "Kutub"], correct: 1, explanation: "Padi tumbuh terbaik di dataran rendah yang banyak air" }
    ],
    'jagung': [
        { question: "Tinggi tanaman jagung biasanya...", options: ["50-100 cm", "150-300 cm", "10-20 meter", "2-6 meter"], correct: 1, explanation: "Jagung dapat tumbuh tinggi hingga 150-300 cm" },
        { question: "Produk utama dari jagung adalah...", options: ["Minyak", "Gula", "Karbohidrat", "Serat"], correct: 2, explanation: "Jagung merupakan sumber carbohydrates yang baik" },
        { question: "Bunga jagung jantan terletak di...", options: ["Pangkal batang", "Ujung batang", "Tengah batang", "Akar"], correct: 1, explanation: "Bunga jantan jagung berada di ujung batang (malai)" },
        { question: "Nama ilmiah jagung adalah...", options: ["Oryza sativa", "Zea mays", "Solanum tuberosum", "Capsicum annuum"], correct: 1, explanation: "Nama ilmiah jagung adalah Zea mays" },
        { question: "Jagung termasuk dalam keluarga...", options: ["Leguminosae", "Gramineae", "Solanaceae", "Cucurbitaceae"], correct: 1, explanation: "Jagung termasuk dalam keluarga Gramineae (rumput-rumputan)" },
        { question: "Buah jagung disebut...", options: ["Biji", "Buah", "Tongkol", "Umbi"], correct: 2, explanation: "Buah jagung disebut tongkol, tempat biji-biji jagung" },
        { question: "Jagung dapat diolah menjadi...", options: ["Minyak goreng", "Tepung", "Popcorn", "Semua benar"], correct: 3, explanation: "Jagung dapat diolah menjadi minyak, tepung, popcorn, dan lainnya" },
        { question: "Daun jagung berbentuk...", options: ["Bundar", "Panjang dan lebar", "Bulat kecil", "Beras"], correct: 1, explanation: "Daun jagung panjang dan lebar, membantu fotosintesis" },
        { question: "Jagung membutuhkan sinar matahari...", options: ["Sedikit", "Sangat banyak", "Tidak butuh", "Bisa hidup di gelap"], correct: 1, explanation: "Jagung membutuhkan sinar matahari penuh untuk tumbuh optimal" },
        { question: "Kandungan utama jagung adalah...", options: ["Protein tinggi", "Karbohidrat", "Vitamin C", "Mineral"], correct: 1, explanation: "Jagung kaya akan carbohydrates sebagai sumber energi" }
    ],
    'kentang': [
        { question: "Kentang adalah tanaman yang menghasilkan...", options: ["Biji", "Buah", "Umbi", "Daun"], correct: 2, explanation: "Kentang menghasilkan umbi yang berada di dalam tanah" },
        { question: "Kentang dapat diolah menjadi...", options: ["Minyak", "Kerupuk", "Gula", "Kain"], correct: 1, explanation: "Kentang dapat diolah menjadi kerupuk kentang" },
        { question: "Kentang mengandung banyak...", options: ["Vitamin C", "Protein", "Lemak", "Serat"], correct: 0, explanation: "Kentang mengandung vitamin C yang baik untuk tubuh" },
        { question: "Nama ilmiah kentang adalah...", options: ["Oryza sativa", "Zea mays", "Solanum tuberosum", "Ipomoea batatas"], correct: 2, explanation: "Nama ilmiah kentang adalah Solanum tuberosum" },
        { question: "Kentang berasal dari negara...", options: ["Indonesia", "India", "Amerika Selatan", "Afrika"], correct: 2, explanation: "Kentang berasal dari pegunungan Andes, Amerika Selatan" },
        { question: "Umbi kentang tumbuh di...", options: ["Batang", "Akar", "Daun", "Bunga"], correct: 1, explanation: "Umbi kentang berkembang dari akar yang menggelembung" },
        { question: "Warna bunga kentang biasanya...", options: ["Merah", "Putih atau ungu", "Kuning", "Biru"], correct: 1, explanation: "Bunga kentang berwarna putih atau ungu" },
        { question: "Kentang membutuhkan iklim...", options: ["Panas ekstrim", "Sedang dingin", "Tropis kering", "Gurun"], correct: 1, explanation: "Kentang tumbuh terbaik di iklim sedang yang sejuk" },
        { question: "Penyakit utama kentang adalah...", options: ["Demam", "Busuk umbi", "Patek", "Semua benar"], correct: 3, explanation: "Kentang rentan terhadap busuk umbi dan penyakit lain" },
        { question: "Kentang dimakan bagian...", options: ["Batang", "Daun", "Umbi", "Bunga"], correct: 2, explanation: "Bagian yang dimakan dari kentang adalah umbinya" }
    ],
    
    // === INDUSTRI (4 plants x 10 questions) ===
    'kelapa_sawit': [
        { question: "Apa produk utama dari kelapa sawit?", options: ["Minyak", "Getah", "Gula", "Serat"], correct: 0, explanation: "Kelapa Sawit menghasilkan minyak goreng berkualitas tinggi" },
        { question: "Buah kelapa sawit berwarna...", options: ["Hijau", "Merah oranye", "Kuning", "Coklat"], correct: 1, explanation: "Buah kelapa Sawit berwarna merah oranye saat matang" },
        { question: "Tinggi pohon kelapa sawit...", options: ["2-5 meter", "10-20 meter", "50-100 meter", "1-2 meter"], correct: 1, explanation: "Kelapa Sawit dapat tumbuh hingga 10-20 meter" },
        { question: "Nama ilmiah kelapa sawit adalah...", options: ["Cocos nucifera", "Elaeis guineensis", "Areca catechu", "Borassus flabellifer"], correct: 1, explanation: "Nama ilmiah kelapa Sawit adalah Elaeis guineensis" },
        { question: "Minyak kelapa sawit digunakan untuk...", options: ["Makanan", "Kosmetik", "Biodiesel", "Semua benar"], correct: 3, explanation: "Minyak Sawit digunakan untuk makanan, kosmetik, dan biodiesel" },
        { question: "Daun kelapa Sawit berbentuk...", options: ["Bundar", "Menyirip seperti kipas", "Bulat kecil", "Berlilin"], correct: 1, explanation: "Daun kelapa Sawit menyirip panjang seperti kipas" },
        { question: "Indonesia adalah negara...", options: ["Importir minyak Sawit", "Produsen minyak Sawit terbesar", "Konsumen kecil", "Tidak terkait"], correct: 1, explanation: "Indonesia adalah produsen minyak Sawit terbesar dunia" },
        { question: "Buah kelapa Sawit dipanen setelah berumur...", options: ["1-2 bulan", "2-3 tahun", "5-10 tahun", "1 bulan"], correct: 1, explanation: "Buah Sawit dipanen setelah pohon berumur 2-3 tahun" },
        { question: "Proses ekstraksi minyak Sawit menggunakan...", options: ["Pendinginan", "Pemanasan dan pressing", "Pengeringan", "Fermentasi"], correct: 1, explanation: "Minyak Sawit diekstrak dengan pemanasan dan pressing" },
        { question: "Limbah dari kelapa Sawit dapat dibuat...", options: ["Pupuk", "Bahan bakar", "Kertas", "Semua benar"], correct: 3, explanation: "Limbah Sawit dapat用于pupuk, bahan bakar, dan kertas" }
    ],
    'karet': [
        { question: "Apa produk utama dari karet?", options: ["Minyak", "Gula", "Ban", "Kain"], correct: 2, explanation: "Karet alam banyak digunakan untuk membuat ban kendaraan" },
        { question: "Getah dari pohon karet berwarna...", options: ["Kuning", "Putih seperti susu", "Merah", "Hijau"], correct: 1, explanation: "Getah karet berwarna putih seperti susu (lateks)" },
        { question: "Karet banyak digunakan untuk...", options: ["Bahan makanan", "Ban kendaraan", "Bahan bangunan", "Obat"], correct: 1, explanation: "Industri ban kendaraan adalah konsumen utama karet alam" },
        { question: "Nama ilmiah pohon karet adalah...", options: ["Hevea brasiliensis", "Ficus elastica", "Manihot esculenta", "Artocarpus heterophyllus"], correct: 0, explanation: "Nama ilmiah pohon karet adalah Hevea brasiliensis" },
        { question: "Pohon karet berasal dari daerah...", options: ["Indonesia", "Afrika", "Amazon Brazil", "India"], correct: 2, explanation: "Pohon karet berasal dari hutan Amazon, Brazil" },
        { question: "Getah karet diambil dengan cara...", options: ["Memanaskan", "Menyadap", "Menekan", "Merendam"], correct: 1, explanation: "Getah karet diambil dengan menyadap kulit pohon" },
        { question: "Karet dapat diolah menjadi...", options: ["Sarung tangan", "Kondom", "Balon", "Semua benar"], correct: 3, explanation: "Karet dapat用于sarung tangan, kondom, balon, dan ban" },
        { question: "Karet alam berasal dari getah...", options: ["Batang", "Daun", "Akar", "Bunga"], correct: 0, explanation: "Getah karet berasal dari batang pohon" },
        { question: "Setelah disadap, getah karet diolah dengan...", options: ["Pendinginan", "Pengasapan", "Pemanasan", "Pengeringan"], correct: 1, explanation: "Getah karet digongseng (pengasapan) untuk menghasilkan karet jadi" },
        { question: "Karet sintetis dibuat dari...", options: ["Getah pohon", "Minyak bumi", "Air", "Logam"], correct: 1, explanation: "Karet sintetis dibuat dari derivatif minyak bumi" }
    ],
    'tebu': [
        { question: "Tebu biasanya diolah menjadi?", options: ["Gula", "Minyak", "Kertas", "Kain"], correct: 0, explanation: "Tebu diolah menjadi gula pasir" },
        { question: "Tinggi tanaman tebu...", options: ["30-50 cm", "2-6 meter", "10-15 meter", "1-2 meter"], correct: 1, explanation: "Tebu dapat tumbuh hingga 2-6 meter" },
        { question: "Bagian tebu yang digunakan adalah...", options: ["Daun", "Akar", "Batang beruas", "Bunga"], correct: 2, explanation: "Batang tebu yang beruas mengandung gula" },
        { question: "Nama ilmiah tebu adalah...", options: ["Saccharum officinarum", "Sorghum bicolor", "Zea mays", "Oryza sativa"], correct: 0, explanation: "Nama ilmiah tebu adalah Saccharum officinarum" },
        { question: "Tebu mengandung...", options: ["Sukrosa", "Glukosa", "Fruktosa", "Semua benar"], correct: 3, explanation: "Tebu mengandung sukrosa, glukosa, dan fruktosa" },
        { question: "Daun tebu berbentuk...", options: ["Bundar", "Panjang dan tajam", "Bulat kecil", "Berlekuk"], correct: 1, explanation: "Daun tebu panjang dan tajam di tepinya" },
        { question: "Tebu dipanen dengan cara...", options: ["Dicabut", "Dipotong batangnya", "Digali", "Ditebang"], correct: 1, explanation: "Tebu dipotong batangnya saat panen" },
        { question: "Gula yang dihasilkan dari tebu disebut...", options: ["Gula aren", "Gula merah", "Gula pasir", "Gula Jawa"], correct: 2, explanation: "Tebu menghasilkan gula pasir putih" },
        { question: "Tebu membutuhkan iklim...", options: ["Dingin", "Panas dan lembab", "Kering", "Semua jenis"], correct: 1, explanation: "Tebu tumbuh terbaik di iklim panas dan lembab" },
        { question: "Selain gula, tebu juga menghasilkan...", options: ["Molases", "Bagasse", "Paprika", "A dan B benar"], correct: 3, explanation: "Tebu menghasilkan molases dan bagasse (limbah)" }
    ],
    'kapas': [
        { question: "Kapas digunakan untuk membuat?", options: ["Minyak", "Ban", "Pakaian", "Gula"], correct: 2, explanation: "Kapas digunakan sebagai bahan pakaian/tekstil" },
        { question: "Kapas diambil dari bagian...", options: ["Batang", "Daun", "Buah (kapsul)", "Akar"], correct: 2, explanation: "Kapas berasal dari buah/buah kapsul yang matang" },
        { question: "Warna bunga kapas...", options: ["Merah", "Kuning-putih", "Biru", "Ungu"], correct: 1, explanation: "Bunga kapas berwarna kuning yang berubah menjadi putih" },
        { question: "Nama ilmiah kapas adalah...", options: ["Gossypium hirsutum", "Hibiscus rosa-sinensis", "Nymphaea lotus", "Rosa hybrida"], correct: 0, explanation: "Nama ilmiah kapas adalah Gossypium hirsutum" },
        { question: "Buah kapas berbentuk...", options: ["Bulat", "Kapsul", "Pipih", "Silindris"], correct: 1, explanation: "Buah kapas berbentuk kapsul yang pecah saat matang" },
        { question: "Serat kapas dihasilkan dari...", options: ["Batang", "Daun", "Biji", "Bunga"], correct: 2, explanation: "Serat kapas menempel pada biji tanaman" },
        { question: "Kapas membutuhkan iklim...", options: ["Dingin", "Panas dan kering", "Sangat lembab", "Tropical"], correct: 1, explanation: "Kapas tumbuh terbaik di iklim panas dan kering" },
        { question: "Produk kapas selain kain adalah...", options: ["Kapas bola", "Sprei", "Handuk", "Semua benar"], correct: 3, explanation: "Kapas用于kain, kapas bola, handuk, dan lainnya" },
        { question: "Warna kapas alam adalah...", options: ["Putih", "Coklat", "Abu-abu", "Putih dan coklat"], correct: 3, explanation: "Kapas alam berwarna putih atau coklat alami" },
        { question: "Kapas adalah tanaman...", options: ["Tahunan", "Semusim", "Perennial", "Herbaceous"], correct: 1, explanation: "Kapas adalah tanaman semusim yang dipanen sekali" }
    ],
    
    // === HIAS (3 plants - reduced from many) ===
    'kembang_sepatu': [
        { question: "Kembang Sepatu memiliki bunga berwarna?", options: ["Hanya merah", "Merah, kuning, atau putih", "Hanya biru", "Hanya ungu"], correct: 1, explanation: "Kembang Sepatu memiliki bunga berwarna merah, kuning, atau putih" },
        { question: "Kembang Sepatu juga dikenal sebagai?", options: ["Bunga Ralksata", "Bunga Mawar", "Bunga Melati", "Bunga Lili"], correct: 0, explanation: "Kembang Sepatu dikenal juga sebagai bunga Ralksata atau Hibiscus" },
        { question: "Tinggi tanaman kembang sepatu...", options: ["30-50 cm", "1-3 meter", "5-10 meter", "10-20 meter"], correct: 1, explanation: "Kembang Sepatu dapat tumbuh hingga 1-3 meter" },
        { question: "Nama ilmiah kembang sepatu adalah...", options: ["Rosa hybrida", "Hibiscus rosa-sinensis", "Jasminum sambac", "Nymphaea lotus"], correct: 1, explanation: "Nama ilmiah kembang sepatu adalah Hibiscus rosa-sinensis" },
        { question: "Kembang sepatu berasal dari negara...", options: ["Indonesia", "Cina", "India", "Semua benar"], correct: 3, explanation: "Kembang sepatu berasal dari Asia termasuk Indonesia" },
        { question: "Daun kembang sepatu berbentuk...", options: ["Bulat", "Oval dengan tepi bergerigi", "Bervernuk", "Beras"], correct: 1, explanation: "Daun kembang sepatu oval dengan tepi bergerigi" },
        { question: "Kembang sepatu digunakan sebagai...", options: ["Obat", "Pajangan", "Peneduh", "Semua benar"], correct: 3, explanation: "Kembang sepatu用于obat tradisional, pajangan, dan peneduh" },
        { question: "Cara menanam kembang sepatu yang umum adalah...", options: ["Umbi", "Biji", "Stek", "Merambat"], correct: 2, explanation: "Kembang sepatu diperbanyak dengan stek batang" },
        { question: "Kembang sepatu membutuhkan sinar matahari...", options: ["Sedikit", "Penuh", "Teduh", "Tidak butuh"], correct: 1, explanation: "Kembang sepatu membutuhkan sinar matahari penuh" },
        { question: "Makna budaya kembang sepatu di Hawaii adalah...", options: ["Duka", "Kebahagiaan", "Kematian", "Kesedihan"], correct: 1, explanation: "Di Hawaii, kembang sepatu melambangkan kebahagiaan" }
    ],
    'rumput_bojosh': [
        { question: "Rumput Bojosh berguna untuk?", options: ["Penahan erosi", "Bahan bakar", "Obat-obatan", "Makanan"], correct: 0, explanation: "Rumput Bojosh berguna sebagai penahan erosi" },
        { question: "Tinggi maksimal rumput Bojosh?", options: ["30-50 cm", "1-2 meter", "5-10 meter", "10-20 meter"], correct: 1, explanation: "Rumput Bojosh dapat tumbuh hingga 1-2 meter" },
        { question: "Rumput Bojosh termasuk tanaman...", options: ["Pangan", "Industri", "Hias", "Obat"], correct: 2, explanation: "Rumput Bojosh termasuk tanaman hias" },
        { question: "Nama ilmiah rumput Bojosh adalah...", options: ["Pennisetum purpureum", "Axonopus compressus", "Zoysia matrella", "Cynodon dactylon"], correct: 0, explanation: "Nama ilmiah rumput Bojosh adalah Pennisetum purpureum" },
        { question: "Rumput Bojosh memiliki daun yang...", options: ["Sangat kecil", "Lebar dan panjang", "Berlilin tipis", "Berbulu"], correct: 1, explanation: "Rumput Bojosh memiliki daun lebar dan panjang" },
        { question: "Rumput Bojosh sering digunakan untuk...", options: ["Halaman", "Pakan ternak", "Penahan erosi", "Semua benar"], correct: 3, explanation: "Rumput Bojosh用于halaman, pakan ternak, dan penahan erosi" },
        { question: "Rumput Bojosh dapat tumbuh di...", options: ["Hanya dataran tinggi", "Hanya dataran rendah", "Berbagai ketinggian", "Air"], correct: 2, explanation: "Rumput Bojosh dapat tumbuh di berbagai ketinggian" },
        { question: "Perawatan rumput Bojosh...", options: ["Sulit", "Mudah", "Sangat sulit", "Tidak perlu air"], correct: 1, explanation: "Rumput Bojosh relatif mudah untuk dirawat" },
        { question: "Rumput Bojosh berkembang biak dengan...", options: ["Umbi", "Biji", "Rhizom", "B dan C benar"], correct: 3, explanation: "Rumput Bojosh berkembang biak dengan biji dan rhizom" },
        { question: "Keunggulan rumput Bojosh adalah...", options: ["Tahan lalu lintas", "Tumbuh cepat", "Hijau sepanjang tahun", "Semua benar"], correct: 3, explanation: "Rumput Bojosh tahan lalu lintas, tumbuh cepat, dan hijau" }
    ],
    'monstera': [
        { question: "Monstera memiliki ciri khas...", options: ["Bunga besar", "Daun berlubang", "Buah edible", "Akar gantung"], correct: 1, explanation: "Monstera memiliki daun yang berlubang unik" },
        { question: "Monstera termasuk tanaman...", options: ["Pangan", "Hias", "Obat", "Industri"], correct: 1, explanation: "Monstera adalah tanaman hias populer" },
        { question: "Nama ilmiah monstera adalah...", options: ["Monstera deliciosa", "Philodendron bipinnatifidum", "Anthurium andraeanum", "Spathiphyllum wallisii"], correct: 0, explanation: "Nama ilmiah monstera adalah Monstera deliciosa" },
        { question: "Monstera berasal dari...", options: ["Indonesia", "Hutan hujan Amerika Tengah", "Afrika", "Eropa"], correct: 1, explanation: "Monstera berasal dari hutan hujan Amerika Tengah" },
        { question: "Daun monstera berlubang karena...", options: ["Penyakit", "Adaptasi lingkungan", "Varietas", "Pupuk"], correct: 1, explanation: "Daun berlubang adalah adaptasi untuk toleransi angin" },
        { question: "Monstera membutuhkan...", options: ["Sinar matahari penuh", "Sinar tidak langsung", "Kegelapan total", "Air dingin"], correct: 1, explanation: "Monstera tumbuh terbaik dengan sinar tidak langsung" },
        { question: "Monstera dapat ditanam dengan...", options: ["Hanya di tanah", "Hidroponik", "Air saja", "Semua cara"], correct: 3, explanation: "Monstera dapat ditanam dengan berbagai cara" },
        { question: "Tanaman ini membantu...", options: ["Membersihkan udara", "Makanan", "Obat", "Bahan bangunan"], correct: 0, explanation: "Monstera membantu membersihkan udara dalam ruangan" },
        { question: "Monstera dewasa menghasilkan...", options: ["Buah", "Bunga", "Buah yang bisa dimakan", "Daun baru"], correct: 2, explanation: "Monstera dewasa dapat menghasilkan buah yang bisa dimakan" },
        { question: "Perawatan monstera meliputi...", options: ["Penyiraman banyak", "Penyiraman sedang", "Tidak perlu air", "Air sedikit"], correct: 1, explanation: "Monstera membutuhkan penyiraman sedang, tidak berlebihan" }
    ],
    
    // === OBAT (3 plants x 10 questions) ===
    'lidah_buaya': [
        { question: "Apa manfaat utama dari lidah buaya?", options: ["Pewarna alami", "Penyembuh luka", "Bahan bangunan", "Bahan kertas"], correct: 1, explanation: "Lidah buaya mengandung zat yang membantu penyembuhan luka" },
        { question: "Lidah buaya memiliki daun yang?", options: ["Tipis dan kecil", "Tipis dan lebar", "Tebal berdaging", "Berbentuk pita"], correct: 2, explanation: "Lidah buaya memiliki daun tebal berdaging dengan duri kecil" },
        { question: "Lidah buaya juga digunakan untuk?", options: ["Perawatan kulit", "Bahan bakar", "Pakan ternak", "Bahan bangunan"], correct: 0, explanation: "Lidah buaya sering digunakan untuk perawatan kulit dan rambut" },
        { question: "Nama ilmiah lidah buaya adalah...", options: ["Aloe vera", "Agave americana", "Sansevieria trifasciata", "Kalanchoe pinnata"], correct: 0, explanation: "Nama ilmiah lidah buaya adalah Aloe vera" },
        { question: "Lidah buaya berasal dari...", options: ["Indonesia", "Afrika", "Amerika", "Australia"], correct: 1, explanation: "Lidah buaya berasal dari Afrika dan Arabia" },
        { question: "Gel lidah buaya mengandung...", options: ["Vitamin saja", "Mineral dan vitamin", "Air dan gula", "Protein tinggi"], correct: 1, explanation: "Gel lidah buaya mengandung berbagai mineral dan vitamin" },
        { question: "Lidah buaya dapat digunakan untuk...", options: ["Masker wajah", "Obat luka bakar", "Perawatan rambut", "Semua benar"], correct: 3, explanation: "Lidah buaya用于masker, obat luka bakar, dan perawatan rambut" },
        { question: "Cara memperbanyak lidah buaya adalah...", options: ["Biji", "Stek daun", "Anakan", "Cangkok"], correct: 2, explanation: "Lidah buaya diperbanyak dengan anakan dari tanaman induk" },
        { question: "Lidah buaya membutuhkan...", options: ["Air banyak", "Air sedikit", "Tanah selalu basah", "Rendam air"], correct: 1, explanation: "Lidah buaya adalah tanaman succulent yang membutuhkan sedikit air" },
        { question: "Lidah buaya tahan...", options: ["Cuaca dingin", "Kekeringan", "Air laut", "Angin kencang"], correct: 1, explanation: "Lidah buaya tahan terhadap kekeringan karena sifat succulentsnya" }
    ],
    'jahe': [
        { question: "Jahe berguna untuk?", options: ["Mendinginkan tubuh", "Menghangatkan tubuh", "Menurunkan berat badan", "Menambah tidur"], correct: 1, explanation: "Jahe berguna untuk menghangatkan tubuh" },
        { question: "Jahe termasuk tanaman?", options: ["Umbi-umbian", "Rimpang", "Biji-bijian", "Batangan"], correct: 1, explanation: "Jahe adalah tanaman rimpang" },
        { question: "Jahe dapat membantu mengatasi...", options: ["Pusing", "Sembelit", "Pilek dan batuk", "Diabetes"], correct: 2, explanation: "Jahe membantu mengatasi pilek dan batuk" },
        { question: "Nama ilmiah jahe adalah...", options: ["Zingiber officinale", "Curcuma longa", "Alpinia galanga", "Kaempferia galanga"], correct: 0, explanation: "Nama ilmiah jahe adalah Zingiber officinale" },
        { question: "Jahe berasal dari negara...", options: ["Indonesia", "India", "Cina", "Semua benar"], correct: 3, explanation: "Jahe berasal dari Asia Selatan dan Tenggara" },
        { question: "Rimpang jahe berwarna...", options: ["Putih", "Kuning", "Oranye", "Bisa kuning atau putih"], correct: 3, explanation: "Rimpang jahe dapat berwarna kuning atau putih" },
        { question: "Jahe dapat diolah menjadi...", options: ["Wedang jahe", "Manisan", "Serbuk", "Semua benar"], correct: 3, explanation: "Jahe dapat diolah menjadi wedang, manisan, dan serbuk" },
        { question: "Kandungan utama jahe adalah...", options: ["Gula", "Minyak atsiri", "Protein", "Lemak"], correct: 1, explanation: "Jahe mengandung minyak atsiri yang memberi rasa hangat" },
        { question: "Jahe membutuhkan iklim...", options: ["Dingin", "Panas dan lembab", "Kering", "Semua jenis"], correct: 1, explanation: "Jahe tumbuh terbaik di iklim panas dan lembab" },
        { question: "Panen jahe dilakukan setelah berumur...", options: ["1-2 bulan", "6-12 bulan", "2-3 tahun", "1 bulan"], correct: 1, explanation: "Jahe dipanen setelah berumur 6-12 bulan" }
    ],
    'kunyit': [
        { question: "Kunyit memiliki warna?", options: ["Putih", "Hijau", "Kuning cerah", "Merah"], correct: 2, explanation: "Kunyit memiliki rimpang berwarna kuning cerah" },
        { question: "Kunyit digunakan sebagai...", options: ["Pewarna alami", "Bahan bakar", "Pakan ternak", "Bahan bangunan"], correct: 0, explanation: "Kunyit sering digunakan sebagai pewarna alami" },
        { question: "Kunyit termasuk tanaman?", options: ["Umbi-umbian", "Rimpang", "Biji-bijian", "Batangan"], correct: 1, explanation: "Kunyit adalah tanaman rimpang seperti jahe" },
        { question: "Nama ilmiah kunyit adalah...", options: ["Zingiber officinale", "Curcuma longa", "Alpinia galanga", "Kaempferia galanga"], correct: 1, explanation: "Nama ilmiah kunyit adalah Curcuma longa" },
        { question: "Kunyit berasal dari...", options: ["Indonesia", "India", "Cina", "Asia Tenggara"], correct: 3, explanation: "Kunyit berasal dari wilayah Asia Tenggara" },
        { question: "Kunyit dapat membantu...", options: ["Pencernaan", "Peradangan", "Kanker", "A dan B benar"], correct: 3, explanation: "Kunyit membantu pencernaan dan peradangan" },
        { question: "Zat aktif dalam kunyit adalah...", options: ["Kafein", "Kurkumin", "Vitamin C", "Sukrosa"], correct: 1, explanation: "Kurkumin adalah zat aktif utama dalam kunyit" },
        { question: "Kunyit dapat diolah menjadi...", options: ["Kunyit bubuk", "Jamu", "Masker", "Semua benar"], correct: 3, explanation: "Kunyit dapat diolah menjadi bubuk, jamu, dan masker" },
        { question: "Daun kunyit berbentuk...", options: ["Bulat", "Panjang seperti pita", "Bervernuk", "Kecil"], correct: 1, explanation: "Daun kunyit panjang seperti pita dengan warna hijau" },
        { question: "Kunyit membutuhkan...", options: ["Tanah kering", "Tanah lembab", "Tanah berbatu", "Tanah asin"], correct: 1, explanation: "Kunyit membutuhkan tanah yang lembab untuk tumbuh optimal" }
    ],
    
    // === SERAT (4 plants x 10 questions) ===
    'melok': [
        { question: "Melok berguna untuk bahan?", options: ["Makanan", "Atap", "Obat", "Minuman"], correct: 1, explanation: "Melok berguna sebagai bahan atap rumah tradisional" },
        { question: "Melok adalah tanaman...", options: ["Pohon", "Semak", "Rumput", "Merambat"], correct: 0, explanation: "Melok adalah tanaman pohon yang tinggi" },
        { question: "Daun melok berbentuk?", options: ["Bundar", "Lonjong besar", "Panjang seperti pita", "Kecil-kecil"], correct: 2, explanation: "Daun melok panjang seperti pita" },
        { question: "Nama ilmiah melok adalah...", options: ["Corypha umbraculifera", "Cocos nucifera", "Arenga pinnata", "Borassus flabellifer"], correct: 0, explanation: "Nama ilmiah melok adalah Corypha umbraculifera" },
        { question: "Melok berasal dari...", options: ["Indonesia", "Asia Tenggara", "Afrika", "Amerika"], correct: 1, explanation: "Melok berasal dari wilayah Asia Tenggara" },
        { question: "Buah melok digunakan untuk...", options: ["Makanan", "Obat", "Kerajinan", "Semua salah"], correct: 3, explanation: "Buah melok tidak banyak digunakan" },
        { question: "Melok dapat tumbuh hingga...", options: ["2-5 meter", "10-20 meter", "25-30 meter", "1-2 meter"], correct: 2, explanation: "Melok dapat tumbuh hingga 25-30 meter" },
        { question: "Bunga melok muncul saat...", options: ["Pertama tanam", "Beberapa tahun", "Sekali seumur hidup", "Setiap tahun"], correct: 2, explanation: "Melok berbunga sekali seumur hidup (monocarpic)" },
        { question: "Daun melok digunakan untuk...", options: ["Sapu", "Anyaman", "Pakan", "Obat"], correct: 1, explanation: "Daun melok digunakan untuk anyaman topi dan keranjang" },
        { question: "Melok termasuk familia...", options: ["Arecaceae", "Poaceae", "Fabaceae", "Malvaceae"], correct: 0, explanation: "Melok termasuk dalam familia Arecaceae (palma)" }
    ],
    'rumput_odod': [
        { question: "Rumput Odod berguna untuk?", options: ["Bahan anyaman", "Bahan bakar", "Makanan", "Obat"], correct: 0, explanation: "Rumput Odod berguna untuk bahan anyaman" },
        { question: "Rumput Odod termasuk kategori?", options: ["Pangan", "Industri", "Hias", "Serat"], correct: 3, explanation: "Rumput Odod termasuk tanaman penghasil serat" },
        { question: "Rumput Odod biasa digunakan untuk...", options: ["Makanan ternak", "Keranjang anyaman", "Obat tradisional", "Bahan bakar"], correct: 1, explanation: "Rumput Odod digunakan untuk membuat keranjang anyaman" },
        { question: "Nama ilmiah rumput Odod adalah...", options: ["Imperata cylindrica", "Saccharum spontaneum", "Typha orientalis", "Cortaderia selloana"], correct: 1, explanation: "Nama ilmiah rumput Odod adalah Saccharum spontaneum" },
        { question: "Rumput Odod berasal dari...", options: ["Indonesia", "Asia Tropis", "Afrika", "Australia"], correct: 1, explanation: "Rumput Odod berasal dari Asia Tropis" },
        { question: "Tinggi rumput Odod mencapai...", options: ["10-30 cm", "1-3 meter", "5-7 meter", "50 cm"], correct: 1, explanation: "Rumput Odod dapat tumbuh hingga 1-3 meter" },
        { question: "Anyaman dari rumput Odod meliputi...", options: ["Tikar", "Keranjang", "Tas", "Semua benar"], correct: 3, explanation: "Rumput Odod dapat用于tikar, keranjang, dan tas anyaman" },
        { question: "Rumput Odod berkembang biak dengan...", options: ["Biji", "Rhizom", "Stek", "B dan C benar"], correct: 3, explanation: "Rumput Odod berkembang biak dengan biji dan rhizom" },
        { question: "Rumput Odod dapat tumbuh di...", options: ["Sawah", "Tepi sungai", "Lahan kering", "Semua tempat"], correct: 3, explanation: "Rumput Odod dapat tumbuh di berbagai tempat" },
        { question: "Rumput Odod memiliki sistem perakaran...", options: ["Dangkal", "Dalam", "Menyebar", "A dan C benar"], correct: 3, explanation: "Rumput Odod memiliki perakaran yang dalam dan menyebar" }
    ],
    'sisal': [
        { question: "Sisal adalah tanaman penghasil...", options: ["Makanan", "Serat", "Obat", "Minyak"], correct: 1, explanation: "Sisal adalah tanaman penghasil serat alami" },
        { question: "Serat sisal digunakan untuk...", options: ["Tali", "Kain", "Keset", "Semua benar"], correct: 3, explanation: "Serat sisal digunakan untuk tali, kain, dan keset" },
        { question: "Nama ilmiah sisal adalah...", options: ["Agave sisalana", "Agave americana", "Sansevieria trifasciata", "Aloe vera"], correct: 0, explanation: "Nama ilmiah sisal adalah Agave sisalana" },
        { question: "Sisal berasal dari negara...", options: ["Indonesia", "Meksiko", "Brasil", "India"], correct: 1, explanation: "Sisal berasal dari Meksiko" },
        { question: "Daun sisal berbentuk...", options: ["Bundar", "Panjang dan tebal", "Bervernuk", "Kecil"], correct: 1, explanation: "Daun sisal panjang, tebal, dan berduri" },
        { question: "Sisal dapat hidup di...", options: ["Hanya di dataran tinggi", "Hanya di dataran rendah", "Berbagai ketinggian", "Air"], correct: 2, explanation: "Sisal dapat tumbuh di berbagai ketinggian" },
        { question: "Panen daun sisal dilakukan dengan...", options: ["Dicabut", "Dipotong", "Ditebang", "Ditiris"], correct: 1, explanation: "Daun sisal dipotong dari tanaman" },
        { question: "Keunggulan serat sisal adalah...", options: ["Kuat", "Tahan lama", "Ramah lingkungan", "Semua benar"], correct: 3, explanation: "Serat sisal kuat, tahan lama, dan ramah lingkungan" },
        { question: "Sisal termasuk tanaman...", options: ["Tahunan", "Semusim", "Perennial", "Bulb"], correct: 2, explanation: "Sisal adalah tanaman perennial yang dapat dipanen berkali-kali" },
        { question: "Setelah dipanen, daun sisal diolah dengan...", options: ["Direbus", "Direndam", "Dikeringkan dan digiling", "Dikukus"], correct: 2, explanation: "Daun sisal dikeringkan dan digiling untuk mendapat serat" }
    ],
    'rami': [
        { question: "Rami adalah tanaman penghasil...", options: ["Makanan", "Serat", "Obat", "Minyak"], correct: 1, explanation: "Rami adalah tanaman penghasil serat berkualitas tinggi" },
        { question: "Serat rami digunakan untuk...", options: ["Tali", "Kain berkualitas tinggi", "Kertas", "Semua benar"], correct: 3, explanation: "Serat rami digunakan untuk kain, tali, dan kertas berkualitas" },
        { question: "Nama ilmiah rami adalah...", options: ["Boehmeria nivea", "Cannabis sativa", "Linum usitatissimum", "Gossypium hirsutum"], correct: 0, explanation: "Nama ilmiah rami adalah Boehmeria nivea" },
        { question: "Rami berasal dari negara...", options: ["Indonesia", "Cina", "Meksiko", "India"], correct: 1, explanation: "Rami berasal dari Cina" },
        { question: "Tanaman rami berbentuk...", options: ["Semak", "Pohon kecil", "Rumput", "Merambat"], correct: 0, explanation: "Rami berbentuk semak dengan daun lebar" },
        { question: "Serat rami dikenal karena...", options: ["Kekuatan", "Kekuatan dan kilau", "Fleksibilitas", "Semua benar"], correct: 1, explanation: "Serat rami dikenal karena kekuatan dan kilau alaminya" },
        { question: "Rami dapat tumbuh di...", options: ["Hanya daerah dingin", "Hanya daerah panas", "Berbagai iklim", "Air"], correct: 2, explanation: "Rami dapat tumbuh di berbagai iklim" },
        { question: "Daun rami berbentuk...", options: ["Bulat", "Oval dengan ujung runcing", "Beras", "Berbentuk pita"], correct: 1, explanation: "Daun rami oval dengan ujung runcing" },
        { question: "Serat rami sering dicampur dengan...", options: ["Kapas", "Wol", "Polyester", "Semua benar"], correct: 3, explanation: "Serat rami sering dicampur dengan kapas, wol, atau polyester" },
        { question: "Rami termasuk tanaman...", options: ["Tahunan", "Semusim", "Perennial", "Bulb"], correct: 2, explanation: "Rami adalah tanaman perennial" }
    ],

    // === MAKANAN (6 plants x 10 questions) - dari buku tanamyuk ===
    'nasi': [
        { question: "Nasi terbuat dari tanaman...", options: ["Jagung", "Padi", "Kentang", "Singkong"], correct: 1, explanation: "Nasi dibuat dari beras, yaitu biji tanaman padi yang dimasak" },
        { question: "Beras berasal dari...", options: ["Biji padi", "Umbi kentang", "Batang tebu", "Akar singkong"], correct: 0, explanation: "Beras adalah bagian biji dari tanaman padi" },
        { question: "Cara memasak nasi yang benar adalah...", options: ["Dikukus", "Digoreng", "Dipanggang", "Direbus"], correct: 0, explanation: "Nasi dimasak dengan cara dikukus atau rice cooker" },
        { question: "Nasi merupakan makanan utama khas...", options: ["Jepang", "Indonesia", "Korea", "Cina"], correct: 1, explanation: "Nasi adalah makanan utama masyarakat Indonesia" },
        { question: "Nasi merah dibuat dari...", options: ["Padi biasa", "Padi yang digiling", "Padi utuh (brown rice)", "Jagung"], correct: 2, explanation: "Nasi merah dibuat dari beras merah yang tidak digiling halus" },
        { question: "Vitamin yang terkandung dalam nasi adalah...", options: ["Vitamin A", "Vitamin B kompleks", "Vitamin C", "Vitamin D"], correct: 1, explanation: "Nasi mengandung vitamin B kompleks" },
        { question: "Nasi dapat diolah menjadi...", options: ["Nasi goreng", "Nasi uduk", "Nasi kuning", "Semua benar"], correct: 3, explanation: "Nasi dapat diolah menjadi berbagai jenis nasi" },
        { question: "Nasi mengandung...", options: ["Protein tinggi", "Karbohidrat", "Vitamin C", "Lemak"], correct: 1, explanation: "Nasi adalah sumber carbohydrates utama" },
        { question: "Nasi putih vs nasi merah, yang lebih sehat adalah...", options: ["Nasi putih", "Nasi merah", "Sama saja", "Tidak ada bedanya"], correct: 1, explanation: "Nasi merah lebih sehat karena mengandung serat lebih banyak" },
        { question: "Cara penyimpanan nasi agar tahan lama adalah...", options: ["Di kulkas", "Di tempat tertutup", "Di oven", "Semua benar"], correct: 1, explanation: "Nasi harus disimpan di tempat tertutup untuk menjaga kesegaran" }
    ],
    'lontong': [
        { question: "Lontong dibuat dari...", options: ["Jagung", "Ketan", "Beras", "Singkong"], correct: 1, explanation: "Lontong dibuat dari beras ketan yang dibungkus daun" },
        { question: "Lontong dibungkus dengan daun...", options: ["Daun Pisang", "Daun Kelapa", "Daun Jati", "Daun Kemangi"], correct: 0, explanation: "Lontong tradisional dibungkus dengan daun pisangan" },
        { question: "Lontong dimasak dengan cara...", options: ["Direbus", "Dikukus", "Digoreng", "Dipanggang"], correct: 1, explanation: "Lontong dimasak dengan cara dikukus" },
        { question: "Lontong khas dari daerah...", options: ["Jawa Barat", "Jawa Timur", "Nusantara (Indonesia)", "Maluku"], correct: 2, explanation: "Lontong adalah makanan khas Indonesia" },
        { question: "Lontong biasanya disajikan dengan...", options: ["Sambal saja", "Sayur lodeh", "Opor", "B dan C benar"], correct: 3, explanation: "Lontong sering disajikan dengan opor atau sayur lodeh" },
        { question: "Beras ketan berbeda dari beras biasa adalah...", options: ["Warnanya putih", "Bentuknya lebih panjang", "Teksturnya lebih lengket", "Semua benar"], correct: 2, explanation: "Beras ketan memiliki tekstur yang lebih lengket saat dimasak" },
        { question: "Lontong dapat disimpan berapa lama?", options: ["1 hari", "2-3 hari", "1 minggu", "1 bulan"], correct: 1, explanation: "Lontong bisa bertahan 2-3 hari di kulkas" },
        { question: "Lontong banyak ditemukan saat hari...", options: ["Raya", "Idul fitri", "Lebaran", "Semua benar"], correct: 3, explanation: "Lontong wajib ada saat Hari Raya Idulfitri/Lebaran" },
        { question: "Lontong dipotong dengan...", options: ["Pisau", "Benang", "Gunting", "Tangan"], correct: 1, explanation: "Lontong dipotong dengan benang agar tidak hancur" },
        { question: "Lontong termasuk makanan...", options: ["Makanan ringan", "Makanan utama", "Minuman", "Pencuci mulut"], correct: 1, explanation: "Lontong termasuk makanan utama" }
    ],
    'ketoprak': [
        { question: "Ketoprak adalah makanan khas...", options: ["Bandung", "Jakarta", "Surabaya", "Yogyakarta"], correct: 1, explanation: "Ketoprak adalah makanan khas Jakarta" },
        { question: "Bahan utama ketoprak adalah...", options: ["Nasi", "Lontong", "Bihun", "Beras"], correct: 1, explanation: "Ketoprak menggunakan lontong sebagai dasar" },
        { question: "Bumbu khas ketoprak adalah...", options: ["Sambal kacang", "Sambal terasi", "Sambal matah", "Sambal cibi"], correct: 0, explanation: "Ketoprak menggunakan sambal atau bumbu kacang" },
        { question: "Ketoprak biasanya ditambahkan...", options: ["Kerupuk", "Bawang goreng", "Kecap", "Semua benar"], correct: 3, explanation: "Ketoprak lengkap dengan kerupuk, bawang goreng, dan kecap" },
        { question: "Sayuran dalam ketoprak meliputi...", options: ["Tauge", "Kol", "Mentimun", "Semua benar"], correct: 3, explanation: "Ketoprak menggunakan tauge, kol, dan mentimun" },
        { question: "Ketoprak mengandung protein dari...", options: ["Daging", "Telur", "Tahu", "Tahu dan tempe"], correct: 3, explanation: "Ketoprak biasanya tambah tahu dan tempe" },
        { question: "Rasa ketoprak biasanya...", options: ["Pedas", "Manis", "Pedas manis", "Asin"], correct: 2, explanation: "Ketoprak memiliki rasa pedas manis" },
        { question: "Tauge dalam ketoprak dibuat dari...", options: ["Kacang hijau", "Kacang tanah", "Kedelai", "Kacang merah"], correct: 0, explanation: "Tauge dibuat dari biji kacang hijau" },
        { question: "Ketoprak adalah kombinasi antara...", options: ["Nasi dan ayam", "Lontong dan sayuran", "Mie dan telur", "Bihun dan seafood"], correct: 1, explanation: "Ketoprak adalah kombinasi lontong dengan sayuran" },
        { question: "Ketoprak termasuk makanan...", options: ["Makanan berat", "Makanan ringan", "Minuman", "Pencuci mulut"], correct: 0, explanation: "Ketoprak adalah makanan berat/pokok" }
    ],
    'gado_gado': [
        { question: "Gado-gado adalah makanan khas...", options: ["Jakarta", "Bandung", "Surabaya", "Medan"], correct: 1, explanation: "Gado-gado adalah makanan khas Jawa Barat/Bandung" },
        { question: "Gado-gado berarti...", options: ["Campur aduk", "Sayur rebus", "Sambal kacang", "Makanan lengkap"], correct: 0, explanation: "Gado-gado berasal dari kata 'menggado' yang berarti mengaduk" },
        { question: "Bumbu utama gado-gado adalah...", options: ["Sambal terasi", "Saus kacang", "Kecap manis", "Bawang merah"], correct: 1, explanation: "Gado-gado menggunakan saus kacang sebagai bumbu utama" },
        { question: "Sayuran dalam gado-gado yang wajib ada adalah...", options: ["Kentang", "Tauge", "Wortel", "Semua benar"], correct: 3, explanation: "Gado-gado lengkap dengan kentang, tauge, wortel, dll" },
        { question: "Gado-gado ditambahkan...", options: ["Kerupuk", "Bawang goreng", "Pete", "Semua benar"], correct: 3, explanation: "Gado-gado semakin lezat dengan kerupuk, bawang, dan pete" },
        { question: "Gado-gado biasanya disajikan...", options: ["Panas", "Dingin", "Hangat", "Suhu ruangan"], correct: 1, explanation: "Gado-gado disajikan dingin dengan bumbu kacang" },
        { question: "Tauge dalam gado-gado memberikan tekstur...", options: ["Renyah", "Lembek", "Kering", "Cair"], correct: 0, explanation: "Tauge memberikan tekstur renyah pada gado-gado" },
        { question: "Gado-gado termasuk makanan...", options: ["Vegetarian", "Vegan", "Keto", "Paleo"], correct: 0, explanation: "Gado-gado tanpa daging adalah makanan vegetarian" },
        { question: "Gado-gado pertama kali muncul di...", options: ["Jakarta", "Bandung", "Yogyakarta", "Surabaya"], correct: 1, explanation: "Gado-gado berasal dari Bandung, Jawa Barat" },
        { question: "Gado-gado dapat dibuat tanpa...", options: ["Kacang", "Minyak", "Sayuran", "Bumbu"], correct: 2, explanation: "Gado-gado pasti menggunakan sayuran dan kacang" }
    ],
    'sambal': [
        { question: "Sambal adalah makanan pendamping khas...", options: ["Thailand", "Indonesia", "Malaysia", "Semua benar"], correct: 1, explanation: "Sambal adalah makanan khas Indonesia" },
        { question: "Bahan utama sambal adalah...", options: ["Bawang", "Cabai", "Tomat", "Semua benar"], correct: 3, explanation: "Sambal dibuat dari campuran cabai, bawang, dan tomat" },
        { question: "Jenis sambal yang paling pedas adalah...", options: ["Sambal terasi", "Sambal rawit", "Sambal matah", "Sambal kecap"], correct: 1, explanation: "Sambal rawit adalah yang paling pedas" },
        { question: "Sambal terasi menggunakan...", options: ["Terasi udang", "Kecap", "Santan", "Gula"], correct: 0, explanation: "Sambal terasi menggunakan terasi udang sebagai bahan" },
        { question: "Sambal matah berasal dari...", options: ["Jawa", "Bali", "Sumatra", "Kalimantan"], correct: 1, explanation: "Sambal matah adalah khas Bali" },
        { question: "Cabai yang digunakan dalam sambal berwarna...", options: ["Merah saja", "Hijau saja", "Merah dan hijau", "Kuning"], correct: 2, explanation: "Sambal bisa menggunakan cabai merah atau hijau" },
        { question: "Sambal dapat meningkatkan...", options: ["Pencerdasan", "Nafsu makan", "Kecerdasan", "Kebugaran"], correct: 1, explanation: "Sambal dapat meningkatkan nafsu makan" },
        { question: "Sambal dibuat dengan cara...", options: ["Direbus", "Ditumis", "Diuleg", "Dipanggang"], correct: 2, explanation: "Sambal tradisional dibuat dengan diuleg manual" },
        { question: "Sambal merupakan sumber...", options: ["Vitamin C", "Antiinflamasi", "Anti-oksidean", "Semua benar"], correct: 3, explanation: "Cabai mengandung vitamin C dan anti-oksidean" },
        { question: "Sambal tanpa cabai disebut...", options: ["Sambal putih", "Sambal kecap", "Sambal bawang", "Sambal pete"], correct: 1, explanation: "Sambal kecap tidak menggunakan cabai" }
    ],
    'getuk': [
        { question: "Getuk adalah makanan tradisional dari...", options: ["Jagung", "Kentang", "Singkong", "Pisang"], correct: 2, explanation: "Getuk dibuat dari singkong" },
        { question: "Getuk berasal dari daerah...", options: ["Jawa Tengah", "Yogyakarta", "Jawa Timur", "Semua benar"], correct: 3, explanation: "Getuk adalah makanan khas Jawa" },
        { question: "Bahan utama getuk adalah...", options: ["Singkong", "Gula merah", "Kelapa parut", "Semua benar"], correct: 3, explanation: "Getuk terbuat dari singkong, gula merah, dan kelapa" },
        { question: "Getuk dibakar sebelum disajikan untuk...", options: ["Warna", "Aroma", "Tekstur", "Semua benar"], correct: 2, explanation: "Membakar getuk memberikan tekstur luar yang lebih legit" },
        { question: "Getuk berkualitas menggunakan singkong...", options: ["Muda", "Tua", "Yang penting singkong", "Tua dan bermutu"], correct: 3, explanation: "Singkong tua dan bermutu menghasilkan getuk terbaik" },
        { question: "Getuk biasanya disajikan...", options: ["Panas", "Dingin", "Hangat", "Suhu ruangan"], correct: 1, explanation: "Getuk paling lezat disajikan dingin" },
        { question: "Gula yang digunakan dalam getuk adalah...", options: ["Gula pasir", "Gula aren", "Gula merah", "Gula batu"], correct: 2, explanation: "Getuk menggunakan gula merah untuk warna dan rasa" },
        { question: "Getuk dapat bertahan berapa hari?", options: ["1 hari", "2-3 hari", "1 minggu", "1 bulan"], correct: 1, explanation: "Getuk bertahan 2-3 hari di suhu ruangan" },
        { question: "Getuk termasuk makanan...", options: ["Makanan ringan", "Makanan berat", "Minuman", "Pencuci mulut"], correct: 0, explanation: "Getuk termasuk makanan ringan/potong" },
{ question: "Getuk stick menggunakan...", options: ["Singkong parut", "Tepung", "Beras", "Jagung"], correct: 0, explanation: "Getuk stick juga dibuat dari singkong parut" }
    ],

    // === HAMA (5 plants x 5 questions) ===
    'kutu_daun': [
        { question: "Hama kutu daun menyerang bagian tanaman...", options: ["Akar", "Daun", "Batang", "Buah"], correct: 1, explanation: "Kutu daun adalah hama yang mengisap cairan pada daun tanaman" },
        { question: "Ciri khas kutu daun adalah...", options: ["Tubuh bersayap", "Tubuh kecil dan lunak", "Berwarna hitam", "Bergerak cepat"], correct: 1, explanation: "Kutu daun memiliki tubuh kecil dan lunak" },
        { question: "Kutu daun berkembang biak dengan cara...", options: ["Bertelur", "Melahirkan", "A dan B benar", "Splitting"], correct: 2, explanation: "Kutu daun dapat bertelur dan melahirkan" },
        { question: "Cara alami mengendalikan kutu daun adalah...", options: ["Pestisida kimia", "Introduksi predator", "Pengeringan", "Pendinginan"], correct: 1, explanation: "Kumbang dan lebah adalah predator alami kutu daun" },
        { question: "Tanda tanaman terserang kutu daun adalah...", options: ["Daun menguning", "Daun menggulung", "Pertumbuhan terhambat", "Semua benar"], correct: 3, explanation: "Kutu daun menyebabkan daun menguning, menggulung, dan pertumbuhan terhambat" }
    ],
    'ulat_daun': [
        { question: "Ulat daun termasuk hama...", options: ["Pelanggan", "Pemakan Daun", "Penghisap", "Penyebab Penyakit"], correct: 1, explanation: "Ulat daun adalah larva ngengat yang memakan daun tanaman" },
        { question: "Ulat daun paling sering menyerang tanaman...", options: ["Padi", "Cabai", "Kentang", "Semua benar"], correct: 3, explanation: "Ulat daun dapat menyerang berbagai tanaman" },
        { question: "Cara pencegahan ulat daun adalah...", options: ["Rotasi tanaman", "Penanaman awal", "Penggunakan pestisida", "Semua benar"], correct: 3, explanation: "Rotasi tanaman, penanaman awal, dan pestisida dapat mencegah ulat" },
        { question: "Umur ulat daun hingga menjadi kepompong adalah...", options: ["1-2 minggu", "2-4 minggu", "1-2 bulan", "3-4 bulan"], correct: 1, explanation: "Ulat daun membutuhkan 2-4 minggu untuk menjadi kepompong" },
        { question: "Ulat daun dapat menimbulkan kerugian...", options: ["Daun bolong", "Tanaman mati", "Hasil panen turun", "Semua benar"], correct: 3, explanation: "Ulat daun menyebabkan daun bolong hingga tanaman mati" }
    ],
    'kutu_kebul': [
        { question: "Kutu kebul biasa menyerang tanaman...", options: ["Padi", "Jagung", "Cabai", "Kentang"], correct: 2, explanation: "Kutu kebul sering ditemukan pada tanaman cabai dan tomat" },
        { question: "Kutu kebul menyebabkan penyakit...", options: ["Virus", "Jamur", "Bakteri", "Semua"], correct: 0, explanation: "Kutu kebul dapat menularkan virus tanaman" },
        { question: "Ciri kutu kebul adalah...", options: ["Berwarna putih", "Sayap bening", "Tubuh kecil", "Semua benar"], correct: 3, explanation: "Kutu kebul berwarna putih dengan sayap bening" },
        { question: "Kutu kebul menyerang bagian tanaman...", options: ["Akar", "Daun", "Batang", "Buah"], correct: 1, explanation: "Kutu kebul mengisap cairan di bagian bawah daun" },
        { question: "Pengendalian kutu kebul dapat menggunakan...", options: ["Perangkap kuning", "Musuh alami", "Methyl parathion", "A dan B benar"], correct: 3, explanation: "Perangkap kuning dan musuh alami efektif mengendalikan kutu kebul" }
    ],
    'tungau': [
        { question: "Tungau menyebabkan kerusakan berupa...", options: ["Busuk Akar", "Lubang di Daun", "Kuning Daun", "Batang Layu"], correct: 2, explanation: "Tungau mengisap cairan daun menyebabkan warna kuning" },
        { question: "Tungau termasuk dalam kelas...", options: ["Insecta", "Arachnida", "Crustacea", "Mollusca"], correct: 1, explanation: "Tungau termasuk dalam kelas Arachnida (bersama laba-laba)" },
        { question: "Tungau berkembang biak dengan cepat di...", options: ["Cuaca dingin", "Cuaca panas dan kering", "Musim hujan", "Musim semi"], correct: 1, explanation: "Tungau berkembang pesat di cuaca panas dan kering" },
        { question: "Tanda serangan tungau adalah...", options: ["Bercak kuning", "Jaring halus", "Daun kering", "Semua benar"], correct: 3, explanation: "Serangan tungau menyebabkan bercak kuning, jaring halus, dan daun kering" },
        { question: "Pengendalian tungau yang efektif adalah...", options: ["Air bertekanan", "Akarisida", "Predator", "Semua benar"], correct: 3, explanation: "Air bertekanan, akarisida, dan predator dapat mengendalikan tungau" }
    ],
    'wereng': [
        { question: "Wereng menyerang tanaman dengan cara...", options: ["Makan Akar", "Mengisap Cairan", "Makan Bunga", "Membuat Lubang"], correct: 1, explanation: "Wereng adalah hama pengisap cairan tanaman terutama pada batang" },
        { question: "Wereng yang paling berbahaya adalah...", options: ["Wereng hijau", "Wereng coklat", "Wereng daun", "Semua sama"], correct: 1, explanation: "Wereng coklat adalah yang paling merusak" },
        { question: "Wereng menyebabkan penyakit...", options: ["Hawar", "Kerdil", "Virus", "B dan C benar"], correct: 3, explanation: "Wereng menyebabkan penyakit kerdil dan virus" },
        { question: "Tanaman yang rentan serangan wereng adalah...", options: ["Padi", "Jagung", "Kapas", "Semua benar"], correct: 0, explanation: "Padi adalah tanaman paling rentan terhadap wereng" },
        { question: "Pengendalian wereng dapat dilakukan dengan...", options: ["Pengaturan air", "Pemutusan siklus", "Pestisida", "Semua benar"], correct: 3, explanation: "Pengaturan air, pemutusan siklus, dan pestisida dapat mengendalikan wereng" }
    ]
};

// Leaderboard
// Leaderboard - 100% REAL from REALTIME
function getRealLeaderboard(limit = 5) {
    if (typeof REALTIME === 'undefined' || !REALTIME.getLeaderboard) {
        // Silent fallback - no console noise to user
        return [];
    }
    return REALTIME.getLeaderboard(limit) || [];
}

// ==================== UTILITIES ====================

function shuffleArray(array) {
    var shuffled = array.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled;
}

// ==================== STATE ====================

var selectedCategory = null;
var selectedPlant = null;
var currentQuestions = [];
var currentQuestionIndex = 0;
var score = 0;
var xp = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var isAnswered = false;
var quizStartTime = 0; // Track quiz start time for anti-cheat verification

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize toast container
    var toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        var container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    // Wait for REALTIME to be fully ready
    setTimeout(function() {
        initLeaderboardSafe();
    }, 500);
    
    // Add event listeners to category cards as backup
    var categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(function(card) {
        var categoryId = card.className.split(' ').find(function(cls) {
            return cls !== 'category-card' && CATEGORIES[cls];
        });
        
        if (categoryId) {
            // Remove existing onclick and add multiple event listeners
            card.onclick = null;
            
            card.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                selectCategory(categoryId);
            });
            
            card.addEventListener('touchstart', function(e) {
                e.preventDefault();
                selectCategory(categoryId);
            });
        }
    });
});

// Safe init with retry - eliminates "REALTIME not ready" warning
function initLeaderboardSafe(retryCount = 0) {
    if (retryCount > 20) {
        console.log('Leaderboard will update when REALTIME ready - using fallback');
        renderLeaderboard([]); // Show empty leaderboard
        return;
    }
    
    if (typeof REALTIME !== 'undefined' && typeof REALTIME.getLeaderboard === 'function') {
        try {
            var leaderboard = REALTIME.getLeaderboard(5);
            renderLeaderboard(leaderboard);
        } catch (e) {
            console.warn('Leaderboard error:', e);
            renderLeaderboard([]);
        }
    } else {
        setTimeout(function() { 
            initLeaderboardSafe(retryCount + 1); 
        }, 300);
    }
}

// ==================== CATEGORY SELECTION ====================

function selectCategory(categoryId) {
    console.log('selectCategory called with:', categoryId);
    
    // Remove selected from all categories
    document.querySelectorAll('.category-card').forEach(function(card) {
        card.classList.remove('selected');
    });
    
    // Add selected to clicked category
    var selectedCard = document.querySelector('.category-card.' + categoryId);
    console.log('Found selected card:', selectedCard);
    if (selectedCard) {
        selectedCard.classList.add('selected');
        console.log('Added selected class to:', categoryId);
    }
    
    selectedCategory = categoryId;
    console.log('selectedCategory set to:', selectedCategory);
    
    // Enable button
    var btnSelectCategory = document.getElementById('btn-select-category');
    console.log('Found button:', btnSelectCategory);
    if (btnSelectCategory) {
        btnSelectCategory.disabled = false;
        console.log('Button enabled');
    }
}

function goToPlantSelection() {
    console.log('goToPlantSelection called');
    console.log('selectedCategory:', selectedCategory);
    
    if (!selectedCategory) {
        console.log('No selected category - returning');
        return;
    }
    
    // Update UI with selected category
    var category = CATEGORIES[selectedCategory];
    console.log('Category data:', category);
    
    var iconDisplay = document.getElementById('category-icon-display');
    var nameDisplay = document.getElementById('category-name-display');
    console.log('Icon display element:', iconDisplay);
    console.log('Name display element:', nameDisplay);
    
    if (iconDisplay) iconDisplay.textContent = category.icon;
    if (nameDisplay) nameDisplay.textContent = category.name;
    
    // Generate plant grid
    console.log('Rendering plant grid for:', category.plants);
    renderPlantGrid(category.plants);
    
    // Show plant screen
    console.log('Showing plant screen');
    showScreen('plant-screen');
}

function backToCategories() {
    selectedCategory = null;
    selectedPlant = null;
    
    // Reset selection
    document.querySelectorAll('.category-card').forEach(function(card) {
        card.classList.remove('selected');
    });
    document.getElementById('btn-select-category').disabled = true;
    
    // Show category screen
    showScreen('category-screen');
}

// ==================== PLANT SELECTION ====================

function renderPlantGrid(plantIds) {
    var grid = document.getElementById('plant-grid');
    grid.innerHTML = '';
    
    plantIds.forEach(function(plantId) {
        var plant = PLANTS_DATA[plantId];
        if (!plant) return;
        
        var card = document.createElement('div');
        card.className = 'plant-card';
        card.setAttribute('data-plant-id', plantId); // Add data attribute for debugging
        
        // Remove existing onclick and add robust event listeners
        card.onclick = null;
        
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Plant card clicked:', plantId);
            selectPlant(plantId);
        });
        
        card.addEventListener('touchstart', function(e) {
            e.preventDefault();
            console.log('Plant card touched:', plantId);
            selectPlant(plantId);
        });
        
        card.innerHTML = 
            '<span class="plant-emoji">' + plant.emoji + '</span>' +
            '<div class="plant-name">' + plant.name + '</div>';
        
        grid.appendChild(card);
    });
}

function selectPlant(plantId) {
    console.log('selectPlant called with:', plantId);
    
    // Remove selected from all plants
    document.querySelectorAll('.plant-card').forEach(function(card) {
        card.classList.remove('selected');
    });
    
    // Add selected to clicked plant
    var plantCards = document.querySelectorAll('.plant-card');
    var plantIds = CATEGORIES[selectedCategory].plants;
    var index = plantIds.indexOf(plantId);
    if (plantCards[index]) {
        plantCards[index].classList.add('selected');
    }
    
    selectedPlant = plantId;
    console.log('selectedPlant set to:', selectedPlant);
    
    // Enable button
    var btnSelectPlant = document.getElementById('btn-select-plant');
    if (btnSelectPlant) {
        btnSelectPlant.disabled = false;
        console.log('btn-select-plant enabled');
    } else {
        console.log('btn-select-plant NOT found');
    }
}

// ==================== QUIZ LOGIC ====================

function startQuiz() {
    console.log('startQuiz called');
    console.log('selectedCategory:', selectedCategory);
    console.log('selectedPlant:', selectedPlant);
    
    if (!selectedCategory || !selectedPlant) {
        console.log('Missing category or plant - returning');
        return;
    }
    
    console.log('Starting quiz with plant:', selectedPlant);
    
    // Reset state
    currentQuestionIndex = 0;
    score = 0;
    xp = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    isAnswered = false;
    
    // Track quiz start time for anti-cheat verification
    quizStartTime = Date.now();
    
    // Get questions for selected plant (max 10)
    var plantQuestions = QUESTIONS_DB[selectedPlant] || [];
    
    console.log('Plant questions found:', plantQuestions.length);
    
    // Error handling: Check if questions exist
    if (!plantQuestions || plantQuestions.length === 0) {
        console.error('No questions found for plant: ' + selectedPlant);
        showToast('error', 'Maaf, soal untuk tanaman ini belum tersedia!');
        return;
    }
    
    currentQuestions = plantQuestions.slice(0, 10);
    
    // Shuffle questions
    currentQuestions = shuffleArray(currentQuestions);
    
    // Update UI
    var plant = PLANTS_DATA[selectedPlant];
    if (!plant) {
        console.error('Plant data not found: ' + selectedPlant);
        showToast('error', 'Data tanaman tidak ditemukan!');
        return;
    }
    
    document.getElementById('total-num').textContent = currentQuestions.length;
    document.getElementById('current-plant-name').textContent = plant.name;
    
    // Show question screen
    showScreen('question-screen');
    
    // Display first question
    displayQuestion();
}

function showScreen(screenId) {
    document.querySelectorAll('.quiz-screen').forEach(function(screen) {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function displayQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        showResults();
        return;
    }
    
    var q = currentQuestions[currentQuestionIndex];
    var plant = PLANTS_DATA[selectedPlant];
    var category = CATEGORIES[selectedCategory];
    
    // Update progress
    document.getElementById('current-num').textContent = currentQuestionIndex + 1;
    document.getElementById('progress-fill').style.width = ((currentQuestionIndex + 1) / currentQuestions.length * 100) + '%';
    
    // Update question
    document.getElementById('question-text').textContent = q.question;
    document.getElementById('question-image').textContent = plant.emoji;
    document.getElementById('question-plant-name').textContent = plant.name;
    document.getElementById('question-category-badge').textContent = category.name;
    
    // Render options
    var optionsContainer = document.getElementById('answer-options');
    optionsContainer.innerHTML = '';
    
    var letters = ['A', 'B', 'C', 'D'];
    var optionEmojis = ['🔴', '🟡', '🟢', '🔵'];
    
    q.options.forEach(function(option, index) {
        var opt = document.createElement('div');
        opt.className = 'answer-option';
        opt.onclick = (function(idx) { return function() { selectAnswer(idx); }; })(index);
        
        opt.innerHTML = 
            '<span class="option-letter">' + letters[index] + '</span>' +
            '<span class="option-text">' + option + '</span>';
        
        optionsContainer.appendChild(opt);
    });
    
    // Hide feedback
    document.getElementById('feedback-container').style.display = 'none';
    
    isAnswered = false;
}

function selectAnswer(index) {
    if (isAnswered) return;
    isAnswered = true;
    
    var q = currentQuestions[currentQuestionIndex];
    var options = document.querySelectorAll('.answer-option');
    
    options[index].classList.add('selected');
    
    var feedbackContainer = document.getElementById('feedback-container');
    feedbackContainer.style.display = 'block';
    
    if (index === q.correct) {
        // Correct answer
        options[index].classList.add('correct');
        score += 10; // 10 points per correct answer (100/10 = 10)
        xp += 10;
        correctAnswers++;
        
        // Update comprehensive scoring system
        if (typeof updateActivityScore === 'function') {
            updateActivityScore('kuis-seru', 10, 10); // Score and XP for correct answer
        }
        
        feedbackContainer.innerHTML = 
            '<div class="feedback-correct">' +
                '<div class="feedback-icon">?</div>' +
                '<div class="feedback-text">' +
                    '<div class="feedback-title">Benar!</div>' +
                    '<div class="feedback-explanation">' + q.explanation + '</div>' +
                '</div>' +
            '</div>';
        
        showToast('success', 'Benar! +10 Skor, +10 XP');
    } else {
        // Wrong answer
        options[index].classList.add('wrong');
        if (options[q.correct]) {
            options[q.correct].classList.add('correct');
        }
        wrongAnswers++;
        
        feedbackContainer.innerHTML = 
            '<div class="feedback-wrong">' +
                '<div class="feedback-icon">❌</div>' +
                '<div class="feedback-text">' +
                    '<div class="feedback-title">Salah!</div>' +
                    '<div class="feedback-explanation">' + q.explanation + '</div>' +
                '</div>' +
            '</div>';
        
        showToast('error', 'Salah! Coba lagi ya...');
    }
    
    // Disable all options
    options.forEach(function(opt) {
        opt.classList.add('disabled');
    });
    
    // Add continue button
    var continueBtn = document.createElement('button');
    continueBtn.className = 'continue-btn';
    continueBtn.innerHTML = '<i class="fas fa-arrow-right"></i> Lanjut';
    continueBtn.onclick = nextQuestion;
    
    // Remove old continue button if exists
    var oldBtn = feedbackContainer.querySelector('.continue-btn');
    if (oldBtn) oldBtn.remove();
    
    feedbackContainer.appendChild(continueBtn);
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < currentQuestions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

// ==================== RESULTS ====================

function showResults() {
    // Update result UI
    var resultIcon, resultTitle, resultMessage, recommendation;
    
    if (score >= 80) {
        resultIcon = '🏆';
        resultTitle = 'Luar Biasa!';
        resultMessage = 'Kamu benar-benar MASTER hortikultura!';
        recommendation = 'Pertahankan! Terus eksplorasi tanaman lain untuk jadi ahli lengkap!';
    } else if (score >= 60) {
        resultIcon = '🌟';
        resultTitle = 'Bagus Sekali!';
        resultMessage = 'Pengetahuanmu sangat baik!';
        recommendation = 'Kamu sudah bagus! Coba kuis lagi untuk nilai sempurna!';
    } else if (score >= 40) {
        resultIcon = '👍';
        resultTitle = 'Good Job!';
        resultMessage = 'Terus belajar ya!';
        recommendation = 'Ayo belajar lebih lanjut di Kebun Ajaib untuk meningkatkan pengetahuan!';
    } else {
        resultIcon = '📚';
        resultTitle = 'Tetap Semangat!';
        resultMessage = 'Ayo belajar lagi!';
        recommendation = 'Jangan menyerah! Baca panduan di Buku Tanamku dan coba lagi!';
    }
    
    document.getElementById('result-icon').textContent = resultIcon;
    document.getElementById('result-title').textContent = resultTitle;
    
    // Add personalized greeting
    var user = window.AUTH ? window.AUTH.getCurrentUser() : null;
    var greeting = user && user.name ? 'Selamat ' + resultTitle + ', ' + user.name + '!' : resultTitle;
    document.getElementById('result-title').textContent = greeting;
    
    document.getElementById('result-message').textContent = resultMessage;
    document.getElementById('final-score').textContent = score;
    document.getElementById('correct-count').textContent = correctAnswers;
    document.getElementById('wrong-count').textContent = wrongAnswers;
    document.getElementById('xp-earned').textContent = xp;
    document.getElementById('recommendation-text').textContent = recommendation;
    
    // Enhanced quiz completion tracking with anti-cheat measures
    completeQuiz();
    
    // Update leaderboard with REAL data
    if (typeof REALTIME !== 'undefined') {
        var leaderboard = REALTIME.getLeaderboard(5) || [];
        renderLeaderboard(leaderboard);
    }
    
    showScreen('result-screen');
}

function completeQuiz() {
    var totalQuestions = currentQuestions.length;
    var percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Calculate XP based on actual performance
    var baseXP = Math.round((correctAnswers / totalQuestions) * 30); // Max 30 XP based on accuracy
    var bonusXP = percentage >= 60 ? 20 : 0; // 20 XP bonus for passing (60%+)
    var totalXP = baseXP + bonusXP;
    
    // Use recommendation from showResults function
    // Save XP/stats with enhanced tracking (100% REAL)
    console.log('📊 Quiz: AUTH available:', typeof AUTH !== 'undefined');
    console.log('📊 Quiz: REALTIME available:', typeof REALTIME !== 'undefined');
    
    if (typeof AUTH !== 'undefined' && typeof REALTIME !== 'undefined') {
        // Get current user directly from AUTH
        const currentUser = AUTH.getCurrentUser();
        console.log('📊 Quiz: Current user from AUTH:', currentUser);
        
        if (!currentUser || !currentUser.id) {
            console.error('📊 Quiz: No authenticated user found!');
            console.error('📊 Quiz: AUTH.getCurrentUser() returned:', currentUser);
            return;
        }
        
        // Make user available globally for REALTIME
        if (typeof window.getCurrentUser !== 'function') {
            window.getCurrentUser = function() {
                return AUTH.getCurrentUser();
            };
            console.log('📊 Quiz: Set global getCurrentUser function');
        }
        
        console.log('📊 Quiz: Ensuring user is initialized...');
        const userInitialized = REALTIME.ensureUserInitialized();
        
        if (!userInitialized) {
            console.error('📊 Quiz: Failed to initialize user data!');
            return;
        }
        
        console.log('📊 Quiz: Saving quiz results...');
        console.log('📊 Quiz: Stats - Correct:', correctAnswers, 'Total:', totalQuestions, 'Percentage:', percentage, 'XP:', totalXP);
        
        var result = REALTIME.addXP(totalXP, `Kuis ${PLANTS_DATA[selectedPlant]?.name || 'Tanaman'} - ${correctAnswers}/${totalQuestions} benar`);
        console.log('📊 Quiz: XP add result:', result);
        
        REALTIME.incrementStat('quizzesCompleted');
        console.log('📊 Quiz: Incremented quizzesCompleted');
        
        REALTIME.incrementStat('quizQuestionsAnswered', totalQuestions);
        REALTIME.incrementStat('quizQuestionsCorrect', correctAnswers);
        REALTIME.incrementStat('totalScore', percentage); // Add cumulative score tracking
        console.log('📊 Quiz: All stats incremented');
        
        // Record detailed quiz activity for anti-cheat verification
        REALTIME.recordActivity('complete_quiz', {
            plant: selectedPlant,
            category: selectedCategory,
            score: score,
            percentage: percentage,
            xp: totalXP,
            correctAnswers: correctAnswers,
            wrongAnswers: wrongAnswers,
            totalQuestions: totalQuestions,
            timeSpent: Date.now() - quizStartTime,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent.substring(0, 100), // Partial fingerprint for verification
            sessionVerified: true // Mark as verified session
        });
        
        // Verify data was saved
        setTimeout(function() {
            var userData = REALTIME.getCurrentUserData();
            console.log('📊 Quiz: Verification - User data after save:', userData);
            console.log('📊 Quiz: XP after save:', userData?.xp);
            console.log('📊 Quiz: Stats after save:', userData?.stats);
            
            // Force profile update if available
            if (typeof REALTIME !== 'undefined' && typeof REALTIME.updateProfileNow === 'function') {
                console.log('📊 Quiz: Triggering profile update...');
                REALTIME.updateProfileNow();
            }
        }, 500);
        
        if (result && result.level > 1) {
            showToast('success', 'Selamat Level ' + result.level + '! +' + totalXP + ' XP');
        } else {
            showToast('success', 'Kuis selesai! +' + totalXP + ' XP');
        }
        
        var bonusText = bonusXP > 0 ? ' (+' + bonusXP + ' bonus)' : '';
        document.getElementById('xp-earned').textContent = totalXP + bonusText;
    } else {
        console.error('📊 Quiz: AUTH or REALTIME not available!');
        console.error('📊 Quiz: AUTH:', typeof AUTH);
        console.error('📊 Quiz: REALTIME:', typeof REALTIME);
    }
}

function getRecommendation(percentage) {
    if (percentage >= 90) {
        return 'Pertahankan! Terus eksplorasi tanaman lain untuk jadi ahli lengkap!';
    } else if (percentage >= 80) {
        return 'Kamu sudah bagus! Coba kuis lagi untuk nilai sempurna!';
    } else if (percentage >= 60) {
        return 'Ayo belajar lebih lanjut di Kebun Ajaib untuk meningkatkan pengetahuan!';
    } else {
        return 'Jangan menyerah! Baca panduan di Buku Tanamku dan coba lagi!';
    }
}

function retryQuiz() {
    // Reset state
    selectedCategory = null;
    selectedPlant = null;
    currentQuestionIndex = 0;
    score = 0;
    xp = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    isAnswered = false;
    
    // Reset UI
    document.querySelectorAll('.category-card, .plant-card').forEach(function(card) { 
        card.classList.remove('selected'); 
    });
    document.getElementById('btn-select-category').disabled = true;
    document.getElementById('btn-select-plant').disabled = true;
    
    showScreen('category-screen');
}

// ==================== LEADERBOARD - 100% REAL ====================
function renderLeaderboard(realLeaderboard = []) {
    var list = document.getElementById('leaderboard-list');
    if (!list) return;
    
    list.innerHTML = '';
    
    realLeaderboard.slice(0, 5).forEach(function(player, index) {
        var item = document.createElement('div');
        item.className = 'leaderboard-item top-' + (index + 1);
        
        item.innerHTML = 
            '<span class="rank">' + (index + 1) + '</span>' +
            '<div class="player-info">' +
                '<div class="player-name">' + (player.name || 'Siswa') + '</div>' +
                '<div class="player-score">Score: ' + (player.holisticScore || player.score || 0) + '</div>' +
            '</div>' +
            '<div class="player-xp">' + (player.xp || 0) + ' XP</div>';
        list.appendChild(item);
    });
    
    if (realLeaderboard.length === 0) {
        list.innerHTML = '<div style="text-align:center;padding:20px;color:#666;">Belum ada peserta</div>';
    }
}

function initLeaderboard(retryCount = 0) {
    if (retryCount > 10) {
        console.log('REALTIME not available, leaderboard will update when ready');
        return;
    }
    
    if (typeof REALTIME !== 'undefined' && REALTIME.getLeaderboard) {
        var leaderboard = REALTIME.getLeaderboard(5);
        renderLeaderboard(leaderboard);
    } else {
        setTimeout(function() { 
            initLeaderboard(retryCount + 1); 
        }, 200);
    }
}

// ==================== LEADERBOARD ====================

function addToLeaderboard(name, playerXp, playerScore) {
    // Get current leaderboard from REALTIME
    var currentLeaderboard = [];
    if (typeof REALTIME !== 'undefined' && REALTIME.getLeaderboard) {
        currentLeaderboard = REALTIME.getLeaderboard(10) || [];
    }
    
    var existingIndex = -1;
    for (var i = 0; i < currentLeaderboard.length; i++) {
        if (currentLeaderboard[i].name === name) {
            existingIndex = i;
            break;
        }
    }
    
    if (existingIndex >= 0) {
        // Update existing entry if XP is higher
        if (playerXp > currentLeaderboard[existingIndex].xp) {
            currentLeaderboard[existingIndex] = { name: name, xp: playerXp, score: playerScore };
        }
    } else {
        // Add new entry
        currentLeaderboard.push({ name: name, xp: playerXp, score: playerScore });
    }
    
    // Sort by XP descending
    currentLeaderboard.sort(function(a, b) { return b.xp - a.xp; });
    
    // Keep only top 10
    currentLeaderboard = currentLeaderboard.slice(0, 10);
    
    // Re-render leaderboard
    renderLeaderboard(currentLeaderboard);
}

// Make functions global for inline onclick handlers
window.selectCategory = selectCategory;
window.goToPlantSelection = goToPlantSelection;
window.backToCategories = backToCategories;
window.selectPlant = selectPlant;
window.startQuiz = startQuiz;
window.retryQuiz = retryQuiz;
window.showToast = showToast;

// ==================== TOAST NOTIFICATIONS ====================

function showToast(type, message) {
    var container = document.getElementById('toast-container');
    if (!container) return;
    
    // Create toast element
    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    
    // Set icon based on type
    var icon = '';
    switch(type) {
        case 'success':
            icon = '✅';
            break;
        case 'error':
            icon = '❌';
            break;
        case 'warning':
            icon = '⚠️';
            break;
        case 'info':
            icon = 'ℹ️';
            break;
        default:
            icon = '📢';
    }
    
    toast.innerHTML = 
        '<div class="toast-icon">' + icon + '</div>' +
        '<div class="toast-message">' + message + '</div>';
    
    // Add to container
    container.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(function() {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}
