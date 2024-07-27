const cacheName = 'my-pwa-v4.433';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './jsondo.html',
    './openurl.html',
    './data.html',
    './Smoba.html',
    './opengame.html',
    './logo-200x200.png',
    'https://unpkg.zhimg.com/mdui@2.1.2/mdui.css',
    'https://unpkg.zhimg.com/mdui@2.1.2/mdui.global.js',
    './index.js',
    './myjson.js',
    './qrcode.min.js'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(urlsToCache);
        }).then(function () {
            //强制跳过等待阶段,进入激活阶段
            return self.skipWaiting();
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== cacheName) {
                        return caches.delete(name);
                    }
                })
            );
        }).then(function () {
            //self相当于webworker线程的当前作用域
            //当一个 service worker 被初始注册时，页面在下次加载之前不会使用它。claim() 方法会立即控制这些页面
            //从而更新客户端上的serviceworker
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request, {
            ignoreSearch: true
        }).then(function (response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});