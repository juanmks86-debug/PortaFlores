/**
 * Service Worker — Portfolio PWA
 * Estrategia: Cache First para assets, Network First para datos dinámicos
 */

const CACHE_NAME = 'jif-portfolio-v1';
const STATIC_ASSETS = [
    './',
    './index.html',
    './css/style.css',
    './js/app.js',
    './favicon.svg',
    './manifest.json',
    'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Instalar y cachear assets estáticos
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { mode: 'no-cors' })))
                .catch(() => {/* Ignorar errores de assets externos */});
        })
    );
    self.skipWaiting();
});

// Activar y limpiar caches viejas
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

// Estrategia de fetch
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // API de GitHub → Network First (datos en tiempo real)
    if (url.hostname === 'api.github.com') {
        event.respondWith(
            fetch(event.request)
                .catch(() => caches.match(event.request))
        );
        return;
    }

    // Assets estáticos → Cache First
    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) return cached;
            return fetch(event.request).then((response) => {
                if (!response || response.status !== 200 || response.type === 'opaque') {
                    return response;
                }
                const toCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, toCache));
                return response;
            });
        })
    );
});
