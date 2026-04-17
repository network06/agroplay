# PROMPT LENGKAP - HALAMAN HIDROPONIK AGROPLAY

## Deskripsi Umum
Buat halaman hidroponik yang menampilkan 4 tanaman (Selada, Kangkung, Bayam, Tomat) dengan desain kartu yang sama persis seperti halaman tanaman pangan. Halaman harus responsif, interaktif, dan memiliki animasi yang menarik.

## Struktur File yang Dibutuhkan
```
aplikasi/
- hidroponik.html
- assets/
  - buku-tanamku.png (gambar placeholder untuk semua tanaman)
  - (opsional) gambar spesifik untuk setiap tanaman:
    - selada.png
    - kangkung.png
    - bayam.png
    - tomat.png
```

## HTML Structure Lengkap
```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Hidroponik - Cara Menanam Tanpa Tanah">
    <meta name="theme-color" content="#4CAF50">
    <title>Hidroponik - Agroplay</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Styles -->
    <link rel="stylesheet" href="css/style.css">
    
    <style>
        /* ============================================
           HALAMAN HIDROPONIK - DESAIN LENGKAP
           Referensi: Tanaman Pangan Design
           ============================================ */
        
        :root {
            --primary-green: #4CAF50;
            --primary-green-dark: #388E3C;
            --primary-green-light: #81C784;
            --primary-orange: #FF9800;
            --primary-blue: #2196F3;
            --primary-red: #F44336;
            --primary-purple: #9C27B0;
            --sky-blue: #87CEEB;
            --cloud-white: #FFFFFF;
        }
        
        /* Background - Exact Match */
        body {
            background: linear-gradient(180deg, #87CEEB 0%, #ffffff 100%);
            min-height: 100vh;
            font-family: 'Nunito', sans-serif;
            overflow-x: hidden;
            position: relative;
        }
        
        /* Top Section - Like Kebun Ajaib */
        .top-section {
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        
        /* Cloud Shapes - Exact Design */
        .cloud-left {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            width: 60px;
            height: 35px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50px;
        }
        
        .cloud-left::before {
            content: '';
            position: absolute;
            left: 15px;
            top: -12px;
            width: 30px;
            height: 30px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
        }
        
        .cloud-left::after {
            content: '';
            position: absolute;
            right: 10px;
            top: -8px;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.25);
            border-radius: 50%;
        }
        
        .cloud-right {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            width: 60px;
            height: 35px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50px;
        }
        
        .cloud-right::before {
            content: '';
            position: absolute;
            right: 15px;
            top: -12px;
            width: 30px;
            height: 30px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
        }
        
        .cloud-right::after {
            content: '';
            position: absolute;
            left: 10px;
            top: -8px;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.25);
            border-radius: 50%;
        }
        
        .back-btn {
            width: 50px;
            height: 50px;
            border-radius: 25px;
            background: var(--primary-green);
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            z-index: 10;
        }
        
        .back-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 15px rgba(0,0,0,0.3);
        }
        
        .title-btn {
            background: var(--primary-green);
            border: none;
            border-radius: 25px;
            padding: 15px 30px;
            color: white;
            font-family: 'Fredoka', sans-serif;
            font-weight: 700;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        }
        
        .title-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 15px rgba(0,0,0,0.3);
        }
        
        .settings-btn {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-green);
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            z-index: 10;
        }
        
        .settings-btn:hover {
            transform: scale(1.1) rotate(90deg);
            box-shadow: 0 6px 15px rgba(0,0,0,0.3);
        }
        
        .description-text {
            text-align: center;
            color: #333;
            font-family: 'Fredoka', sans-serif;
            font-size: 16px;
            font-weight: 500;
            margin: 20px auto;
            max-width: 300px;
        }
        
        .title-section {
            text-align: center;
            flex: 1;
            margin: 0 20px;
        }
        
        .page-title {
            background: rgba(255, 255, 255, 0.95);
            color: #4CAF50;
            font-family: 'Fredoka', sans-serif;
            font-weight: 600;
            font-size: 18px;
            padding: 8px 20px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            display: inline-block;
            margin: 0 auto;
        }
        
        /* Main Content */
        .main-container {
            padding: 20px;
            padding-bottom: 80px;
        }
        
        /* Content Section */
        .content-section {
            max-width: 800px;
            margin: 0 auto;
        }
        
        /* Plants Grid Container */
        .plants-container {
            flex: 1;
            padding: 20px;
            margin-bottom: 100px;
        }
        
        .plants-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
            max-width: 900px;
            margin: 0 auto;
        }
        
        /* Enhanced Plant Cards - Like Tanaman Pangan */
        .plant-card {
            position: relative;
            border-radius: 24px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            min-height: 200px;
            border: none;
        }
        
        .plant-card:hover {
            transform: translateY(-12px) scale(1.03);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .plant-card:active {
            transform: translateY(-6px) scale(1.01);
            transition: all 0.1s ease;
        }
        
        /* Card Background - Colorful Gradients Like Tanaman Pangan */
        .card-background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
        }
        
        .plant-card.selada .card-background {
            background: linear-gradient(135deg, #4CAF50, #66BB6A, #81C784);
        }
        
        .plant-card.kangkung .card-background {
            background: linear-gradient(135deg, #2196F3, #42A5F5, #64B5F6);
        }
        
        .plant-card.bayam .card-background {
            background: linear-gradient(135deg, #4CAF50, #66BB6A, #81C784);
        }
        
        .plant-card.tomat .card-background {
            background: linear-gradient(135deg, #F44336, #EF5350, #E57373);
        }
        
        /* Card Pattern */
        .card-pattern {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0.1;
            background-image: 
                radial-gradient(circle at 20% 20%, white 1px, transparent 1px),
                radial-gradient(circle at 80% 80%, white 1px, transparent 1px);
            background-size: 20px 20px;
        }
        
        /* Card Content */
        .card-content {
            position: relative;
            z-index: 2;
            padding: 20px;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
        }
        
        /* Menu Logo Wrapper - Like Tanaman Pangan */
        .menu-logo-wrapper {
            width: 80px;
            height: 80px;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 12px;
            backdrop-filter: blur(10px);
            border: 3px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            position: relative;
            transition: all 0.3s ease;
        }
        
        .menu-logo {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.3s ease;
        }
        
        /* Fallback for icons if logo fails to load */
        .menu-icon-wrapper {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            display: none;
            align-items: center;
            justify-content: center;
            margin-bottom: 12px;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.3);
        }
        
        .menu-icon {
            font-size: 28px;
            color: white;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        /* Plant Name - Like Tanaman Pangan */
        .plant-name {
            font-family: 'Fredoka', sans-serif;
            font-size: 18px;
            font-weight: 700;
            color: white;
            margin-bottom: 6px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        /* Plant Description - Like Tanaman Pangan */
        .plant-description {
            font-family: 'Nunito', sans-serif;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.9);
            font-weight: 600;
            line-height: 1.3;
            margin: 0;
        }
        
        /* Loading Animation */
        .loading {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Different delays for cards */
        .plant-card:nth-child(1) { animation-delay: 0.1s; }
        .plant-card:nth-child(2) { animation-delay: 0.2s; }
        .plant-card:nth-child(3) { animation-delay: 0.3s; }
        .plant-card:nth-child(4) { animation-delay: 0.4s; }
        
        /* Bottom Navigation */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #4CAF50;
            padding: 10px 0;
            border-radius: 25px 25px 0 0;
            box-shadow: 0 -4px 20px rgba(76, 175, 80, 0.3);
            z-index: 1000;
        }
        
        .nav-container {
            display: flex;
            justify-content: space-around;
            align-items: center;
            max-width: 400px;
            margin: 0 auto;
        }
        
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            color: white;
            padding: 8px;
            border-radius: 12px;
            transition: all 0.3s ease;
            background: transparent;
            border: none;
            cursor: pointer;
            min-width: 60px;
        }
        
        .nav-item:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }
        
        .nav-icon {
            font-size: 20px;
            margin-bottom: 4px;
        }
        
        .nav-label {
            font-family: 'Nunito', sans-serif;
            font-size: 12px;
            font-weight: 600;
        }
        
        /* Responsive Design */
        @media (max-width: 400px) {
            .top-section {
                padding: 15px;
            }
            
            .back-btn, .settings-btn {
                width: 40px;
                height: 40px;
                font-size: 16px;
            }
            
            .title-btn {
                padding: 12px 20px;
                font-size: 16px;
            }
            
            .cloud-left, .cloud-right {
                width: 50px;
                height: 30px;
            }
            
            .cloud-left::before, .cloud-right::before {
                width: 25px;
                height: 25px;
                top: -10px;
            }
            
            .cloud-left::after, .cloud-right::after {
                width: 15px;
                height: 15px;
                top: -6px;
            }
            
            .page-title {
                font-size: 16px;
                padding: 6px 15px;
            }
            
            .plants-container {
                padding: 15px;
            }
            
            .plants-grid {
                grid-template-columns: 1fr;
                gap: 15px;
            }
            
            .plant-card {
                padding: 15px;
                min-height: 180px;
            }
            
            .menu-logo-wrapper {
                width: 70px;
                height: 70px;
            }
            
            .plant-name {
                font-size: 16px;
            }
            
            .plant-description {
                font-size: 12px;
            }
            
            .nav-item {
                padding: 6px 12px;
            }
            
            .nav-icon {
                font-size: 18px;
            }
            
            .nav-label {
                font-size: 10px;
            }
        }
        
        @media (min-width: 401px) and (max-width: 768px) {
            .plants-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
                max-width: 600px;
            }
            
            .menu-logo-wrapper {
                width: 75px;
                height: 75px;
            }
        }
        
        @media (min-width: 769px) {
            .top-section {
                padding: 25px;
            }
            
            .cloud-left, .cloud-right {
                width: 70px;
                height: 40px;
            }
            
            .cloud-left::before, .cloud-right::before {
                width: 35px;
                height: 35px;
                top: -14px;
            }
            
            .cloud-left::after, .cloud-right::after {
                width: 25px;
                height: 25px;
                top: -10px;
            }
            
            .page-title {
                font-size: 20px;
                padding: 10px 25px;
            }
            
            .plants-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 30px;
                max-width: 700px;
            }
            
            .menu-logo-wrapper {
                width: 90px;
                height: 90px;
            }
            
            .plant-name {
                font-size: 20px;
            }
            
            .plant-description {
                font-size: 15px;
            }
        }
        
        @media (min-width: 1200px) {
            .plants-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 35px;
                max-width: 700px;
            }
            
            .menu-logo-wrapper {
                width: 100px;
                height: 100px;
            }
            
            .plant-name {
                font-size: 22px;
            }
            
            .plant-description {
                font-size: 16px;
            }
        }
    </style>
</head>
<body>
    <!-- Top Section -->
    <div class="top-section">
        <button class="back-btn" onclick="goBack()">
            <i class="fas fa-arrow-left"></i>
        </button>
        
        <div class="title-section">
            <button class="title-btn" onclick="showTitleAnimation()">
                Tanam Yuk
            </button>
        </div>
        
        <button class="settings-btn" onclick="openSettings()">
            <i class="fas fa-cog"></i>
        </button>
    </div>
    
    <!-- Main Content -->
    <main class="main-container">
        <!-- Description Text -->
        <div class="description-text">
            Tanaman yang bisa ditanam menggunakan hidroponik
        </div>
        
        <!-- Plants Grid -->
        <div class="plants-container">
            <div class="plants-grid">
                <!-- Plant Card 1 - Selada -->
                <div class="plant-card selada loading" onclick="selectPlant('selada')">
                    <div class="card-background"></div>
                    <div class="card-pattern"></div>
                    <div class="card-content">
                        <div class="menu-logo-wrapper">
                            <img src="assets/buku-tanamku.png" alt="Selada" class="menu-logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div class="menu-icon-wrapper" style="display: none;">
                                <i class="fas fa-leaf menu-icon"></i>
                            </div>
                        </div>
                        <h3 class="plant-name">Selada</h3>
                        <p class="plant-description">Sayuran hijau yang segar dan kaya akan vitamin</p>
                    </div>
                </div>
                
                <!-- Plant Card 2 - Kangkung -->
                <div class="plant-card kangkung loading" onclick="selectPlant('kangkung')">
                    <div class="card-background"></div>
                    <div class="card-pattern"></div>
                    <div class="card-content">
                        <div class="menu-logo-wrapper">
                            <img src="assets/buku-tanamku.png" alt="Kangkung" class="menu-logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div class="menu-icon-wrapper" style="display: none;">
                                <i class="fas fa-seedling menu-icon"></i>
                            </div>
                        </div>
                        <h3 class="plant-name">Kangkung</h3>
                        <p class="plant-description">Sayuran daun yang tumbuh cepat dan bergizi</p>
                    </div>
                </div>
                
                <!-- Plant Card 3 - Bayam -->
                <div class="plant-card bayam loading" onclick="selectPlant('bayam')">
                    <div class="card-background"></div>
                    <div class="card-pattern"></div>
                    <div class="card-content">
                        <div class="menu-logo-wrapper">
                            <img src="assets/buku-tanamku.png" alt="Bayam" class="menu-logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div class="menu-icon-wrapper" style="display: none;">
                                <i class="fas fa-leaf menu-icon"></i>
                            </div>
                        </div>
                        <h3 class="plant-name">Bayam</h3>
                        <p class="plant-description">Sayuran hijau kaya zat besi dan nutrisi</p>
                    </div>
                </div>
                
                <!-- Plant Card 4 - Tomat -->
                <div class="plant-card tomat loading" onclick="selectPlant('tomat')">
                    <div class="card-background"></div>
                    <div class="card-pattern"></div>
                    <div class="card-content">
                        <div class="menu-logo-wrapper">
                            <img src="assets/buku-tanamku.png" alt="Tomat" class="menu-logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div class="menu-icon-wrapper" style="display: none;">
                                <i class="fas fa-circle menu-icon"></i>
                            </div>
                        </div>
                        <h3 class="plant-name">Tomat</h3>
                        <p class="plant-description">Buah merah yang kaya akan likopen dan vitamin</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
    
    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
        <div class="nav-container">
            <a href="index.html" class="nav-item">
                <i class="fas fa-home nav-icon"></i>
                <span class="nav-label">Home</span>
            </a>
            
            <button class="nav-item" onclick="openSearch()">
                <i class="fas fa-search nav-icon"></i>
                <span class="nav-label">Search</span>
            </button>
            
            <button class="nav-item" onclick="openNotifications()">
                <i class="fas fa-bell nav-icon"></i>
                <span class="nav-label">Notification</span>
            </button>
            
            <button class="nav-item" onclick="openProfile()">
                <i class="fas fa-user nav-icon"></i>
                <span class="nav-label">Profile</span>
            </button>
        </div>
    </nav>
    
    <!-- JavaScript -->
    <script>
        // Navigation Functions
        function goBack() {
            window.history.back();
        }
        
        function openSettings() {
            alert('Settings akan segera tersedia!');
        }
        
        function selectPlant(plant) {
            const card = event.currentTarget;
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
            
            // Navigate to plant detail page
            setTimeout(() => {
                alert('Detail untuk tanaman ' + plant + ' akan segera tersedia!');
            }, 300);
        }
        
        function openSearch() {
            alert('Search akan segera tersedia!');
        }
        
        function openNotifications() {
            alert('Notifications akan segera tersedia!');
        }
        
        function openProfile() {
            alert('Profile akan segera tersedia!');
        }
        
        function showTitleAnimation() {
            const titleBtn = document.querySelector('.title-btn');
            titleBtn.style.transform = 'scale(1.2) rotate(10deg)';
            setTimeout(() => {
                titleBtn.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        }
        
        // Add loading animations
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.plant-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.animation = 'slideInUp 0.5s ease forwards';
                }, index * 200);
            });
        });
        
        // Add slide in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    </script>
</body>
</html>
```

