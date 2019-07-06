import React, { Component } from "react";
import Axios from "axios";
import AddRecipes from "./AddRecipes";
import Navbar from "../components/Navbar";
import SearchRecipes from "../components/SearchRecipes";

class Recipes extends Component {

    state = {
        recipes: [],
        selected: {
            title: "",
            ingredients: [],
            steps: []
        },
        add: false
    }

    toggle = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            selected: {},
            add: !prevState.add
        }))
    }

    updateRecipes = () => {
        Axios.get("/myRecipes").then((response) => {
            console.log(response.data);
            this.setState({
                recipes: response.data.length ? response.data : []
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
                        <div className="container-fluid">
                            <div className="row">
                            <button className="btn btn-success col-6 my-3 mx-auto" onClick={(e) => {
                                        e.preventDefault();
                                        console.log(e.target);
                                        this.setState({
                                            selected: {
                                                title: "",
                                                ingredients: [],
                                                steps: []
                                            }
                                        }, () => {
                                            this.toggle(e);
                                        })
                                    }}>ADD</button>
                            </div>
                            <div className="row justify-content-center">
                            {
                                this.state.recipes.map((val, key) => {
                                    return <button className="btn btn-outline-dark btn-info my-1 mx-2 " onClick={(e) => {
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

                            <SearchRecipes refresh={this.updateRecipes} />
                        </div>

                    
                }

            </div>
        );
    }
}

export default Recipes;
