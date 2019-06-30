import React, { Component } from "react";

class RecipeModal extends Component {



    render() {
        return (
            <div className="modal fade" id="display" role="dialog">
            <div className="modal-dialog">

                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title m-auto">{this.props.recipe.title}</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>

                    </div>
                    <div className="modal-body">
                        <div>Ingredients:</div>
                        <ul>
                            {
                                this.props.recipe.ingredients.map((val, key) => {
                                    return <li key={key}>{val}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="modal-body">
                        <div>Steps:</div>
                        <ol>
                            {
                                this.props.recipe.steps.map((val, key) => {
                                    return <li key={key}>{val}</li>
                                })
                            }
                        </ol>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>

        );
    }
}

export default RecipeModal;