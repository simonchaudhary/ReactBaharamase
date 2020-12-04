importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js");
importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-analytics.js");

const config = {
  apiKey: "AIzaSyDQwL8NpHB7TvO13yzm9CY2mi-mzDHtiJg",
  authDomain: "bahramasefirebase.firebaseapp.com",
  databaseURL: "https://bahramasefirebase.firebaseio.com",
  projectId: "bahramasefirebase",
  storageBucket: "bahramasefirebase.appspot.com",
  messagingSenderId: "930171359490",
  appId: "1:930171359490:web:3d807136c314540edaf21b",
  measurementId: "G-KDC8XHQJC5",
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "/firebase-logo.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

// messaging.setBackgroundMessageHandler(function(payload) {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);

//     const notificationTitle = payload.data.title;
//     const notificationOptions = {
//         body: payload.data.body,
//         icon: '/firebase-logo.png'
//     };

//     return self.registration.showNotification(notificationTitle,
//         notificationOptions);
// });

self.addEventListener("notificationclick", event => {
  console.log(event);
  return event;
});
