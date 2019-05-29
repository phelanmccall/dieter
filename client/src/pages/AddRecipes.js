import React, { Component } from "react";
import axios from "axios";

class AddRecipes extends Component {
    constructor(props){
        super(props);
        this.onSave = props.onSave
        if(props.recipe){
            let {title, steps, ingredients} = props.recipe;
            this.state = {
                title, steps, ingredients, method: "put"
            }
        }else{
            this.state = {
                title: "",
                ingredients: [],
                steps: [],
                method: "post"
            }
        }

    }
   

    handleSave = (e) =>{
        e.preventDefault();
        axios[this.state.method]("/add/recipe", this.state).then((response)=>{
            console.log(response.data);
        });

        this.onSave(e);
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        let arr = [...this.state[e.target.id], e.target.name.value];
        console.log(e.target.id)
        this.setState({
            [e.target.id]: arr
        }, function(){
            console.log(this.state)
        })
    }

    handleChange = (e) =>{
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        }, function(){
            console.log(this.state)
        })
    }

    render() {
        return (
            <div>
            

                <nav>
                    <div>RECIPES</div>

                    <button onClick={this.handleSave}>Save</button>
                </nav>  

                <form>
                    <label>Title: </label>
                    <input name="title" onChange={this.handleChange} value={this.state.title}></input>
                </form>

                <form id="ingredients" onSubmit={this.handleSubmit}>
                    <label>Add Ingredient</label>
                    <input name="name"></input>
                    <input type="submit"></input>
                </form>

                <ul>
                    {
                        this.state.ingredients.map(function(val, key){
                            return <li key={key}>{val}</li>
                        })
                    }
                </ul>

                <form id="steps" onSubmit={this.handleSubmit}>
                    <label>Add step</label>
                    <input name="name"></input>
                    <input type="submit"></input>
                </form>

                <ol>
                    {
                        this.state.steps.map(function(val, key){
                            return <li key={key}>{val}</li>
                        })
                    }
                </ol>

            </div>
        );
    }
}

export default AddRecipes;