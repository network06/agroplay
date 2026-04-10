/**
 * AGROPLAY - Guide JavaScript
 * Buku Tanamku V - Complete with Quiz Connection
 * All Categories: Tentang, Pangan, Industri, Hias, Obat, Serat, Tradisional, Modern
 * 
 * UPDATED: Contains scientific names and detailed info that matches quiz questions
 * Students can study from Buku Tanamku before taking Kuis Seru Tani
 */

// Current state
var currentCategory = 'all';
var currentView = 'menu'; // 'menu', 'category', 'detail'

// ==================== PLANTS DATA - WITH QUIZ INFO ====================
// All Plants - 17 plants matching quiz categories
// Each plant includes: scientificName, origin, quiz topics for learning
var PLANTS = [
    // === PANGAN (3) ===
    { 
        id: 'padi', 
        name: 'Padi', 
        nameId: 'Padi - Penghasil Nasi',
        icon: '🌾', 
        category: 'pangan', 
        difficulty: 'Sedang', 
        growTime: '90-120 hari', 
        season: 'Musim hujan', 
        sunlight: 'Sinar matahari penuh', 
        water: 'Banyak', 
        soil: 'Lempung', 
        // QUIZ INFO - Details for learning before quiz
        scientificName: 'Oryza sativa',
        origin: 'Asia Tenggara',
        height: '60-120 cm',
        plantType: 'Herba',
        harvestTime: '3-4 bulan',
        // Quiz Topics - Info untuk menjawab soal kuis
        quizInfo: {
            bagianDimakan: 'Biji (beras)',
            tinggiNormal: '60-120 cm',
            iklimTumbuh: 'Dataran rendah berair',
            negaraIndonesia: 'Penghasil padi terbesar',
            namaBunga: 'Malai',
            warnaPanen: 'Kuning keemasan',
            kegunaan: ['Beras untuk nasi', 'Jerami', 'Dedak']
        },
        intro: "Hai anak-anak! Perkenalkan, aku Pak Padi! Aku adalah tanaman pangan utama masyarakat Indonesia.",
        description: "Tinggi 60-120 cm, mirip rumput tapi lebih tinggi. Daun panjang dan ramping seperti pita hijau. Bunga kecil berkelompok (malai). Batang kosong di dalam seperti sedotan.",
        benefits: ["Beras untuk nasi", "Jerami untuk tempat tidur hewan", "Dedak untuk pakan ayam"],
        stages: ['🌱', '🌿', '🌸', '🍚']
    },
    { 
        id: 'jagung', 
        name: 'Jagung', 
        nameId: 'Jagung - Biji Runcing',
        icon: '🌽', 
        category: 'pangan', 
        difficulty: 'Sedang', 
        growTime: '80-110 hari', 
        season: 'Musim hujan', 
        sunlight: 'Sinar matahari penuh', 
        water: 'Banyak', 
        soil: 'Lempung dalam', 
        scientificName: 'Zea mays',
        origin: 'Meksiko, Amerika Tengah',
        height: '150-300 cm',
        plantType: 'Herba (Famili Gramineae)',
        harvestTime: '2.5-4 bulan',
        quizInfo: {
            bagianDimakan: 'Buah (tongkol)',
            tinggiNormal: '150-300 cm',
            keluarga: 'Gramineae (rumput-rumputan)',
            bungaJantan: 'Di ujung batang (malai)',
            bungaBetina: 'Di tengah batang',
            kandungan: 'Karbohidrat',
            pengolahan: ['Minyak goreng', 'Tepung', 'Popcorn']
        },
        intro: "Hai anak-anak! Perkenalkan, aku Pak Jagung! Aku jagung segar dari ladang.",
        description: "Tinggi 150-300 cm. Batang lurus dengan daun lebar. Bunga jantan di ujung (malai), bunga betina di tengah batang. Buah disebut tongkol, tempat biji-biji jagung.",
        benefits: ["Sumber carbohydrates", "Pakan ternak", "Bahan baku tepung"],
        stages: ['🌱', '🌿', '🌸', '🌽']
    },
    { 
        id: 'kentang', 
        name: 'Kentang', 
        nameId: 'Kentang - Umbi Lezat',
        icon: '🥔', 
        category: 'pangan', 
        difficulty: 'Sedang', 
        growTime: '90-120 hari', 
        season: 'Musim kemarau', 
        sunlight: 'Sinar matahari penuh', 
        water: 'Sedang', 
        soil: 'Lempung berpasir', 
        scientificName: 'Solanum tuberosum',
        origin: 'Amerika Selatan (Pegunungan Andes)',
        height: '30-100 cm',
        plantType: 'Herba',
        harvestTime: '3-4 bulan',
        quizInfo: {
            bagianDimakan: 'Umbi',
            namaIlmiah: 'Solanum tuberosum',
            asalDaerah: 'Amerika Selatan',
            bungaWarna: 'Putih atau ungu',
            iklimTumbuh: 'Iklim sedang yang sejuk',
            kandungan: 'Vitamin C',
            penyakit: 'Busuk umbi'
        },
        intro: "Hai anak-anak! Perkenalkan, aku Pak Kentang! Aku adalah siumbi yang tasty.",
        description: "Tinggi 30-100 cm. Daun berbentuk oval dengan tepi bergerigi. Bunga berwarna putih atau ungu. Kentang menghasilkan umbi yang berkembang dari akar.",
        benefits: ["Sumber carbohydrates", "Bahan makanan sehat", "Sumber vitamin C"],
        stages: ['🌱', '🌿', '🌸', '🥔']
    },
    
    // === INDUSTRI (4) ===
    { 
        id: 'kelapasawit', 
        name: 'Kelapa Sawit', 
        nameId: 'Kelapa Sawit - Penghasil minyak',
        icon: '🥥', 
        category: 'industri', 
        difficulty: 'Sulit', 
        growTime: '2-3 tahun', 
        season: 'Semua musim', 
        sunlight: 'Sinar matahari penuh', 
        water: 'Banyak', 
        soil: 'Lempung subur', 
        scientificName: 'Elaeis guineensis',
        origin: 'Afrika Barat',
        height: '10-20 meter',
        plantType: 'Pohon',
        harvestTime: '2-3 tahun',
        quizInfo: {
            produkUtama: 'Minyak',
            namaIlmiah: 'Elaeis guineensis',
            tinggiNormal: '10-20 meter',
            buahWarna: 'Merah oranye saat matang',
            negara: 'Indonesia - produsen terbesar dunia',
            penggunaan: ['Makanan', 'Kosmetik', 'Biodiesel'],
            prosesEkstraksi: 'Pemanasan dan pressing'
        },
        intro: "Hai anak-anak! Perkenalkan, aku Pak Kelapa Sawit! Aku adalah pohon penghasil minyak.",
        description: "Tinggi 10-20 meter. Daun menyirip panjang seperti kipas. Buah berwarna merah-oranye saat matang.",
        benefits: ["Minyak goreng", "Bahan kosmetik", "Biofuel"],
        stages: ['🌱', '🌿', '🌸', '🥥']
    },
    { 
        id: 'karet', 
        name: 'Karet', 
        nameId: 'Karet - Penghasil Getah',
        icon: '🌳', 
        category: 'industri', 
        difficulty: 'Sulit', 
        growTime: '5-7 tahun', 
        season: 'Semua musim', 
        sunlight: 'Sinar matahari penuh', 
        water: 'Sedang', 
        soil: 'Lempung subur', 
        scientificName: 'Hevea brasiliensis',
        origin: 'Amazon, Brasil',
        height: '20-30 meter',
        plantType: 'Pohon',
        harvestTime: '5-7 tahun',
        quizInfo: {
            produkUtama: 'Getah (lateks)',
            namaIlmiah: 'Hevea brasiliensis',
            asalDaerah: 'Hutan Amazon, Brasil',
            getahWarna: 'Putih seperti susu',
            produkOlahan: ['Ban kendaraan', 'Sarung tangan', 'Kondom', 'Balon'],
            caraAmbil: 'Menyadap'
        },
        intro: "Hai anak-anak! Perkenalkan, aku Pak Karet! Aku pohon penghasil getah putih.",
        description: "Tinggi 20-30 meter. Daun berbentuk hati. Getah putih seperti susu (lateks).",
        benefits: ["Ban kendaraan", "Sarung tangan", "Alat-alat medis"],
        stages: ['🌱', '🌿', '🌸', '🌳']
    },
    { 
        id: 'tebu', 
        name: 'Tebu', 
        nameId: 'Tebu - Batang Manis',
        icon: '🎋', 
        category: 'industri', 
        difficulty: 'Sedang', 
        growTime: '10-14 bulan', 
        season: 'Musim hujan', 
        sunlight: 'Sinar matahari penuh', 
        water: 'Banyak', 
        soil: 'Lempung dalam', 
        scientificName: 'Saccharum officinarum',
        origin: 'Asia Tenggara dan Papua Nugini',
        height: '2-6 meter',
        plantType: 'Herba (Famili Gramineae)',
        harvestTime: '10-14 bulan',
        quizInfo: {
            produkUtama: 'Gula',
            namaIlmiah: 'Saccharum officinarum',
            tinggiNormal: '2-6 meter',
            bagianDigunakan: 'Batang beruas',
            kandungan: ['Sukrosa', 'Glukosa', 'Fruktosa'],
            limbah: ['Molases', 'Bagasse']
        },
        intro: "Hai anak-anak! Perkenalkan, aku Pak Tebu! Aku batang manis penghasil gula.",
        description: "Tinggi 2-6 meter. Batang beruas keras yang mengandung gula. Daun panjang dan tajam.",
        benefits: ["Gula pasir", "Bioetanol", "Bahan kerajinan"],
        stages: ['🌱', '🌿', '🌸', '🎋']
    },
    { 
        id: 'kapas', 
        name: 'Kapas', 
        nameId: 'Kapas - Bulu Lembut',
        icon: '☁️', 
        category: 'industri', 
        difficulty: 'Sedang', 
        growTime: '4-6 bulan', 
        season: 'Musim kemarau', 
        sunlight: 'Sinar matahari penuh', 
        water: 'Sedang', 
        soil: 'Lempung berpasir', 
        scientificName: 'Gossypium hirsutum',
        origin: 'Meksiko, Amerika Tengah',
        height: '1-2 meter',
        plantType: 'Semak',
        harvestTime: '4-6 bulan',
        quizInfo: {
            produk: 'Serat untuk pakaian',
            namaIlmiah: 'Gossypium hirsutum',
            tinggiNormal: '1-2 meter',
            bungaWarna: 'Kuning-putih',
            buahBentuk: 'Kapsul',
            iklim: 'Panas dan kering',
            warnaAlam: ['Putih', 'Coklat']
        },
        intro: "Hai anak-anak! Perkenalkan, aku Pak Kapas! Aku adalah bulu lembut untuk kain.",
        description: "Tinggi 1-2 meter. Bunga berwarna kuning yang berubah menjadi putih. Buah berbentuk kapsul.",
        benefits: ["Bahan pakaian", "Bahan pembalut", "Bahan industri tekstil"],
        stages: ['🌱', '🌿', '🌸', '☁️']
    },
    
    // === HIAS (3 - sesuai quiz) ===
    { 
        id: 'kembangsepatu', 
        name: 'Kembang Sepatu', 
        nameId: 'Kembang Sepatu - Bunga Cantik',
        icon: '🌺', 
        category: 'hias', 
        difficulty: 'Mudah', 
        growTime: '6-12 bulan', 
        season: 'Semua musim', 
        sunlight: 'Sinar matahari penuh', 
        water: 'Sedang', 
        soil: 'Lempung subur', 
        scientificName: 'Hibiscus rosa-sinensis',
        origin: 'Asia (Indonesia, Cina, India)',
        height: '1-3 meter',
        plantType: 'Semak',
        harvestTime: '6-12 bulan',
        quizInfo: {
            namaIlmiah: 'Hibiscus rosa-sinensis',
            namaLain: 'Bunga Ralksata',
            warnaBunga: ['Merah', 'Kuning', 'Putih'],
            tinggiNormal: '1-3 meter',
            maknaHawaii: 'Kebanyakan',
            caraTanam: 'Stek'
        },
        intro: "Hai anak-anak! Perkenalkan, aku Pak Kembang Sepatu! Aku bunga merah merona.",
        description: "Tinggi 1-3 meter. Bunga berwarna merah, kuning, atau putih. Daun berbentuk oval dengan tepi bergerigi.",
        benefits: ["Hiasan taman", "Peneduh", "Bahan obat tradisional"],
        stages: ['🌱', '🌿', '🌸', '🌺']
    },
    { 
        id: 'rumputbojosh', 
        name: 'Rumput Bojosh', 
        nameId: 'Rumput Bojosh - Hijau Segar',
        icon: '🌿', 
        category: 'hias', 
        difficulty: 'Mudah', 
        growTime: '3-6 bulan', 
        season: 'Semua musim', 
        sunlight: 'Sinar matahari penuh', 
        water: 'Sedang', 
        soil: 'Lempung', 
        scientificName: 'Pennisetum purpureum',
        origin: 'Afrika',
        height: '1-2 meter',
        plantType: 'Rumput',
        harvestTime: '3-6 bulan',
        quizInfo: {
            namaIlmiah: 'Pennisetum purpureum',
            fungsi: 'Penahan erosi',
            tinggiNormal: '1-2 meter',
            daunBentuk: 'Lebar dan panjang',
            kegunaan: ['Halaman', 'Pakan ternak', 'Penahan erosi']
        },
        intro: "Hai anak-anak! Perkenalkan, aku Pak Rumput Bojosh! Aku rumput hijau yang segar.",
        description: "Tinggi 1-2 meter. Daun lebar dan panjang. Batang kuat dan beruas.",
        benefits: ["Penahan erosi", "Bahan kerajinan", "Pakan ternak"],
        stages: ['🌱', '🌿', '🌸', '🌿']
    },
    { 
        id: 'monstera', 
        name: 'Monstera', 
        nameId: 'Monstera - Daun Berlubang',
        icon: '🌿', 
        category: 'hias', 
        difficulty: 'Mudah', 
        growTime: '6-12 bulan', 
        season: 'Semua musim', 
        sunlight: 'Cahaya tidak langsung', 
        water: 'Sedang', 
        soil: 'Campuran serbuk pakis', 
        scientificName: 'Monstera deliciosa',
        origin: 'Hutan hujan Amerika Tengah',
        height: '3-5 meter (tanaman memanjat)',
        plantType: 'Tropical vine',
        harvestTime: '6-12 bulan',
        quizInfo: {
            namaIlmiah: 'Monstera deliciosa',
            asalDaerah: 'Hutan hujan Amerika Tengah',
            ciriKhas: 'Daun berlubang',
            alasanLubang: 'Adaptasi toleransi angin',
            manfaat: 'Membersihkan udara',
            buah: 'Bisa dimakan'
        },
        intro: "Hai anak-anak! Perkenalkan, aku Monstera! Daunku berlubang unik seperti进口装饰植物!",
        description: "Tanaman tropis dengan daun besar yang berlubang unik. Sangat populer untuk dekorasi rumah modern!",
        benefits: ["Daun unik untuk dekorasi", "Membersihkan udara", "Mudah perawatannya"],
        stages: ['🌱', '🌿', '🌸', '🌿']
    },
    
    // === OBAT (3) ===
    { 
        id: 'jahe', 
        name: 'Jahe', 
        nameId: 'Jahe - Rimpang Pedas',
        icon: '🫚', 
        category: 'obat', 
        difficulty: 'Sedang', 
        growTime: '8-10 bulan', 
        season: 'Musim hujan', 
        sunlight: 'Teduh parsial', 
        water: 'Sedang', 
        soil: 'Lempung subur', 
        scientificName: 'Zingiber officinale',
        origin: 'Asia Selatan dan Tenggara',
        height: '30-60 cm',
        plantType: 'Herba (Rimpang)',
        harvestTime: '6-12 bulan',
        quizInfo: {
            namaIlmiah: 'Zingiber officinale',
            bagian: 'Rimpang',
            warna: ['Kuning', 'Putih'],
            kandungan: 'Minyak atsiri',
            manfaat: ['Menghangatkan tubuh', 'Mengatasi pilek dan batuk'],
            iklim: 'Panas dan lembab'
        },
        intro: "Hai anak-anak! Perkenalkan, aku Pak Jahe! Aku rimpang pedas yang hangat.",
        description: "Tinggi 30-60 cm. Batang semu berbentuk rimpang. Daun panjang dan ramping.",
        benefits: ["Menghangatkan tubuh", "Mengatasi masuk angin", "Bahan obat tradisional"],
        stages: ['🌱', '🌿', '🌸', '🫚']
    },
    { 
        id: 'kunyit', 
        name: 'Kunyit', 
        nameId: 'Kunyit - Rimpang Emas',
        icon: '🧡', 
        category: 'obat', 
        difficulty: 'Sedang', 
        growTime: '8-12 bulan', 
        season: 'Musim hujan', 
        sunlight: 'Teduh parsial', 
        water: 'Sedang', 
        soil: 'Lempung subur', 
        scientificName: 'Curcuma longa',
        origin: 'Asia Tenggara',
        height: '60-100 cm',
        plantType: 'Herba (Rimpang)',
        harvestTime: '8-12 bulan',
        quizInfo: {
            namaIlmiah: 'Curcuma longa',
            bagian: 'Rimpang',
            warna: 'Kuning cerah',
            zatAktif: 'Kurkumin',
            manfaat: ['Pencernaan', 'Peradangan'],
            pengolahan: ['Kunyit bubuk', 'Jamu', 'Masker']
        },
        intro: "Hai anak-anak! Perkenalkan, aku Pak Kunyit! Aku rimpang emas berwarna kuning.",
        description: "Tinggi 60-100 cm. Batang berbentuk rimpang kuning cerah. Bunga berwarna kuning terang.",
        benefits: ["Pewarna alami", "Anti-inflamasi", "Bahan jamu"],
        stages: ['🌱', '🌿', '🌸', '🧡']
    },
    
    // === SERAT (4) ===
    { 
        id: 'melok', 
        name: 'Melok', 
        nameId: 'Melok - Daun Kipas',
        icon: '🌴', 
        category: 'serat', 
        difficulty: 'Mudah', 
        growTime: '1-2 tahun', 
        season: 'Semua musim', 
        sunlight: 'Sinar matahari penuh', 
        water: 'Sedang', 
        soil: 'Lempung', 
        scientificName: 'Corypha umbraculifera',
        origin: 'Asia Tenggara',
        height: '25-30 meter',
        plantType: 'Pohon (Palma)',
        harvestTime: '1-2 tahun',
        quizInfo: {
            namaIlmiah: 'Corypha umbraculifera',
            tinggiNormal: '25-30 meter',
            famili: 'Arecaceae (palma)',
            bunga: 'Sekali seumur hidup (monocarpic)',
            daunKegunaan: 'Anyaman topi dan keranjang',
            fungsi: 'Bahan atap'
        },
        intro: "Hai anak-anak! Perkenalkan, aku Pak Melok! Aku pohon daun kipas.",
        description: "Tinggi 25-30 meter. Daun besar berbentuk kipas. Batang beruas kuat.",
        benefits: ["Bahan atap", "Bahan kerajinan", "Bahan anyaman"],
        stages: ['🌱', '🌿', '🌸', '🌴']
    },
    { 
        id: 'rumputodod', 
        name: 'Rumput Odod', 
        nameId: 'Rumput Odod - Hijau Bergizi',
        icon: '🌿', 
        category: 'serat', 
        difficulty: 'Sangat Mudah', 
        growTime: '2-4 bulan', 
        season: 'Semua musim', 
        sunlight: 'Sinar matahari penuh', 
        water: 'Sedang', 
        soil: 'Lempung berpasir', 
        scientificName: 'Saccharum spontaneum',
        origin: 'Asia Tropis',
        height: '1-3 meter',
        plantType: 'Rumput',
        harvestTime: '2-4 bulan',
        quizInfo: {
            namaIlmiah: 'Saccharum spontaneum',
            tinggiNormal: '1-3 meter',
            fungsi: 'Bahan anyaman',
            hasilAnyaman: ['Tikar', 'Keranjang', 'Tas'],
            berkembangBiak: ['Biji', 'Rhizom']
        },
        intro: "Hai anak-anak! Perkenalkan, aku Pak Rumput Odod! Aku rumput hijau bergizi.",
        description: "Tinggi 1-3 meter. Batang ramping dan beruas. Daun tipis dan panjang.",
        benefits: ["Bahan anyaman", "Bahan kerajinan", "Bahan tekstil"],
        stages: ['🌱', '🌿', '🌸', '🌿']
    },
    { 
        id: 'sisal', 
        name: 'Sisal', 
        nameId: 'Sisal - Daun Kuat',
        icon: '🌵', 
        category: 'serat', 
        difficulty: 'Mudah', 
        growTime: '2-3 tahun', 
        season: 'Semua musim', 
        sunlight: 'Sinar matahari penuh', 
        water: 'Sedikit', 
        soil: 'Pasir bercampur tanah', 
        scientificName: 'Agave sisalana',
        origin: 'Meksiko',
        height: '1-1.5 meter',
        plantType: 'Herba (Agave)',
        harvestTime: '2-3 tahun',
        quizInfo: {
            namaIlmiah: 'Agave sisalana',
            asalDaerah: 'Meksiko',
            produk: 'Serat alami',
            bentukDaun: 'Panjang dan tebal, berduri',
            keunggulan: ['Kuat', 'Tahan lama', 'Ramah lingkungan'],
            pengolahan: 'Dikeringkan dan digiling'
        },
        intro: "Hai anak-anak! Perkenalkan, aku Pak Sisal! Aku daun kuat untuk tali.",
        description: "Tinggi 1-1.5 meter. Daun panjang dan tajam, berbentuk roset di pangkal.",
        benefits: ["Tali tambang", "Keset", "Bahan kerajinan"],
        stages: ['🌱', '🌿', '🌸', '🌵']
    },
    { 
        id: 'rami', 
        name: 'Rami', 
        nameId: 'Rami - Serat Berkualitas',
        icon: '🌿', 
        category: 'serat', 
        difficulty: 'Mudah', 
        growTime: '1-2 tahun', 
        season: 'Semua musim', 
        sunlight: 'Sinar matahari penuh', 
        water: 'Sedang', 
        soil: 'Lempung', 
        scientificName: 'Boehmeria nivea',
        origin: 'Cina',
        height: '1-2 meter',
        plantType: 'Semak',
        harvestTime: '1-2 tahun',
        quizInfo: {
            namaIlmiah: 'Boehmeria nivea',
            asalDaerah: 'Cina',
            bentuk: 'Semak dengan daun lebar',
            keunggulan: 'Kekuatan dan kilau',
            campuran: ['Kapas', 'Wol', 'Polyester'],
            jenis: 'Tanaman perennial'
        },
        intro: "Hai anak-anak! Perkenalkan, aku Pak Rami! Aku tanaman penghasil serat berkualitas tinggi.",
        description: "Rami berbentuk semak dengan daun lebar. Serat rami dikenal karena kekuatan dan kilau alaminya.",
        benefits: ["Tali", "Kain berkualitas tinggi", "Kertas"],
        stages: ['🌱', '🌿', '🌸', '🌿']
    }
];

