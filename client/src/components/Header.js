import React, { Component } from "react";
import axios from "axios";


class Header extends Component {

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
        })
    }

    render() {
        console.log(window.location.pathname);
        return (
            <nav className="navbar navbar-dark bg-dark">
              <div className="navbar-brand btn">Meal Planner</div>
            
                <button className="btn btn-outline-secondary">Logout</button>
          </nav> );
    }
}

export default Header;