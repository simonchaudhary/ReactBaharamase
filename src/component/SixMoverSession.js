import React from "react";
import axios from "axios";

import { firestore } from "../config/firebaseConfig";

import "../css/sixmoversession.css";

function SixMoverSession() {
  const check = () => {
    firestore.collection("switcher").doc("sixmover").update({
      sessionorplay: true,
    });
  };

  const newsession = async () => {
    alert("new session");
    const data = {
      players: ["simon", "simon1"],
    };
    const result = await axios.post(
      "https://us-central1-bahramasefirebase.cloudfunctions.net/sixMoveGame/" +
        "sessionid",
      data
    );
    console.log(result);
  };

  return (
    <div className="sixMover_session_container">
      <div className="sixMover_session_body"></div>
      <div className="sixMover_session_footer">
        <button onClick={() => check()}>ok</button>
        <button onClick={() => newsession()}>New Session</button>
      </div>
    </div>
  );
}

export default SixMoverSession;