// ==================== OLAHAN DATA - MAKANAN TUMBUHAN & HAMA ====================

// Olahan Tradisional (from buku tanamyuk)
var OLAHAN_TRADISIONAL = [
    { 
        id: 'nasi', 
        name: 'Nasi', 
        icon: '🍚', 
        asalTanaman: 'Padi',
        description: "Nasi adalah makanan utama khas Indonesia yang berasal dari biji tanaman padi yang dimasak.",
        bahan: ['Beras', 'Air', 'Garam (opsional)'],
        caraMasak: ['Cuci beras terlebih dahulu', 'Masak dengan air sesuai takaran', 'Diamkan hingga matang']
    },
    { 
        id: 'lontong', 
        name: 'Lontong', 
        icon: '🥣', 
        asalTanaman: 'Padi',
        description: "Lontong adalah makanan yang dibuat dari beras yang dimasak dengan barangan lalu dibungkus dengan daun pisangan.",
        bahan: ['Beras', 'Daun pisangan', 'Bamboo (barangan)', 'Air'],
        caraMasak: ['Cuci beras dan rendam', 'Bungkus dengan daun pisangan', 'Kukus hingga matang']
    },
    { 
        id: 'ketoprak', 
        name: 'Ketoprak', 
        icon: '🥜', 
        asalTanaman: 'Kacang Tanah, Tauge',
        description: "Ketoprak adalah makanan khas Jakarta yang terdiri dari tahu, lontong, dan sayuran dengan disiram bumbu kacang.",
        bahan: ['Tahu', 'Lontong', 'Tauge', 'Bumbu kacang', 'Kerupuk', 'Bawang goreng'],
        caraMasak: ['Siapkan bahan-bahan', 'Buat bumbu kacang', 'Campurkan semua bahan', 'Siram dengan bumbu kacang']
    },
    { 
        id: 'gado-gado', 
        name: 'Gado-gado', 
        icon: '🥗', 
        asalTanaman: 'Kentang, Kacang Panjang, Tauge',
        description: "Gado-gado adalah makanan khas Jawa yang terdiri dari berbagai sayuran yang disiram dengan saus kacang.",
        bahan: ['Kentang', 'Kacang panjang', 'Tauge', 'Kol', 'Bumbu kacang', 'Kerupuk', 'Telur rebus'],
        caraMasak: ['Rebus sayuran hingga matang', 'Buat bumbu kacang dari kacang tanah', 'Campurkan sayuran dengan bumbu', 'Tambahkan kerupuk']
    },
    { 
        id: 'sambal', 
        name: 'Sambal', 
        icon: '🌶️', 
        asalTanaman: 'Cabai',
        description: "Sambal adalah makanan pendamping khas Indonesia yang dibuat dari cabai dengan berbagai rempah.",
        bahan: ['Cabai merah', 'Cabai rawit', 'Bawang merah', 'Bawang putih', 'Tomat', 'Garam', 'Gula'],
        caraMasak: ['Haluskan semua bahan', 'Tumis hingga harum', 'Tambahkan garam dan gula', 'Sajikan']
    },
    { 
        id: 'getuk', 
        name: 'Getuk', 
        icon: '🍠', 
        asalTanaman: 'Singkong',
        description: "Getuk adalah makanan tradisional dari singkong yang diparut dan dicampur dengan gula merah.",
        bahan: ['Singkong', 'Gula merah', 'Kelapa parut', 'Garam'],
        caraMasak: ['Kupas dan rebus singkong', 'Parut singkong halus', 'Campur dengan gula merah parut', 'Cetak dan sajikan']
    },
    { 
        id: 'keripik', 
        name: 'Keripik', 
        icon: '🥔', 
        asalTanaman: 'Singkong, Kentang, Pisang',
        description: "Keripik adalah makanan ringan yang dibuat dari iris tipis berbagai umbi atau buah.",
        bahan: ['Singkong/kentang/pisang', 'Minyak goreng', 'Garam', 'Bawang (opsional)'],
        caraMasak: ['Iris tipis bahan', 'Rendam dengan air garam', 'Goreng hingga kering', 'Sajikan']
    },
    { 
        id: 'tauge', 
        name: 'Tauge', 
        icon: '🌱', 
        asalTanaman: 'Kacang hijau',
        description: "Tauge adalah kecambah dari biji kacang hijau yang memiliki banyak nutrisi.",
        bahan: ['Kacang hijau', 'Air', 'Kain bersih'],
        caraMasak: ['Rendam kacang hijau', 'Letakkan di tempat gelap', 'Siram dua kali sehari', 'Panen setelah 3-4 hari']
    }
];

