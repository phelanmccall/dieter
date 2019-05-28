import React, { Component } from "react";
import { Link, Router } from "react-router-dom";

class Header extends Component {

    // navigate = (e) => {
    //     e.preventDefault();
    //     browserHistory.push(e.target.name);
    // }

    render() {
        return (
            <nav className="navbar navbar-light bg-light justify-content-between">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <a href="/recipes">Recipes</a>
                        </li>
                        <li className="nav-item">
                        <a href="/planner">Planner</a>
                        </li>
                      
                    </ul>
                 
                </div>
            </nav>
        );
    }
}

export default Header;