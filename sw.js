const CACHE='respira-v1-6';
const ASSETS=['./','./index.html','./style.css','./app.js','./manifest.webmanifest','./logo.svg','./landscape.svg','./icons/icon-192.png','./icons/icon-512.png','./fondos/fondo1.jpg','./fondos/fondo2.jpg','./fondos/fondo3.jpg','./fondos/fondo4.jpg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(names=>Promise.all(names.filter(n=>n!==CACHE).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(resp=>{if(resp.ok){const copy=resp.clone();caches.open(CACHE).then(c=>c.put(event.request,copy))}return resp})))})
