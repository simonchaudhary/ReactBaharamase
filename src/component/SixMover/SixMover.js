import React from "react";
import { firestore } from "../../config/firebaseConfig";
import { useStateValue } from "../../States/StateProvider";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";

import NotificationModal from "./NotificationModal";

import "../../css/sixmover.css";
import "../../css/text.css";
import "../../css/button.css";

function SixMover() {
  const [{ user }, dispatch] = useStateValue();
  const check = () => {
    firestore
      .collection("switcher")
      .doc("sixmover")
      .collection(user.uid)
      .doc(user.uid)
      .update({
        sessionorplay: false,
      });
  };

  const deal = async () => {
    alert("deal");
    const data = {
      sessionID: user.uid,
      players: ["player1", "player2", "player3", "player4", "player5"],
    };
    const result = await axios.post(
      "https://us-central1-bahramasefirebase.cloudfunctions.net/sixMove/deal-hands",
      data
    );
    console.log(result);
  };
  return (
    <div>
      <NotificationModal uid={user.uid} />
      <div className="sixmover_container">
        <div className="sixmover_header">
          <div className="sixmover_header_left">
            <BiArrowBack />
          </div>
          <div className="sixmover_header_center">
            <h3>hello</h3>
          </div>
          <div className="sixmover_header_right">
            <div className="sixmover_header_right_balance">
              <p className="text_bold">Balance</p>
              <p className="text_medium">$ 120</p>
            </div>
          </div>
        </div>
        <div className="sixmover_body">
          <button className="deal_button" onClick={() => deal()}>
            Deal
          </button>
          <div className="sixmover_table_border">
            <div className="sixmover_table"></div>
          </div>
        </div>

        <div className="sixmover_footer">
          <button className="game-button" onClick={() => check()}>
            End Betting
          </button>
        </div>
      </div>
    </div>
  );
}

export default SixMover;
