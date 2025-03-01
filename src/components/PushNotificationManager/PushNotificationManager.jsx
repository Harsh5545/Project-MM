// 'use client';

// import { sendNotification, subscribeUser, unsubscribeUser } from "@/Actions";
// import { useEffect, useState } from "react";

// export default function PushNotificationManager() {
//     const [isSupported, setIsSupported] = useState(false);
//     const [subscription, setSubscription] = useState(null);
//     const [message, setMessage] = useState('');
//     const [showNotificationPrompt, setShowNotificationPrompt] = useState(false);

//     // Register the service worker
//     async function registerServiceWorker() {
//         try {
//             const registration = await navigator.serviceWorker.register('/sw.js', {
//                 scope: '/',
//                 updateViaCache: 'none',
//             });

//             const sub = await registration.pushManager.getSubscription();
//             setSubscription(sub);
//         } catch (error) {
//             console.error("Service Worker registration failed:", error);
//         }
//     }

//     // Convert the VAPID key from Base64 to Uint8Array
//     function urlBase64ToUint8Array(base64String) {
//         const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
//         const base64 = (base64String + padding)
//             .replace(/-/g, '+')
//             .replace(/_/g, '/');

//         const rawData = window.atob(base64);
//         const outputArray = new Uint8Array(rawData.length);

//         for (let i = 0; i < rawData.length; ++i) {
//             outputArray[i] = rawData.charCodeAt(i);
//         }

//         return outputArray;
//     }

//     // Request permission for notifications
//     async function requestNotificationPermission() {
//         if (Notification.permission === "default") {
//             const permission = await Notification.requestPermission();
//             if (permission === "granted") {
//                 console.log("Notification permission granted.");
//                 subscribeToPush();
//             } else {
//                 console.log("Notification permission denied.");
//             }
//         } else if (Notification.permission === "granted") {
//             subscribeToPush();
//         } else if (Notification.permission === "denied") {
//             // Notify user about enabling notifications manually in the browser settings
//             setShowNotificationPrompt(true);
//         }
//     }

//     // Subscribe to push notifications
//     async function subscribeToPush() {
//         try {
//             const registration = await navigator.serviceWorker.ready;
//             const sub = await registration.pushManager.subscribe({
//                 userVisibleOnly: true,
//                 applicationServerKey: urlBase64ToUint8Array(
//                     process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
//                 ),
//             });
//             setSubscription(sub);
//             await subscribeUser(sub);
//         } catch (error) {
//             console.error("Push subscription failed:", error);
//         }
//     }

//     // Unsubscribe from push notifications
//     async function unsubscribeFromPush() {
//         try {
//             const data = await subscription?.unsubscribe();
//             console.log(subscription, 'UNSCUBSCRIBED');
//             setSubscription(null);
//             await unsubscribeUser(subscription);
//         } catch (error) {
//             console.error("Unsubscription failed:", error);
//         }
//     }

//     // Send a test notification
//     async function sendTestNotification() {
//         if (subscription) {
//             await sendNotification(message);
//             setMessage('');
//         }
//     }

//     // Handle showing notification prompt
//     const handleManualEnableNotifications = () => {
//         setShowNotificationPrompt(false); // Hide prompt
//         alert("Please enable notifications in your browser settings.");
//     }

//     useEffect(() => {
//         if ('serviceWorker' in navigator && 'PushManager' in window) {
//             setIsSupported(true);
//             registerServiceWorker();
//             requestNotificationPermission();
//         }
//     }, []); // Empty dependency array ensures this effect runs once

//     if (!isSupported) {
//         return <p>Push notifications are not supported in this browser.</p>;
//     }

//     return (
//         <div>
//             {subscription ? (
//                 <>
//                     <p>You are subscribed to push notifications.</p>
//                     <button onClick={unsubscribeFromPush}>Unsubscribe</button>
//                 </>
//             ) : (
//                 <>
//                     <p>You are not subscribed to push notifications.</p>
//                     <button onClick={subscribeToPush}>Subscribe</button>
//                 </>
//             )}

//             {showNotificationPrompt && (
//                 <div className="notification-prompt">
//                     <p>You have denied push notifications. To enable them, please go to your browser settings and enable notifications for this site.</p>
//                     <button onClick={handleManualEnableNotifications}>Got it!</button>
//                 </div>
//             )}
//         </div>
//     );
// }


