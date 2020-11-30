import React, { Component } from 'react'
import axios from 'axios'

import "../css/test.css"

export class Session extends Component {
    constructor(props) {
        super(props);

        this.createSession = this.createSession.bind(this);
        this.getSession = this.getSession.bind(this);
    }

    getSession() {
        alert("get session")

        // const res = axios.get('https://us-central1-bahramasefirebase.cloudfunctions.net/session/erLuS3X5J7fojlmKwAsYCT46UHj1%27s')
        // res.then(rs => {
        //     console.log(rs)
        // }).catch(err => {
        //     console.log(err)
        // })

        async function getSes() {
            const result = await axios.get('https://us-central1-bahramasefirebase.cloudfunctions.net/session/erLuS3X5J7fojlmKwAsYCT46UHj1%27s')
            console.log(result.data.data.owner)
            return result
        }
        getSes();
    }


    createSession() {
        async function createSes() {
            const data = {
                "owner": "cGd0Gz9dYHYfG7ZDNahNYidxCSm1",
                "session": "cGd0Gz9dYHYfG7ZDNahNYidxCSm1",
                "ownerDeviceToken": "fFaC1aq0BEJ6ZFk_znkqz9:APA91bGiytHSalcCXDuBlzwPl7pmHYvQ_fK1B-X35z_M8shhHkwzbWIw9MmIhSuqcdrvN7HFbYrUIpuCluW5JzEmO2UGfCZ1w3E2uX0hq9I909QOuILl2YwAmo6SZAcD8eEZw1meVPUE",
                "users": [
                    "BOT",
                    "erLuS3X5J7fojlmKwAsYCT46UHj1",
                    "cGd0Gz9dYHYfG7ZDNahNYidxCSm1"
                ],
                "currentUser": "cGd0Gz9dYHYfG7ZDNahNYidxCSm1"
            }
            const result = await axios.post('https://us-central1-bahramasefirebase.cloudfunctions.net/session/erLuS3X5J7fojlmKwAsYCT46UHj1%27s', data)
            console.log(result)
        }
        createSes();

    }

    render() {
        return ( <
            div className = "col" >
            <
            div className = "content" >
            <
            div className = "join" >
            <
            p className = "title" > Join < /p> < /
            div > <
            div className = "box" >
            <
            p className = "title" > { this.gamename } < /p> <
            p className = "detail" > Game Type: 3 cp < /p> <
            p className = "detail" > Wager: 100 $ < /p> <
            p className = "detail" > Credit Amount < /p> < /
            div > <
            /div> <
            button onClick = { this.createSession } > New Session < /button> <
            button onClick = { this.getSession } > get session < /button> < /
            div >
        )
    }
}

export default Session