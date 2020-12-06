import React, { useState, useEffect } from "react";

// Components
import Registration from "./component/Registration";
import Sessions from "./component/Sessions";
import FirestoreMessage from "./component/FirestoreMessage";
import Play from "./component/Play";

import {
  requestFirebaseNotificationPermission,
  auth,
  firestore,
} from "./config/firebaseConfig";

function App() {
  const [email, setEmail] = useState();
  const [uid, setUid] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    isUserLogin();
    getToken();
  }, []);

  function isUserLogin() {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        setUid(user.uid);
        setEmail(user.email);
      } else {
        console.log("register logged out");
      }
    });
  }

  function getToken() {
    requestFirebaseNotificationPermission()
      .then(firebaseToken => {
        setToken(firebaseToken);
        console.log("from state " + { token });
      })
      .catch(err => {
        return err;
      });
  }

  return (
    <div>
      <h1>App</h1>
      <Registration />
      <Sessions uid={uid} email={email} token={token} />
      <FirestoreMessage uid={uid} token={token} />
      <Play uid={uid} />
    </div>
  );
}

export default App;

// import "./css/test.css";
// import React from "react";
// import Registration from "./component/Registration";
// import Session from "./component/Session";
// import Play from "./component/Play";
// import firebase from "./config/firebaseConfig";
// // import {  Col,Row, Container } from 'react-bootstrap';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// //Pages
// import DeviceToken from "./utilities/Device_token";
// import { Col } from "react-bootstrap";

// class App extends React.Component {
//   state = {
//     uid: "",
//   };

//   componentDidMount() {
//     firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//         alert(user.uid);
//         this.setState({ uid: user.uid });

//         document.getElementById("sessionpage").style.display = "block";
//       } else {
//         alert("user logged out");
//         document.getElementById("registerpage").style.display = "block";
//       }
//     });
//   }

//   render() {
//     return (
//       //   <Play />
//       <Col>
//         <div id="registerpage">
//           <Registration />
//         </div>
//         <div id="sessionpage">
//           <Session />
//         </div>
//       </Col>
//     );
//   }
// }

// export default App;

// // import "./App.css";
// // import React from "react";
// // import firebase from "./config/firebaseConfig";

// // class App extends React.Component {

// //   constructor(props) {
// //     super(props);
// //     this.state = { value: "coconut" };

// //     this.handleChange = this.handleChange.bind(this);
// //     this.handleSubmit = this.handleSubmit.bind(this);
// //   }

// //   handleChange(event) {
// //     this.setState({ value: event.target.value });
// //   }

// //   handleSubmit(event) {
// //     alert("Your favorite flavor is: " + this.state.value);
// //     event.preventDefault();
// //     firebase.firestore().collection("books").add({
// //       title: this.state.value,
// //     });
// //     document.getElementById("user1p").style.display = "block";
// //     document.getElementById("user2btn").innerHTML = "enable";
// //     document.getElementById("user1form").style.display = "none";
// //   }

// //   render() {
// //     return (
// //       <div className="App">
// //         <header className="App-header">
// //           <div className="turn">
// //             <p> User 2 turn </p>{" "}
// //           </div>{" "}
// //           <div className="container">
// //             <div className="container-profile">
// //               <div className="box1">
// //                 <h2> User1 </h2>{" "}
// //               </div>{" "}
// //               <p id="user1p"> Disable </p>{" "}
// //               <form id="user1form" onSubmit={this.handleSubmit}>
// //                 <select value={this.state.value} onChange={this.handleChange}>
// //                   <option value="true"> true </option>{" "}
// //                   <option value="false"> false </option>{" "}
// //                 </select>{" "}
// //                 <input type="submit" value="Submit" />
// //               </form>{" "}
// //             </div>{" "}
// //             <div className="container-profile">
// //               <div className="box1">
// //                 <h2> User2 </h2>{" "}
// //               </div>{" "}
// //               <div className="box2">
// //                 <button id="user2btn"> Turn </button>{" "}
// //               </div>{" "}
// //             </div>{" "}
// //             <div className="container-profile">
// //               <div className="box1">
// //                 <h2> User3 </h2>{" "}
// //               </div>{" "}
// //               <div className="box2">
// //                 <button> Turn </button>{" "}
// //               </div>{" "}
// //             </div>{" "}
// //           </div>{" "}
// //         </header>{" "}
// //       </div>
// //     );
// //   }
// // }

// // export default App;