## Persyaratan Gambar/Assets

### Gambar yang Dibutuhkan:
1. **buku-tanamku.png** - Gambar placeholder utama untuk semua kartu
2. **Opsional - Gambar spesifik tanaman:**
   - selada.png - Gambar selada segar
   - kangkung.png - Gambar kangkung
   - bayam.png - Gambar bayam
   - tomat.png - Gambar tomat merah

### Spesifikasi Gambar:
- **Ukuran:** 100x100px (minimal)
- **Format:** PNG dengan transparansi atau JPG
- **Resolusi:** 72dpi untuk web
- **Style:** Konsisten dengan desain agroplay (kartun/friendly)

### Cara Mengganti Gambar:
1. Letakkan gambar di folder `assets/`
2. Ganti `src="assets/buku-tanamku.png"` dengan `src="assets/nama-gambar.png"`
3. Sesuaikan `alt` attribute dengan nama tanaman

## Fitur Interaktif:
- **Hover effects:** Kartu akan membesar dan berbayang saat di-hover
- **Click feedback:** Animasi scale down saat diklik
- **Loading animations:** Kartu muncul dengan animasi bertahap
- **Responsive design:** Adaptif untuk mobile, tablet, dan desktop
- **Fallback icons:** Jika gambar gagal load, akan menampilkan Font Awesome icons

