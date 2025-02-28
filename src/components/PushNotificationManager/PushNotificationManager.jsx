// 'use client';

// import { sendNotification, subscribeUser, unsubscribeUser } from "@/Actions";
// import { useEffect, useState } from "react";

// export default function PushNotificationManager() {
//     const [isSupported, setIsSupported] = useState(false);
//     const [subscription, setSubscription] = useState(null);
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         if ('serviceWorker' in navigator && 'PushManager' in window) {
//             setIsSupported(true);
//             registerServiceWorker();
//         }
//     }, []);

//     async function registerServiceWorker() {
//         const registration = await navigator.serviceWorker.register('/sw.js', {
//             scope: '/',
//             updateViaCache: 'none',
//         });
//         const sub = await registration.pushManager.getSubscription();
//         setSubscription(sub);
//     }

//     function urlBase64ToUint8Array(base64String) {
//         const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
//         const base64 = (base64String + padding)
//             .replace(/-/g, '+')  // Corrected here, use single slash instead of double backslash
//             .replace(/_/g, '/');

//         const rawData = window.atob(base64);
//         const outputArray = new Uint8Array(rawData.length);

//         for (let i = 0; i < rawData.length; ++i) {
//             outputArray[i] = rawData.charCodeAt(i);
//         }

//         return outputArray;
//     }


//     async function subscribeToPush() {
//         const registration = await navigator.serviceWorker.ready;
//         const sub = await registration.pushManager.subscribe({
//             userVisibleOnly: true,
//             applicationServerKey: urlBase64ToUint8Array(
//                 process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
//             ),
//         });
//         setSubscription(sub);
//         await subscribeUser(sub);
//     }

//     async function unsubscribeFromPush() {
//         await subscription?.unsubscribe();
//         setSubscription(null);
//         await unsubscribeUser();
//     }

//     async function sendTestNotification() {
//         if (subscription) {
//             await sendNotification(message);
//             setMessage('');
//         }
//     }

//     if (!isSupported) {
//         return <p>Push notifications are not supported in this browser.</p>;
//     }

//     return (
//         <div>
//             <h3>Push Notifications</h3>
//             {subscription ? (
//                 <>
//                     <p>You are subscribed to push notifications.</p>
//                     <button onClick={unsubscribeFromPush}>Unsubscribe</button>
//                     <input
//                         type="text"
//                         placeholder="Enter notification message"
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                     />
//                     <button onClick={sendTestNotification}>Send Test</button>
//                 </>
//             ) : (
//                 <>
//                     <p>You are not subscribed to push notifications.</p>
//                     <button onClick={subscribeToPush}>Subscribe</button>
//                 </>
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

    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            setIsSupported(true);
            registerServiceWorker();
            requestNotificationPermission();
        }
    }, []);

    async function registerServiceWorker() {
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none',
        });
        const sub = await registration.pushManager.getSubscription();
        setSubscription(sub);
    }

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

    async function requestNotificationPermission() {
        // Check if permission is already granted or denied
        if (Notification.permission === "default") {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                console.log("Notification permission granted.");
                subscribeToPush();
            } else {
                console.log("Notification permission denied.");
            }
        } else if (Notification.permission === "granted") {
            // If permission is already granted, subscribe automatically
            subscribeToPush();
        }
    }

    async function subscribeToPush() {
        const registration = await navigator.serviceWorker.ready;
        const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
                process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
            ),
        });
        setSubscription(sub);
        await subscribeUser(sub);
    }

    async function unsubscribeFromPush() {
        await subscription?.unsubscribe();
        setSubscription(null);
        await unsubscribeUser();
    }

    async function sendTestNotification() {
        if (subscription) {
            await sendNotification(message);
            setMessage('');
        }
    }

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
        </div>
    );
}
