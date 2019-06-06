import React, { Component } from "react";
import Axios from "axios";
import AddRecipes from "./AddRecipes";
import Navbar from "../components/Navbar";

class Recipes extends Component {

    state = {
        recipes: [{title:"title",id:"id"},{title:"title",id:"id"},{title:"title",id:"id"},{title:"title",id:"id"},{title:"title",id:"id"},{title:"title",id:"id"},{title:"title",id:"id"},{title:"title",id:"id"},{title:"title",id:"id"},{title:"title",id:"id"},{title:"title",id:"id"},{title:"title",id:"id"}],

        add: false
    }

    toggle = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            add: !prevState.add
        }))
    }

    updateRecipes = () => {
        Axios.get("/myRecipes").then((response) => {
            console.log(response.data);
            this.setState({
                recipes: response.data
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    componentWillMount() {
        this.updateRecipes();

    }

    render() {
        console.log(this.state.add);

        return (
            <div className="container-fluid">
                <Navbar />

                {
                    this.state.add ?
                        <AddRecipes onSave={this.toggle} refresh={this.updateRecipes} recipe={this.state.selected} />
                        :
                        <div>
                            <button className="btn btn-success m-3" onClick={
                                this.toggle
                            }>ADD</button>

                            {
                                this.state.recipes.map((val, key) => {
                                    return <button className="btn btn-outline-dark m-3" onClick={(e) => {
                                        e.preventDefault();
                                        console.log(e.target);
                                        this.setState({
                                            selected: this.state.recipes[e.target.id]
                                        }, () => {
                                            this.toggle(e);
                                        })
                                    }} id={key} key={key}>{val.title}</button>
                                })
                            }
                        </div>
                }
            </div>
        );
    }
}

export default Recipes;