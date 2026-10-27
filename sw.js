const BACKEND = 'https://sol-master-api.cloudcdn.dad';
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith('/api/')) return;
  event.respondWith((async () => {
    const target = new URL(url.pathname + url.search, BACKEND);
    const init = {
      method: event.request.method,
      headers: event.request.headers,
      credentials: 'same-origin',
      redirect: 'follow',
    };
    if (event.request.method !== 'GET' && event.request.method !== 'HEAD') init.body = await event.request.arrayBuffer();
    return fetch(target.toString(), init);
  })());
});
