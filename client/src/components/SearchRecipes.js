import React, { Component } from "react";
import Axios from "axios";

class SearchRecipes extends Component {

    // navigate = (e) => {
    //     e.preventDefault();
    //     browserHistory.push(e.target.name);
    // }
    state= {
        recipes: [],
        recipe: {
            title: "",
            steps: [],
            ingredients: []
        }
    }
    onSubmit = (e) => {
        e.preventDefault();

        let ingredients = e.target.name.value.split(/[\s\W,]+/).slice(0,5).join("%2B");
        console.log(ingredients);

        Axios.get("/getRecipesByIngredients",{
            params: {
                ingredients: ingredients
            }
        }).then((response)=>{
            console.log(response.data);
            this.setState({
                recipes: response.data.length ? response.data : ["No results."]
            })
        })
      

    }

    viewRecipe(e){
        console.log(e.target.id);
        Axios.get("/getRecipeById",{
            params:{
                id: e.target.id
            }
        }).then((response)=>{
            console.log(response.data);
            this.setState({
                recipe: response.data.title ? response.data : {
                    title: "No recipe",
                    steps: [],
                    ingredients: []
                }
            })
        }).catch((err)=>{
            console.log(err);
        })
    }
    

    

    render() {
        return (
           <div className="container-fluid">
                <div className="row text-secondary">
                <form  onSubmit={this.onSubmit}>
                    <textarea name="name" />
                   
                    <input type="submit" value="Search" />
                </form>
            </div>
            <div className="row">
                <ul>
                {
                    this.state.recipes.map((val, key)=>{
                        return (<li key={key}>
                        
                            <div>{val.title}</div>
                            <img src={val.image} alt={val.title}></img>
                            <button onClick={this.viewRecipe} id={val.id} />
                        
                        </li>);
                    })
                }
                </ul>
            </div>
           </div>
        );
    }
}

export default SearchRecipes;