'use server';

import { redirect } from "next/navigation";
import { signOut, signIn } from "./auth";
import webpush from 'web-push';
import { prisma } from "./lib/prisma";

webpush.setVapidDetails(
    'mailto:your-email@example.com',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

export async function doCredentialLogin(formData) {
    try {
        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });
        redirect('/sign-in')
    } catch (err) {
        throw err;
    }
}

export async function handleSignOut() {
    const res = await signOut();
};

let subscription = null;

// export async function subscribeUser(sub) {
//     subscription = sub;
//     console.log(sub, 'SUBSCRIBED');
//     const { endpoint, keys } = sub;
//     // Save the subscription to the database
//     const data = await prisma.subscription.create({
//         data: {
//             endpoint,
//             keys_p256dh: keys.p256dh,
//             keys_auth: keys.auth,
//         },
//     });
//     // In a production environment, you would want to store the subscription in a database
//     // For example: await db.subscriptions.create({ data: sub })
//     return { success: true };
// }

export async function subscribeUser(sub) {
    const { endpoint, keys } = sub;
    const { p256dh, auth } = keys;

    // Check if a subscription with the same keys_auth already exists
    const existingSubscription = await prisma.subscription.findUnique({
        where: { keys_auth: auth },
    });

    if (existingSubscription) {
        return { success: false, message: 'Subscription already exists' };
    }

    // If the subscription does not exist, create a new one
    const data = await prisma.subscription.create({
        data: {
            endpoint,
            keys_p256dh: p256dh,
            keys_auth: auth,
        },
    });

    return { success: true, message: 'Subscription created successfully' };
}

export async function unsubscribeUser(sub) {
    const { endpoint, keys } = sub;
    const { p256dh, auth } = keys;
    try {
        // Check if a subscription with the same keys_auth exists
        const existingSubscription = await prisma.subscription.findUnique({
            where: { keys_auth: auth },
        });

        if (existingSubscription) {
            // If subscription exists, delete it
            await prisma.subscription.delete({
                where: { keys_auth: auth },
            });
            return { success: true, message: 'Subscription deleted successfully' };
        } else {
            return { success: false, message: 'No subscription found to delete' };
        }

    } catch (error) {
        return { success: false, error: error.message };
    }
}


// export async function sendNotification(message) {
//     if (!subscription) {
//         throw new Error('No subscription available');
//     }

//     try {
//         await webpush.sendNotification(
//             subscription,
//             JSON.stringify({
//                 title: 'Test Notification',
//                 body: message,
//                 icon: '/icon.png',
//             })
//         );
//         return { success: true };
//     } catch (error) {
//         console.error('Error sending push notification:', error);
//         return { success: false, error: 'Failed to send notification' };
//     }
// }

// export async function sendNotification(message) {
//     // Check if subscription exists
//     const subscription = await prisma.subscription.findFirst();

//     if (!subscription) {
//         throw new Error('No subscription available');
//     }

//     const notificationPayload = {
//         title: 'Test Notification',
//         body: message || 'Default notification message',
//         icon: '/icon.png',
//     };

//     try {
//         const res = await webpush.sendNotification(
//             {
//                 endpoint: subscription.endpoint,
//                 keys: {
//                     p256dh: subscription.keys_p256dh,
//                     auth: subscription.keys_auth,
//                 },
//             },
//             JSON.stringify(notificationPayload)
//         );
//         return { success: true };
//     } catch (error) {
//         // Check if the error is a 410 Gone error
//         if (error.statusCode === 410) {
//             console.error('The subscription endpoint is no longer valid (410 Gone). Please ask the user to re-subscribe.');
//             // Handle re-subscription logic, for example, notify the client to re-subscribe
//             return { success: false, error: 'Subscription expired, please re-subscribe' };
//         }

//         console.error('Error sending push notification:', error);
//         return { success: false, error: 'Failed to send notification' };
//     }
// }



export async function sendNotification(title, message, link, users) {

    // Retrieve all subscriptions from the database
    let subscriptions = [];

    if (users) {
        subscriptions = users;
    } else {
        subscriptions = await prisma.subscription.findMany();
    }

    if (!subscriptions || subscriptions.length === 0) {
        throw new Error('No subscriptions available');
    }

    const notificationPayload = {
        title: title || 'Test Notification',
        body: message || 'Default notification message',
        icon: '/icon.png',
        url: link || process.env.NEXT_PUBLIC_SITE_URL,
    };

    const results = [];
    // Loop through each subscription and send a notification
    for (const subscription of subscriptions) {
        try {
            const res = await webpush.sendNotification(
                {
                    endpoint: subscription.endpoint,
                    keys: {
                        p256dh: subscription.keys_p256dh,
                        auth: subscription.keys_auth,
                    },
                },
                JSON.stringify(notificationPayload)
            );

            // Track success for each notification
            results.push({ endpoint: subscription.endpoint, res, success: true });
        } catch (error) {
            // Check if the error is a 410 Gone error
            if (error.statusCode === 410) {
                console.error(`The subscription endpoint ${subscription.endpoint} is no longer valid (410 Gone). Please ask the user to re-subscribe.`);
                // Handle re-subscription logic, for example, notify the client to re-subscribe
                results.push({
                    endpoint: subscription.endpoint,
                    success: false,
                    error: 'Subscription expired, please re-subscribe',
                });
            } else {
                console.error('Error sending push notification:', error);
                results.push({
                    endpoint: subscription.endpoint,
                    success: false,
                    error: 'Failed to send notification',
                });
            }
        }
    }

    // Return results for all notifications
    return { success: true, results };
}

