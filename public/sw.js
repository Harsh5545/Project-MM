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

//   self.addEventListener('push', function (event) {
//     if (event.data) {
//         const data = event.data.json();
//         console.log(data);

//         const options = {
//             body: data.body,
//             icon: data.icon || '/icon.png',
//             badge: '/badge.png',
//             vibrate: [100, 50, 100],
//             data: {
//                 dateOfArrival: Date.now(),
//                 primaryKey: '2',
//                 link: data.url,  // Save the URL in the notification's data object
//             },
//         };

//         event.waitUntil(self.registration.showNotification(data.title, options));
//     }
// });

// self.addEventListener('notificationclick', function (event) {
//     console.log('Notification click received.',event.notification);

//     // Close the notification when clicked
//     event.notification.close();

//     // Get the URL from the notification data
//     const url = event.notification.data.link || '/';  // Fallback to '/' if no URL is provided

//     // Open the URL when the notification is clicked
//     event.waitUntil(clients.openWindow(url));
// });

self.addEventListener('push', function (event) {
  try {
      if (event.data) {
          const data = event.data.json();
          console.log('Received push notification data:', data);

          // Notification options
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
          };

          console.log('Showing notification with options:', options);

          // Show notification
          event.waitUntil(self.registration.showNotification(data.title, options));
      }
  } catch (error) {
      console.error('Error parsing push message data', error);
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', function (event) {
  console.log('Notification click received.', event.notification);

  // Close the notification when clicked
  event.notification.close();

  // Get the URL from the notification data or fallback to '/'
  const url = event.notification.data.link || '/';  // If the link doesn't exist, default to '/'
  
  console.log('Opening URL:', url); // To debug and ensure the link is correct

  // Focus on the existing window if it matches the URL, or open a new window
  event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
          console.log('Found window clients:', windowClients);

          // Find an existing client with the same URL
          const matchingClient = windowClients.find(client => client.url === url);

          if (matchingClient) {
              console.log('Found matching client, focusing...');

              // If found, bring it into focus
              return matchingClient.focus();
          } else {
              console.log('No matching client found, opening new window...');

              // Otherwise, open the URL in a new tab
              return clients.openWindow(url);
          }
      })
  );
});