const mongoose = require("mongoose");


const Ingredient = mongoose.model(
    "Ingredients",
    mongoose.Schema(
        {
            strIngredient: String
        },
        { timestamps: true }
    )
);
    
module.exports = Ingredient;
