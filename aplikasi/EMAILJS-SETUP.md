# Setup EmailJS untuk Password Reset Agroplay

## Langkah 1: Daftar EmailJS
1. Buka https://www.emailjs.com/
2. Klik "Sign Up" dan buat akun gratis
3. Verifikasi email Anda

## Langkah 2: Buat Email Service
1. Login ke dashboard EmailJS
2. Klik "Email Services" di sidebar
3. Klik "Add New Service"
4. Pilih provider email (Gmail direkomendasikan)
5. Ikuti instruksi untuk menghubungkan email Anda
6. Copy **Service ID** yang dihasilkan

## Langkah 3: Buat Email Template
1. Klik "Email Templates" di sidebar
2. Klik "Create New Template"
3. Gunakan template berikut:

**Subject:** Reset Password - {{app_name}}

**HTML Content:**
```html
<h2>Halo {{to_name}},</h2>
<p>Anda meminta reset password untuk akun {{app_name}} Anda.</p>
<p><strong>Kode Reset Anda:</strong></p>
<div style="background: #f0f0f0; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; border-radius: 8px; margin: 20px 0;">
  {{reset_code}}
</div>
<p>Kode ini berlaku selama {{expiry_minutes}} menit.</p>
<p>Jika Anda tidak meminta reset password, abaikan email ini.</p>
<p><small>Terima kasih,<br>Tim {{app_name}}</small></p>
```

4. Copy **Template ID** yang dihasilkan

## Langkah 4: Dapatkan Public Key
1. Klik "Account" di sidebar
2. Copy **Public Key** Anda

## Langkah 5: Konfigurasi Aplikasi
1. Buka file `js/email-config.js`
2. Ganti nilai berikut:

```javascript
const EMAIL_CONFIG = {
    SERVICE_ID: 'PASTE_SERVICE_ID_DISINI',
    TEMPLATE_ID: 'PASTE_TEMPLATE_ID_DISINI', 
    PUBLIC_KEY: 'PASTE_PUBLIC_KEY_DISINI',
    // ...
};
```

## Langkah 6: Testing
1. Buka `login.html`
2. Klik "Lupa Password?"
3. Masukkan email yang terdaftar
4. Periksa inbox dan spam folder Anda
5. Gunakan kode 6 digit yang diterima

## Troubleshooting

### Email tidak terkirim:
- Pastikan Service ID, Template ID, dan Public Key benar
- Cek console browser untuk error message
- Pastikan EmailJS sudah terhubung dengan benar

### Template tidak berfungsi:
- Pastikan variabel template sesuai: `{{to_name}}`, `{{reset_code}}`, `{{app_name}}`, `{{expiry_minutes}}`
- Cek syntax HTML template

### Limitasi Gratis:
- EmailJS free tier: 200 email/bulan
- Untuk produksi, pertimbangkan upgrade plan

## Security Notes
- Public Key aman untuk digunakan di frontend
- Jangan share Service ID dan Template ID secara publik
- Rate limiting sudah diimplementasi (3 attempts per code)
- Kode expire setelah 15 menit
