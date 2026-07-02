// ============================================================
// StockAI-Pro 2.0 — Service Worker
// Handles offline caching + background sync
// ============================================================

var CACHE_NAME = 'stockai-pro-v2';
var CACHE_TIMEOUT = 7 * 24 * 60 * 60 * 1000; // 7 days

var CACHE_FILES = [
    '/hub.html',
    '/app.html',
    '/index.html',
    '/manifest.json',
    '/email-templates.js',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// ============================================================
// INSTALL
// ============================================================
self.addEventListener('install', function(e) {
    console.log('📦 StockAI-Pro 2.0 Service Worker installing...');
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return Promise.allSettled(
                CACHE_FILES.map(function(url) {
                    return cache.add(url).catch(function(err) {
                        console.warn('Could not cache:', url, err);
                    });
                })
            );
        }).then(function() {
            return self.skipWaiting();
        })
    );
});

// ============================================================
// ACTIVATE
// ============================================================
self.addEventListener('activate', function(e) {
    console.log('✅ StockAI-Pro 2.0 Service Worker activated');
    e.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(name) {
                    if (name !== CACHE_NAME) {
                        console.log('🗑️ Deleting old cache:', name);
                        return caches.delete(name);
                    }
                })
            );
        }).then(function() {
            return self.clients.claim();
        })
    );
});

// ============================================================
// FETCH — Network first, fall back to cache
// ============================================================
self.addEventListener('fetch', function(e) {
    var url = e.request.url;

    if (e.request.method !== 'GET') return;

    // Skip Firebase requests
    if (url.includes('firestore.googleapis.com') ||
        url.includes('firebase') ||
        url.includes('identitytoolkit') ||
        url.includes('securetoken') ||
        url.includes('resend.com') ||
        url.includes('paystack')) {
        return;
    }

    // HTML pages — network first
    if (e.request.headers.get('accept') &&
        e.request.headers.get('accept').includes('text/html')) {
        e.respondWith(
            fetch(e.request)
                .then(function(response) {
                    var clone = response.clone();
                    caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(e.request, clone);
                    });
                    return response;
                })
                .catch(function() {
                    return caches.match(e.request).then(function(cached) {
                        if (cached) return cached;
                        return new Response(offlinePage(), {
                            headers: { 'Content-Type': 'text/html' }
                        });
                    });
                })
        );
        return;
    }

    // Assets — cache first
    e.respondWith(
        caches.match(e.request).then(function(cached) {
            if (cached) return cached;
            return fetch(e.request).then(function(response) {
                var clone = response.clone();
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(e.request, clone);
                });
                return response;
            }).catch(function() {
                return new Response('', { status: 408 });
            });
        })
    );
});

// ============================================================
// PUSH NOTIFICATIONS
// ============================================================
self.addEventListener('push', function(e) {
    if (!e.data) return;
    var data = e.data.json();
    var title = data.title || 'StockAI-Pro';
    var options = {
        body:    data.body    || 'You have a new notification',
        icon:    '/manifest.json',
        badge:   '/manifest.json',
        tag:     data.tag     || 'stockai-notif',
        data:    data.url     || '/hub.html',
        actions: [
            { action: 'open',    title: 'Open App' },
            { action: 'dismiss', title: 'Dismiss'  }
        ]
    };
    e.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(e) {
    e.notification.close();
    if (e.action === 'dismiss') return;
    var url = e.notification.data || '/hub.html';
    e.waitUntil(
        clients.matchAll({ type: 'window' }).then(function(clientList) {
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if (client.url.includes('hub.html') && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) return clients.openWindow(url);
        })
    );
});

// ============================================================
// BACKGROUND SYNC
// ============================================================
self.addEventListener('sync', function(e) {
    if (e.tag === 'stockai-sync') {
        console.log('🔄 Background sync triggered');
    }
});

// ============================================================
// OFFLINE PAGE
// ============================================================
function offlinePage() {
    return '<!DOCTYPE html><html><head>' +
        '<meta charset="UTF-8">' +
        '<meta name="viewport" content="width=device-width,initial-scale=1">' +
        '<title>StockAI-Pro — Offline</title>' +
        '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap" rel="stylesheet">' +
        '<style>' +
        'body{font-family:Poppins,sans-serif;background:linear-gradient(135deg,#0d4a5c,#1a8ba8);' +
        'display:flex;align-items:center;justify-content:center;' +
        'height:100vh;margin:0;text-align:center;padding:20px}' +
        '.card{background:#fff;border-radius:24px;padding:40px 32px;' +
        'max-width:380px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.3)}' +
        '.logo{width:70px;height:70px;background:linear-gradient(135deg,#1a8ba8,#0d4a5c);' +
        'border-radius:18px;display:flex;align-items:center;justify-content:center;' +
        'font-size:1.8rem;color:#fff;margin:0 auto 16px}' +
        'h1{color:#0d4a5c;font-size:1.4rem;font-weight:800;margin-bottom:8px}' +
        'p{color:#5a8a96;font-size:.88rem;line-height:1.6;margin-bottom:24px}' +
        'button{background:linear-gradient(135deg,#1a8ba8,#0d4a5c);color:#fff;' +
        'border:none;padding:14px 28px;border-radius:10px;font-size:.95rem;' +
        'font-weight:700;cursor:pointer;width:100%;font-family:inherit}' +
        '.status{margin-top:16px;font-size:.75rem;color:#8aabb5}' +
        '</style></head>' +
        '<body><div class="card">' +
        '<div class="logo">📵</div>' +
        '<h1>No Internet Connection</h1>' +
        '<p>StockAI-Pro needs an internet connection to sync your data. ' +
        'Please check your connection and try again.</p>' +
        '<button onclick="window.location.reload()">🔄 Try Again</button>' +
        '<div class="status">StockAI-Pro v2.0 • Offline Mode</div>' +
        '</div></body></html>';
}

console.log('✅ StockAI-Pro 2.0 Service Worker ready');
