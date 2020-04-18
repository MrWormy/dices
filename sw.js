self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('applicationCache').then(function(cache) {
            return cache.addAll([
                './',
                'index.html',
                'app.js',
                'manifest.webmanifest',
                'favicon.ico',
                'style/index.css',
                'config/dices.js',
                'icons/apple-touch-icon.png',
                'icons/favicon-32x32.png',
                'icons/favicon-16x16.png',
                'icons/safari-pinned-tab.svg',
                'icons/android-chrome-192x192.png',
                'icons/android-chrome-512x512.png',
                'add/',
                'add/index.html',
                'add/add.js',
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request, { ignoreSearch: true }).then(function(response) {
        // caches.match() always resolves
        // but in case of success response will have value
        if (response !== undefined) {
            return response;
        } else {
            return new Response('Unknown component');
        }
    }));
});