// Olahan Modern
var OLAHAN_MODERN = [
    {
        id: 'salad',
        name: 'Salad Sayuran',
        icon: '🥗',
        asalTanaman: 'Kentang, Kacang Panjang, Wortel',
        description: "Salad adalah hidangan segar terdiri dari sayuran segar dengan saus.",
        bahan: ['Kentang', 'Kacang panjang', 'Wortel', 'Selada', 'Saus mayones', 'Tomat cherry'],
        caraMasak: ['Rebus kentang dan wortel', 'Iris tipis sayuran', 'Campurkan dengan saus', 'Sajikan dingin']
    },
    {
        id: 'juice',
        name: 'Jus Buah',
        icon: '🧃',
        asalTanaman: 'Pisang, Jeruk, Apel',
        description: "Jus adalah minuman segar dari buah yang di blender.",
        bahan: ['Pisang', 'Jeruk', 'Apel', 'Susu', 'Madu'],
        caraMasak: ['Kupas buah', 'Potong-potong', 'Blender dengan susu', 'Sajikan dingin']
    },
    {
        id: 'smoothie',
        name: 'Smoothie Bowl',
        icon: '🍓',
        asalTanaman: 'Pisang, Strawberry, Blueberry',
        description: "Smoothie bowl adalah hidangan modern dengan smoothie kental.",
        bahan: ['Pisang beku', 'Strawberry', 'Blueberry', 'Granola', 'Madu'],
        caraMasak: ['Blender buah beku', 'Tuang ke mangkok', 'Tambahkan topping', 'Sajikan']
    },
    {
        id: 'pizza',
        name: 'Pizza Sayuran',
        icon: '🍕',
        asalTanaman: 'Tomat, Paprika, Bawang',
        description: "Pizza adalah hidangan Italia dengan toppings sayuran.",
        bahan: ['Tepung', 'Tomat', 'Keju', 'Paprika', 'Bawang bombay', 'Zucchini'],
        caraMasak: ['Buat adonan pizza', 'Oles saus tomat', 'Tambahkan toppings', 'Panggang hingga matang']
    }
];

