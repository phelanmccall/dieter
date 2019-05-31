import React, { Component } from "react";
import axios from "axios";

class AddRecipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.recipe ? this.props.recipe._id : "",
            title: this.props.recipe ? this.props.recipe.title : "",
            steps: this.props.recipe ? this.props.recipe.steps : [],
            ingredients: this.props.recipe ? this.props.recipe.ingredients : [],
            method: this.props.recipe ? "put" : "post"
        }
    }


    handleSave = (e) => {
        e.preventDefault();
        console.log(this.props);
        if (this.props.onSave) {
            let { id, title, steps, ingredients } = this.state;
            let recipe = {
                id,
                title,
                steps,
                ingredients
            };
            axios[this.state.method]("/add/recipe", recipe).then((response) => {
                console.log(response.data);
            });
            this.props.refresh();
            this.props.onSave(e);
        }
    }
    handleDelete = (e) => {
        e.preventDefault();
        if(window.confirm("Are you sure you want to delete this recipe?")){
            axios.delete("/delete/recipe/"+ this.state.id).then((response)=>{
                console.log(response.data);
                this.props.refresh();
                this.props.onSave(e);
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let arr = [...this.state[e.target.id], e.target.name.value];
        console.log(e.target.id)
        this.setState({
            [e.target.id]: arr
        }, function () {
            console.log(this.state)
        })
    }

    deleteItem = (e) => {
        e.preventDefault();
        console.log(e.target.id);
        let newArray = this.state.ingredients;
        newArray.splice(e.target.id, 1);
        console.log(newArray);
        this.setState({
            ingredients: newArray
        }, () => {
            console.log(this.state)
        });
    }
    deleteStep = (e) => {
        e.preventDefault();
        console.log(e.target.id);
        let newArray = this.state.steps;
        newArray.splice(e.target.id, 1);
        this.setState({
            steps: newArray
        }, () => {
            console.log(this.state);
        });
    }

    handleChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        }, function () {
            console.log(this.state)
        })
    }

    render() {
        console.log(this.props)
        return (
            <div>


                <nav>

                    <button onClick={this.props.onSave}>Cancel</button>
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
                        this.state.ingredients.map((val, key) => {
                            return <li key={key}>{val} <button id={key} onClick={this.deleteItem}>Delete</button></li>
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
                        this.state.steps.map((val, key) => {
                            return <li key={key}>{val}<button id={key} onClick={this.deleteStep}>Delete</button></li>
                        })
                    }
                </ol>

                    {
                        this.state.method === "put" ? <button className="btn btn-danger" onClick={this.handleDelete}>DELETE</button> : "" 

                    }
            </div>
        );
    }
}

export default AddRecipes;