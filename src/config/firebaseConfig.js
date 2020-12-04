import firebase from "firebase/app";
import "firebase/messaging";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQwL8NpHB7TvO13yzm9CY2mi-mzDHtiJg",
  authDomain: "bahramasefirebase.firebaseapp.com",
  databaseURL: "https://bahramasefirebase.firebaseio.com",
  projectId: "bahramasefirebase",
  storageBucket: "bahramasefirebase.appspot.com",
  messagingSenderId: "930171359490",
  appId: "1:930171359490:web:3d807136c314540edaf21b",
  measurementId: "G-KDC8XHQJC5",
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
const firestore = firebase.firestore();
const auth = firebase.auth();

const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then(firebaseToken => {
        resolve(firebaseToken);
      })
      .catch(err => {
        reject(err);
      });
  });

const onMessageListener = () =>
  new Promise(resolve => {
    messaging.onMessage(function (payload) {
      resolve(payload);
    });
  });

export {
  requestFirebaseNotificationPermission,
  onMessageListener,
  firestore,
  auth,
};
