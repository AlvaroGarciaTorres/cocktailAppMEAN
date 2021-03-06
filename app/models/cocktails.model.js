const mongoose = require("mongoose");

const Cocktails = mongoose.model(
  "Cocktails",
  mongoose.Schema(
    {
        dateModified: String,
        idDrink: String,
        strAlcoholic: String,                
        strCategory: String,               
        strCreativeCommonsConfirmed: String,
        strDrink: String,
        strDrinkAlternate: String,
        strDrinkThumb: String,
        strGlass: String,            
        strIBA: String,          
        strImageAttribution: String,
        strImageSource: String,
        strIngredients: [
          {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'Ingredient'
          }
        ],
        strInstructions: String,
        strInstructionsDE: String, 
        strInstructionsES: String,
        strInstructionsFR: String,
        strInstructionsIT: String,
        strInstructionsZHHANS: String,
        strInstructionsZHHANT: String,
        strIngredientsMeasures: [ String ],               
        strTags: String,           
        strVideo: String    
    },
    { timestamps: true }
  )
);

module.exports = Cocktails;


// dateModified: String,
// idDrink: String,
// strAlcoholic: String,                
// strCategory: String,               
// strCreativeCommonsConfirmed: String,
// strDrink: String,
// strDrinkAlternate: String,
// strDrinkThumb: String,
// strGlass: String,            
// strIBA: String,          
// strImageAttribution: String,
// strImageSource: String,
// Stringredient1: String,
// Stringredient2: String,
// Stringredient3: String,
// Stringredient4: String,
// Stringredient5: String,
// Stringredient6: String,
// Stringredient7: String,
// Stringredient8: String,
// Stringredient9: String,
// Stringredient10: String,
// Stringredient11: String,
// Stringredient12: String,
// Stringredient13: String,
// Stringredient14: String,
// Stringredient15: String,
// strInstructions: String,
// strInstructionsDE: String, 
// strInstructionsES: String,
// strInstructionsFR: String,
// strInstructionsIT: String,
// strInstructionsZHHANS: String,
// strInstructionsZHHANT: String,
// strMeasure1: String,            
// strMeasure2: String,               
// strMeasure3: String,               
// strMeasure4: String,               
// strMeasure5: String,               
// strMeasure6: String,               
// strMeasure7: String,               
// strMeasure8: String,               
// strMeasure9: String,               
// strMeasure10: String,                
// strMeasure11: String,                
// strMeasure12: String,                
// strMeasure13: String,                
// strMeasure14: String,                
// strMeasure15: String,                
// strTags: String,           
// strVideo: String    