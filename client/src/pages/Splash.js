import React, { Component } from "react";
import axios from "axios";

class Splash extends Component {

    show = false;

    state = {
        user: null,
        err: ""
    }

    login = (e) => {
        e.preventDefault();
        console.log(e.target)
        axios.post("/login",
            {
                username: e.target.username.value,
                password: e.target.password.value
            }
        ).then((response) => {
            if (response.data.username) {
                console.log(response.data.username);
                window.location.href = "/planner";
            } else {
                this.setState({ err: response.data })
            }
        }).catch((err) => {
            console.log(err);
            this.setState({ err: err });
        });

    }

    signup = (e) => {
        e.preventDefault();
        console.log(e.target);
        if (e.target.password2.value === e.target.password3.value) {
            axios.post("/signup", {
                username: e.target.username.value,
                password: e.target.password2.value
            }
            ).then((response) => {
                if (response.data.username) {   
                    console.log(response.data.username);
                    window.location.href = "/planner";
                } else {
                    console.log("Error: " + response.data)
                    this.setState({ err: response.data })
                }
            }).catch((err) => {
                console.log(err);
                this.setState({ err: err });
            });

        }else{
            this.setState({
                err: "Error: Passwords did not match."
            })
        }
    }


    togglePassword = (e) => {
        e.preventDefault();

        var tags = document.getElementsByTagName("input");
        this.show = !this.show;
        if (this.show) {
            e.target.innerHTML = "Hide password";
            for (let i = 0; i < tags.length; i++) {
                if (tags[i].name === "password2" || tags[i].name === "password3") {
                    tags[i].type = "text";
                }
            }
        } else {
            e.target.innerHTML = "Show password";

            for (let i = 0; i < tags.length; i++) {
                if (tags[i].name === "password2" || tags[i].name === "password3") {
                    tags[i].type = "password";
                }
            }
        }

    }
    componentDidMount() {
        // document.getElementById("myVideo").play();

    }

    componentWillMount() {
        axios.get("/login").then((response) => {
            if(response.data.username){
                window.location.href = "/planner"
            }
        }).catch((err) => {
            console.log(err.message);
        })
    }

    render() {
        return (
            <div className="container">

                {/*                 
                    <video autoplay muted loop id="myVideo">
                        <source src="https://app.coverr.co/s3/mp4/Rain-On-Me.mp4" type="video/mp4" />
                    </video>
                    */}


                <div className="row m-auto p-5 justify-content-center">

                    <button className="btn btn-outline-success my-2 my-sm-0  mr-sm-2" type="button"
                        data-toggle="collapse" data-target="#loginForm" aria-expanded="false" aria-controls="myForm"
                    >Login</button>

                    <form id="loginForm" onSubmit={this.login} className="collapse">
                    <div className="text-danger mr-sm-2">{this.state.err.toString()}</div>

                        <input className="form-control mr-sm-2" type="text" name="username" placeholder="Username" aria-label="Username" required />
                        <input className="form-control mr-sm-2" type="password" name="password" placeholder="Password" aria-label="Password" required></input>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Submit</button>
                    </form>
                    <br />

                </div>


                <div className="row m-auto p-5 justify-content-center">
                    <button className="btn btn-outline-success my-2 my-sm-0  mr-sm-2" type="button"
                        data-toggle="collapse" data-target="#signupForm" aria-expanded="false" aria-controls="myForm"
                    >Signup</button>
                    <form id="signupForm" onSubmit={this.signup} className="collapse">
                    <div className="text-danger mr-sm-2">{this.state.err.toString()}</div>

                        <input className="form-control mr-sm-2" type="text" name="username" placeholder="Username" aria-label="Username" required />
                        <input className="form-control mr-sm-2" type="password" name="password2" placeholder="Password" aria-label="Password" required></input>
                        <input className="form-control mr-sm-2" type="password" name="password3" placeholder="Password" aria-label="Password" required></input>
                        <button className="btn btn-outline-info" onClick={this.togglePassword} type="button">Show password</button>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Splash;