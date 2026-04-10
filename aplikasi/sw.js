const CACHE_NAME = 'agroplay-v1.0.0';
const STATIC_CACHE = 'agroplay-static-v1.0.0';
const DYNAMIC_CACHE = 'agroplay-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/style.css',
  '/css/activity.css',
  '/css/animations.css',
  '/css/components.css',
  '/js/main.js',
  '/js/activity.js',
  '/js/achievements.js',
  '/js/admin-dashboard.js',
  '/js/auth.js',
  '/js/buku-tanamku.js',
  '/js/cuan-farming.js',
  '/js/game.js',
  '/js/kebun-ajaib.js',
  '/js/kuis-seru.js',
  '/js/parent-dashboard.js',
  '/js/profile.js',
  '/js/quiz.js',
  '/js/tanam-yuk.js',
  '/js/utils.js',
  '/assets/kebun_ajaib.png',
  '/assets/tanam_yuk.png',
  '/assets/kuis_seru_tani.png',
  '/assets/buku-tanamku-new.png',
  '/assets/cuan_farming.png',
  '/assets/background_home.png',
  '/assets/benar.png',
  '/assets/coba_lagi.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests except for CDNs
  if (url.origin !== location.origin && 
      !url.hostname.includes('tailwindcss.com') && 
      !url.hostname.includes('cdnjs.cloudflare.com') && 
      !url.hostname.includes('fonts.googleapis.com') && 
      !url.hostname.includes('fonts.gstatic.com')) {
    return;
  }
  
  event.respondWith(
    caches.match(request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          // For HTML files, try network in background for updates
          if (request.destination === 'document') {
            fetchAndUpdate(request);
          }
          return response;
        }
        
        // Otherwise fetch from network
        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response since it can only be consumed once
            const responseToCache = response.clone();
            
            // Cache dynamic content
            if (shouldCache(request)) {
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseToCache);
                });
            }
            
            return response;
          })
          .catch(() => {
            // If network fails, try to serve from cache as fallback
            if (request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Helper function to determine if request should be cached
function shouldCache(request) {
  const url = new URL(request.url);
  
  // Cache HTML pages, CSS, JS, and images
  if (request.destination === 'document' ||
      request.destination === 'style' ||
      request.destination === 'script' ||
      request.destination === 'image') {
    return true;
  }
  
  // Cache local assets
  if (url.origin === location.origin) {
    return url.pathname.includes('/assets/') || 
           url.pathname.includes('/css/') || 
           url.pathname.includes('/js/');
  }
  
  return false;
}

// Helper function to fetch and update cache in background
function fetchAndUpdate(request) {
  return fetch(request)
    .then((response) => {
      if (response && response.status === 200) {
        return caches.open(DYNAMIC_CACHE)
          .then((cache) => {
            cache.put(request, response.clone());
            return response;
          });
      }
    })
    .catch(() => {
      // Ignore network errors for background updates
    });
}

// Background sync for offline data
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Handle background sync
function doBackgroundSync() {
  // Sync any pending data when back online
  return self.registration.sync.register('background-sync');
}

// Push notification handler
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/assets/icon-192x192.png',
      badge: '/assets/badge-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'explore',
          title: 'Buka Agroplay',
          icon: '/assets/checkmark.png'
        },
        {
          action: 'close',
          title: 'Tutup',
          icon: '/assets/xmark.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Cache cleanup - limit dynamic cache size
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_LIMIT') {
    limitCacheSize(DYNAMIC_CACHE, 50);
  }
});

// Helper function to limit cache size
function limitCacheSize(cacheName, maxItems) {
  caches.open(cacheName)
    .then((cache) => {
      return cache.keys()
        .then((keys) => {
          if (keys.length > maxItems) {
            const itemsToDelete = keys.slice(0, keys.length - maxItems);
            return Promise.all(
              itemsToDelete.map((key) => cache.delete(key))
            );
          }
        });
    });
}
