import React, { useState, useEffect } from "react";
import {
  requestFirebaseNotificationPermission,
  auth,
  firestore,
} from "../config/firebaseConfig";
import axios from "axios";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";

import "../css/style.css";
import "../css/test.css";

function Sessions({ uid, email, token }) {
  const [sessions, setSessions] = useState([]);
  // const [uid, setUid] = useState(0);

  useEffect(() => {
    async function getSession() {
      const result = await axios.get(
        "https://us-central1-bahramasefirebase.cloudfunctions.net/session"
      );
      console.log(result.data.data);
      setSessions(result.data.data);
      return result;
    }
    getSession();
  }, []);

  function createSession() {
    alert("create");

    async function createSes() {
      const data = {
        owner: uid,
        session: uid,
        ownerDeviceToken: token,
        users: [
          "BOT",
          "erLuS3X5J7fojlmKwAsYCT46UHj1",
          "cGd0Gz9dYHYfG7ZDNahNYidxCSm1",
        ],
        currentUser: "cGd0Gz9dYHYfG7ZDNahNYidxCSm1",
      };
      const result = await axios.post(
        "https://us-central1-bahramasefirebase.cloudfunctions.net/session/" +
          uid,
        data
      );
      console.log(result);
    }
    createSes();
  }

  // function join(currentUser, ownerDeviceToken) {
  //   alert(`current user, ${currentUser}, ${ownerDeviceToken}`);
  // }

  function gettoken() {
    alert("token");
    requestFirebaseNotificationPermission()
      .then(firebaseToken => {
        console.log(firebaseToken);
      })
      .catch(err => {
        return err;
      });
  }

  const join = (owner, ownerDeviceToken) => {
    alert("join owner " + owner + "woner token " + ownerDeviceToken);
    const name = email;
    const message = name + " Wants to join";
    firestore.collection("notification").doc("ss").set({
      owner: owner,
      title: message,
      description: "To Play Game",
    });

    const data = {
      to: ownerDeviceToken,
      collapse_key: "type_a",
      notification: {
        body: "To Play Games",
        title: message,
      },
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "key=AAAA2JKIkQI:APA91bH0DbfARqpeh6zkEWEwpiKqyVo255lzHxD8qRP3C_vrY4S6oajVuT-uohbfvYo-bIoNqQcVUt11UAabnYgJLy2a6owm2_pA2x71fGQjkFw4aWuZ2tHwcIVmRcbIRWcsX9IMz4Ms",
    };

    axios
      .post("https://fcm.googleapis.com/fcm/send", data, {
        headers: headers,
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Logout
  function logout() {
    auth
      .signOut()
      .then(cred => {
        console.log("Logout successful");
      })
      .catch(error => {
        console.log("error logout " + error);
      });
  }

  return (
    <div className="sessionPage">
      <h2>Session</h2>
      <Button onClick={logout}> Logout </Button>
      {/* <Container className="center-column">
        <Row>
          <Button onClick={() => join()}>Join</Button>
          <h5>simon session</h5>
        </Row>
      </Container> */}

      <div className="col">
        {sessions.map(session => (
          <div className="content">
            <div className="join">
              <button
                onClick={() => join(session.owner, session.ownerDeviceToken)}
                className="title"
              >
                Join
              </button>
            </div>
            <div className="box">
              <p className="detail"> {session.owner} </p>
              <p className="detail">{session.session}</p>
            </div>
          </div>
        ))}
        <button onClick={createSession}> New Session </button>
        <button onClick={gettoken}> gettoken </button>
      </div>
    </div>
  );
}

export default Sessions;