// Data Hama - Mengenal Hama pada Tanaman
var DATA_HAMA = [
    {
        id: 'kutu-daun',
        name: 'Kutu Daun',
        icon: '🐜',
        description: "Kutu daun adalah hama kecil yang menghisap cairan dari daun dan batang tanaman. Mereka biasanya berwarna hijau, hitam, atau coklat.",
        tanamanTerkena: ['Cabai', 'Tomat', 'Kentang', 'Kacang-kacangan'],
        gejala: ['Daun keriting dan menguning', 'Pertumbuhan tanaman terhambat', 'Terdapat lapisan lengket pada daun', 'Semut tertarik ke tanaman'],
        pencegahan: ['Tanam tanaman pendamping seperti serai', 'Gunakan insektisida organik', 'Pastikan sirkulasi udara baik', ' Jangan terlalu banyak memberi pupuk nitrogen'],
        pengobatan: ['Semprot dengan air sabun', 'Gunakan minyak neem', 'Introduksi predator alami seperti ladybug', 'Buang bagian tanaman yang parah']
    },
    {
        id: 'ulat',
        name: 'Ulat Daun',
        icon: '🐛',
        description: "Ulat adalah larva ngengat atau kupu-kupu yang memakan daun tanaman. Mereka dapat menyebabkan kerusakan parah jika tidak ditangani.",
        tanamanTerkena: ['Padi', 'Jagung', 'Kubis', 'Kacang panjang', 'Tomat'],
        gejala: ['Daun dimakan meninggalkan lubang', 'Terdapat ulat pada tanaman', 'Kotoran ulat pada daun', 'Tanaman cepat gundul'],
        pencegahan: ['Gunakan jaring insect', 'Tanam tanaman pengalih seperti wortel', 'Buang telur dan ulat secara manual', 'Gunakan feromon perangkap'],
        pengobatan: ['Petik ulat secara manual', 'Gunakan bacillus thuringiensis (Bt)', 'Semprot dengan insektisida nabati', 'Introduksi predator alami']
    },
    {
        id: 'kutu-kebul',
        name: 'Kutu Kebul',
        icon: '🦟',
        description: "Kutu kebul adalah serangga kecil berwarna putih yang hidup di bawah permukaan daun dan menghisap cairan tanaman.",
        tanamanTerkena: ['Tomat', 'Cabai', 'Terong', 'Kentang', 'Ketimun'],
        gejala: ['Daun menguning', 'Terdapat Bintik putih di bawah daun', 'Pertumbuhan terhambat', 'Tanaman layu'],
        pencegahan: ['Gunakan jaring insect', 'Hindari menanam inang alternatif', 'Gunakan perangkap lengket kuning', 'Pastikan jarak tanam cukup'],
        pengobatan: ['Semprot dengan air tekanan kuat', 'Gunakan insektisida sistemik', 'Introduksi Encarsia formosa (parasitoid)', 'Buang daun yang parah']
    },
    {
        id: 'tungau',
        name: 'Tungau (Spider Mite)',
        icon: '🕷️',
        description: "Tungau adalah hama sangat kecil yang membentuk jaring halus pada tanaman. Mereka berkembang biak cepat di cuaca panas.",
        tanamanTerkena: ['Cabai', 'Tomat', 'Terong', 'Kacang panjang', 'Melon'],
        gejala: ['Bintik kuning/kuning pada daun', 'Jaring halus pada tanaman', 'Daun mengering', 'Pertumbuhan lambat'],
        pencegahan: ['Jaga kelembaban udara', 'Siram tanaman secara teratur', 'Hindari stres air', 'Gunakan jarak tanam yang baik'],
        pengobatan: ['Semprot dengan air lembut', 'Gunakan minyak neem', 'Aplied akarisida', 'Buang tanaman yang parah']
    },
    {
        id: 'wereng',
        name: 'Wereng',
        icon: '🐝',
        description: "Wereng adalah serangga menghisap yang dapat menyebarkan virus berbahaya ke tanaman. Mereka sangat berbahaya untuk tanaman padi.",
        tanamanTerkena: ['Padi', 'Jagung', 'Tebu', 'Teh', 'Kedelai'],
        gejala: ['Daun menguning', 'Pertumbuhan kerdil', 'Virus tungro (padi)', ' Wereng dewasa terlihat jelas'],
        pencegahan: ['Gunakan varietas tahan wereng', 'Gunakan musuh alami', 'Atur pola tanam', 'Gunakan perangkap'],
        pengobatan: ['Aplikasi insektisida saat awal serangan', 'Introduksi parasitoid', 'Buang tanaman sangat parah', 'Gunakan台风 teknology']
    },
    {
id: 'lalat-buah',
        name: 'Lalat Buah',
        icon: '🪰',
        description: "Lalat buah menyerang buah dan sayuran dengan meletakkan telur di dalam buah. Larva kemudian memakan buah dari dalam.",
        tanamanTerkena: ['Cabai', 'Tomat', 'Mangga', 'Semangka', 'Melon'],
        gejala: ['Buah berlubang', 'Buah busuk prematur', 'Larva внутри buah', 'Buah berjatuhan'],
        pencegahan: ['Gunakan kantung buah', 'Pasang perangkap', 'Buang buah yang jatuh', 'Panen lebih awal'],
        pengobatan: ['Buang buah infested', 'Gunakan insektisida setelah panen', 'Tidak ada pengobatan efektif', 'Pencegahan lebih baik']
    },
{
        id: 'nematoda',
        name: 'Nematoda',
        icon: '🦠',
        description: "Nematoda adalah cacing mikroskopis yang menyerang akar tanaman. Mereka menyebabkan pembengkakan dan kerusakan akar.",
        tanamanTerkena: ['Tomat', 'Cabai', 'Kentang', 'Bawang', 'Wortel'],
        gejala: ['Pertumbuhan kerdil', 'Daun menguning', 'Akar ada bengkak/kista', 'Tanaman mudah layu'],
        pencegahan: ['Gunakan tanah steril', 'Rotasi tanaman', 'Tanam tagetes', 'Gunakan varietas tahan'],
        pengobatan: ['Tidak ada pengobatan efektif', 'Bakar tanaman infested', 'Solarisasi tanah', 'Ganti tanah yang parah']
    },
    {
        id: 'jamur',
        name: 'Penyakit Jamur',
        icon: '🍄',
        description: "Penyakit jamur seperti fusarium, anthracnose, dan powdery mildew menyerang berbagai bagian tanaman.",
        tanamanTerkena: ['Semua jenis tanaman'],
        gejala: ['Bercak coklat/hitam pada daun', 'Daun berbulu halus (powdery mildew)', 'Tanaman layu', 'Buah busuk'],
        pencegahan: ['Jaga sirkulasi udara', 'Jangan siram daun', 'Buang bagian sick', 'Gunakan fungisida preventif'],
        pengobatan: ['Buang bagian tanaman infected', 'Aplikasikan fungisida', 'Solarisasi tanah', 'Kultur teknis']
    }
];

