import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {

    // navigate = (e) => {
    //     e.preventDefault();
    //     browserHistory.push(e.target.name);
    // }

    render() {
        console.log(window.location.pathname);
        return (
            <div className="row text-secondary">
                <Link className={window.location.pathname === "/recipes" ? "col-6 btn rounded-0" : "col-6 btn btn-dark rounded-0"} to="/recipes">Recipes</Link>

                <Link className={window.location.pathname === "/planner" ? "col-6 btn rounded-0" : "col-6 btn btn-dark rounded-0"} to="/planner">Planner</Link>

            </div>
        );
    }
}

export default Navbar;