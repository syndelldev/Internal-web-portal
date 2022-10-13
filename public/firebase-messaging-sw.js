importScripts("https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.3/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyD4WIV_ke-vQMk_ImId0UIZpW6pbN2OrKQ",
  authDomain: "internal-crm-portal.firebaseapp.com",
  projectId: "internal-crm-portal",
  storageBucket: "internal-crm-portal.appspot.com",
  messagingSenderId: "128973785957",
  appId: "1:128973785957:web:399218b6dc8cea2068af8c"
});

const messaging = firebase.messaging();

//background notifications will be received here
// firebase.messaging().setBackgroundMessageHandler((payload)=>{
//   const { title, body } = JSON.parse(payload.data.notification);
//   var options = {
//     body,
//   };
//   registration.showNotification(title, options);
// })