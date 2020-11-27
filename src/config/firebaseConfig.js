import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'

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
    //     // firebase.firestore().settings({ timestampsInSnapshots: true });
    // const firestore = firebase.firestore()

export default firebase