import React, { useState, useEffect } from "react";

// Components
import Registration from "./component/Registration";
import Sessions from "./component/Sessions";
import LoadingFull from "./component/LoadingFull";
import Switcher from "./component/SixMover/Switcher";
import Home from "./component/Home";

import {
  requestFirebaseNotificationPermission,
  auth,
  firestore,
} from "./config/firebaseConfig";

import { useStateValue } from "./States/StateProvider";
import { actionTypes } from "./States/reducer";

function App() {
  const [email, setEmail] = useState();
  const [uid, setUid] = useState();
  const [token, setToken] = useState();

  // new way
  const [user, setUser] = useState();

  // StateProvider
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    getToken();
    isUserLogin();
  }, [token]);

  function isUserLogin() {
    setUser("null");
    auth.onAuthStateChanged(user => {
      if (user) {
        // Save bool to check session or play
        firestore
          .collection("switcher")
          .doc("sixmover")
          .collection(user.uid)
          .doc(user.uid)
          .set({
            sessionorplay: false,
          })
          .then(cred => {
            console.log("save to firebase");
          })
          .catch(err => {
            console.log("firestore errorss " + err);
          });

        console.log("user found", token);
        dispatch({
          type: actionTypes.SET_USER,
          user: user,
        });
        setUid(user.uid);
        setEmail(user.email);
        setUser("home");
      } else {
        console.log("register logged out");
        setUser("register");
      }
    });
  }

  const getToken = async () => {
    let result = await requestFirebaseNotificationPermission();
    console.log("Token : ", result);
    setToken(result);
  };

  if (user === "null") {
    return <LoadingFull />;
  } else if (user === "register") {
    return <Registration token={token} />;
  } else if (user === "home") {
    return (
      // <Switcher />
      <div>
        <Sessions uid={uid} email={email} token={token} />
      </div>
      // <Home uid={uid} email={email} token={token} />
    );
  } else {
    return <LoadingFull />;
  }
}

export default App;
