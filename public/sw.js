self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();
    console.log(data);

    const options = {
      body: data.body,
      icon: data.icon || '/icon.png',
      badge: '/badge.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2',
        link: data.url,  // Save the URL in the notification's data object
      },
      onClick: function (event) {
        event.waitUntil(clients.openWindow(data.url));
        event.notification.close();
      }
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});