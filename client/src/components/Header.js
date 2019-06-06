import React, { Component } from "react";
import axios from "axios";


class Header extends Component {

    // navigate = (e) => {
    //     e.preventDefault();
    //     browserHistory.push(e.target.name);
    // }

    // logout = (e) => {
    //     e.preventDefault();
    //     axios.get("/logout").then((response)=>{
    //         console.log(response.data);
    //         window.location.reload();

    //     }).catch((err)=>{
    //         console.log(err);
    //     });

    // }

    render() {
        console.log(window.location.pathname);
        return (
            <nav className="navbar navbar-dark bg-dark">
              <div className="navbar-brand btn">Meal Planner</div>
              <div className="row h-50" >
                    <img style={{
                        "max-height": "8vh"
                    }} className="img img-fluid border border-dark rounded-circle rounded mr-4" src="https://avatars1.githubusercontent.com/u/12578723?s=460&v=4" />
                </div>
                {/* <button className="btn btn-outline-secondary" onClick={this.logout}>Logout</button> */}
          </nav> );
    }
}

export default Header;