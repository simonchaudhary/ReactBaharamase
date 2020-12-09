import React, { useState, useEffect } from "react";
import { firestore, auth } from "../config/firebaseConfig";
import { Button } from "react-bootstrap";
import axios from "axios";

import Modal from "react-modal";
import "../css/modalstyle.css";

Modal.setAppElement("#root");

function RejectNotification({ uid }) {
  console.log("RejectNotification ");
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState({
    title: "def title",
    description: "def description",
  });

  const modalAccept = async () => {
    deleteRejectNotification();
    setIsOpen(!isOpen);
  };

  const showRejectNotification = uid => {
    firestore
      .collection("notification")
      .doc("reject")
      .onSnapshot(function (doc) {
        if (doc.exists) {
          setIsOpen(!isOpen);

          if (uid === doc.data().sessionOwner.playerUid) {
            setState(prevState => {
              return {
                title: doc.data().sessionOwner + " Reject your Request",
                description: prevState.description,
              };
            });
          } else {
            console.log("sorry uid not same ");
          }
        } else {
          console.log("docn not exists reject notification");
        }
      });
  };

  const deleteRejectNotification = () => {
    firestore
      .collection("notification")
      .doc("reject")
      .delete()
      .then(function () {
        console.log("document has been deleted");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  const title = state.title;
  const description = state.description;

  useEffect(() => {
    showRejectNotification(uid);
  }, [uid]);

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
        <h2>{title}</h2>
        <div className="row">
          <Button onClick={modalAccept}>Ok</Button>
        </div>
      </Modal>
    </div>
  );
}

export default RejectNotification;