// Tentang Agroplay Data
var TENTANG_AGROPLAY = {
    name: 'Agroplay',
    subtitle: 'Aplikasi Edukasi Hortikultura',
    icon: '🌱',
    description: 'Agroplay adalah aplikasi edukasi Hortikultura yang dirancang khusus untuk siswa SMP. Dengan Agroplay, belajar tentang tanaman menjadi menyenangkan dan interaktif!',
    features: [
        { icon: '🎮', title: 'Game Edukasi', desc: 'Belajar sambil bermain game menarik' },
        { icon: '📚', title: 'Panduan Lengkap', desc: 'Ketahui berbagai jenis tanaman' },
        { icon: '🧠', title: 'Kuis Interaktif', desc: 'Uji pengetahuanmu dengan kuis' },
        { icon: '🌾', title: 'Virtual Farming', desc: 'Rasakan pengalaman bertani virtual' },
        { icon: '🏆', title: 'Gamification', desc: 'Kumpulkan XP dan unlock achievement' },
        { icon: '👨‍👩‍👧', title: '3 Role', desc: 'Siswa, Guru, dan Orang Tua' }
    ],
    benefits: [
        'Belajar hortikultura dengan cara yang menyenangkan',
        'Mengenal tanaman pangan, industri, hias, obat, dan serat',
        'Memahami cara menanam dan merawat tanaman',
        'Mengetahui makanan khas Indonesia tradisional dan modern',
        'Siap untuk kompetensi keahlian pertanian',
        'Tersedia untuk pembelajaran di sekolah dan rumah'
    ]
};

