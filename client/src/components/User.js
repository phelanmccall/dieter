import React, {Component} from "react";
import axios from "axios";


class User extends Component {

    // navigate = (e) => {
    //     e.preventDefault();
    //     browserHistory.push(e.target.name);
    // }

    logout = (e) => {
        e.preventDefault();
        axios.get("/logout").then((response)=>{
            console.log(response.data);
            window.location.reload();

        }).catch((err)=>{
            console.log(err);
        });

    }

    render() {
        console.log(window.location.pathname);
        return (
            <div className="container-fluid" style={ {
                "background-image": "linear-gradient(grey, white)"
              }}>
               
          </div> );
    }
}

export default User;