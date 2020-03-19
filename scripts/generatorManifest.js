const path = require('path');
const fs = require('fs');
const simpleGit = require('simple-git/promise');
const manifest = require('../site/manifest.json');

const cwd = process.cwd();
const git = simpleGit(cwd);

const getServiceWorker = version => {
  return `
const PRECACHE = 'precache-${version}';
const RUNTIME = 'runtime-${version}';

const PRECACHE_URLS = ['index.js'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting()),
  );
});

self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
      })
      .then(cachesToDelete => {
        return Promise.all(
          cachesToDelete.map(cacheToDelete => {
            return caches.delete(cacheToDelete);
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      }),
    );
  }
}); `;
};

async function generatorServiceWorker() {
  const head = await git.revparse(['HEAD']);
  fs.writeFileSync(
    path.resolve(__dirname, '../_site/service-worker.js'),
    getServiceWorker(head),
    'utf8',
  );
}
const generatorManifest = () => {
  fs.writeFileSync(
    path.resolve(__dirname, '../_site/manifest.json'),
    JSON.stringify(manifest),
    'utf8',
  );
};

generatorServiceWorker();
generatorManifest();
