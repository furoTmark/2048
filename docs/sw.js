const version = "1.07",
    preCache = "PRECACHE-" + version,
    cacheList = [
        "/2048",
        "style/main.css",
        "style/bootstrap.min.css",
        "style/animate.min.css",
        "style/addtohomescreen.css",
        "js/keyboard_input_manager.js",
        "js/html_actuator.js",
        "js/grid.js",
        "js/tile.js",
        "js/addtohomescreen.min.js",
        "js/local_storage_manager.js",
        "js/game_manager.js",
        "js/application.js"
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