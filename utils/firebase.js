import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyD4WIV_ke-vQMk_ImId0UIZpW6pbN2OrKQ",
    authDomain: "internal-crm-portal.firebaseapp.com",
    projectId: "internal-crm-portal",
    storageBucket: "internal-crm-portal.appspot.com",
    messagingSenderId: "128973785957",
    appId: "1:128973785957:web:399218b6dc8cea2068af8c"
};

export const app = initializeApp(firebaseConfig);
const messaging = getMessaging();

export async function getFCMToken() {
    try {
        // Don't forget to paste your VAPID key here
		// (you can find it in the Console too)
        const token = await getToken(messaging, { vapidKey: 'BCrYPcBpCHvHqf83bA1Ay0K47WoHJX5y-IM-iQSRjhsOMhP41IRUo3ci8WrjTxhoIJsbLoOWcUqClbZYG2-kKho' });
        return token;
    } catch (e) {
        console.log('getFCMToken error', e);
        return undefined
    }
}
