/* Simple offline-first service worker */
const CACHE_NAME = 'wl-pwa-v1';
const OFFLINE_URLS = [
  './',
  './index.html',
  './post.html',
  './profile.png',
  './profil.png'
];
const CDN_ASSETS = [
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
  'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll([...OFFLINE_URLS, ...CDN_ASSETS]);
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    self.clients.claim();
  })());
});

// Stale-while-revalidate for GET requests
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isBlogger = /blogger\.com|blogspot\.com/.test(url.hostname);

  // For Blogger feeds and images, attempt network then cache fallback
  if (isBlogger) {
    event.respondWith((async () => {
      try {
        const res = await fetch(req);
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, res.clone());
        return res;
      } catch {
        const cached = await caches.match(req);
        return cached || new Response(JSON.stringify({ error: 'offline' }), { headers: { 'Content-Type': 'application/json' }, status: 503 });
      }
    })());
    return;
  }

  // Default: try cache, then network, then offline fallback for navigations
  event.respondWith((async () => {
    const cached = await caches.match(req, { ignoreSearch: true });
    if (cached) {
      // revalidate in background
      event.waitUntil(fetch(req).then(res => caches.open(CACHE_NAME).then(c => c.put(req, res.clone()))).catch(()=>{}));
      return cached;
    }
    try {
      const res = await fetch(req);
      const cache = await caches.open(CACHE_NAME);
      cache.put(req, res.clone());
      return res;
    } catch (e) {
      if (req.mode === 'navigate') {
        const offline = await caches.match('./index.html');
        return offline || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
      }
      return new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
    }
  })());
});

// Message handler to cache latest N posts payloads (optional hook from page)
self.addEventListener('message', async (event) => {
  const { type, urls } = event.data || {};
  if (type === 'CACHE_POSTS' && Array.isArray(urls)) {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(urls.map(u => fetch(u).then(r => cache.put(u, r.clone())).catch(()=>{})));
  }
});
