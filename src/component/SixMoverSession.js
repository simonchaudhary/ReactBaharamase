import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth, firestore } from "../config/firebaseConfig";
import { useStateValue } from "../States/StateProvider";
import "../css/sixmoversession.css";

function SixMoverSession() {
  const [{ user }, dispatch] = useStateValue();
  const [sixMoverSessionList, setSixMoverSessionList] = useState([]);

  useEffect(() => {
    firestore.collection("sixMoveGame").onSnapshot(snapshot => {
      const tempDoc = snapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });
      console.log(tempDoc);
      setSixMoverSessionList(tempDoc);
    });
  }, []);

  const check = () => {
    firestore
      .collection("switcher")
      .doc("sixmover")
      .collection("uid")
      .doc("uid")
      .update({
        sessionorplay: true,
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

  const newsession = async () => {
    const data = {
      players: ["simon"],
    };
    const result = await axios.post(
      "https://us-central1-bahramasefirebase.cloudfunctions.net/sixMoveGame/" +
        user.uid,
      data
    );
    console.log(result);
    firestore
      .collection("switcher")
      .doc("sixmover")
      .collection(user.uid)
      .doc(user.uid)
      .update({
        sessionorplay: true,
      });
  };

  const join = sessionId => {
    alert(sessionId);
    const message = user.email + " Wants to join";
    firestore.collection("notification").doc("sixmover").set({
      playerJoinUid: user.uid,
      sessionOwner: sessionId,
      title: message,
      description: "To Play Game",
    });
  };

  return (
    <div className="sixMover_session_container">
      <div className="sixMover_session_body">
        <h3>{user.email}</h3>
        {sixMoverSessionList.map(sixMoverSession => (
          <div className="session_list_container">
            {user.uid === sixMoverSession.id ? (
              <p>Not Join</p>
            ) : (
              <button
                onClick={() => join(sixMoverSession.id)}
                className="title"
              >
                Join
              </button>
            )}
            <p>{sixMoverSession.id}</p>
          </div>
        ))}
      </div>
      <div className="sixMover_session_footer">
        <button onClick={() => check()}>ok</button>
        <button onClick={() => newsession()}>New Session</button>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  );
}

export default SixMoverSession;