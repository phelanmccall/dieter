var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var AuthSchema = new Schema({
  // `title` is required and of type String
  username: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  password: {
    type: String,
    required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var Auths = mongoose.model("Auth", AuthSchema);

// Export the Auths model
module.exports = Auths;
