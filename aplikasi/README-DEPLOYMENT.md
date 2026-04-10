# Panduan Deploy Agroplay ke Vercel

## Persiapan Sebelum Deploy

### 1. Generate PWA Icons
Buka file `create-icons.html` di browser untuk generate icon yang diperlukan:
1. Buka `create-icons.html` di browser
2. Download semua icon yang dibutuhkan
3. Simpan di folder `assets/` dengan nama yang sesuai

### 2. Struktur Folder yang Diperlukan
Pastikan struktur folder seperti ini:
```
aplikasi/
  index.html
  manifest.json
  sw.js
  vercel.json
  browserconfig.xml
  offline.css
  assets/
    icon-16x16.png
    icon-32x32.png
    icon-70x70.png
    icon-72x72.png
    icon-96x96.png
    icon-128x128.png
    icon-144x144.png
    icon-150x150.png
    icon-152x152.png
    icon-192x192.png
    icon-310x310.png
    icon-384x384.png
    icon-512x512.png
    (asset lainnya yang sudah ada)
  css/
    (file CSS yang sudah ada)
  js/
    (file JS yang sudah ada)
```

## Cara Deploy ke Vercel

### Metode 1: Via Vercel CLI (Recommended)
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login ke Vercel:
   ```bash
   vercel login
   ```

3. Deploy dari folder aplikasi:
   ```bash
   cd aplikasi
   vercel
   ```

4. Ikuti instruksi:
   - Pilih project yang sudah ada atau buat baru
   - Confirm settings
   - Deploy!

### Metode 2: Via GitHub Integration
1. Push project ke GitHub
2. Connect repository ke Vercel dashboard
3. Set build settings:
   - Build Command: Kosongkan (static site)
   - Output Directory: `aplikasi`
   - Install Command: Kosongkan

## Konfigurasi PWA

### Service Worker
- File `sw.js` akan otomatis ter-register saat aplikasi dimuat
- Cache semua asset penting untuk offline access
- Auto-update saat versi baru tersedia

### Manifest
- File `manifest.json` berisi konfigurasi PWA
- Support install prompt di mobile
- Custom icons dan splash screen

### Offline Features
- Banner notification saat offline
- Cache-first strategy untuk asset statis
- Network fallback untuk dynamic content

## Testing PWA

### 1. Test di Browser
1. Buka aplikasi di Chrome/Firefox
2. Buka DevTools > Application > Service Workers
3. Pastikan service worker aktif
4. Test offline dengan tab Network > Offline

### 2. Test di Mobile
1. Buka aplikasi di mobile browser
2. Add to Home Screen
3. Test offline mode
4. Verify semua fitur berfungsi

## Troubleshooting

### Common Issues
1. **Service Worker tidak ter-register**
   - Pastikan file `sw.js` accessible
   - Check console untuk error

2. **Icons tidak muncul**
   - Verify semua icon files ada di folder assets
   - Check path di manifest.json

3. **Offline tidak berfungsi**
   - Clear cache dan reload
   - Check service worker status di DevTools

### Cache Management
Service worker akan otomatis:
- Cache asset statis saat install
- Update cache saat ada perubahan
- Clean old cache saat activate

## Performance Optimization

### Best Practices
- Gambar sudah dioptimalkan
- CSS dan JS sudah minified
- Service worker untuk offline caching
- CDN untuk external resources

### Monitoring
- Gunakan Vercel Analytics
- Monitor Core Web Vitals
- Check Lighthouse scores

## Security Notes
- HTTPS required untuk PWA
- Service worker hanya dari secure origins
- External CDN sudah menggunakan HTTPS

## Update Process
1. Update code
2. Increment version di `sw.js` (CACHE_NAME)
3. Deploy ke Vercel
4. Service worker otomatis update client

## Support
Untuk bantuan lebih lanjut:
- Check Vercel documentation
- Review PWA best practices
- Test dengan Lighthouse PWA audit
