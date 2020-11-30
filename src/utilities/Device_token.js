import React, { Component } from "react";

// import firebase from "firebase"

import firebase from "../config/firebaseConfig";

// import { messaging } from "../utilities/firebase_messaging"

const messaging = firebase.messaging();
class DeviceToken extends Component {
  constructor(props) {
    super(props);
    this.token = "token ";
    this.state = {
      token: this.token,
    };
    this.getToken = this.getToken.bind(this);
  }

  async getToken() {
    messaging.requestPermission().then(()=>{
      return messaging.getToken()
    }).then((token) =>{
      console.log("token:", token)
    }).catch(err =>{
      console.log('err:', err)
    })
    // const token= await messaging.getToken({vapidKey: "BFOqQ74Kc-wW3vHowieYzVrB9MzjXb4MYLgN4qjiMgsjSm-gjvKbNk4zAMJnDyhjXHytKJYRqoOCmvTGDYVWxag"});
    // console.log("token:", token)
    // this.token= "New token"
    this.setState({
      token: this.token,
    });
  }

  render() {
    return (
      <div>
        <h1>Get device token</h1>

        <button onClick={this.getToken}> Get Token </button>
        <h2> {this.token} </h2>
      </div>
    );
  }
}

export default DeviceToken;
