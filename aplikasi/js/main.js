/*
JavaScript untuk index.html — MATCH GAMBAR YANG DIKIRIM
Dokumentasi untuk murid kelas 8

Penjelasan:
- Splash screen muncul saat aplikasi dibuka
- Logo Agroplay di tengah, bukan di pinggir
- Hilang setelah 1.5 detik dengan animasi fade-out
- Menu item memiliki animasi hover & click
*/

document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const menuItems = document.querySelectorAll('.menu-item');

    // 1. Splash screen hilang setelah 1.5 detik
    setTimeout(() => {
        splashScreen.style.opacity = '0';
        splashScreen.style.transition = 'opacity 0.5s ease';
        
        // Setelah animasi selesai, sembunyikan splash screen
        setTimeout(() => {
            splashScreen.style.display = 'none';
            
            // Tampilkan main content dengan animasi fade-in
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '0';
            mainContent.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                mainContent.style.opacity = '1';
            }, 10);
        }, 500);
    }, 1500); // 1.5 detik

    // 2. Event listener untuk menu items
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.add('active');
            setTimeout(() => {
                this.classList.remove('active');
            }, 300);
        });

        item.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });

        item.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });

    // 3. Event listener untuk bottom navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.nav-item').forEach(nav => {
                nav.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // 4. Event listener untuk search bar
    const searchBar = document.querySelector('.search-bar');
    searchBar.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const term = this.value.trim();
            if (term) {
                alert(`Mencari: ${term}`);
            }
        }
    });
});