import React, { useState, useEffect } from "react";

import Switcher from "./SixMover/Switcher";
import Session from "./Sessions";

import "../css/home.css";
import "../css/text.css";

function Home(uid, email, token) {
  const [isHome, setIsHome] = useState(true);
  const [game, setGame] = useState();

  const back = () => {
    setIsHome(true);
  };

  const teenPatti = () => {
    setIsHome(false);
    setGame("teenPatti");
  };
  const sixMover = () => {
    setIsHome(false);
    setGame("sixMover");
  };

  if (isHome === true) {
    return (
      <div className="home_container">
        <div className="home_header">
          <h3>Home</h3>
        </div>
        <div className="home_body">
          <div className="game_container" onClick={() => teenPatti()}>
            <img src="https://excesscasinos.com/wp-content/uploads/2014/06/card-poker.jpg"></img>
            <p className="title">Teen Patti</p>
            <p>2 Sessions</p>
          </div>
          <div className="game_container" onClick={() => sixMover()}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV6SA9dpkn-9oO-uycpxVFjrsX-d3LFJ8_Yw&usqp=CAU"></img>
            <p className="title">Six Mover</p>
            <p>2 Sessions</p>
          </div>
        </div>
      </div>
    );
  } else {
    if (game === "teenPatti") {
      return;
      <div>
        <div className="home_header">
          <button onClick={() => back()}>Go to Home</button>
          <p>hello</p>
        </div>
        <Session uid={uid} email={email} token={token} />;
      </div>;
    } else if (game === "sixMover") {
      return (
        <div>
          <div className="home_header">
            <button onClick={() => back()}>Go to Home</button>
            <p>hello</p>
          </div>
          <Switcher />;
        </div>
      );
    } else {
      return <p>Loading</p>;
    }
  }
}

export default Home;
