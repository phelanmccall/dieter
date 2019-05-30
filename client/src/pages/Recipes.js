import React, { Component} from "react";
import Axios from "axios";
import AddRecipes from "./AddRecipes";
// import AddRecipes from "./AddRecipes";

class Recipes extends Component{

    state = {
        recipes: [],
        
        add: false
    }

    toggle = (e) =>{
        e.preventDefault();
        this.setState((prevState)=>({
            add: !prevState.add
        }))
    }

    componentDidMount(){
        Axios.get("/myRecipes").then((response)=>{
            console.log(response.data);
            this.setState({
                recipes: response.data
            })
        }).catch((err)=>{
            console.log(err);
        })
        
    }

    render(){
        console.log(this.state.add);

        return (
            
            this.state.add ? 
                <AddRecipes onSave={this.toggle} recipe={this.state.selected}/>
            :
                <div>
                    <button onClick={
                       this.toggle
                    }>ADD RECIPE</button>

                    {
                        this.state.recipes.map((val, key) =>{
                            return <button onClick={(e)=>{
                                e.preventDefault();
                                console.log(e.target);
                                this.setState({
                                    selected: this.state.recipes[e.target.id]
                                },()=>{
                                    this.toggle(e);
                                })
                            }} id={key} key={key}>{val.title}</button>
                        })
                    }
                </div>
        );
    }
}

export default Recipes;