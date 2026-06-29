// ============================================================
// StockAI-Pro Service Worker
// Handles offline caching + background sync
// ============================================================

var CACHE_NAME    = 'stockai-pro-v1';
var CACHE_TIMEOUT = 7 * 24 * 60 * 60 * 1000; // 7 days

// Files to cache for offline use
var CACHE_FILES = [
    '/mobile.html',
    '/manifest.json',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// ============================================================
// INSTALL — Cache core files
// ============================================================
self.addEventListener('install', function (e) {
    console.log('📦 Service Worker installing...');
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('📦 Caching core files');
            // Cache what we can — ignore failures for external URLs
            return Promise.allSettled(
                CACHE_FILES.map(function (url) {
                    return cache.add(url).catch(function (err) {
                        console.warn('Could not cache:', url, err);
                    });
                })
            );
        }).then(function () {
            // Activate immediately without waiting
            return self.skipWaiting();
        })
    );
});

// ============================================================
// ACTIVATE — Clean up old caches
// ============================================================
self.addEventListener('activate', function (e) {
    console.log('✅ Service Worker activated');
    e.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (name) {
                    if (name !== CACHE_NAME) {
                        console.log('🗑️ Deleting old cache:', name);
                        return caches.delete(name);
                    }
                })
            );
        }).then(function () {
            return self.clients.claim();
        })
    );
});

// ============================================================
// FETCH — Network first, fall back to cache
// ============================================================
self.addEventListener('fetch', function (e) {
    var url = e.request.url;

    // Skip non-GET requests
    if (e.request.method !== 'GET') return;

    // Skip Firebase/Firestore requests — always go to network
    if (url.includes('firestore.googleapis.com') ||
        url.includes('firebase') ||
        url.includes('identitytoolkit') ||
        url.includes('securetoken')) {
        return;
    }

    // For HTML pages — network first, cache fallback
    if (e.request.headers.get('accept') &&
        e.request.headers.get('accept').includes('text/html')) {
        e.respondWith(
            fetch(e.request)
                .then(function (response) {
                    // Cache the fresh response
                    var clone = response.clone();
                    caches.open(CACHE_NAME).then(function (cache) {
                        cache.put(e.request, clone);
                    });
                    return response;
                })
                .catch(function () {
                    // Network failed — serve from cache
                    return caches.match(e.request).then(function (cached) {
                        if (cached) return cached;
                        // Last resort offline page
                        return new Response(
                            offlinePage(),
                            { headers: { 'Content-Type': 'text/html' } }
                        );
                    });
                })
        );
        return;
    }

    // For all other assets — cache first, network fallback
    e.respondWith(
        caches.match(e.request).then(function (cached) {
            if (cached) return cached;
            return fetch(e.request).then(function (response) {
                // Cache the new response
                var clone = response.clone();
                caches.open(CACHE_NAME).then(function (cache) {
                    cache.put(e.request, clone);
                });
                return response;
            }).catch(function () {
                // Return empty response for failed asset loads
                return new Response('', { status: 408 });
            });
        })
    );
});

// ============================================================
// PUSH NOTIFICATIONS (ready for future use)
// ============================================================
self.addEventListener('push', function (e) {
    if (!e.data) return;

    var data    = e.data.json();
    var title   = data.title   || 'StockAI-Pro';
    var options = {
        body:    data.body    || 'You have a new notification',
        icon:    data.icon    || '/manifest.json',
        badge:   data.badge   || '/manifest.json',
        tag:     data.tag     || 'stockai-notif',
        data:    data.url     || '/mobile.html',
        actions: [
            { action: 'open',    title: 'Open App' },
            { action: 'dismiss', title: 'Dismiss'  }
        ]
    };

    e.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Handle notification click
self.addEventListener('notificationclick', function (e) {
    e.notification.close();

    if (e.action === 'dismiss') return;

    var url = e.notification.data || '/mobile.html';

    e.waitUntil(
        clients.matchAll({ type: 'window' }).then(function (clientList) {
            // If app already open — focus it
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if (client.url.includes('mobile.html') && 'focus' in client) {
                    return client.focus();
                }
            }
            // Otherwise open new window
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});

// ============================================================
// OFFLINE PAGE
// ============================================================
function offlinePage() {
    return '<!DOCTYPE html>' +
        '<html><head>' +
        '<meta charset="UTF-8">' +
        '<meta name="viewport" content="width=device-width,initial-scale=1">' +
        '<title>StockAI-Pro — Offline</title>' +
        '<style>' +
        'body{font-family:Poppins,sans-serif;background:#0d4a5c;' +
        'display:flex;align-items:center;justify-content:center;' +
        'height:100vh;margin:0;text-align:center;padding:20px}' +
        '.card{background:#fff;border-radius:20px;padding:40px 30px;' +
        'max-width:340px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.3)}' +
        '.icon{font-size:3rem;margin-bottom:16px}' +
        'h1{color:#0d4a5c;font-size:1.3rem;margin-bottom:8px}' +
        'p{color:#5a8a96;font-size:.88rem;line-height:1.5;margin-bottom:20px}' +
        'button{background:#1a8ba8;color:#fff;border:none;padding:14px 28px;' +
        'border-radius:8px;font-size:.95rem;font-weight:700;cursor:pointer;' +
        'width:100%;font-family:inherit}' +
        '</style></head>' +
        '<body><div class="card">' +
        '<div class="icon">📵</div>' +
        '<h1>No Internet Connection</h1>' +
        '<p>StockAI-Pro needs an internet connection to load. ' +
        'Please check your connection and try again.</p>' +
        '<button onclick="window.location.reload()">Try Again</button>' +
        '</div></body></html>';
}

console.log('✅ StockAI-Pro Service Worker ready');
