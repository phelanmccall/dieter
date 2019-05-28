import React, { Component } from "react";

class Recipes extends Component {

    render() {
        return (
            <div>
                <div>RECIPES</div>

                <form method="post" path="/add/ingredient">
                    <label>Add Ingredient</label>
                    <input name="name"></input>
                    <input type="submit"></input>
                </form>

                <form method="post" path="/add/recipe">
                    <label>Add Recipe</label>
                    <label>Name</label>
                    <input name="name"></input>
                    <input type="submit"></input>
                </form>
            </div>
        );
    }
}

export default Recipes;