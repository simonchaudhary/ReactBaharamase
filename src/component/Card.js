import React, { useState, useEffect } from "react";
import axios from "axios";

import { BsHeartFill } from "react-icons/bs";
import { BsDiamondFill } from "react-icons/bs";
import { ImSpades } from "react-icons/im";
import { ImClubs } from "react-icons/im";

import "../css/card.css";

function Card({ sessionID, uid, playerUid, sequence, color }) {
  console.log("Cards container ", sessionID, uid, playerUid);
  const [cards, setCards] = useState();

  useEffect(() => {
    console.log("card use effect");
    async function getCards() {
      const result = await axios.get(
        "https://us-central1-bahramasefirebase.cloudfunctions.net/session/" +
          sessionID +
          "/user-hand/" +
          playerUid
      );
      console.log(result.data.data.cards);
      setCards(result.data.data.cards);
    }
    getCards();
  }, []);

  return (
    <div className="list_card">
      {cards.map(card => (
        <div className="card_container">
          <div className="top_Left">{card.sequence}</div>
          <div className="center">
            {card.color === "Heart" ? (
              <BsHeartFill className="red" />
            ) : card.color === "Diamond" ? (
              <BsDiamondFill className="red" />
            ) : card.color === "Spade" ? (
              <ImSpades />
            ) : (
              <ImClubs />
            )}
          </div>
          <div className="bottom_right">{card.sequence}</div>
        </div>
      ))}
    </div>
  );
}

export default Card;
