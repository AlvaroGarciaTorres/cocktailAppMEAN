const mongoose = require("mongoose");
const cocktailsModel = require("./cocktails.model");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    favourites: [ String
    ],
    shoppingList: [{ 
      ingredientName: {type: String}, 
      disabled: {type: Boolean}
    }]
  })
);
module.exports = User;