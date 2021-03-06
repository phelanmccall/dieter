import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import User from "./components/User";
import Splash from "./pages/Splash";
import Planner from "./pages/Planner";
import Recipes from "./pages/Recipes";

class App extends Component {



  componentDidMount = () => {
  }


  render() {

    return (
      <div>
        <Header></Header>

        <User />
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
