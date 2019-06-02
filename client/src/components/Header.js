import React, { Component } from "react";
import { Link} from "react-router-dom";

class Header extends Component {

    // navigate = (e) => {
    //     e.preventDefault();
    //     browserHistory.push(e.target.name);
    // }

    render() {
        console.log(window.location.pathname);
        return (
            <div className="container-fluid">
            <div className="row text-secondary">
                <Link  className={window.location.pathname === "/recipes" ? "col-6 btn btn-dark" : "col-6 btn btn-outline-dark" } to="/recipes">Recipes</Link>
              
                <Link className={window.location.pathname === "/planner" ? "col-6 btn btn-dark" : "col-6 btn btn-outline-dark" } to="/planner">Planner</Link>
           
            </div>
          </div> );
    }
}

export default Header;