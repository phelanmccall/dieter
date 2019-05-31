import React, { Component } from "react";
import Header from "../components/Header";
import Axios from "axios";

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

    removeMeal = (e) =>{
        e.preventDefault();
        let type = e.target.getAttribute("data-type");
        let key = e.target.getAttribute("data-key");
        let newArray = this.state[type];
        newArray.splice(key, 1);
        this.setState({
            [type]: newArray
        });
    }

    handleDate = (e) => {
        e.preventDefault();

        var date = e.target.valueAsDate ? e.target.valueAsDate : new Date();

        this.setState({
            date: date
        })
    }

    getUserInfo = () =>{
      
        this.getRecipes();
        this.getToday();
    }
    getToday = () =>{
        let { date } = this.state;
        var today = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
        Axios.get("/meals/" + today)
            .then((response)=>{
                console.log(response.data);
                let {breakfast,lunch,dinner} = response.data;
                this.setState({
                    breakfast,
                    lunch,
                    dinner
                })
            }).catch((err)=>{
                console.log(err);
            })
    }

    getRecipes = () =>{
        Axios.get("/myRecipes").then((response)=>{
            console.log(response.data);
            this.setState({
                foods: response.data
            })
        }).catch((err)=>{
            console.log(err);
        });
    }

    updatePlan = () =>{
        Axios.post("/add/plan", this.state)
            .then((response)=>{
                console.log(response.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    componentWillMount(){
        this.getUserInfo();
    }


    render() {
        var { date } = this.state;
        return (
            <div className="container">
                <Header />

                <div className="row">
                    <input className="d-inline m-auto d-block" type="date" onChange={this.handleDate}></input>

                    {
                        date ? <div className="col-12 m-auto">{weekdays[date.getDay()]}, {months[date.getMonth()]} {date.getUTCDate()}, {date.getFullYear()}</div> : <div></div>
                    }

                </div>

                <form onSubmit={this.addFood}>
                    <span>Add </span>
                    <select name="food" id="food">
                        {
                            this.state.foods.map( (val, key)=> {
                                return <option key={key} value={val.title}>{val.title}</option>
                            })
                        }
                    </select>
                     <span> To </span>
                     <select name="meal" id="meal">
                        {
                            meals.map( (val, key)=> {
                                return <option key={key} value={val}>{val}</option>
                            })
                        }
                    </select>
                   

                    <input type="submit" value="submit"></input>

                </form>

                <div>
                    <p>Breakfast:</p>
                    {
                        this.state.breakfast.map( (val, key)=> {
                            return <div key={key}>{val}<button data-key={key} data-type="breakfast" onClick={this.removeMeal}>DELETE</button></div>
                        })
                    }
                </div>
                
                <div>
                    <p>Lunch:</p>
                    {
                        this.state.lunch.map( (val, key)=> {
                            return <div key={key}>{val}<button data-key={key} data-type="lunch" onClick={this.removeMeal}>DELETE</button></div>
                        })
                    }
                </div>
                
                <div>
                    <p>Dinner:</p>
                    {
                        this.state.dinner.map( (val, key)=> {
                            return <div key={key}>{val}<button data-key={key} data-type="dinner" onClick={this.removeMeal}>DELETE</button></div>
                        })
                    }
                </div>

            
            </div>
        );
    }

}

export default Planner;