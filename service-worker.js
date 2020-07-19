const CACHE_NAME = "top-scorer-v6";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/saved.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/icon.png",
    "/timer.png",
    "/images/nologo.png",
    "/manifest.json",
    "/js/nav.js",
    "/js/idb.js",
    "/js/idb_library.js",
    "/js/api.js",
    "js/main.js"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener("fetch", function(event) {
    var base_url = " http://api.football-data.org/v2/";

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME)
                .then(function(cache) {
                    return fetch(event.request)
                        .then(function(response) {
                            cache.put(event.request.url, response.clone());
                            return response;
                        })
                })
        )
    }else {
        event.respondWith(
            caches
                .match(event.request, {
                    ignoreSearch: true
                })
                .then(function(response) {
                    return response || fetch(event.request);                    
                })
        )    
    }
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys()
            .then(function(cacheNames) {
                return Promise.all(
                    cacheNames.map(function(cacheName) {
                        if (cacheName != CACHE_NAME) {
                            console.log("ServiceWorker: cache " + cacheName + " deleted");
                            return caches.delete(cacheName);                            
                        }
                    })
                );
            })
    )
});


self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message have no payload';
    }

    var options = {
        body: body,
        icon: 'timer.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('Push notification', options)
    )
})