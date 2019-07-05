import React, { Component } from "react";
import Axios from "axios";
import RecipeModal from "../components/RecipeModal";

class SearchRecipes extends Component {

    // navigate = (e) => {
    //     e.preventDefault();
    //     browserHistory.push(e.target.name);
    // }
    state= {
        recipes: [{
            id: 12,
            title:"12",
            steps: ["1","2"],
            ingredients: ["1","2"]
        }],
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
        console.log(e.target.dataset.recipeId);
        Axios.get("/getRecipeById",{
            params:{
                id: e.target.dataset.recipeId
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
                <form className="m-auto btn col-12 col-lg-6" onSubmit={this.onSubmit}>
                    <label>Find recipes by ingredient</label>
                    <br/>
                    <input type="search" className="btn border" name="name" />
                   
                    <input className="btn btn-info" type="submit" value="Search" />
                </form>
            </div>
            <div className="row">
            <RecipeModal recipe={this.state.recipe} refresh={this.props.refresh} />

            </div>
            <div className="row">
           
               {
                    this.state.recipes.map((val, key)=>{
                        return (<div key={key} onClick={this.viewRecipe} data-recipe-id={val.id} data-toggle="modal" data-target="#display" className="col-4 m-1 justify-content-center">
                            
                            <img data-recipe-id={val.id} className="img-fluid" src={val.image} alt={val.title}></img>

                            <h5 data-recipe-id={val.id} className="bg-secondary carousel-caption" style={{"left":"5%","right":"5%", "opacity":"0.5"}}>{val.title}</h5>
                        
                        </div>);
                    })
                }
            </div>
           </div>
        );
    }
}

export default SearchRecipes;