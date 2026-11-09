const CACHE = 'respira-code-4-13-respiracion-meditacion';
const ASSETS = [
  "./",
  "./css/meditation.css",
  "./js/components/meditation.js",
  "./js/meditation-data.js",
  "./js/meditation-controller.js",
  "./css/breathing-companion.css",
  "./js/components/breathing-companion.js",
  "./js/breathing-companion-controller.js",
  "./css/base.css",
  "./css/companions.css",
  "./css/favorites.css",
  "./css/home-desktop.css",
  "./css/home-mobile-jardin.css",
  "./css/interface.css",
  "./css/journal-agenda.css",
  "./css/method-details.css",
  "./css/methods.css",
  "./css/mobile-navigation.css",
  "./css/more-jardin.css",
  "./css/pet-select-jardin.css",
  "./css/welcome-desktop.css",
  "./css/welcome-mobile-v2.css",
  "./iconos/apple-touch-icon.png",
  "./iconos/favicon-16.png",
  "./iconos/favicon-32.png",
  "./iconos/icon-192.png",
  "./iconos/icon-512.png",
  "./iconos/icon-maskable-512.png",
  "./imagenes/inicio-web/consejos-hd.png",
  "./imagenes/inicio-web/gatito-hd.png",
  "./imagenes/inicio-web/lago-hd.png",
  "./imagenes/inicio-web/meditacion-hd.png",
  "./imagenes/inicio-web/tecnicas-hd.png",
  "./imagenes/interfaz/barras/respira_barra_favoritos_activo.png",
  "./imagenes/interfaz/barras/respira_barra_inicio_activo.png",
  "./imagenes/interfaz/barras/respira_barra_mas_activo.png",
  "./imagenes/interfaz/barras/respira_barra_metodos_activo.png",
  "./imagenes/interfaz/marco-original.png",
  "./imagenes/mascotas/brotecito.png",
  "./imagenes/mascotas/lunita.png",
  "./imagenes/mascotas/nubecita.png",
  "./imagenes/metodos/anxiety.webp",
  "./imagenes/metodos/breath.webp",
  "./imagenes/metodos/caffeine.webp",
  "./imagenes/metodos/calm.webp",
  "./imagenes/metodos/grounding.webp",
  "./imagenes/metodos/journal.webp",
  "./imagenes/metodos/move.webp",
  "./imagenes/metodos/muscle.webp",
  "./imagenes/metodos/reframe.webp",
  "./imagenes/metodos/selflove.webp",
  "./imagenes/metodos/sleep.webp",
  "./imagenes/metodos/talk.webp",
  "./imagenes/metodos/unplug.webp",
  "./imagenes/paisajes/ondas-original.png",
  "./imagenes/perfiles/escena-brotecito.png",
  "./imagenes/perfiles/escena-lunita.png",
  "./imagenes/perfiles/escena-nubecita.png",
  "./imagenes/tarjetas/escenas-01.png",
  "./imagenes/tarjetas/escenas-02.png",
  "./imagenes/tarjetas/escenas-03.png",
  "./imagenes/tarjetas/escenas-05.png",
  "./imagenes/welcome/logo-aprobado-v2.png",
  "./imagenes/welcome/portada-aprobada-v2.png",
  "./index.html",
  "./js/app.js",
  "./js/components/activities.js",
  "./js/components/common.js",
  "./js/components/companions.js",
  "./js/components/favorites.js",
  "./js/components/home-card-art.js",
  "./js/components/home-desktop.js",
  "./js/components/home-mobile-jardin.js",
  "./js/components/interface.js",
  "./js/components/journal-agenda.js",
  "./js/components/methods.js",
  "./js/components/mobile-navigation.js",
  "./js/components/more-jardin.js",
  "./js/components/pet-select-jardin.js",
  "./js/components/settings.js",
  "./js/components/welcome-desktop.js",
  "./js/components/welcome-mobile.js",
  "./js/components/welcome-poster.js",
  "./js/daily-entry.js",
  "./js/data.js",
  "./js/home-pet-interaction.js",
  "./js/icons.js",
  "./js/journal-agenda-controller.js",
  "./js/journal-storage.js",
  "./js/method-categories.js",
  "./js/storage.js",
  "./js/timer.js",
  "./js/utils.js",
  "./manifest.webmanifest",
  "./sw.js"
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

