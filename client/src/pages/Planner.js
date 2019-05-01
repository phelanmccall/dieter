import React, { Component } from "react";


var weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var meals = ["breakfast", "lunch", "dinner"];
class Planner extends Component {
    state = {
        user: null,
        foods: [{ name: "pizza" }, { name: "Cereal" }],
        date: new Date(),
        breakfast: [],
        lunch: [],
        dinner: []
    }

    addFood = (e) => {
        e.preventDefault();
        console.log(e.target.meal.value);
        console.log(e.target.food.value);

        var meal = [...this.state[e.target.meal.value]];
        meal.push(e.target.food.value);

        this.setState({
            [e.target.meal.value]: meal
        });

    }

    handleDate = (e) => {
        e.preventDefault();

        var date = e.target.valueAsDate ? e.target.valueAsDate : new Date();

        this.setState({
            date: date
        })
    }


    render() {
        var { date } = this.state;
        return (
            <div className="container">

                <div className="row">
                    <input className="d-inline m-auto d-block" type="date" onChange={this.handleDate}></input>

                    {
                        date ? <div className="col-12 m-auto">{weekdays[date.getDay()]}, {months[date.getMonth()]} {date.getUTCDate()}, {date.getFullYear()}</div> : <div></div>
                    }

                </div>

                <form onSubmit={this.addFood}>
                    <span>Add </span>
                    <select name="meal" id="meal">
                        {
                            meals.map(function (val, key) {
                                return <option key={key} value={val}>{val}</option>
                            })
                        }
                    </select>
                    <span> To </span>
                    <select name="food" id="food">
                        {
                            this.state.foods.map(function (val, key) {
                                return <option key={key} value={val.name}>{val.name}</option>
                            })
                        }
                    </select>

                    <input type="submit" value="submit"></input>

                </form>

                <div>
                    {
                        this.state.breakfast.map(function (val, key) {
                            return <div key={key}>{val}</div>
                        })
                    }
                </div>

            </div>
        );
    }

}

export default Planner;