// self.addEventListener('push', function (event) {
//     if (event.data) {
//       const data = event.data.json();
//       console.log(data)
//       const options = {
//         body: data.body,
//         icon: data.icon || '/icon.png',
//         badge: '/badge.png',
//         vibrate: [100, 50, 100],
//         data: {
//           dateOfArrival: Date.now(),
//           primaryKey: '2',
//           link: data.url,
//         },
//       }
//       event.waitUntil(self.registration.showNotification(data.title, options))
//     }
//   })

const { on } = require("nodemailer/lib/xoauth2");

// self.addEventListener('notificationclick', function (event) {
//   console.log('Notification click received.')
//   event.notification.close()
//   event.waitUntil(clients.openWindow('/'))
// })

// self.addEventListener('notificationclick', function (event) {
//   console.log('Notification click received.')
//   event.notification.close()
//   event.waitUntil(clients.openWindow('<https://your-website.com>'))
// })

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
        event.notification.close();
        event.waitUntil(clients.openWindow(data.url));
      }
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});