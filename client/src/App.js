import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Header from "./components/Header";
import Splash from "./pages/Splash";
import Planner from "./pages/Planner";

class App extends Component {

 

  componentDidMount = () => {

  }

  login = (e) => {
    axios.post("/login", { username: e.target.username, password: e.target.password }).then((response) => {
      console.log(response.data);
    })
  }

  
  render() {

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path={["/", "/login"]} component={Splash} />
            <Route path="/planner" component={Planner} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
