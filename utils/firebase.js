import "firebase/messaging";
import firebase from "firebase/app";
import localforage from "localforage";

const firebaseCloudMessaging = {
    init: async () =>{
        if (!firebase?.apps?.length){
            firebase?.initializeApp({
                apiKey: "AIzaSyD4WIV_ke-vQMk_ImId0UIZpW6pbN2OrKQ",
                authDomain: "internal-crm-portal.firebaseapp.com",
                projectId: "internal-crm-portal",
                storageBucket: "internal-crm-portal.appspot.com",
                messagingSenderId: "128973785957",
                appId: "1:128973785957:web:399218b6dc8cea2068af8c"
            });
            try{
                const messaging = firebase.messaging();
                const tokenInLocalForage = await localforage.getItem("fcm_token");
                
                // Return the token if it is alredy in our local storage
                if (tokenInLocalForage !== null) {
                    return tokenInLocalForage;
                }
                // Request the push notification permission from browser
                const status = await Notification.requestPermission();
                if (status && status === "granted"){
                    // Get new token from Firebase
                    const fcm_token = await messaging.getToken({
                        vapidKey: "BP5T3rx0Bww0NfMbvWhA0JhITCU2z10ZtVcW-TZ9TKBuetJYQfkqmtzt1zl4UH1F-y0sFKOwRH7AwjIjTJoxgc8",
                    });
                    console.log(fcm_token)

                    // Set token in our local storage
                    if (fcm_token) {
                        localforage.setItem("fcm_token", fcm_token);
                        return fcm_token;
                    }
                }
            }
            catch(error){
                console.error(error);
            }
        }
    }
}
export { firebaseCloudMessaging };


// import { initializeApp } from 'firebase/app';
// import { getMessaging , getToken } from "firebase/messaging";

// const firebaseConfig = {
//     apiKey: "AIzaSyD4WIV_ke-vQMk_ImId0UIZpW6pbN2OrKQ",
//     authDomain: "internal-crm-portal.firebaseapp.com",
//     projectId: "internal-crm-portal",
//     storageBucket: "internal-crm-portal.appspot.com",
//     messagingSenderId: "128973785957",
//     appId: "1:128973785957:web:399218b6dc8cea2068af8c"
// };

// // Initialize Firebase
// if(!firebase.apps.length){
//     firebase.initializeApp({});
// }
// // const firebaseApp = initializeApp(firebaseConfig);
// const messaging =  getMessaging(firebase);

// export const fetchToken = (setTokenFound) => {
//     return getToken(messaging, {vapidKey: "BP5T3rx0Bww0NfMbvWhA0JhITCU2z10ZtVcW-TZ9TKBuetJYQfkqmtzt1zl4UH1F-y0sFKOwRH7AwjIjTJoxgc8"}).then((currentToken) => {
//         if (currentToken) {
//             console.log('current token for client: ', currentToken);
//             setTokenFound(true);
//             // Track the token -> client mapping, by sending to backend server
//             // show on the UI that permission is secured
//         } else {
//             console.log('No registration token available. Request permission to generate one.');
//             setTokenFound(false);
//             // shows on the UI that permission is required
//         }
//     }).catch((err) => {
//         console.log('An error occurred while retrieving token. ', err);
//         // catch error while creating client token
//     });
// }

// // Add the public key generated from the console here.
// // function requestPermission() {
// //     console.log("Requesting permission...");
// //     Notification.requestPermission().then((permission) => {
// //       if (permission === "granted") {
// //         console.log("Notification permission granted.");
// //         const app = initializeApp(firebaseConfig);
  
// //         const messaging = getMessaging(app);
// //         getToken(messaging, {
// //           vapidKey:
// //             "BP5T3rx0Bww0NfMbvWhA0JhITCU2z10ZtVcW-TZ9TKBuetJYQfkqmtzt1zl4UH1F-y0sFKOwRH7AwjIjTJoxgc8",
// //         }).then((currentToken) => {
// //           if (currentToken) {
// //             console.log("currentToken: ", currentToken);
// //           } else {
// //             console.log("Can not get token");
// //           }
// //         });
// //       } else {
// //         console.log("Do not have permission!");
// //       }
// //     });
// // }
  
// // export default requestPermission;

// // getToken(messaging, {vapidKey: "BP5T3rx0Bww0NfMbvWhA0JhITCU2z10ZtVcW-TZ9TKBuetJYQfkqmtzt1zl4UH1F-y0sFKOwRH7AwjIjTJoxgc8"})
 

// // export async function getFCMToken() {
// //     try {
// //         // Don't forget to paste your VAPID key here
// // 		// (you can find it in the Console too)
// //         const token = await getToken(messaging, { vapidKey: 'BCrYPcBpCHvHqf83bA1Ay0K47WoHJX5y-IM-iQSRjhsOMhP41IRUo3ci8WrjTxhoIJsbLoOWcUqClbZYG2-kKho' });
// //         console.log("token")
// //         return token;
// //     } catch (e) {
// //         console.log('getFCMToken error', e);
// //         return undefined
// //     }
// // }
