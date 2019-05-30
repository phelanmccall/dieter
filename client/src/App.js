import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
       

          <Switch>
            <Route exact path={["/", "/login"]} component={Splash} />
            <Route 
              path="/planner" 
              render={(props) => <Planner {...props} />}
            />
            <Route 
              path="/recipes"
              render={(props) => <Recipes {...props} />}
              />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