'use client';

import { sendNotification, subscribeUser, unsubscribeUser } from "@/Actions";
import { useEffect, useState } from "react";

export default function PushNotificationManager() {
    const [isSupported, setIsSupported] = useState(false);
    const [subscription, setSubscription] = useState(null);
    const [message, setMessage] = useState('');
    const [showNotificationPrompt, setShowNotificationPrompt] = useState(false);
    const [waitingServiceWorker, setWaitingServiceWorker] = useState(null); // Track waiting service worker for update

    // Register the service worker
    async function registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js', {
                scope: '/',
                updateViaCache: 'none',
            });

            const sub = await registration.pushManager.getSubscription();
            setSubscription(sub);

            // Listen for a new service worker being installed
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if (installingWorker) {
                    installingWorker.onstatechange = () => {
                        if (installingWorker.state === 'installed') {
                            // A new service worker is installed and waiting to take control
                            setWaitingServiceWorker(installingWorker);
                        }
                    };
                }
            };
        } catch (error) {
            console.error("Service Worker registration failed:", error);
        }
    }

    // Convert the VAPID key from Base64 to Uint8Array
    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }

        return outputArray;
    }

    // Request permission for notifications
    async function requestNotificationPermission() {
        if (Notification.permission === "default") {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                console.log("Notification permission granted.");
                subscribeToPush();
            } else {
                console.log("Notification permission denied.");
            }
        } else if (Notification.permission === "granted") {
            subscribeToPush();
        } else if (Notification.permission === "denied") {
            // Notify user about enabling notifications manually in the browser settings
            setShowNotificationPrompt(true);
        }
    }

    // Subscribe to push notifications
    async function subscribeToPush() {
        try {
            const registration = await navigator.serviceWorker.ready;
            const sub = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
                ),
            });
            setSubscription(sub);
            await subscribeUser(sub);
        } catch (error) {
            console.error("Push subscription failed:", error);
        }
    }

    // Unsubscribe from push notifications
    async function unsubscribeFromPush() {
        try {
            const data = await subscription?.unsubscribe();
            console.log(subscription, 'UNSUBSCRIBED');
            setSubscription(null);
            await unsubscribeUser(subscription);
        } catch (error) {
            console.error("Unsubscription failed:", error);
        }
    }

    // Send a test notification
    async function sendTestNotification() {
        if (subscription) {
            await sendNotification(message);
            setMessage('');
        }
    }

    // Handle showing notification prompt
    const handleManualEnableNotifications = () => {
        setShowNotificationPrompt(false); // Hide prompt
        alert("Please enable notifications in your browser settings.");
    }

    // Handle update prompt and refresh the page when a new service worker is available
    const handleServiceWorkerUpdate = () => {
        if (waitingServiceWorker) {
            waitingServiceWorker.postMessage({ action: 'skipWaiting' });
            // Optionally reload the page after activating the new service worker
            window.location.reload();
        }
    };

    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            setIsSupported(true);
            registerServiceWorker();
            requestNotificationPermission();
        }

        // Listen for the 'controllerchange' event to detect when the new service worker takes control
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('New service worker has taken control.');
            // Automatically reload or prompt user to reload the page
            window.location.reload();
        });

    }, []); // Empty dependency array ensures this effect runs once

    if (!isSupported) {
        return <p>Push notifications are not supported in this browser.</p>;
    }

    return (
        <div>
            {subscription ? (
                <>
                    <p>You are subscribed to push notifications.</p>
                    <button onClick={unsubscribeFromPush}>Unsubscribe</button>
                </>
            ) : (
                <>
                    <p>You are not subscribed to push notifications.</p>
                    <button onClick={subscribeToPush}>Subscribe</button>
                </>
            )}

            {showNotificationPrompt && (
                <div className="notification-prompt">
                    <p>You have denied push notifications. To enable them, please go to your browser settings and enable notifications for this site.</p>
                    <button onClick={handleManualEnableNotifications}>Got it!</button>
                </div>
            )}

            {waitingServiceWorker && (
                <div className="update-prompt">
                    <p>A new version of the app is available. Click below to refresh.</p>
                    <button onClick={handleServiceWorkerUpdate}>Update Now</button>
                </div>
            )}
        </div>
    );
}