// ==================== RENDER FUNCTIONS ====================

document.addEventListener('DOMContentLoaded', function() {
    renderMenu();
});

// Show Category
function showCategory(category) {
    currentCategory = category;
    currentView = 'category';
    
    // Update active menu item
    document.querySelectorAll('.content-menu-item').forEach(function(item) {
        item.classList.remove('active');
    });
    
    var activeItem = document.querySelector('[onclick="showCategory(\'' + category + '\')"]');
    if (activeItem) activeItem.classList.add('active');
    
    // Update category tabs
    document.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    
    var activeTab = document.querySelector('[data-category="' + category + '"]');
    if (activeTab) activeTab.classList.add('active');
    
    // Render based on category
    if (category === 'tentang') {
        renderTentang();
    } else if (category === 'tumbuhan') {
        // Menu: Makanan Tumbuhan = Olahan Tradisional
        renderOlahan('tradisional');
    } else if (category === 'hama') {
        // Menu: Mengenal Hama
        renderHama();
    } else if (category === 'tradisional') {
        renderOlahan('tradisional');
    } else if (category === 'modern') {
        renderOlahan('modern');
    } else {
        renderPlantsByCategory(category);
    }
    
    // AUTO SCROLL TO CONTENT - Fitur yang diminta user
    setTimeout(function() {
        var plantsGrid = document.getElementById('plants-grid');
        if (plantsGrid) {
            // Smooth scroll ke konten
            plantsGrid.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Tambah sedikit offset untuk header yang mungkin menutupi
            setTimeout(function() {
                window.scrollBy({
                    top: -80, // Offset 80px ke atas
                    behavior: 'smooth'
                });
            }, 300);
            
            console.log('📚 Auto scroll to content for category:', category);
        }
    }, 500); // Tunggu 500ms untuk konten selesai render
}

// Filter Plants
function filterPlants(category) {
    currentCategory = category;
    
    // Update tabs
    document.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    
    var activeTab = document.querySelector('[data-category="' + category + '"]');
    if (activeTab) activeTab.classList.add('active');
    
    // Render
    if (category === 'all') {
        renderPlants();
    } else if (category === 'tumbuhan') {
        // Tab: Makanan Tumbuhan = Olahan Tradisional
        renderOlahan('tradisional');
    } else if (category === 'hama') {
        // Tab: Mengenal Hama
        renderHama();
    } else if (category === 'tradisional') {
        renderOlahan('tradisional');
    } else if (category === 'modern') {
        renderOlahan('modern');
    } else {
        renderPlantsByCategory(category);
    }
}

// Render All Plants
function renderPlants() {
    var grid = document.getElementById('plants-grid');
    if (!grid) return;
    
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    grid.style.gap = '16px';
    
    grid.innerHTML = '';
    
    PLANTS.forEach(function(plant, index) {
        var card = document.createElement('div');
        card.className = 'plant-card';
        card.style.animationDelay = (index * 0.05) + 's';
        card.onclick = function() { showPlantDetail(plant.id); };
        
        card.innerHTML = '<span class="plant-icon">' + plant.icon + '</span>' +
            '<h3 class="plant-name">' + plant.name + '</h3>' +
            '<span class="plant-category-tag ' + plant.category + '">' + plant.category + '</span>';
        
        grid.appendChild(card);
    });
}

// Render Menu
function renderMenu() {
    var grid = document.getElementById('plants-grid');
    if (!grid) return;
    
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px 20px; background: white; border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">' +
        '<span style="font-size: 48px; display: block; margin-bottom: 16px;">👆</span>' +
        '<h3 style="font-family: Fredoka, sans-serif; font-size: 18px; color: #333; margin-bottom: 8px;">Pilih Menu di Atas</h3>' +
        '<p style="font-size: 14px; color: #888;">Klik pada kategori untuk melihat konten</p>' +
        '</div>';
}

// Render Tentang Agroplay
function renderTentang() {
    var grid = document.getElementById('plants-grid');
    if (!grid) return;
    
    var html = '<div style="grid-column: 1/-1; padding: 20px; background: white; border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); text-align: center; margin-bottom: 16px;">' +
        '<span style="font-size: 64px; display: block; margin-bottom: 16px; animation: bounce 2s ease infinite;">' + TENTANG_AGROPLAY.icon + '</span>' +
        '<h2 style="font-family: Fredoka, sans-serif; font-size: 24px; color: #4CAF50; margin-bottom: 8px;">' + TENTANG_AGROPLAY.name + '</h2>' +
        '<p style="font-size: 14px; color: #888; margin-bottom: 16px;">' + TENTANG_AGROPLAY.subtitle + '</p>' +
        '<p style="font-size: 14px; color: #555; line-height: 1.7; text-align: left;">' + TENTANG_AGROPLAY.description + '</p>' +
        '</div>';
    
    html += '<h3 style="font-family: Fredoka, sans-serif; font-size: 16px; color: #333; margin-bottom: 12px; grid-column: 1/-1;">Fitur Unggulan</h3>';
    
    TENTANG_AGROPLAY.features.forEach(function(feature, index) {
        html += '<div style="background: white; border-radius: 16px; padding: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); animation: cardEntrance 0.5s ease forwards; opacity: 0; animation-delay: ' + (index * 0.1) + 's;">' +
            '<span style="font-size: 32px; display: block; margin-bottom: 8px;">' + feature.icon + '</span>' +
            '<h4 style="font-family: Fredoka, sans-serif; font-size: 14px; color: #333; margin-bottom: 4px;">' + feature.title + '</h4>' +
            '<p style="font-size: 12px; color: #888;">' + feature.desc + '</p>' +
            '</div>';
    });
    
    grid.innerHTML = html;
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    grid.style.gap = '12px';
}

// Render Plants by Category
function renderPlantsByCategory(category) {
    var grid = document.getElementById('plants-grid');
    if (!grid) return;
    
    var filtered = PLANTS.filter(function(p) { return p.category === category; });
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; background: white; border-radius: 20px;"><p style="color: #888;">Belum ada tanaman dalam kategori ini</p></div>';
        return;
    }
    
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    grid.style.gap = '16px';
    
    grid.innerHTML = '';
    
    filtered.forEach(function(plant, index) {
        var card = document.createElement('div');
        card.className = 'plant-card';
        card.style.animationDelay = (index * 0.1) + 's';
        card.onclick = function() { showPlantDetail(plant.id); };
        
        card.innerHTML = '<span class="plant-icon">' + plant.icon + '</span>' +
            '<h3 class="plant-name">' + plant.name + '</h3>' +
            '<span class="plant-category-tag ' + plant.category + '">' + plant.category + '</span>';
        
        grid.appendChild(card);
    });
}

