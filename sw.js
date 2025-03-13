const CACHE_NAME = 'winsome-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/academics.html',
  '/admissions.html',
  '/faculty.html',
  '/facilities.html',
  '/student-life.html',
  '/news.html',
  '/contact.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Montserrat:wght@300;400;500;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js',
  'https://cdn.pixabay.com/video/2023/01/15/146105-790252747_large.mp4',
  'https://via.placeholder.com/200x80?text=Winsome+Model+Schools+Logo',
  'https://via.placeholder.com/150?text=Dr.+John+Adebayo',
  'https://via.placeholder.com/150?text=Mrs.+Jane+Okonkwo',
  'https://via.placeholder.com/150?text=Mr.+David+Oluwaseun',
  'https://via.placeholder.com/150?text=Mrs.+Funmi+Adekoya',
  'https://via.placeholder.com/150?text=Mr.+Alex+Brown',
  'https://via.placeholder.com/150?text=Mrs.+Sarah+Adeyemi',
  'https://via.placeholder.com/150?text=Mr.+Peter+Okafor',
  'https://via.placeholder.com/150?text=Mrs.+Emily+Green',
  'https://via.placeholder.com/150?text=Mr.+Samuel+Adewale',
  'https://via.placeholder.com/150?text=Mrs.+Grace+Ojo',
  'https://via.placeholder.com/150?text=Mr.+Daniel+Eze',
  'https://via.placeholder.com/150?text=Mrs.+Funke+Alabi',
  'https://via.placeholder.com/300x200?text=Blog+1',
  'https://via.placeholder.com/300x200?text=Blog+2',
  'https://via.placeholder.com/300x200?text=Blog+3',
  'https://via.placeholder.com/300x200?text=Gallery+1',
  'https://via.placeholder.com/300x200?text=Gallery+2',
  'https://via.placeholder.com/300x200?text=Gallery+3',
  'https://via.placeholder.com/300x200?text=Gallery+4',
  'https://via.placeholder.com/300x200?text=Gallery+5',
  'https://via.placeholder.com/300x200?text=Gallery+6',
  'https://via.placeholder.com/600x400?text=Sports+Day',
  'https://via.placeholder.com/600x400?text=Science+Fair',
  'https://via.placeholder.com/600x400?text=Cultural+Festival',
  'https://via.placeholder.com/600x400?text=Classroom+Tour',
  'https://via.placeholder.com/600x400?text=Lab+Tour',
  'https://via.placeholder.com/600x400?text=Field+Tour',
  'https://via.placeholder.com/600x400?text=Library+Tour',
  'https://via.placeholder.com/600x400?text=ICT+Tour'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      }).catch(() => caches.match('/index.html'));
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('push', (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: 'assets/icons/icon-192x192.png',
    data: { url: data.url }
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});