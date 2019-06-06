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
        });

    }

    render() {
        console.log(window.location.pathname);
        return (
            <nav className="navbar navbar-dark bg-dark">
                <div className="navbar-brand btn">Meal Planner</div>
                <div className="dropdown">
                        
                        <img className="img-fluid border rounded-circle" id="avatar" 
                            data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false"
                            src="https://via.placeholder.com/50x50" alt="Avatar"/>
                     
                        <div className="dropdown-menu" aria-labelledby="avatar-dropdown-menu">
                            <button  onClick={this.logout} className="dropdown-item">Logout</button>

                        </div>
                    </div>
               
                {/* <button className="btn btn-outline-secondary" onClick={this.logout}>Logout</button> */}
            </nav>);
    }
}

export default Header;