import firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
     // Project Settings => Add Firebase to your web app
     messagingSenderId: "930171359490",
});
const messaging = initializedFirebaseApp.messaging();
export { messaging };