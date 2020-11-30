import React, { Component } from 'react'

import "../css/test.css"

export class Session extends Component {
    render() {
        return ( <
            div className = "col" >
            <
            div className = "content" >
            <
            div className = "join" >
            <
            p className = "title" > Join < /p> <
            /div> <
            div className = "box" >
            <
            p className = "title" > Simon 's game</p> <
            p className = "detail" > Game Type: 3 cp < /p> <
            p className = "detail" > Wager: 100 $ < /p> <
            p className = "detail" > Credit Amount < /p> <
            /div> <
            /div> <
            button > New Session < /button>

            <
            /div>
        )
    }
}

export default Session