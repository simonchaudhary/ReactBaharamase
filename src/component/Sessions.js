import React, { useState, useEffect } from "react";
import {
  requestFirebaseNotificationPermission,
  auth,
  firestore,
} from "../config/firebaseConfig";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import FirestoreMessage from "./FirestoreMessage";
import RejectNotification from "./RejectNotification";
import Play from "./Play";

import "../css/style.css";
import "../css/sessions.css";

function Sessions({ uid, email, token }) {
  const [sessions, setSessions] = useState([]);
  const [sessionorplay, setSessionOrPlay] = useState(true);

  // when click join button then session owner is
  const [sessionOwner, setSessionOwner] = useState();
  const [sessionID, setSessionID] = useState();

  useEffect(() => {
    checkUserInSession(uid);
  }, [uid]);

  useEffect(() => {
    // get session
    // async function getSession() {
    //   const result = await axios.get(
    //     "https://us-central1-bahramasefirebase.cloudfunctions.net/session/buw5XyrBAKSk0X2swNxr48tA2O03%27s"
    //   );
    //   console.log("get session");
    //   console.log(result.data);
    //   // setSessions(result.data.data);
    //   return result;
    // }
    // getSession();

    console.log("useeffect get session");
    firestore.collection("sessions").onSnapshot(snapshot => {
      const tempDoc = snapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });
      console.log(tempDoc);
      setSessions(tempDoc);
    });
  }, [uid]);

  const checkUserInSession = uid => {
    firestore
      .collection("enter")
      .doc(uid)
      .onSnapshot(function (doc) {
        if (doc.exists) {
          console.log("check user uid", uid);
          console.log("check user player id", doc.data().playerUid);

          if (uid === doc.data().playerUid) {
            setSessionID(doc.data().sessionOwner);
            setSessionOrPlay(false);
          } else {
            console.log("You didnot click button");
          }
        } else {
          console.log("nothing here");
        }
      });
  };

  function createSession() {
    async function createSes() {
      const data = {
        owner: uid,
        gameType: "3cp",
        session: uid,
        ownerDeviceToken: token,
        users: ["BOT", uid],
        cardsInPlay: "initVal",
        currentUser: uid,
        blindWager: 0,
        seenWager: 0,
        winner: null,
        showOK: false,
        otherPlayersTokens: null,
        showAlert: false,
        dealHands: true,
        totalBetAmount: 0,
        playType: "playType",
      };
      const result = await axios.post(
        "https://us-central1-bahramasefirebase.cloudfunctions.net/session/" +
          uid,
        data
      );
      console.log(result);
    }
    createSes();
    setSessionID(uid);
    setSessionOrPlay(false);
  }

  const join = (owner, ownerDeviceToken, uid) => {
    // set join press session owner id
    setSessionOwner(owner);
    const name = email;
    const message = name + " Wants to join";
    firestore.collection("notification").doc("ss").set({
      playerJoinUid: uid,
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
    <div>
      {sessionorplay ? (
        <div className="sessionPage">
          <h2>Session</h2>
          <Button onClick={logout}> Logout </Button>
          <div className="col">
            {sessions.map(session => (
              <div className="content">
                <div className="join">
                  {uid === session.owner ? (
                    <p>Not Join</p>
                  ) : (
                    <button
                      onClick={() =>
                        join(session.owner, session.ownerDeviceToken, uid)
                      }
                      className="title"
                    >
                      Join
                    </button>
                  )}
                </div>
                <div className="box">
                  <p className="detail"> {session.owner} </p>
                  <p className="detail">{session.session}</p>
                </div>
              </div>
            ))}
            <button onClick={createSession}> New Session </button>
          </div>
          <RejectNotification uid={uid} />
        </div>
      ) : (
        <div>
          <Play sessionID={sessionID} uid={uid} />
          <FirestoreMessage uid={uid} token={token} />
        </div>
      )}
    </div>
  );
}

export default Sessions;
