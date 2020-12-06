import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Registration from "./component/Registration";
import Sessions from "./component/Sessions";
import FirestoreMessage from "./component/FirestoreMessage";
import Play from "./component/Play";

import {
  requestFirebaseNotificationPermission,
  auth,
  firestore,
} from "./config/firebaseConfig";

function App() {
  const [email, setEmail] = useState();
  const [uid, setUid] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    isUserLogin();
    getToken();
  }, []);

  function isUserLogin() {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        setUid(user.uid);
        setEmail(user.email);
      } else {
        console.log("register logged out");
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

  if (uid === "" || uid === undefined) {
    return <Registration />;
  } else {
    return (
      <Router>
        <div>
          <Sessions uid={uid} email={email} token={token} />
          <FirestoreMessage uid={uid} token={token} />
          <Play uid={uid} />
        </div>
      </Router>
    );
  }
}

export default App;
