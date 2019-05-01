import React, { Component } from "react";
import axios from "axios";

class Splash extends Component {
    login = (e) => {
        e.preventDefault();
        console.log(e.target)
        axios.post("/login", { username: e.target.username.value, password: e.target.password.value }).then((response) => {
          console.log(response.data);
        }).catch((err)=>{
            console.log(err);
        })
      }
    
      
    render(){
        return (
            <div className="container">

                <div className="row m-5 p-5"> 
                    
                    <button className="btn btn-outline-success my-2 my-sm-0" type="button"
                data-toggle="collapse" data-target="#myForm" aria-expanded="false" aria-controls="myForm"
                >Login</button>

                <form id="myForm" onSubmit={this.login} className="collapse form-inline">
                    <input className="form-control mr-sm-2" type="text" name="username" placeholder="Username" aria-label="Username" />
                    <input className="form-control mr-sm-2" type="password" name="password" placeholder="Password" aria-label="Password"></input>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Submit</button>
                </form>
                    </div>
                
               
            </div>
        );
    }
}

export default Splash;