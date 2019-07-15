import React, { Component } from "react";
import Axios from "axios";
import RecipeModal from "../components/RecipeModal";

class SearchRecipes extends Component {

    // navigate = (e) => {
    //     e.preventDefault();
    //     browserHistory.push(e.target.name);
    // }
    state = {
        recipes: [],
        recipe: {
            title: "",
            steps: [],
            ingredients: []
        },
        lastSearch: "",
        phrase: "",
        ing: ""
    }

    saveQuery = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    getByIngredients = (e) => {
        e.preventDefault();
        let offset = "";
        if(parseInt(e.target.id) >= 10){
            offset = "/" + e.target.id;
        }
        let ingredients = this.state.ing.split(/[\s\W,]+/).slice(0, 5).join("%2B"); 
        console.log(ingredients);
        if(e.target.id){

        }
        Axios.get("/getRecipesByIngredients" + offset, {
            params: {
                ingredients: ingredients
            }
        }).then((response) => {
            console.log(response.data);
            this.setState({
                recipes: response.data.length ? response.data : [{
                    title: "No results",
                    image: "https://via.placeholder.com/250x300",
                    id: ""
                }],
                lastSearch: this.getByIngredients
            })
        }).catch((err)=>{
            console.log(err);
            this.setState({
                recipes: [{
                    title: "No results",
                    image: "https://via.placeholder.com/250x300",
                    id: ""
                }]
            })
        })


    }

    getByPhrase = (e) => {
        e.preventDefault();
        let offset = "";
        if(parseInt(e.target.id) >= 10){
            offset = "/" + e.target.id;
        }
        let phrase = this.state.phrase.split(/[\s\W,]+/).slice(0, 5).join("%2B");
        console.log(phrase);

        Axios.get("/getRecipesByPhrase" + offset, {
            params: {
                phrase: phrase
            }
        }).then((response) => {
            console.log(response.data.results);
            this.setState({
                recipes: response.data.results.length ? response.data.results : [{
                    title: "No results",
                    image: "https://via.placeholder.com/250x300",
                    id: ""
                }],
                lastSearch: this.getByPhrase
            })
        }).catch((err)=>{
            console.log(err);
            this.setState({
                recipes: [{
                    title: "No results",
                    image: "https://via.placeholder.com/250x300",
                    id: ""
                }]
            })
        })


    }

    viewRecipe = (e) => {
        console.log(e.target.dataset.recipeId);
        Axios.get("/getRecipeById", {
            params: {
                id: e.target.dataset.recipeId
            }
        }).then((response) => {
            console.log(response.data);
            this.setState({
                recipe: response.data
            })
        }).catch((err) => {
            console.log(err);
        })
    }




    render() {
        return (
            <div className="container-fluid">
                <div className="row text-secondary">

                    <form className="m-auto btn col-12 col-lg-6" onSubmit={this.getByPhrase}>
                        <label>Find recipes by phrase</label>
                        <br />
                        <input type="search" id="phrase" className="btn border" onChange={this.saveQuery} name="name" />

                        <input className="btn btn-info" type="submit" value="Search" />
                    </form>

                    <form className="m-auto btn col-12 col-lg-6" onSubmit={this.getByIngredients}>
                        <label>Find recipes by ingredient</label>
                        <br />
                        <input type="search" id="ing" className="btn border" onChange={this.saveQuery} name="name" />

                        <input className="btn btn-info" type="submit" value="Search" />
                    </form>
                </div>
                <div className="row">
                    <RecipeModal recipe={this.state.recipe} refresh={this.props.refresh} />

                </div>
                <div className="row">

                    {
                        this.state.recipes.map((val, key) => {
                            return (<div key={key} onClick={this.viewRecipe} data-recipe-id={val.id} data-toggle="modal" data-target="#display" className="col-6 col-lg-4">

                                <img data-recipe-id={val.id} className="img-fluid" src={val.image.includes("http") ? val.image : "https://spoonacular.com/recipeImages/" + val.image} alt={val.title}></img>

                                <p data-recipe-id={val.id} className="carousel-caption" style={{ "left": "5%", "right": "5%", "bottom": "0", "background-color": "rgba(0,0,0,.5)" }}>{val.title}</p>

                            </div>);
                        })
                    }
                    {
                        typeof this.state.lastSearch != "string" ? 
                        <div>
                            <button onClick={this.state.lastSearch} id="10" className="btn">1</button > 
                            <button onClick={this.state.lastSearch} id="20" className="btn">2</button > 
                            <button onClick={this.state.lastSearch} id="30" className="btn">3</button > 
                            <button onClick={this.state.lastSearch} id="40" className="btn">4</button > 
                            <button onClick={this.state.lastSearch} id="50" className="btn">5</button >
                        </div> :
                        ""    
                    }

                </div>
                <div>
                    
                </div>
            </div>
        );
    }
}

export default SearchRecipes;