## Integrasi dengan Navigasi:
- **Back button:** Kembali ke halaman sebelumnya
- **Bottom navigation:** Link ke halaman utama dan fitur lainnya
- **Title animation:** Efek animasi saat judul diklik

## Warna Tema Setiap Tanaman:
- **Selada:** Hijau (#4CAF50, #66BB6A, #81C784)
- **Kangkung:** Biru (#2196F3, #42A5F5, #64B5F6)
- **Bayam:** Hijau (#4CAF50, #66BB6A, #81C784)
- **Tomat:** Merah (#F44336, #EF5350, #E57373)

## Customization Options:
- Ubah teks deskripsi sesuai kebutuhan
- Tambahkan lebih banyak tanaman dengan menyalin struktur kartu
- Sesuaikan warna gradient di CSS variables
- Modifikasi ukuran grid untuk layout yang berbeda

## Testing:
- Test di berbagai ukuran layar (mobile, tablet, desktop)
- Pastikan semua gambar load dengan benar
- Verifikasi navigasi berfungsi dengan baik
- Check animasi dan hover effects

## Deployment:
- Copy paste kode HTML lengkap ke file baru
- Pastikan folder assets tersedia dengan gambar yang dibutuhkan
- Test di browser lokal sebelum deploy
- Upload ke server/hosting web

---

**Catatan:** Prompt ini mencakup semua elemen yang diperlukan untuk membuat halaman hidroponik yang sama persis dengan desain yang sudah dibuat, termasuk responsive design, animasi, dan interaktivitas.
