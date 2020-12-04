import React, { useState, useEffect } from "react";
import { firestore, auth } from "../config/firebaseConfig";
import { Button } from "react-bootstrap";

import Modal from "react-modal";
import "../css/modalstyle.css";

Modal.setAppElement("#root");

function FirestoreMessage({ uid, token }) {
  console.log("firestoremessage ");
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState({
    title: "def title",
    description: "def description",
  });

  function toggleModal() {
    deleteNotification();
    setIsOpen(!isOpen);
  }

  function modalCancel() {
    deleteNotification();
    setIsOpen(!isOpen);
  }

  const deleteNotification = () => {
    firestore
      .collection("notification")
      .doc("ss")
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
      .doc("ss")
      .onSnapshot(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data().title);
          const owner = doc.data().owner;
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
      <h4>{uid}</h4>
      <h3>{token}</h3>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={1}
      >
        <h2>{title}</h2>
        <div className="row">
          <Button onClick={modalCancel}>Cancel</Button>
          <Button onClick={toggleModal}>Accept</Button>
        </div>
      </Modal>
    </div>
  );
}

export default FirestoreMessage;
