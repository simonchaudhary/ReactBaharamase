import React, { useState, useEffect } from "react";
import axios from "axios";
import firebase from "../config/firebaseConfig";
import DeviceToken from "../utilities/Device_token";

import "../css/test.css";

function Session() {
  const [sessions, setSessions] = useState([]);
  const [uid, setUid] = useState(0);

  function gettoken() {
    alert("token");
    const messaging = firebase.messaging();
    messaging
      .requestPermission()
      .then(() => {
        return messaging.getToken();
      })
      .then(token => {
        console.log("token:", token);
      })
      .catch(err => {
        console.log("err:", err);
      });
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUid(user.uid);
      } else {
      }
    });
    console.log("hello");
    console.log(uid);

    async function getSession() {
      const result = await axios.get(
        "https://us-central1-bahramasefirebase.cloudfunctions.net/session"
      );
      console.log(result.data.data);
      setSessions(result.data.data);
      return result;
    }
    getSession();
  }, []);

  // Logout
  function logout() {
    firebase
      .auth()
      .signOut()
      .then(cred => {
        console.log("Logout successful");
        document.getElementById("sessionpage").style.display = "none";
      })
      .catch(error => {
        console.log("error logout " + error);
      });
  }

  function createSession() {
    alert("create");
    async function createSes() {
      const data = {
        owner: uid,
        session: uid,
        ownerDeviceToken:
          "fFaC1aq0BEJ6ZFk_znkqz9:APA91bGiytHSalcCXDuBlzwPl7pmHYvQ_fK1B-X35z_M8shhHkwzbWIw9MmIhSuqcdrvN7HFbYrUIpuCluW5JzEmO2UGfCZ1w3E2uX0hq9I909QOuILl2YwAmo6SZAcD8eEZw1meVPUE",
        users: [
          "BOT",
          "erLuS3X5J7fojlmKwAsYCT46UHj1",
          "cGd0Gz9dYHYfG7ZDNahNYidxCSm1",
        ],
        currentUser: "cGd0Gz9dYHYfG7ZDNahNYidxCSm1",
      };
      const result = await axios.post(
        "https://us-central1-bahramasefirebase.cloudfunctions.net/session/" +
          uid,
        data
      );
      console.log(result);
    }
    createSes();
  }

  function join(currentUser, ownerDeviceToken) {
    alert(`current user, ${currentUser}, ${ownerDeviceToken}`);

    // axios({
    //   mode: "cors",
    //   method: "post",
    //   url:
    //     "https://us-central1-bahramasefirebase.cloudfunctions.net/sendRequest",
    //   header: { "X-Requested-With": "XMLHttpRequest" },
    //   data: {
    //     //   firstName: 'Fred',
    //     //   lastName: 'Flintstone'

    //     token:
    //       "fFCd7SCS47ZDpuQOemTUn_:APA91bEPK1nIfzVFSp7IIkSxWe7TTkEPR55NrrJyeY6sCRcv0u2oHsjIWYkdE6xrCP0B9AewUv9Pg_65BQPH7lcAkBKhq7FHzL1djPlIaHmfVEC4a7NAVc_x0JUN0pEckorWDUzSRhCT",
    //     name: "Simon",
    //     uID: "cGd0Gz9dYHYfG7ZDNahNYidxCSm1",
    //   },
    // });

    // async function joinsession() {
    //     const data = {
    //         "token": "fFaC1aq0BEJ6ZFk_znkqz9:APA91bGiytHSalcCXDuBlzwPl7pmHYvQ_fK1B-X35z_M8shhHkwzbWIw9MmIhSuqcdrvN7HFbYrUIpuCluW5JzEmO2UGfCZ1w3E2uX0hq9I909QOuILl2YwAmo6SZAcD8eEZw1meVPUE",
    //         "name": "Simon",
    //         "uID": "cGd0Gz9dYHYfG7ZDNahNYidxCSm1"
    //     }
    //     const result = await axios.post('https://us-central1-bahramasefirebase.cloudfunctions.net/sendRequest', data)
    //     console.log(result)
    //     return result
    // }
    // joinsession();

    const fetchOptions = {
      token:
        "fFaC1aq0BEJ6ZFk_znkqz9:APA91bGiytHSalcCXDuBlzwPl7pmHYvQ_fK1B-X35z_M8shhHkwzbWIw9MmIhSuqcdrvN7HFbYrUIpuCluW5JzEmO2UGfCZ1w3E2uX0hq9I909QOuILl2YwAmo6SZAcD8eEZw1meVPUE",
      name: "Simon",
      uID: "cGd0Gz9dYHYfG7ZDNahNYidxCSm1",
    };

    fetch(
      "https://us-central1-bahramasefirebase.cloudfunctions.net/sendRequest",
      {
        mode: "cors",
        method: "post",
        body: JSON.stringify(fetchOptions),
      }
    )
      .then(response => response.json())
      .then(data => console.log(data));
  }

  return (
    <div className="col">
      {sessions.map(session => (
        <div className="content">
          <div className="join">
            <button
              onClick={() =>
                join(session.currentUser, session.ownerDeviceToken)
              }
              className="title"
            >
              Join
            </button>
          </div>
          <div className="box">
            <p className="title"> {session.currentUser} </p>
            <p className="detail"> {session.owner} </p>
            <p className="detail">
              {session.session}
              's games
            </p>
          </div>
        </div>
      ))}
      <button onClick={createSession}> New Session </button>
      <button onClick={logout}> Logout </button>
      <button onClick={gettoken}> gettoken </button>
    </div>
  );
}

