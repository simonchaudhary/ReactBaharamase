import React from "react";
import { firestore } from "../../config/firebaseConfig";
import { useStateValue } from "../../States/StateProvider";
import { BiArrowBack } from "react-icons/bi";

import NotificationModal from "./NotificationModal";

import "../../css/sixmover.css";
import "../../css/text.css";
import "../../css/button.css";

function SixMover() {
  const [{ user }, dispatch] = useStateValue();
  const check = () => {
    firestore.collection("switcher").doc("sixmover").update({
      sessionorplay: false,
    });
  };
  return (
    <div>
      <NotificationModal uid={user.uid} />
      <p>{user.uid}</p>
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
