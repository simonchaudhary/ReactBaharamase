import React, { useState, useEffect } from "react";
import { firestore, auth } from "../config/firebaseConfig";
import { Button } from "react-bootstrap";
import axios from "axios";

import Modal from "react-modal";
import "../css/modalstyle.css";
import "../css/text.css";
import "../css/button.css";
import "../css/style.css";

Modal.setAppElement("#root");

function DialogBox({ sessionID }) {
  console.log("DialogBox ", sessionID);
  const [isOpen, setIsOpen] = useState(true);

  const modalAccept = async () => {
    setIsOpen(!isOpen);
  };

  function modalCancel() {
    deleteSession();
    setIsOpen(!isOpen);
  }

  const deleteSession = () => {
    firestore
      .collection("sessions")
      .doc(sessionID)
      .delete()
      .then(function () {
        console.log("document has been deleted");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={modalAccept}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={1}
      >
        <p className="title">Play Again</p>
        <div className="row">
          <Button className="game-button red" onClick={modalCancel}>
            No
          </Button>
          <div className="horizontal_space"></div>
          <Button className="game-button" onClick={modalAccept}>
            Yes
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default DialogBox;
