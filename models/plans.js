var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

import RecipeSchema from "./recipes";
// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var PlanSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    recipes: {
        type: [RecipeSchema],
        required: true
    }
});

// This creates our model from the above schema, using mongoose's model method
var Plans = mongoose.model("Plans", PlanSchema);

// Export the Plans model
module.exports = Plans;
