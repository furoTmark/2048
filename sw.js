var cacheList = [
    "index.html",
    "style/main.css",
    "js/keyboard_input_manager.js",
    "js/html_actuator.js",
    "js/grid.js",
    "js/tile.js",
    "js/local_storage_manager.js",
    "js/game_manager.js",
    "js/application.js"
];

/*  Service Worker Event Handlers */

self.addEventListener("install", function (event) {

    console.log("Installing the service worker!");

    caches.open("PRECACHE")
        .then(function (cache) {

            cache.addAll(cacheList);

        });

});

self.addEventListener("activate", function (event) {

    console.log("Activating the service worker!");

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