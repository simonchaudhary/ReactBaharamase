/* eslint-disable no-undef */

// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js');
importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-analytics.js")

// eslint-disable-next-line no-undef
firebase.default.initializeApp({
    apiKey: "AIzaSyDQwL8NpHB7TvO13yzm9CY2mi-mzDHtiJg",
    authDomain: "bahramasefirebase.firebaseapp.com",
    databaseURL: "https://bahramasefirebase.firebaseio.com",
    projectId: "bahramasefirebase",
    storageBucket: "bahramasefirebase.appspot.com",
    messagingSenderId: "930171359490",
    appId: "1:930171359490:web:3d807136c314540edaf21b",
    measurementId: "G-KDC8XHQJC5"
})



const initMessaging= firebase.messaging()