import React, { useState, useEffect } from "react";
import { firestore, auth } from "../../config/firebaseConfig";
import { Button } from "react-bootstrap";
import axios from "axios";

import Modal from "react-modal";
import "../../css/modalstyle.css";
import "../../css/text.css";
import "../../css/button.css";
import "../../css/style.css";

Modal.setAppElement("#root");

function NotificationModal({ uid }) {
  console.log("NotificationModal ", uid);
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState({
    title: "def title",
    description: "def description",
  });
  const [sessionOwner, setSessionOwner] = useState();
  const [playerJoinUid, setPlayerJoinUid] = useState();

  const modalAccept = async () => {
    deleteNotification();
    setIsOpen(!isOpen);
    // USER ADDED TO SESSIOIN ON ACCEPT

    // console.log(
    //   "playerjoion uid",
    //   playerJoinUid,
    //   "session owner",
    //   sessionOwner
    // );
    // const data = {
    //   uID: playerJoinUid,
    // };
    // const result = await axios.put(
    //   "https://us-central1-bahramasefirebase.cloudfunctions.net/session/add-user/" +
    //     sessionOwner,
    //   data
    // );
    // console.log(result);

    firestore
      .collection("switcher")
      .doc("sixmover")
      .collection(playerJoinUid)
      .doc(playerJoinUid)
      .update({
        sessionorplay: true,
      });
  };

  function modalCancel() {
    deleteNotification();
    setIsOpen(!isOpen);
    firestore.collection("notification").doc("reject").set({
      playerUid: playerJoinUid,
      sessionOwner: sessionOwner,
      reject: true,
    });
  }

  const deleteNotification = () => {
    firestore
      .collection("notification")
      .doc("sixmover")
      .delete()
      .then(function () {
        console.log("document has been deleted");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  const showNotification = uid => {
    console.log("show notification uid " + uid);
    firestore
      .collection("notification")
      .doc("sixmover")
      .onSnapshot(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data().title);
          console.log("player join uid :", doc.data().playerJoinUid);
          setPlayerJoinUid(doc.data().playerJoinUid);
          const owner = doc.data().sessionOwner;
          setSessionOwner(doc.data().sessionOwner);
          console.log("owner " + owner);
          console.log("uid " + uid);
          if (owner === uid) {
            setIsOpen(!isOpen);
            setState(prevState => {
              return {
                title: doc.data().title,
                description: doc.data().description,
              };
            });
          } else {
            console.log("You are not owner to show message");
          }
        } else {
          setState(prevState => {
            return {
              title: prevState.title,
              description: prevState.description,
            };
          });
        }
      });
  };

  const title = state.title;
  const description = state.description;

  useEffect(() => {
    showNotification(uid);
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
        <p className="title">{title}</p>
        <div className="row">
          <Button className="game-button red" onClick={modalCancel}>
            Cancel
          </Button>
          <div className="horizontal_space"></div>
          <Button className="game-button" onClick={modalAccept}>
            Accept
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default NotificationModal;
