import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from "./components/Header";


var weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class App extends Component {

  state = {
    foods: [],
    date: new Date(),
    breakfast: {},
    lunch: {},
    dinner: {}
  }

  componentDidMount = () => {
    axios.get(URL).then((response) => {
      console.log(response.data);
      // this.setState({
      //   foods: response.data
      // })
    }).catch(function (err) {
      console.log(err);
    })
  }
  handleFood = (e) => {
    axios.get(URL + e.target.value).then((response) => {
      console.log(response.data)
    }).catch((err) => {
      console.log(err);
    })
  }
  handleDate = (e) => {
    e.preventDefault();

    var date = e.target.valueAsDate ? e.target.valueAsDate : new Date();

    this.setState({
      date: date
    })
  }

  render() {

    let { date } = this.state;

    console.log(date);
    return (
      <div className="App">

        <Header />

        <div className="container">

          <div className="row">
            <input className="d-inline m-auto d-block" type="date" onChange={this.handleDate}></input>

            {
              date ? <div className="col-12 m-auto">{weekdays[date.getDay()]}, {months[date.getMonth()]} {date.getUTCDate()}, {date.getFullYear()}</div> : <div></div>
            }

          </div>

          <select onChange={this.handleFood}>
            {
              this.state.foods.map(function (val, key) {
                return <option key={key} value={val.name}>{val.name}</option>
              })
            }
          </select>

        </div>
      </div>
    );
  }
}

export default App;
