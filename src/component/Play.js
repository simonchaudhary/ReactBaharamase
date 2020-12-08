import React, { useState, useEffect } from "react";
import axios from "axios";

import { firestore } from "../config/firebaseConfig";
import { Button } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";

import "../css/play.css";
import "../css/text.css";

function Play({ uid }) {
  console.log("Play page ", uid);
  const [currentPlayer, setCurrentPlayer] = useState("11");
  const [users, setUsers] = useState([]);
  const [noofPlayers, setNoOfPlayers] = useState(2);

  const getSessionUsers = uid => {
    firestore
      .collection("reactApp")
      .doc(uid)
      .onSnapshot(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data().currentUser);
          console.log("User : ", doc.data().users);
          setCurrentPlayer(doc.data().currentUser);
          setUsers(doc.data().users);
        } else {
          console.log("no document exist");
        }
      });
  };

  useEffect(() => {
    console.log("Play UseEffect");
    getSessionUsers(uid);
  }, [uid]);

  const turn = async () => {
    const result = await axios.put(
      "https://us-central1-bahramasefirebase.cloudfunctions.net/session/currentUser/xfzHyVuw31fLjYanGwNbKkuZiwP2"
    );
    console.log(result);
    return result;
  };

  const test = () => {
    alert("test");
  };

  return (
    <div>
      <div className="play_container">
        <div className="play_header">
          <div className="play_header_left">
            <BiArrowBack />
          </div>
          <div className="play_header_center">
            <h3>Your Turn</h3>
          </div>
          <div className="play_header_right">
            <div className="play_header_right_balance">
              <p className="text_bold">Balance</p>
              <p className="text_medium">$ 120</p>
            </div>
          </div>
        </div>
        <div className="play_body"></div>
        <div className="play_footer">
          <button class="game-button red" onClick={() => test()}>
            End Betting
          </button>
        </div>
      </div>
    </div>
  );
}

export default Play;

{
  /*
<div className="play_table_border">
            <div className="play_table">
              <div className="user_card_1">
                <p>1</p>
              </div>
              <div className="user_card_2">
                <p>2</p>
              </div>
              <div className="user_card_3">
                <p>3</p>
              </div>
              <div className="user_card_4">
                <p>4</p>
              </div>
              <div className="user_card_5">
                <p>5</p>
              </div>
              <div className="user_card_6">
                <p>6</p>
              </div>
              <div className="user_card_7">
                <p>7</p>
              </div>
              <div className="user_card_8">
                <p>8</p>
              </div>
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
                    <p></p>
                  )}
                </div>
              ))} 
            </div>
          </div>*/
}
