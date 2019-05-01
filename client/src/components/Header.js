import React, { Component } from "react";


class Header extends Component {

    render() {
        return (
            <nav className="navbar navbar-light bg-light justify-content-between">
                <a className="navbar-brand">Navbar</a>
                <button id="" className="btn btn-outline-success my-2 my-sm-0" type="button"
                data-toggle="collapse" data-target="#myForm" aria-expanded="false" aria-controls="myForm"
                >Login</button>

                <form id="myForm" className="collapse form-inline">
                    <input className="form-control mr-sm-2" type="text" name="username" placeholder="Username" aria-label="Username" />
                    <input className="form-control mr-sm-2" type="password" name="password" placeholder="Password" aria-label="Password"></input>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Submit</button>
                </form>
            </nav>
        );
    }
}

export default Header;