// Render Olahan
function renderOlahan(type) {
    var grid = document.getElementById('plants-grid');
    if (!grid) return;
    
    var data = type === 'tradisional' ? OLAHAN_TRADISIONAL : OLAHAN_MODERN;
    
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    grid.style.gap = '12px';
    
    grid.innerHTML = '';
    
    data.forEach(function(item, index) {
        var card = document.createElement('div');
        card.className = 'olahan-card ' + type;
        card.style.animationDelay = (index * 0.1) + 's';
        card.onclick = function() { showOlahanDetail(item.id, type); };
        
        card.innerHTML = '<span class="olahan-icon">' + item.icon + '</span>' +
            '<h3 class="olahan-name">' + item.name + '</h3>' +
            '<p class="olahan-desc">' + item.description.substring(0, 60) + '...</p>';
        
        grid.appendChild(card);
    });
}

// Show Plant Detail - WITH QUIZ INFO
function showPlantDetail(plantId) {
    var plant = null;
    for (var i = 0; i < PLANTS.length; i++) {
        if (PLANTS[i].id === plantId) {
            plant = PLANTS[i];
            break;
        }
    }
    if (!plant) return;
    
    // Check if already read (for XP tracking)
    var hasReadKey = 'agroplay_guide_read_' + plantId;
    var alreadyRead = localStorage.getItem(hasReadKey) === 'true';
    
    // Award XP for reading guide
    if (!alreadyRead && typeof REALTIME !== 'undefined' && typeof REALTIME.addXP === 'function') {
        var guideXP = 15;
        var result = REALTIME.addXP(guideXP, 'Buku Tanamku: ' + plant.name);
        
        REALTIME.incrementStat('guidesRead');
        REALTIME.recordActivity(REALTIME.ACTIVITY_TYPES.READ_GUIDE, {
            plant: plant.id,
            plantName: plant.name,
            category: plant.category,
            xp: guideXP
        });
        
        localStorage.setItem(hasReadKey, 'true');
        
        if (result.level > 1) {
            showToast('success', '🎉 Selamat! Kamu naik ke Level ' + result.level + '!');
        }
        
        showToast('success', '📚 Kamu mendapat +' + guideXP + ' XP untuk membaca panduan ' + plant.name);
    }
    
    var modal = document.getElementById('detail-modal');
    
    // Set header info
    document.getElementById('modal-icon').textContent = plant.icon;
    document.getElementById('modal-name').textContent = plant.name;
    document.getElementById('modal-intro').textContent = plant.intro;
    document.getElementById('modal-description').textContent = plant.description;
    
    // Set stages
    var stagesHtml = '';
    plant.stages.forEach(function(stage, index) {
        var activeClass = index === 0 ? 'active' : '';
        stagesHtml += '<span class="visual-stage ' + activeClass + '">' + stage + '</span>';
        if (index < plant.stages.length - 1) {
            stagesHtml += '<span class="visual-arrow">→</span>';
        }
    });
    document.getElementById('modal-stages').innerHTML = stagesHtml;
    
    // Set benefits
    var benefitsHtml = '';
    plant.benefits.forEach(function(benefit, index) {
        benefitsHtml += '<li style="animation-delay: ' + (index * 0.1) + 's;">' + benefit + '</li>';
    });
    document.getElementById('modal-benefits').innerHTML = benefitsHtml;
    
    // Set info cards - ENHANCED with quiz info
    document.getElementById('info-cards-section').style.display = 'block';
    document.getElementById('ingredients-section').style.display = 'none';
    
    // Build enhanced info with scientific name (for quiz learning)
    var scientificName = plant.scientificName || '-';
    var origin = plant.origin || '-';
    var height = plant.height || '-';
    
    document.getElementById('info-cards').innerHTML = 
        '<div class="info-card">' +
        '<div class="info-card-icon">📊</div>' +
        '<div class="info-card-label">Kesulitan</div>' +
        '<div class="info-card-value">' + plant.difficulty + '</div>' +
        '</div>' +
        '<div class="info-card">' +
        '<div class="info-card-icon">⏱️</div>' +
        '<div class="info-card-label">Waktu Tumbuh</div>' +
        '<div class="info-card-value">' + plant.growTime + '</div>' +
        '</div>' +
        '<div class="info-card">' +
        '<div class="info-card-icon">🧬</div>' +
        '<div class="info-card-label">Nama Ilmiah</div>' +
        '<div class="info-card-value" style="font-size:11px;">' + scientificName + '</div>' +
        '</div>' +
        '<div class="info-card">' +
        '<div class="info-card-icon">🌍</div>' +
        '<div class="info-card-label">Asal</div>' +
        '<div class="info-card-value" style="font-size:11px;">' + origin + '</div>' +
        '</div>';
    
    // Show quiz hint message
    var quizHint = '';
    if (plant.quizInfo) {
        quizHint = '<div style="grid-column: 1/-1; background: linear-gradient(135deg, #E3F2FD, #BBDEFB); border-radius: 12px; padding: 12px; margin-top: 12px; border: 2px solid #2196F3;">' +
            '<div style="font-size: 12px; font-weight: 700; color: #1976D2; margin-bottom: 6px;">💡 Info untuk Kuis</div>' +
            '<div style="font-size: 11px; color: #555;">' +
            'Bacalah dengan teliti! Informasi ini akan membantu menjawab soal kuis.</div>' +
            '</div>';
    }
    
    // Add quiz hint if exists
    setTimeout(function() {
        var infoSection = document.getElementById('info-cards-section');
        var existingHint = infoSection.querySelector('.quiz-hint');
        if (existingHint) existingHint.remove();
        
        if (plant.quizInfo) {
            var hintDiv = document.createElement('div');
            hintDiv.className = 'quiz-hint';
            hintDiv.style.cssText = 'grid-column: 1/-1; background: linear-gradient(135deg, #E3F2FD, #BBDEFB); border-radius: 12px; padding: 12px; margin-top: 12px; border: 2px solid #2196F3;';
            hintDiv.innerHTML = '<div style="font-size: 12px; font-weight: 700; color: #1976D2; margin-bottom: 6px;">💡 Info untuk Kuis</div>' +
                '<div style="font-size: 11px; color: #555;">Nama ilmiah: <strong>' + scientificName + '</strong>. Informasi ini sering muncul di kuis!</div>';
            infoSection.appendChild(hintDiv);
        }
    }, 100);
    
    modal.classList.add('active');
}

// Show Olahan Detail
function showOlahanDetail(olahanId, type) {
    var data = type === 'tradisional' ? OLAHAN_TRADISIONAL : OLAHAN_MODERN;
    var item = null;
    
    for (var i = 0; i < data.length; i++) {
        if (data[i].id === olahanId) {
            item = data[i];
            break;
        }
    }
    if (!item) return;
    
    var modal = document.getElementById('detail-modal');
    
    document.getElementById('modal-icon').textContent = item.icon;
    document.getElementById('modal-name').textContent = item.name;
    document.getElementById('modal-intro').textContent = type === 'tradisional' ? 'Makanan Khas Indonesia 🇮🇩' : 'Makanan Fusion Modern 🍴';
    document.getElementById('modal-description').textContent = item.description;
    
    // Hide stages for food
    document.querySelector('.detail-section:has(#modal-stages)').style.display = 'none';
    
    document.getElementById('modal-benefits').innerHTML = '<li>' + item.description + '</li>';
    
    document.getElementById('info-cards-section').style.display = 'none';
    document.getElementById('ingredients-section').style.display = 'block';
    
    var ingredientsHtml = '';
    item.bahan.forEach(function(bahan, index) {
        ingredientsHtml += '<li style="animation-delay: ' + (index * 0.1) + 's;">' + bahan + '</li>';
    });
    document.getElementById('modal-ingredients').innerHTML = ingredientsHtml;
    
    modal.classList.add('active');
}

