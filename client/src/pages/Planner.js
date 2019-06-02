import React, { Component } from "react";
import Header from "../components/Header";
import Axios from "axios";

var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var meals = ["breakfast", "lunch", "dinner"];
class Planner extends Component {

    state = {
        user: null,
        foods: [{ title: "pizza",ingredients: ["pizza"], steps:["make pizza"] }, { title: "cereal",ingredients: ["cereal"], steps:["make cereal"] }],
        date: new Date(),
        breakfast: [],
        lunch: [],
        dinner: [],
        recipe: {
            title: "",
            steps: [],
            ingredients: []
        }
    }

    addFood = (e) => {
        e.preventDefault();
        console.log(e.target.meal.value);
        console.log(e.target.food.value);

        var meal = [...this.state[e.target.meal.value]];
        meal.push(e.target.food.value);

        this.setState({
            [e.target.meal.value]: meal
        }, this.updatePlan);

    }

    removeMeal = (e) => {
        e.preventDefault();
        let type = e.target.getAttribute("data-type");
        let key = e.target.getAttribute("data-key");
        let newArray = this.state[type];
        newArray.splice(key, 1);
        this.setState({
            [type]: newArray
        }, this.updatePlan);
    }

    handleDate = (e) => {
        e.preventDefault();

        var date = e.target.valueAsDate ? e.target.valueAsDate : new Date();

        this.setState({
            date: date
        }, this.getToday)
    }
    changeDate = (e) => {
        e.preventDefault();
        let dateInput = document.getElementById("date");
        console.log(e.target.id);
        if (e.target.id === "<") {
            dateInput.stepDown();
        } else {
            dateInput.stepUp();
        }
        this.setState({
            date: dateInput.valueAsDate
        }, this.getToday);

    }
    getUserInfo = () => {

        this.getRecipes();
        this.getToday();
    }
    getToday = () => {
        let { date } = this.state;

        Axios.get("/meals/" + this.format(date))
            .then((response) => {
                console.log(response.data);
                let { breakfast, lunch, dinner } = response.data;
                this.setState({
                    breakfast,
                    lunch,
                    dinner
                })
            }).catch((err) => {
                console.log(err);
            })
    }



    getOneRecipe = (e) => {
        e.preventDefault();
        console.log(e.target.name);
        let { name } = e.target;
    
        for(let i in this.state.foods){
            if(this.state.foods[i].title === name){
                this.setState({
                    recipe: this.state.foods[i]
                })
            }
        }
        

    }

    getRecipes = () => {
        Axios.get("/myRecipes").then((response) => {
            console.log(response.data);
            this.setState({
                foods: response.data
            })
        }).catch((err) => {
            console.log(err);
        });
    }

    updatePlan = () => {

        let { date, breakfast, lunch, dinner } = this.state;
        let update = {
            breakfast,
            lunch,
            dinner
        };
        update.date = this.format(date);

        console.log(update.date)
        Axios.post("/add/plans", update)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    format = (date) => {
        return `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1) < 10 ? "0" + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1)}-${date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate()}`
    }

    componentWillMount() {
        this.getUserInfo();

    }


    render() {
        var { date } = this.state;
        console.log(this.state)
        console.log(this.format(date));
        return (
            <div className="container">
                <Header />

                <div className="row justify-content-center">
                    <button onClick={this.changeDate} id="<" className="mr-0" type="button" >{"<"}</button>
                    <input id="date" className="d-inline d-block" type="date" onChange={this.handleDate} value={this.format(date)}></input>
                    <button onClick={this.changeDate} id=">" className="ml-0" type="button" >{">"}</button>
                    {
                        date ? <div className="col-12 m-auto">{weekdays[date.getUTCDay()]}, {months[date.getUTCMonth()]} {date.getUTCDate()}, {date.getFullYear()}</div> : <div></div>
                    }

                </div>

                <form onSubmit={this.addFood}>
                    <span>Add </span>
                    <select name="food" id="food">
                        {
                            this.state.foods.map((val, key) => {
                                return <option key={key} value={val.title}>{val.title}</option>
                            })
                        }
                    </select>
                    <span> To </span>
                    <select name="meal" id="meal">
                        {
                            meals.map((val, key) => {
                                return <option key={key} value={val}>{val}</option>
                            })
                        }
                    </select>


                    <input type="submit" value="submit"></input>

                </form>

                <div className="modal fade" id="display" role="dialog">
                    <div className="modal-dialog">

                        <div className="modal-content">
                            <div className="modal-header">
                            <h4 className="modal-title m-auto">{this.state.recipe.title}</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            
                            </div>
                            <div className="modal-body">
                                <p>Ingredients:</p>
                                <ul>
                                {
                                    this.state.recipe.ingredients.map((val, key)=>{
                                        return <li key={key}>{val}</li>
                                    })
                                }
                                </ul>
                            </div>
                            <div className="modal-body">
                            <p>Steps:</p>
                                <ol>
                                {
                                    this.state.recipe.steps.map((val, key)=>{
                                        return <li key={key}>{val}</li>
                                    })
                                }
                                </ol>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>

                <div>
                    <p>Breakfast:</p>
                    {
                        this.state.breakfast.map((val, key) => {
                            return <div key={key}>
                                <button onClick={this.getOneRecipe} name={val} type="button" data-toggle="modal" data-target="#display">
                                    View
                                    </button>
                                {val}
                                <button data-key={key} data-type="breakfast" onClick={this.removeMeal}>
                                    DELETE
                                    </button>
                            </div>
                        })
                    }
                </div>

                <div>
                    <p>Lunch:</p>
                    {
                        this.state.lunch.map((val, key) => {
                            return <div key={key}>
                            <button onClick={this.getOneRecipe} name={val} type="button" data-toggle="modal" data-target="#display">
                                    View
                                    </button>
                                    {val}
                            <button data-key={key} data-type="lunch" onClick={this.removeMeal}>DELETE</button>
                            </div>
                        })
                    }
                </div>

                <div>
                    <p>Dinner:</p>
                    {
                        this.state.dinner.map((val, key) => {
                            return <div key={key}>
                            <button onClick={this.getOneRecipe} name={val} type="button" data-toggle="modal" data-target="#display">
                                    View
                                    </button>
                                        {val}<button data-key={key} data-type="dinner" onClick={this.removeMeal}>DELETE</button></div>
                        })
                    }
                </div>


            </div>
        );
    }

}

export default Planner;