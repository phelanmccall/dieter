var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var RecipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    steps: {
        type: Array,
        required: true
    },
    user: {
        type: String,
        require: true
    }
});

// This creates our model from the above schema, using mongoose's model method
var Recipes = mongoose.model("Recipe", RecipeSchema);

// Export the Recipes model
module.exports = Recipes;