// Close Modal
function closeDetailModal() {
    var modal = document.getElementById('detail-modal');
    if (modal) {
        modal.classList.remove('active');
        document.querySelector('.detail-section:has(#modal-stages)').style.display = 'block';
    }
}

// Search Items
function searchItems() {
    var query = document.getElementById('plant-search').value.toLowerCase();
    
    if (!query) {
        renderMenu();
        return;
    }
    
    var results = PLANTS.filter(function(p) {
        return p.name.toLowerCase().indexOf(query) !== -1 || 
               p.category.toLowerCase().indexOf(query) !== -1;
    });
    
    var tradResults = OLAHAN_TRADISIONAL.filter(function(t) {
        return t.name.toLowerCase().indexOf(query) !== -1;
    });
    
    var modResults = OLAHAN_MODERN.filter(function(m) {
        return m.name.toLowerCase().indexOf(query) !== -1;
    });
    
    var grid = document.getElementById('plants-grid');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    grid.style.gap = '12px';
    grid.innerHTML = '';
    
    results.forEach(function(plant) {
        var card = document.createElement('div');
        card.className = 'plant-card';
        card.onclick = function() { 
            currentCategory = plant.category;
            showPlantDetail(plant.id); 
        };
        card.innerHTML = '<span class="plant-icon">' + plant.icon + '</span>' +
            '<h3 class="plant-name">' + plant.name + '</h3>' +
            '<span class="plant-category-tag ' + plant.category + '">' + plant.category + '</span>';
        grid.appendChild(card);
    });
    
    tradResults.forEach(function(item) {
        var card = document.createElement('div');
        card.className = 'olahan-card tradisional';
        card.onclick = function() { showOlahanDetail(item.id, 'tradisional'); };
        card.innerHTML = '<span class="olahan-icon">' + item.icon + '</span>' +
            '<h3 class="olahan-name">' + item.name + '</h3>' +
            '<p class="olahan-desc">' + item.description.substring(0, 40) + '...</p>';
        grid.appendChild(card);
    });
    
    modResults.forEach(function(item) {
        var card = document.createElement('div');
        card.className = 'olahan-card modern';
        card.onclick = function() { showOlahanDetail(item.id, 'modern'); };
        card.innerHTML = '<span class="olahan-icon">' + item.icon + '</span>' +
            '<h3 class="olahan-name">' + item.name + '</h3>' +
            '<p class="olahan-desc">' + item.description.substring(0, 40) + '...</p>';
        grid.appendChild(card);
    });
    
    if (results.length === 0 && tradResults.length === 0 && modResults.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; background: white; border-radius: 20px;">' +
            '<span style="font-size: 48px;">🔍</span>' +
            '<p style="color: #888; margin-top: 12px;">Tidak ditemukan hasil untuk "' + query + '"</p>' +
            '</div>';
    }
}

// Close modal on outside click
document.addEventListener('click', function(e) {
    var modal = document.getElementById('detail-modal');
    if (modal && e.target === modal) {
        closeDetailModal();
    }
});

// ==================== HAMA FUNCTIONS ====================

// Render Hama - Display all pests
function renderHama() {
    var grid = document.getElementById('plants-grid');
    if (!grid) return;
    
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    grid.style.gap = '12px';
    
    grid.innerHTML = '';
    
    // Add section header
    var header = document.createElement('div');
    header.style.cssText = 'grid-column: 1/-1; background: linear-gradient(135deg, #FFEBEE, #FFCDD2); border-radius: 16px; padding: 16px; margin-bottom: 12px; border: 2px solid #F44336;';
    header.innerHTML = '<div style="text-align: center;"><span style="font-size: 32px;">🐛</span><h3 style="font-family: Fredoka, sans-serif; font-size: 16px; color: #F44336; margin: 8px 0 4px;">Mengenal Hama Tanaman</h3><p style="font-size: 12px; color: #666;">Klik pada hama untuk melihat detail dan cara mengatasinya</p></div>';
    grid.appendChild(header);
    
    DATA_HAMA.forEach(function(hama, index) {
        var card = document.createElement('div');
        card.className = 'plant-card';
        card.style.animationDelay = (index * 0.1) + 's';
        card.onclick = function() { showHamaDetail(hama.id); };
        card.style.borderLeft = '4px solid #F44336';
        
        card.innerHTML = '<span class="plant-icon">' + hama.icon + '</span>' +
            '<h3 class="plant-name">' + hama.name + '</h3>' +
            '<span class="plant-category-tag" style="background: #FFEBEE; color: #F44336;">Hama</span>';
        
        grid.appendChild(card);
    });
}

// Show Hama Detail
function showHamaDetail(hamaId) {
    var hama = null;
    for (var i = 0; i < DATA_HAMA.length; i++) {
        if (DATA_HAMA[i].id === hamaId) {
            hama = DATA_HAMA[i];
            break;
        }
    }
    if (!hama) return;
    
    var modal = document.getElementById('detail-modal');
    
    // Set header info
    document.getElementById('modal-icon').textContent = hama.icon;
    document.getElementById('modal-name').textContent = hama.name;
    document.getElementById('modal-intro').textContent = '🐛 Hama Tanaman';
    document.getElementById('modal-description').textContent = hama.description;
    
    // Hide stages for hama
    document.querySelector('.detail-section:has(#modal-stages)').style.display = 'none';
    
    // Build benefits/info for hama - show gejala, tanaman Terkena, pencegahan, pengobatan
    var benefitsHtml = '';
    
    // Tanaman Terkena
    benefitsHtml += '<li style="background: #FFEBEE; border-left: 4px solid #F44336;"><strong>🌱 Tanaman Terkena:</strong><br>' + hama.tanamanTerkena.join(', ') + '</li>';
    
    // Gejala
    benefitsHtml += '<li style="background: #FFF3E0; border-left: 4px solid #FF9800;"><strong>🔍 Gejala:</strong><br>';
    hama.gejala.forEach(function(g) {
        benefitsHtml += '• ' + g + '<br>';
    });
    benefitsHtml += '</li>';
    
    // Pencegahan
    benefitsHtml += '<li style="background: #E3F2FD; border-left: 4px solid #2196F3;"><strong>🛡️ Pencegahan:</strong><br>';
    hama.pencegahan.forEach(function(p) {
        benefitsHtml += '• ' + p + '<br>';
    });
    benefitsHtml += '</li>';
    
    // Pengobatan
    benefitsHtml += '<li style="background: #E8F5E9; border-left: 4px solid #4CAF50;"><strong>💊 Pengobatan:</strong><br>';
    hama.pengobatan.forEach(function(p) {
        benefitsHtml += '• ' + p + '<br>';
    });
    benefitsHtml += '</li>';
    
    document.getElementById('modal-benefits').innerHTML = benefitsHtml;
    
    // Hide info cards and show ingredients section for hama
    document.getElementById('info-cards-section').style.display = 'none';
    document.getElementById('ingredients-section').style.display = 'none';
    
    modal.classList.add('active');
}

