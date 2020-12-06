import React, { useState, useEffect } from "react";
import axios from "axios";

import { firestore } from "../config/firebaseConfig";
import { Button } from "react-bootstrap";

import "../css/play.css";

function Play({ uid }) {
  console.log("Play page " + uid);
  const [currentPlayer, setCurrentPlayer] = useState("11");
  const [users, setUsers] = useState([]);

  const getSessionUsers = uid => {
    firestore
      .collection("reactApp")
      .doc("Voc5C7siRwQlPBpjy36rZROzT4f1")
      .onSnapshot(function (doc) {
        console.log("Document data:", doc.data().currentUser);
        console.log("User : ", doc.data().users);
        setCurrentPlayer(doc.data().currentUser);
        setUsers(doc.data().users);
      });
  };

  useEffect(() => {
    console.log("Play UseEffect");
    getSessionUsers(uid);
  }, [uid]);

  const turn = async () => {
    const result = await axios.put(
      "https://us-central1-bahramasefirebase.cloudfunctions.net/session/currentUser/Voc5C7siRwQlPBpjy36rZROzT4f1"
    );
    console.log(result);
    return result;
  };

  return (
    <div>
      <div className="play_container">
        <h5>Current Player {currentPlayer}</h5>
        <h5>Uid {uid}</h5>
        {currentPlayer === uid ? <p>yes</p> : <p>no</p>}
        <div className="play_table">
          {users.map((user, index) => (
            <div className="user_card">
              <p className="user_name">{user}</p>
              {user === uid ? (
                [
                  currentPlayer === user ? (
                    <Button onClick={() => turn()}> Turn</Button>
                  ) : (
                    <p>not my turn</p>
                  ),
                ]
              ) : (
                <p>not u</p>
              )}
              {/* {currentPlayer === user ? (
                <Button onClick={() => turn()}> Turn</Button>
              ) : (
                <p>Not Your Turn</p>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Play;
