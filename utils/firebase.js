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
                        vapidKey: "BFxbqQ9QWAP_ikSc6dTipgs0Yh22FoQKEi6R36OhjI-sgMzEE-5sgPG1vhF_G9y63Qika00LA0nfDBfL0-ykFXs",
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

export const onMessageListener = () =>
  new Promise((resolve) => {
    const messaging = firebase.messaging();
    messaging.onMessage((payload) => {
      resolve(payload);
    });
});

export { firebaseCloudMessaging };

