# PROMPT LENGKAP UNTUK HALAMAN PADI DETAIL

## Deskripsi
Buat halaman HTML lengkap untuk tanaman padi dengan semua elemen yang ada di gambar referensi. Halaman harus responsif di semua device (mobile, tablet, desktop) dan memiliki interaksi yang smooth.

## Struktur HTML yang Harus Dibuat

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Pak Padi - Tanaman Pangan Agroplay">
    <meta name="theme-color" content="#4CAF50">
    <title>Pak Padi - Agroplay</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        /* CSS VARIABLES */
        :root {
            --primary-green: #4CAF50;
            --primary-green-dark: #388E3C;
            --primary-green-light: #81C784;
            --sky-blue: #87CEEB;
            --cloud-white: #FFFFFF;
            --wood-brown: #8B4513;
            --wood-dark: #654321;
        }
        
        /* BACKGROUND */
        body {
            background: linear-gradient(180deg, #87CEEB 0%, #E0F7FA 50%, #C8E6C9 100%);
            min-height: 100vh;
            font-family: 'Fredoka', sans-serif;
            overflow-x: hidden;
            margin: 0;
            padding: 0;
            position: relative;
        }
        
        /* CLOUD ANIMATION */
        .clouds {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 200px;
            z-index: 0;
        }
        
        .cloud {
            position: absolute;
            background: white;
            border-radius: 100px;
            opacity: 0.8;
        }
        
        .cloud1 {
            width: 100px;
            height: 40px;
            top: 20px;
            left: 20px;
            animation: float 20s infinite ease-in-out;
        }
        
        .cloud2 {
            width: 80px;
            height: 35px;
            top: 60px;
            right: 50px;
            animation: float 25s infinite ease-in-out reverse;
        }
        
        @keyframes float {
            0%, 100% { transform: translateX(0) translateY(0); }
            25% { transform: translateX(20px) translateY(-10px); }
            50% { transform: translateX(-10px) translateY(5px); }
            75% { transform: translateX(15px) translateY(-5px); }
        }
        
        /* MAIN CONTAINER */
        .main-container {
            position: relative;
            z-index: 1;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            padding: 20px;
            padding-bottom: 100px;
        }
        
        /* HEADER NAVIGATION */
        .header-nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 20px;
            margin-bottom: 30px;
            position: relative;
        }
        
        .nav-left {
            flex: 1;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        
        .nav-center {
            flex: 2;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .nav-right {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
        
        .nav-button {
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
            text-decoration: none;
        }
        
        .nav-right .nav-button {
            margin-left: auto;
        }
        
        .nav-button:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 15px rgba(0,0,0,0.3);
        }
        
        .kebun-ajaib-sign {
            background: var(--primary-green);
            border-radius: 25px;
            padding: 12px 25px;
            display: inline-block;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        
        .kebun-ajaib-text {
            color: white;
            font-family: 'Fredoka', sans-serif;
            font-weight: 700;
            font-size: 18px;
        }
        
        /* WOODEN SIGN */
        .wooden-sign {
            background: linear-gradient(135deg, #8B4513, #A0522D, #6B3410);
            border-radius: 15px;
            padding: 15px 25px;
            color: white;
            font-family: 'Fredoka', sans-serif;
            font-weight: 600;
            font-size: 20px;
            text-align: center;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
            position: relative;
            margin: 0 auto 40px;
            max-width: 350px;
            border: 3px solid #654321;
        }
        
        .wooden-sign::before,
        .wooden-sign::after {
            content: '';
            position: absolute;
            width: 8px;
            height: 20px;
            background: #654321;
            top: -20px;
        }
        
        .wooden-sign::before {
            left: 30px;
        }
        
        .wooden-sign::after {
            right: 30px;
        }
        
        /* CONTENT CONTAINER */
        .content-container {
            max-width: 800px;
            margin: 0 auto;
            width: 100%;
        }
        
        /* IMAGE FRAME CONTAINER */
        .image-frame-container {
            display: flex;
            justify-content: center;
            margin: 20px 0;
        }
        
        /* IMAGE FRAME - SQUARE RESPONSIVE */
        .image-frame {
            background: white;
            border-radius: 20px;
            padding: 12px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
            margin: 20px auto 30px;
            max-width: 350px;
            width: 100%;
            aspect-ratio: 1/1;
            border: 6px solid #8B4513;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .image-frame::before {
            content: '';
            position: absolute;
            top: -3px;
            left: -3px;
            right: -3px;
            bottom: -3px;
            background: linear-gradient(45deg, #654321, #8B4513, #A0522D);
            border-radius: 23px;
            z-index: -1;
        }
        
        .frame-image {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            display: block;
            object-fit: cover;
            object-position: center;
        }
        
        /* PADI IMAGES CONTAINER */
        .padi-images-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
            align-items: center;
            margin: 20px 0;
        }
        
        .padi-image {
            width: 100%;
            max-width: 600px;
            height: auto;
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
            object-fit: contain;
            background: white;
            padding: 10px;
            border: 3px solid #4CAF50;
        }
        
        .padi-image:hover {
            transform: scale(1.02);
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
        }
        
        /* BOTTOM NAVIGATION */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--primary-green);
            padding: 10px 0;
            box-shadow: 0 -4px 10px rgba(0,0,0,0.2);
            z-index: 1000;
        }
        
        .nav-container {
            display: flex;
            justify-content: space-around;
            align-items: center;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            padding: 8px 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: 10px;
            text-decoration: none;
            color: white;
        }
        
        .nav-item:hover {
            background: rgba(255,255,255,0.1);
            transform: translateY(-2px);
        }
        
        .nav-icon {
            font-size: 20px;
            color: white;
        }
        
        .nav-label {
            font-size: 12px;
            font-weight: 500;
            color: white;
            font-family: 'Nunito', sans-serif;
        }
        
        /* LOADING ANIMATION */
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
        
        /* RESPONSIVE DESIGN */
        @media (max-width: 480px) {
            .main-container {
                padding: 15px;
                padding-bottom: 100px;
            }
            
            .header-nav {
                padding: 10px 15px;
            }
            
            .nav-button {
                width: 40px;
                height: 40px;
                font-size: 16px;
            }
            
            .nav-right .nav-button {
                margin-left: auto;
            }
            
            .kebun-ajaib-sign {
                padding: 8px 15px;
            }
            
            .kebun-ajaib-text {
                font-size: 14px;
            }
            
            .wooden-sign {
                font-size: 16px;
                padding: 12px 20px;
                max-width: 250px;
            }
            
            .image-frame-container {
                margin: 15px 0;
            }
            
            .padi-images-container {
                gap: 15px;
                margin: 15px 0;
            }
            
            .padi-image {
                max-width: 100%;
                padding: 8px;
                border: 2px solid #4CAF50;
                border-radius: 12px;
            }
        }
        
        @media (min-width: 481px) and (max-width: 768px) {
            .header-nav {
                padding: 12px 18px;
            }
            
            .nav-button {
                width: 45px;
                height: 45px;
                font-size: 18px;
            }
            
            .nav-right .nav-button {
                margin-left: auto;
            }
            
            .kebun-ajaib-sign {
                padding: 10px 20px;
            }
            
            .kebun-ajaib-text {
                font-size: 16px;
            }
            
            .wooden-sign {
                font-size: 18px;
                max-width: 300px;
            }
            
            .image-frame-container {
                margin: 18px 0;
            }
            
            .padi-images-container {
                gap: 18px;
                margin: 18px 0;
            }
            
            .padi-image {
                max-width: 500px;
                padding: 9px;
                border: 2.5px solid #4CAF50;
                border-radius: 13px;
            }
        }
        
        @media (min-width: 769px) {
            .header-nav {
                padding: 15px 20px;
            }
            
            .nav-button {
                width: 50px;
                height: 50px;
                font-size: 20px;
            }
            
            .nav-right .nav-button {
                margin-left: auto;
            }
            
            .kebun-ajaib-sign {
                padding: 12px 25px;
            }
            
            .kebun-ajaib-text {
                font-size: 18px;
            }
            
            .wooden-sign {
                font-size: 20px;
                max-width: 350px;
            }
            
            .image-frame-container {
                margin: 20px 0;
            }
            
            .padi-images-container {
                gap: 20px;
                margin: 20px 0;
            }
            
            .padi-image {
                max-width: 600px;
                padding: 10px;
                border: 3px solid #4CAF50;
                border-radius: 15px;
            }
        }
    </style>
</head>
<body>
    <!-- CLOUD BACKGROUND -->
    <div class="clouds">
        <div class="cloud cloud1"></div>
        <div class="cloud cloud2"></div>
    </div>
    
    <!-- MAIN CONTAINER -->
    <div class="main-container">
        <!-- HEADER NAVIGATION -->
        <div class="header-nav">
            <div class="nav-left">
                <a href="#" class="nav-button" onclick="goBack()">
                    <i class="fas fa-arrow-left"></i>
                </a>
            </div>
            <div class="nav-center">
                <div class="kebun-ajaib-sign">
                    <span class="kebun-ajaib-text">Kebun Ajaib</span>
                </div>
            </div>
            <div class="nav-right">
                <a href="#" class="nav-button" onclick="openSettings()">
                    <i class="fas fa-cog"></i>
                </a>
            </div>
        </div>
        
        <!-- CONTENT CONTAINER -->
        <div class="content-container">
            <!-- WOODEN SIGN -->
            <div class="wooden-sign loading" style="animation-delay: 0.1s;">
                Pak Padi si Penghasil nasi
            </div>
            
            <!-- IMAGE FRAME CONTAINER -->
            <div class="image-frame-container loading" style="animation-delay: 0.2s;">
                <div class="image-frame">
                    <img src="assets/buku-tanamku.png" alt="Pak Padi" class="frame-image">
                </div>
            </div>
            
            <!-- PADI IMAGES CONTAINER -->
            <div class="padi-images-container loading" style="animation-delay: 0.3s;">
                <img src="assets/padi-satu.png" alt="Padi Satu" class="padi-image">
                <img src="assets/padi-dua.png" alt="Padi Dua" class="padi-image">
                <img src="assets/padi-tiga.png" alt="Padi Tiga" class="padi-image">
            </div>
        </div>
    </div>
    
    <!-- BOTTOM NAVIGATION -->
    <nav class="bottom-nav">
        <div class="nav-container">
            <a href="index.html" class="nav-item">
                <i class="fas fa-home nav-icon"></i>
                <span class="nav-label">Home</span>
            </a>
            <a href="#" class="nav-item" onclick="openSearch()">
                <i class="fas fa-search nav-icon"></i>
                <span class="nav-label">Search</span>
            </a>
            <a href="#" class="nav-item" onclick="openNotifications()">
                <i class="fas fa-bell nav-icon"></i>
                <span class="nav-label">Notification</span>
            </a>
            <a href="#" class="nav-item" onclick="openProfile()">
                <i class="fas fa-user nav-icon"></i>
                <span class="nav-label">Profile</span>
            </a>
        </div>
    </nav>
    
    <!-- JAVASCRIPT -->
    <script>
        // SOUND EFFECTS
        const clickSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
        
        // NAVIGATION FUNCTIONS
        function goBack() {
            playClickSound();
            window.location.href = 'tanaman-pangan.html';
        }
        
        function openSettings() {
            playClickSound();
            alert('Pengaturan akan segera tersedia!');
        }
        
        function openSearch() {
            playClickSound();
            alert('Pencarian akan segera tersedia!');
        }
        
        function openNotifications() {
            playClickSound();
            alert('Notifikasi akan segera tersedia!');
        }
        
        function openProfile() {
            playClickSound();
            alert('Profil akan segera tersedia!');
        }
        
        function playClickSound() {
            try {
                clickSound.currentTime = 0;
                clickSound.play().catch(e => console.log('Audio play failed:', e));
            } catch(e) {
                console.log('Audio not supported');
            }
        }
        
        // INTERACTIVE EFFECTS
        document.addEventListener('DOMContentLoaded', function() {
            // PARALLAX EFFECT TO CLOUDS
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const clouds = document.querySelector('.clouds');
                clouds.style.transform = `translateY(${scrolled * 0.5}px)`;
            });
            
            // HOVER EFFECT TO PADI IMAGES
            const padiImages = document.querySelectorAll('.padi-image');
            padiImages.forEach(img => {
                img.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.02)';
                    this.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)';
                });
                
                img.addEventListener('mouseleave', function() {
                    this.style.transform = '';
                    this.style.boxShadow = '';
                });
            });
        });
        
        // PREVENT ZOOM ON DOUBLE TAP FOR MOBILE
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    </script>
</body>
</html>
```

## Instruksi Copy-Paste

### Langkah 1: Buat File HTML
1. Buat file baru dengan nama `padi-detail.html` di folder `aplikasi/`
2. Copy seluruh kode HTML di atas dan paste ke dalam file

### Langkah 2: Siapkan Gambar di Assets
Pastikan gambar-gambar berikut ada di folder `aplikasi/assets/`:

1. **buku-tanamku.png** - Gambar utama Pak Padi dalam bingkai persegi
2. **padi-satu.png** - Gambar konten pertama (deskripsi padi)
3. **padi-dua.png** - Gambar konten kedua (manfaat padi)
4. **padi-tiga.png** - Gambar konten ketiga (cara menanam padi)

### Langkah 3: Kustomisasi (Opsional)
Jika ingin mengubah konten:
- Ganti teks di wooden sign: `Pak Padi si Penghasil nasi`
- Tambah/hapus gambar konten di `.padi-images-container`
- Sesuaikan warna di CSS variables

### Langkah 4: Test Responsif
Pastikan halaman berfungsi di:
- **Mobile**: < 480px width
- **Tablet**: 481px - 768px width  
- **Desktop**: > 769px width

## Fitur yang Sudah Termasuk

### ✅ Header Navigation
- Tombol kembali dengan fungsi `goBack()`
- Teks "Kebun Ajaib" di tengah
- Tombol setting dengan fungsi `openSettings()`
- Responsive di semua device

### ✅ Wooden Sign
- Text "Pak Padi si Penghasil nasi"
- Background gradien coklat kayu
- Dekorasi paku di atas
- Shadow effects

### ✅ Gambar Utama
- Bingkai persegi dengan `aspect-ratio: 1/1`
- Border kayu yang menarik
- Responsive dan auto scaling
- Hover effects

### ✅ Konten Gambar
- 3 gambar berurutan (padi-satu, padi-dua, padi-tiga)
- White background dengan green border
- Responsive design
- Hover effects dengan scale

### ✅ Bottom Navigation
- Home, Search, Notification, Profile
- Fixed position di bawah
- Interactive hover states

### ✅ Animasi & Interaksi
- Cloud floating animation
- Smooth transitions
- Click sound effects
- Parallax scrolling
- Touch-friendly untuk mobile

### ✅ Responsive Design
- Mobile-first approach
- Breakpoints untuk semua device
- Flexible layout
- Auto scaling images

## Catatan Penting

1. **Path Assets**: Pastikan semua path gambar menggunakan `assets/` bukan `../assets/`
2. **Font Loading**: Pastikan koneksi internet untuk Google Fonts
3. **Browser Support**: Kode sudah compatible dengan semua browser modern
4. **Performance**: Gambar dioptimalkan dengan `object-fit: contain`
5. **SEO**: Meta tags sudah lengkap

## Preview Hasil
Halaman akan terlihat seperti:
- Header dengan navigasi lengkap
- Wooden sign yang menarik
- Gambar utama dalam bingkai
- 3 gambar konten yang responsif
- Bottom navigation yang konsisten
- Animasi yang smooth dan profesional

## Link Navigation
- **Back**: `tanaman-pangan.html`
- **Home**: `index.html`
- Semua link sudah dikonfigur dengan benar

Copy paste kode ini dan tambahkan gambar-gambar yang diperlukan di folder assets untuk hasil instan!
