import React, { Component } from "react";
import axios from "axios";

class AddRecipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.recipe ? this.props.recipe._id : null,
            title: this.props.recipe ? this.props.recipe.title : "",
            steps: this.props.recipe ? this.props.recipe.steps : [],
            ingredients: this.props.recipe ? this.props.recipe.ingredients : [],
            method: this.props.recipe ? "put" : "post",
            titleErr: null
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
                if (typeof response.data === "string") {
                    this.setState({
                        titleErr: response.data
                    });
                } else {
                    this.props.refresh();
                    this.props.onSave(e);
                }
            });

        }
    }
    handleDelete = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            axios.delete("/delete/recipe/" + this.state.id).then((response) => {
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
    editThis = (e) => {
        e.preventDefault();
        console.log(e.target.nextElementSibling);
        let newEl = document.createElement("textarea");
        newEl.value = e.target.attributes.data.value;
        newEl.className = "btn btn-outline-dark col-6";
        let newButton = document.createElement("button");
        newButton.innerHTML = "Save";
        newButton.name = e.target.name;
        newButton.id = e.target.id;
        newButton.className = "btn btn-outline-dark float-left";
        newButton.onclick = (e3) => {
            console.log("SUBMIT");
            let newArray = this.state[e3.target.name];
            newArray.splice(e3.target.id, 1, newEl.value);
            let newDiv = document.createElement("div");
            newDiv.innerHTML = newEl.value;
            newDiv.className = "btn col-6";
            console.log(newDiv);
            e3.target.parentElement.replaceChild(newDiv, newEl);
            e3.target.setAttribute("data", newEl.value);
            e3.target.innerHTML = "Edit";
            e3.target.onclick = this.editThis;
            newEl.outerHTML = "";

            this.setState({
                [e3.target.name]: newArray
            }, () => {
                console.log(this.state)
            })
        }

        e.target.parentElement.replaceChild(newEl, e.target.nextElementSibling);
        e.target.parentElement.replaceChild(newButton, e.target);


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


                <div className="row">
                    <div className="col-12 my-2">

                        <button className="btn btn-outline-danger float-left" onClick={this.props.onSave}>Cancel</button>
                        <button className="btn btn-outline-success float-right" onClick={this.handleSave}>Save</button>
                    </div>
                </div>

                <div className="border-top border-dark">
                    <label className="btn">Title: </label>
                    <input className="btn btn-outline-dark" name="title" onChange={this.handleChange} value={this.state.title}></input>
                    <br />
                    <div     className="text-danger">{this.state.titleErr}</div >
                </div>

                <form className=" border-top border-dark" id="ingredients" onSubmit={this.handleSubmit}>
                    <label className="btn">Enter Ingredient</label>
                    <input className="btn btn-outline-dark" name="name"></input>
                    <input className="btn btn-outline-dark" type="submit" value="Add"></input>
                </form>

                <div className="row">
                    {
                        this.state.ingredients ? this.state.ingredients.map((val, key) => {
                            return <div className="col-12 justify-content-center" key={key}>
                                <button className="btn btn-outline-dark float-left" name="ingredients" id={key} onClick={this.editThis} data={val}>Edit</button>
                                <div className="btn mx-auto col-6">{val}</div>
                                <button className="btn btn-outline-dark float-right" id={key} onClick={this.deleteItem}>Delete</button>
                            </div>
                        }) : ""
                    }


                </div>



                <form className=" border-top border-dark mt-1" id="steps" onSubmit={this.handleSubmit}>
                    <label className="btn border-top">Enter Step</label>
                    <input className="btn btn-outline-dark" name="name"></input>
                    <input className="btn btn-outline-dark" type="submit" value="Add"></input>
                </form>

                <div className="row">
                    {
                        this.state.steps ? this.state.steps.map((val, key) => {
                            return <div className="col-12 justify-content-center" key={key}>
                                <button className="btn btn-outline-dark float-left" name="steps" id={key} onClick={this.editThis} data={val}>Edit</button>
                                <div className="btn mx-auto col-6">{val}</div>
                                <button className="btn btn-outline-dark float-right" id={key} onClick={this.deleteStep}>Delete</button>
                            </div>
                        }) : ""
                    }
                </div>

                {
                    this.state.method === "put" ? <button className="btn btn-danger" onClick={this.handleDelete}>DELETE</button> : ""

                }
            </div>
        );
    }
}

export default AddRecipes;
