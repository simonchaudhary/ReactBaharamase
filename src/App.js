import "./App.css";
import React from "react";
import firebase from "./config/firebaseConfig";

class App extends React.Component {



    constructor(props) {
        super(props);
        this.state = { value: "coconut" };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert("Your favorite flavor is: " + this.state.value);
        event.preventDefault();
        firebase.firestore().collection("books").add({
            title: this.state.value,
        });
        document.getElementById("user1p").style.display = "block";
        document.getElementById("user2btn").innerHTML = "enable";
        document.getElementById("user1form").style.display = "none";
    }

    render() {
        return ( <
            div className = "App" >
            <
            header className = "App-header" >
            <
            div className = "turn" >
            <
            p > User 2 turn < /p>{" "} <
            /div>{" "} <
            div className = "container" >
            <
            div className = "container-profile" >
            <
            div className = "box1" >
            <
            h2 > User1 < /h2>{" "} <
            /div>{" "} <
            p id = "user1p" > Disable < /p>{" "} <
            form id = "user1form"
            onSubmit = { this.handleSubmit } >
            <
            select value = { this.state.value }
            onChange = { this.handleChange } >
            <
            option value = "true" > true < /option>{" "} <
            option value = "false" > false < /option>{" "} <
            /select>{" "} <
            input type = "submit"
            value = "Submit" / >
            <
            /form>{" "} <
            /div>{" "} <
            div className = "container-profile" >
            <
            div className = "box1" >
            <
            h2 > User2 < /h2>{" "} <
            /div>{" "} <
            div className = "box2" >
            <
            button id = "user2btn" > Turn < /button>{" "} <
            /div>{" "} <
            /div>{" "} <
            div className = "container-profile" >
            <
            div className = "box1" >
            <
            h2 > User3 < /h2>{" "} <
            /div>{" "} <
            div className = "box2" >
            <
            button > Turn < /button>{" "} <
            /div>{" "} <
            /div>{" "} <
            /div>{" "} <
            /header>{" "} <
            /div>
        );
    }
}

export default App;

// import "./App.css";
// import React from "react";
// import firebase from "./config/firebaseConfig";

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { value: "coconut" };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.sayHello = this.sayHello.bind(this);
//   }

//   handleChange(event) {
//     this.setState({ value: event.target.value });
//   }

//   handleSubmit(event) {
//     alert("Your favorite flavor is: " + this.state.value);
//     event.preventDefault();
//     firebase.firestore().collection("books").add({
//       title: this.state.value,
//     });
//     document.getElementById("user1p").style.display = "block";
//     document.getElementById("user2btn").innerHTML = "enable";
//     document.getElementById("user1form").style.display = "none";
//   }

//   sayHello() {
//     alert("Hello!");
//   }
//   render() {
//     return (
//       <div className="center-container">
//         <div className="error">
//           <p className="validation-box" id="error">
//             {" "}
//           </p>{" "}
//           <p className="successful-box" id="success">
//             {" "}
//           </p>{" "}
//         </div>{" "}
//         <div className="content">
//           <div className="con" id="signin_container">
//             <div className="sign-container">
//               <form className="form" id="loginForm_id" name="loginForm">
//                 <p className="title"> Sign in </p>{" "}
//                 <input type="email" name="email" placeholder="Email">
//                   {" "}
//                 </input>{" "}
//                 <input type="password" name="password" placeholder="Password">
//                   {" "}
//                 </input>{" "}
//                 <button> Sign In </button>{" "}
//               </form>{" "}
//               <button id="signuphere" onClick={this.sayHello}>
//                 {" "}
//                 Sign Up here{" "}
//               </button>{" "}
//             </div>{" "}
//           </div>{" "}
//           <div className="con" id="signup_container">
//             <div className="sign-container">
//               <form className="form" id="signUpForm_id" name="signUpForm">
//                 <p className="title"> Create Account </p>{" "}
//                 <input type="email" name="email" placeholder="Email">
//                   {" "}
//                 </input>{" "}
//                 <input type="password" name="password" placeholder="Password">
//                   {" "}
//                 </input>{" "}
//                 <button> Sign Up </button>{" "}
//               </form>{" "}
//               <button id="signinhere"> Sign In here </button>{" "}
//             </div>{" "}
//           </div>{" "}
//         </div>{" "}
//       </div>
//     );
//   }
// }

// export default App;