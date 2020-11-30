import React, { Component } from 'react'
import firebase from '../config/firebaseConfig'

export class Registration extends Component {
    state = {
        email: '',
        password: ''
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                alert("user logged in")
            } else {
                alert("user logged out")
            }
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        alert("register")
            // alert("email: "+ this.state.email + " password"+ this.state.password)
            // firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(cred =>{
            //     // save to firebase
            //     alert("save")
            //     firebase.firestore().collection("ReactUsers").add({
            //         email: this.state.email,
            //         password: this.state.password
            //     }).then(cred =>{
            //         alert("save to firebase")
            //     }).catch(err =>{
            //         alert("firestore error "+ err)
            //     });
            // }).catch(err =>{
            //     alert("error "+ err)
            // })
    }


    onSubmitLogin = (e) => {
        e.preventDefault()
        alert(" login email: " + this.state.email + " password" + this.state.password)
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(cred => {

            alert("Login")
        }).catch(err => {
            alert("error " + err)
        })
    }

    onChange = (e) => this.setState({
        [e.target.name]: e.target.value });

    render() {
        return ( <
            div className = "Container" >
            <
            h1 > Register < /h1> <
            div className = "loginContainer" >
            <
            form onSubmit = { this.onSubmit } >
            <
            input type = "text"
            name = "email"
            value = { this.state.email }
            onChange = { this.onChange }
            placeholder = "Email" / >
            <
            input type = "password"
            name = "password"
            value = { this.state.password }
            onChange = { this.onChange }
            placeholder = "Password" / >
            <
            button type = "submit"
            value = "Register" > Register < /button> <
            /form> <
            /div> <
            div className = "signupContainer" >
            <
            form onSubmit = { this.onSubmitLogin } >
            <
            input type = "text"
            name = "email"
            value = { this.state.email }
            onChange = { this.onChange }
            placeholder = "Email" / >
            <
            input type = "password"
            name = "password"
            value = { this.state.password }
            onChange = { this.onChange }
            placeholder = "Password" / >
            <
            button type = "submit"
            value = "Register" > Login < /button> <
            /form> <
            /div>

            <
            /div>
        )
    }
}

export default Registration