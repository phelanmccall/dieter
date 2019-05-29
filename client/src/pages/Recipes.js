import React, { Component} from "react";
import Axios from "axios";
import AddRecipes from "./AddRecipes";

class Recipes extends Component{

    state = {
        recipes: [],
        add: false
    }

    toggle = (e)=>{
        e.preventDefault();
        this.setState((prevState)=>({
            add: !prevState.add
        }))
    }

    componentDidMount(){
        Axios.get("/myRecipes").then((response)=>{
            console.log(response.data);
        }).catch((err)=>{
            console.log(err);
        })
        
    }

    render(){

        return (
            this.state.add ? 
                <AddRecipes onSave={this.toggle}/>
                :
                <div>
                    <button onClick={
                       this.toggle
                    }>ADD RECIPE</button>
                </div>
        );
    }
}

export default Recipes;