importScripts('js/workbox-sw.js');

if (workbox) {
    console.log("Workbox berhasil dimuat");
}else {
    console.log("Workbox gagal dimuat");
}

workbox.precaching.precacheAndRoute([
    {
        url: '/', revision: '1'
    },
    {
        url: '/nav.html', revision: '1'
    },
    {
        url: '/index.html', revision: '1'
    },
    {
        url: '/pages/home.html', revision: '1'
    },
    {
        url: '/pages/saved.html', revision: '1'
    },
    {
        url: '/css/materialize.min.css', revision: '1'
    },
    {
        url: '/js/materialize.min.js', revision: '1'
    },
    {
        url: '/icon.png', revision: '1'
    },
    {
        url: '/timer.png', revision: '1'
    },
    {
        url: '/images/nologo.png', revision: '1'
    },
    {
        url: '/manifest.json', revision: '1'
    },
    {
        url: '/js/nav.js', revision: '1'
    },
    {
        url: '/js/idb.js', revision: '1'
    },
    {
        url: '/js/idb_library.js', revision: '1'
    },
    {
        url: '/js/api.js', revision: '1'
    },
    {
        url: '/js/main.js', revision: '1'
    }
]);

workbox.routing.registerRoute(
  /^https:\/\/api.football-data.org\/v2\//,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'https://api.football-data.org/v2/',
  })
);

workbox.routing.registerRoute(
    /^https:\/\/upload.wikimedia.org\/wikipedia\//,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'https://upload.wikimedia.org/wikipedia/',
    })
  );
  
  

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

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