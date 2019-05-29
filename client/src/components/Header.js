import React, { Component } from "react";
import { Link} from "react-router-dom";

class Header extends Component {

    // navigate = (e) => {
    //     e.preventDefault();
    //     browserHistory.push(e.target.name);
    // }

    render() {
        return (
            <div className="container-fluid">
            <div className="row text-secondary">
              <div className="col-6 bg-success">
                <Link  className="text-dark" to="/recipes">Recipes</Link>
              </div>
              <div className="col-6 bg-info">
                <Link to="/planner">Planner</Link>
              </div>
            </div>
          </div> );
    }
}

export default Header;