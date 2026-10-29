const CACHE = 'respira-code-4-6-metodos-jardin-v10';
const ASSETS = [
  "./css/methods.css",
  "./js/components/methods.js",
  "./css/home-desktop.css",
  "./js/components/home-desktop.js",
  "./imagenes/inicio-web/lago-hd.png",
  "./imagenes/inicio-web/meditacion-hd.png",
  "./imagenes/inicio-web/tecnicas-hd.png",
  "./imagenes/inicio-web/consejos-hd.png",
  "./imagenes/inicio-web/gatito-hd.png",
  "./css/welcome-desktop.css",
  "./css/welcome-mobile-v2.css",
  "./css/welcome-mobile.css",
  "./js/components/welcome-desktop.js",
  "./js/components/welcome-mobile.js",
  "./js/components/welcome-poster.js",
  "./imagenes/welcome/portada-aprobada-v2.png",
  "./imagenes/welcome/logo-aprobado-v2.png",
  "./imagenes/welcome/boton-iniciar-original-v2.png",
  "./imagenes/welcome/portada-movil-feliz-serena-v1.png",
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/base.css",
  "./css/companions.css",
  "./css/home.css",
  "./css/interface.css",
  "./iconos/icon-192.png",
  "./iconos/icon-512.png",
  "./js/app.js",
  "./js/data.js",
  "./js/icons.js",
  "./js/storage.js",
  "./js/timer.js",
  "./js/utils.js",
  "./imagenes/inicio/logo.svg",
  "./imagenes/inicio/arte-inicio-original.png",
  "./imagenes/interfaz/marco-original.png",
  "./imagenes/inicio/tarjeta-consejos.png",
  "./imagenes/inicio/tarjeta-meditacion.png",
  "./imagenes/inicio/tarjeta-respiracion.png",
  "./imagenes/inicio/tarjeta-tecnicas.png",
  "./imagenes/mascotas/brotecito.png",
  "./imagenes/mascotas/lunita.png",
  "./imagenes/mascotas/nubecita.png",
  "./imagenes/paisajes/lago.png",
  "./imagenes/paisajes/ondas-original.png",
  "./imagenes/perfiles/escena-brotecito.png",
  "./imagenes/perfiles/escena-lunita.png",
  "./imagenes/perfiles/escena-nubecita.png",
  "./js/components/activities.js",
  "./js/components/common.js",
  "./js/components/interface.js",
  "./js/components/companions.js",
  "./js/components/home.js",
  "./js/components/home-art.js",
  "./js/components/settings.js"
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('respira-code-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.open(CACHE).then(cache => cache.match('./index.html'))));
  } else {
    event.respondWith(caches.open(CACHE).then(async cache => {
      const cached = await cache.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    }));
  }
});

