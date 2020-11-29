import React, { Component} from "react"


class DeviceToken extends Component {
    constructor(props) {
        super(props);
        this.token = "token ";
        this.state = {
          token: this.token
        };
        this.getToken = this.getToken.bind(this);
      }

    getToken =() => {
        console.log("Get token button pressed");
        this.token= "New token"
        this.setState({
            token: this.token,
          });
        
    }
 
    render(){
        return(
            <div> 
                <h1>Get device token</h1>
                <button onClick={this.getToken}> Get Token </button>   
                <h2> {this.token} </h2>          
            </div>
        )
    } 
    
}

export default DeviceToken ;