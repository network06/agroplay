/**
 * =====================================================
 * AGROPLAY - Additional Images
 * Placeholder SVG images for features
 * =====================================================
 */

/*
Since images are binary files, here are the fallback icons used:
- Tanaman Hias: Font Awesome icon (fa-spa)
- Industri: Font Awesome icon (fa-industry)  
- Olahan Makanan: Font Awesome icon (fa-utensils)

The HTML already includes fallback icons:
<div class="icon-fallback" style="display:none;"><i class="fas fa-spa"></i></div>

These will display if the image fails to load.
*/

// Image mapping for features
const FEATURE_IMAGES = {
    'tanaman-hias': {
        name: 'Tanaman Hias',
        icon: '🌸',
        fallback: 'fa-spa',
        color: 'green'
    },
    'industri': {
        name: 'Industri',
        icon: '🏭',
        fallback: 'fa-industry',
        color: 'orange'
    },
    'buku-olahan': {
        name: 'Olahan Makanan',
        icon: '🍳',
        fallback: 'fa-utensils',
        color: 'green'
    }
};

console.log('📷 Feature images loaded:', Object.keys(FEATURE_IMAGES).length, 'features');


