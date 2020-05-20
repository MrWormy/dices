self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('dice-app-cache').then(function(cache) {
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

self.addEventListener('fetch', (event) => {
    let c;
    event.respondWith(
        caches.open('dice-app-cache')
            .then(cache => {
                c = cache;
                return cache.match(event.request, { ignoreSearch: true })
            })
            .then((response) => {
                // cache.match() always resolves
                // but in case of success response will have value
                if (response !== undefined) {
                    return response;
                } else if(new URL(event.request.url).host === self.location.host) {
                    return new Promise((resolve) => {
                        fetch(event.request).then((res) => {
                            if (!res.ok) {
                                resolve(new Response(`request failed`, {status: res.status, statusText: res.statusText}));
                            }
                            else { c.put(event.request, res.clone()).then(() => resolve(res)); }
                        });
                    });
                } else {
                    return new Response('Unexpected Component', {status: 404, statusText: 'Not Found'});
                }
            })
    );
});
