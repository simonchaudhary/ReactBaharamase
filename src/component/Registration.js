import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { auth, firestore } from "../config/firebaseConfig";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/registration.css";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   console.log("regiter useeffect");
  //   auth.onAuthStateChanged(user => {
  //     if (user) {
  //       console.log("User is loged In ");
  //     } else {
  //       console.log("register logged out");
  //     }
  //   });
  // }, []);

  const onRegister = e => {
    e.preventDefault();
    alert("register");
    alert("email: " + email + " password" + password);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(cred => {
        // save to firebase
        firestore
          .collection("ReactUsers")
          .add({
            email: email,
            password: password,
          })
          .then(cred => {
            console.log("save to firebase");
          })
          .catch(err => {
            console.log("firestore error " + err);
          });
      })
      .catch(err => {
        console.log("error " + err);
      });
  };

  const onLogin = e => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(cred => {
        console.log("User is Login");
      })
      .catch(err => {
        console.log("error " + err);
      });
  };

  return (
    <div className="registerPage">
      <div className="container">
        <h1>Registration</h1>
        <Form onSubmit={onRegister}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>

      <div className="container">
        <h1>Login</h1>
        <Form onSubmit={onLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Registration;
