var loadedFrom = '';
console.log('im the service worker ok!');


self.addEventListener('activate', function(event) {
  console.log('activate event', event);

});


self.addEventListener('install', function(event) {
  console.log('install', event);
  event.waitUntil(
    caches.open('static-v1')
    .then(function(cache) {
      return cache.addAll([
        '/bggapp/',
        '/bggapp/main.bundle.js',
        '/bggapp/css/styles.css',
        new Request('//storage.googleapis.com/code.getmdl.io/1.0.4/material.indigo-pink.min.css', {mode: 'no-cors'}),
        new Request('//fonts.googleapis.com/icon?family=Material+Icons', {mode: 'no-cors'}),
        new Request('//storage.googleapis.com/code.getmdl.io/1.0.4/material.min.js', {mode: 'no-cors'})
      ]);
    })
  );
});


self.addEventListener('fetch', function(event) {
  console.log('fetch event', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

