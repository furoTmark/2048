const version = "1.07",
    preCache = "PRECACHE-" + version,
    cacheList = [
        "2048/",
        "2048/style/main.css",
        "2048/style/bootstrap.min.css",
        "2048/style/animate.min.css",
        "2048/style/addtohomescreen.css",
        "2048/js/keyboard_input_manager.js",
        "2048/js/html_actuator.js",
        "2048/js/grid.js",
        "2048/js/tile.js",
        "2048/js/addtohomescreen.min.js",
        "2048/js/local_storage_manager.js",
        "2048/js/game_manager.js",
        "2048/js/application.js"
    ];

/*  Service Worker Event Handlers */
self.addEventListener("install", function (event) {

    console.log("Installing the service worker!");

    self.skipWaiting();

    caches.open(preCache)
        .then(cache => {
            cache.addAll(cacheList);
        });
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            cacheNames.forEach(value => {
                if (value.indexOf(version) < 0) {
                    caches.delete(value);
                }
            });
            console.log("service worker activated");
            return;
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});