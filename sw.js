// ============================================================
// StockAI-Pro — sw.js v4.1
// ============================================================

var CACHE_NAME = 'stockai-pro-v4-1';

var CACHE_FILES = [
    '/index.html',
    '/portal.html',
    '/quote-builder.html',
    '/setup.html',
    '/upgrade.html',
    '/hub.html',
    '/pos.html',
    '/pos-setup.html',
    '/sales-guru.html',
    '/info-sheet.html',
    '/email-templates.js',
    '/feature-access.js',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png',
    '/apple-icon-180.png',
    '/logo.svg',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// ── INSTALL ──
self.addEventListener('install', function(e) {
    console.log('📦 StockAI-Pro v4.1 Service Worker installing...');
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

// ── ACTIVATE ──
self.addEventListener('activate', function(e) {
    console.log('✅ StockAI-Pro v4.1 Service Worker activated');
    e.waitUntil(
        caches.keys().then(function(names) {
            return Promise.all(
                names.map(function(name) {
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

// ── FETCH ──
self.addEventListener('fetch', function(e) {
    var url = e.request.url;

    // Skip non-GET and external API calls
    if (e.request.method !== 'GET') return;
    if (url.includes('firestore.googleapis.com')) return;
    if (url.includes('firebase'))       return;
    if (url.includes('identitytoolkit')) return;
    if (url.includes('securetoken'))     return;
    if (url.includes('paystack'))        return;
    if (url.includes('resend.com'))      return;
    if (url.includes('workers.dev'))     return;

    // HTML pages — network first, cache fallback
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
                        return cached || new Response(offlinePage(), {
                            headers: { 'Content-Type': 'text/html' }
                        });
                    });
                })
        );
        return;
    }

    // Assets — cache first, network fallback
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

// ── PUSH NOTIFICATIONS ──
self.addEventListener('push', function(e) {
    if (!e.data) return;
    var data    = e.data.json();
    var options = {
        body:    data.body    || 'You have a new notification',
        icon:    '/icon-192.png',
        badge:   '/icon-192.png',
        tag:     data.tag     || 'stockai-notif',
        data:    data.url     || '/hub.html',
        actions: [
            { action: 'open',    title: 'Open App' },
            { action: 'dismiss', title: 'Dismiss'  }
        ]
    };
    e.waitUntil(
        self.registration.showNotification(
            data.title || 'StockAI-Pro', options)
    );
});

self.addEventListener('notificationclick', function(e) {
    e.notification.close();
    if (e.action === 'dismiss') return;
    var url = e.notification.data || '/hub.html';
    e.waitUntil(
        clients.matchAll({ type: 'window' }).then(function(list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].url.includes('hub.html') &&
                    'focus' in list[i]) {
                    return list[i].focus();
                }
            }
            if (clients.openWindow) return clients.openWindow(url);
        })
    );
});

// ── BACKGROUND SYNC ──
self.addEventListener('sync', function(e) {
    if (e.tag === 'stockai-sync') {
        console.log('🔄 Background sync triggered');
    }
});

// ── OFFLINE PAGE ──
function offlinePage() {
    return '<!DOCTYPE html><html><head>' +
        '<meta charset="UTF-8">' +
        '<meta name="viewport" content="width=device-width,initial-scale=1">' +
        '<title>StockAI-Pro — Offline</title>' +
        '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap" rel="stylesheet">' +
        '<style>' +
        'body{font-family:Poppins,sans-serif;background:linear-gradient(135deg,#0d4a5c,#1a8ba8);' +
        'display:flex;align-items:center;justify-content:center;height:100vh;margin:0;padding:20px;box-sizing:border-box}' +
        '.card{background:#fff;border-radius:20px;padding:36px 28px;max-width:360px;width:100%;' +
        'box-shadow:0 20px 60px rgba(0,0,0,.3);text-align:center}' +
        '.icon{font-size:3rem;margin-bottom:14px}' +
        'h1{color:#0d4a5c;font-size:1.3rem;font-weight:800;margin-bottom:8px}' +
        'p{color:#5a8a96;font-size:.86rem;line-height:1.6;margin-bottom:22px}' +
        'button{background:linear-gradient(135deg,#1a8ba8,#0d4a5c);color:#fff;' +
        'border:none;padding:13px 28px;border-radius:10px;font-size:.92rem;' +
        'font-weight:700;cursor:pointer;width:100%;font-family:inherit}' +
        '.ver{margin-top:14px;font-size:.72rem;color:#8aabb5}' +
        '</style></head>' +
        '<body><div class="card">' +
        '<div class="icon">📵</div>' +
        '<h1>No Internet Connection</h1>' +
        '<p>StockAI-Pro needs an internet connection to sync your data. ' +
        'Please check your connection and try again.</p>' +
        '<button onclick="window.location.reload()">🔄 Try Again</button>' +
        '<div class="ver">StockAI-Pro v4.1 • Offline Mode</div>' +
        '</div></body></html>';
}

console.log('✅ StockAI-Pro sw.js v4.1 ready');
