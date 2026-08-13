const CACHE_NAME = 'portaflores-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/manifest.json',
    '/assets/profile.jpg',
    '/assets/logos/unju.png',
    '/assets/logos/fce-unju.png',
    '/assets/logos/fi-unju.png',
    '/assets/logos/ies6.png'
];

// Instalar: cachear assets estáticos
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        }).catch(() => {
            // Si falla alguno, no romper la instalación
            console.log('[SW] Algunos assets no se pudieron cachear');
        })
    );
    self.skipWaiting();
});

// Activar: limpiar caches viejas
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// Fetch: cache-first para assets, network-first para APIs
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // APIs externas: siempre network
    if (url.hostname.includes('github.com') || 
        url.hostname.includes('countapi.xyz') ||
        url.hostname.includes('formspree.io')) {
        event.respondWith(fetch(request));
        return;
    }

    // Assets estáticos: cache-first
    event.respondWith(
        caches.match(request).then((cached) => {
            if (cached) {
                // Refrescar en background
                fetch(request).then((response) => {
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, response);
                    });
                }).catch(() => {});
                return cached;
            }
            return fetch(request).then((response) => {
                if (response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, clone);
                    });
                }
                return response;
            });
        }).catch(() => {
            // Si todo falla, mostrar offline
            if (request.mode === 'navigate') {
                return caches.match('/index.html');
            }
        })
    );
});