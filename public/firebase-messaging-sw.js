importScripts("https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.11.0/firebase-messaging.js");

firebase.initializeApp({
  messagingSenderId: "128973785957"
});
  
const messaging = firebase.messaging();