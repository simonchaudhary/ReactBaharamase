importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js')

const firebaseConfig = {
    apiKey: "AIzaSyDQwL8NpHB7TvO13yzm9CY2mi-mzDHtiJg",
    authDomain: "bahramasefirebase.firebaseapp.com",
    databaseURL: "https://bahramasefirebase.firebaseio.com",
    projectId: "bahramasefirebase",
    storageBucket: "bahramasefirebase.appspot.com",
    messagingSenderId: "930171359490",
    appId: "1:930171359490:web:3d807136c314540edaf21b",
    measurementId: "G-KDC8XHQJC5"
};
firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()



// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('../firebase-messaging-sw.js')
//         .then(function(registration) {
//             console.log("Registration successful, scope is:", registration.scope);
//         }).catch(function(error) {
//             console.log('Service worker registration failed , error : ', error)
//         });
// }

// firebase.initializeApp({
//     messagingSenderId: "930171359490"
// })

// const initMessaging = firebase.messaging()