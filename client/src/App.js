import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Header from "./components/Header";
import Splash from "./pages/Splash";
import Planner from "./pages/Planner";
import Recipes from "./pages/Recipes";

class App extends Component {



  componentDidMount = () => {

  }


  render() {

    return (
      <div className="App">


        <Router>
          <div className="container-fluid">
            <div className="row text-secondary">
              <div className="col-6 bg-success">
                <Link  className="text-dark" to="/recipes">Recipes</Link>
              </div>
              <div className="col-6 bg-info">
                <Link to="/planner">Planner</Link>
              </div>
            </div>
          </div>

          <Switch>
            <Route exact path={["/", "/login"]} component={Splash} />
            <Route path="/planner" component={Planner} />
            <Route path="/recipes" component={Recipes} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
