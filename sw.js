const PREFIX='carmen-agenda:'+self.registration.scope;const CACHE=PREFIX+':265569100db0-scroll-v1-install-v2-today-v1-install-help-v3-subrayador-pegatinas-v3-recordatorios-v7-cuaderno-decoracion-20261121-v35-flecha-y-prioridad-lapiz-editar-pegatinas-mes-tiradores-v2-21dic-lectivo-repetir-semanal-v1-boton-ocupado-v1';const FILES=["./", "./assets/fonts/20fc9b6fc618e7c3.woff2", "./assets/fonts/5bc49d41f32810a1.woff2", "./assets/fonts/7a0049db01fdd8fc.woff2", "./assets/fonts/94b0e8fc568c1361.woff2", "./assets/fonts/e3e520cb7468f2ef.woff2", "./assets/fonts/f273cf2c9ce9bc7d.woff2", "./assets/fonts/licenses/barlowcondensed-OFL.txt", "./assets/fonts/licenses/caveat-OFL.txt", "./assets/fonts/licenses/dmserifdisplay-OFL.txt", "./assets/fonts/licenses/nunito-OFL.txt", "./assets/fonts.css", "./assets/icons/apple-touch-icon.png", "./assets/icons/favicon-32.png", "./assets/icons/icon-192-rosa-topo.png", "./assets/icons/icon-192.png", "./assets/icons/icon-512-rosa-topo.png", "./assets/icons/icon-512.png", "./assets/icons/icon.svg", "./index.html", "./manifest.webmanifest?v=modelo-v1", "./pwa.css", "./pwa.js?v=agenda-update-v5", "./pegatina-cuaderno-avion.png", "./pegatina-cuaderno-birrete.png", "./pegatina-cuaderno-calculadora.png", "./pegatina-cuaderno-corazon-azul.png", "./pegatina-cuaderno-corazon.png", "./pegatina-cuaderno-estuche.png", "./pegatina-cuaderno-guirnalda.png", "./pegatina-cuaderno-sobre.png", "./pegatina-cuaderno-taza.png", "./cinta-cuaderno-cuadros-diagonal.png", "./cinta-cuaderno-cuadros-flores.png", "./cinta-cuaderno-flores-rosas.png", "./pegatina-cuaderno-banderines-rosas.png", "./pegatina-cuaderno-lapices-florales.png", "./pegatina-cuaderno-rama-verde.png", "./pegatina-cuaderno-ramas-olivo.png", "./pegatina-cuaderno-tulipan-naranja.png"];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES.map(file=>new Request(file,{cache:'reload'})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX+':')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message',e=>{if(e.data==='ACTIVATE')self.skipWaiting()});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== location.origin ||
      !url.href.startsWith(self.registration.scope)) return;
  const index = new URL('index.html', self.registration.scope);
  const isAgenda = event.request.mode === 'navigate' &&
    (url.pathname === index.pathname || url.pathname === new URL(self.registration.scope).pathname);
  event.respondWith(caches.open(CACHE).then(async cache => {
    if (isAgenda) {
      try {
        const response = await fetch(event.request, {cache:'reload'});
        if (response.ok) return response;
      } catch {}
      const saved = await cache.match(index);
      if (saved) return saved;
    }
    return (await cache.match(event.request)) || fetch(event.request);
  }));
});
