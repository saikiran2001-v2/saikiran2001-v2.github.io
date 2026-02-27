// Service Worker — Network-first with cache fallback (always serve fresh content)
const CACHE_NAME = 'saikiran-v3';

const PRECACHE_URLS = [
    './',
    './index.html',
    './blog.html',
    './404.html',
    './assets/css/style.css',
    './assets/js/script.js',
    './assets/js/components.js',
    './assets/js/quotes.js',
    './assets/favicon.svg',
];

// Install: precache core assets, activate immediately
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting())
    );
});

// Activate: clean up old caches, claim clients immediately
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

// Fetch: network-first for everything — always try fresh content, fall back to cache offline
self.addEventListener('fetch', (e) => {
    const url = new URL(e.request.url);

    // Only handle same-origin GET requests
    if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;

    e.respondWith(
        fetch(e.request)
            .then(res => {
                const clone = res.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
                return res;
            })
            .catch(() => caches.match(e.request).then(r => r || caches.match('./404.html')))
    );
});