export default Session;

// import React, { Component } from "react";
// import axios from "axios";
// import firebase from "../config/firebaseConfig";

// import "../css/test.css";

// export class Session extends Component {
//   // const [sessions, setSessions] : useState();

//   constructor(props) {
//     super(props);
//     this.createSession = this.createSession.bind(this);
//     this.logout = this.logout.bind(this);
//   }

//   componentDidMount() {
//     alert("session");
//     async function getSes() {
//       const result = await axios.get(
//         "https://us-central1-bahramasefirebase.cloudfunctions.net/session/erLuS3X5J7fojlmKwAsYCT46UHj1%27s"
//       );
//       console.log(result.data.data.owner);
//       return result;
//     }
//     getSes();
//   }

//   //   Logout
//   logout() {
//     firebase
//       .auth()
//       .signOut()
//       .then((cred) => {
//         console.log("Logout successful");
//         document.getElementById("sessionpage").style.display = "none";
//       })
//       .catch((error) => {
//         console.log("error logout " + error);
//       });
//   }

//   createSession() {
//     async function createSes() {
//       const data = {
//         owner: "cGd0Gz9dYHYfG7ZDNahNYidxCSm1",
//         session: "cGd0Gz9dYHYfG7ZDNahNYidxCSm1",
//         ownerDeviceToken:
//           "fFaC1aq0BEJ6ZFk_znkqz9:APA91bGiytHSalcCXDuBlzwPl7pmHYvQ_fK1B-X35z_M8shhHkwzbWIw9MmIhSuqcdrvN7HFbYrUIpuCluW5JzEmO2UGfCZ1w3E2uX0hq9I909QOuILl2YwAmo6SZAcD8eEZw1meVPUE",
//         users: [
//           "BOT",
//           "erLuS3X5J7fojlmKwAsYCT46UHj1",
//           "cGd0Gz9dYHYfG7ZDNahNYidxCSm1",
//         ],
//         currentUser: "cGd0Gz9dYHYfG7ZDNahNYidxCSm1",
//       };
//       const result = await axios.post(
//         "https://us-central1-bahramasefirebase.cloudfunctions.net/session/erLuS3X5J7fojlmKwAsYCT46UHj1%27s",
//         data
//       );
//       console.log(result);
//     }
//     createSes();
//   }

//   render() {
//     return (
//       <div className="col">
//         <div className="content">
//           <div className="join">
//             <p className="title"> Join </p>{" "}
//           </div>{" "}
//           <div className="box">
//             <p className="title"> {this.gamename} </p>{" "}
//             <p className="detail"> Game Type: 3 cp </p>{" "}
//             <p className="detail"> Wager: 100 $ </p>{" "}
//             <p className="detail"> Credit Amount </p>{" "}
//           </div>{" "}
//         </div>{" "}
//         <button onClick={this.createSession}> New Session </button>{" "}
//         <button onClick={this.logout}> Logout </button>{" "}
//       </div>
//     );
//   }
// }

// export default Session;
