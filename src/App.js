import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Registration from "./component/Registration";
import Sessions from "./component/Sessions";
import LoadingFull from "./component/LoadingFull";

import {
  requestFirebaseNotificationPermission,
  auth,
  firestore,
} from "./config/firebaseConfig";

function App() {
  const [email, setEmail] = useState();
  const [uid, setUid] = useState();
  const [token, setToken] = useState();

  // new way
  const [user, setUser] = useState();

  useEffect(() => {
    isUserLogin();
    getToken();
  }, []);

  function isUserLogin() {
    setUser("null");
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        setUid(user.uid);
        setEmail(user.email);
        setUser("session");
      } else {
        console.log("register logged out");
        setUser("register");
      }
    });
  }

  function getToken() {
    requestFirebaseNotificationPermission()
      .then(firebaseToken => {
        setToken(firebaseToken);
        console.log("from state " + { token });
      })
      .catch(err => {
        return err;
      });
  }
  // return <LoadingFull />;
  if (user === "null") {
    return <LoadingFull />;
  } else if (user === "register") {
    return (
      <div>
        <Registration />;
      </div>
    );
  } else if (user === "session") {
    return (
      <div>
        <Sessions uid={uid} email={email} token={token} />
      </div>
    );
  } else {
    return <LoadingFull />;
  }
}

export default App;
