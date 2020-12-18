import React, { useState, useEffect } from "react";

import SixMoverSession from "./SixMoverSession";
import SixMover from "./SixMover";
import { firestore } from "../../config/firebaseConfig";
import { useStateValue } from "../../States/StateProvider";

function Switcher() {
  console.log("Switcher page");

  const [{ user }, dispatch] = useStateValue();
  const [sessionOrPlay, setSessionOrPlay] = useState(false);

  useEffect(() => {
    console.log("Switcher use effect");
    firestore
      .collection("switcher")
      .doc("sixmover")
      .collection(user.uid)
      .doc(user.uid)
      .onSnapshot(function (snapshot) {
        if (snapshot.exists) {
          setSessionOrPlay(snapshot.data().sessionorplay);
        } else {
          alert("no");
        }
      });
  }, []);

  if (sessionOrPlay === false) {
    return <SixMoverSession />;
  } else {
    return <SixMover />;
  }
}

export default Switcher;
