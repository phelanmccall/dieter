var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var PlanSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    breakfast: {
        type: Array,
        required: true
    },
    lunch: {
        type: Array,
        required: true
    },
    dinner: {
        type: Array,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

// This creates our model from the above schema, using mongoose's model method
var Plans = mongoose.model("Plan", PlanSchema);

// Export the Plans model
module.exports = Plans;
