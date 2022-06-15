
const { resolve } = require("path/posix");
const db = require("../models");
const Ingredient = require("../models/ingredients.model");
const Cocktail = db.cocktails;

// Create and Save a new cocktail
exports.create = (req, res) => {

  //Check cocktail already existed
  Cocktail.findOne({ strDrink: req.body.strDrink })
  .then(data => {
    if(data != null){
      res.status(400).send({
        message: "Cocktail already registered"
      });
      return;
    }

    //Register ingredients by id reference
    const ingredients = req.body.strIngredients;
    let promises = [];
    ingredients.map(ingredient => {
      promises.push(Ingredient.findOne({strIngredient: ingredient})
        .then((data) => {
          if(data !== null){
            ingredient = data._id.toString();
            return ingredient;
          }

          //Creates new ingredient if not found
          return Ingredient.insertMany({strIngredient: ingredient})
          .then((data) => {
            return data._id.toString();
          })
          .catch(err => {
            res.status(500).send({
              message: "Error when creating new ingredient"
            })
          })

        })
        .catch(err => {
          res.status(500).send({
            message: "Error when searching for ingredients"
          })
        })
      )
    })

    Promise.all(promises).then((data) => {
      req.body.strIngredients = data;
      
      Cocktail.insertMany(req.body)
      .then((data => {
        res.send({message: "Cocktail added successfully"}) 
      }))
      .catch(err => {
        res.status(500).send({
          message: "Error when inserting new cocktail in database"
        }) 
      })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      })
    })
  })
  .catch(err => {
    res.status(500).send({
      message: "Error when checking if cocktail is already registered"
    });
    return
  })
};

// Retrieve all cocktails from the database.
exports.findAll = (req, res) => {
    Cocktail.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving the cocktails."
        });
      });
};
// Find a single cocktail with an id
exports.findOne = (req, res) => {
  
};
// Update a cocktail by the id in the request
exports.update = (req, res) => {
  
};
// Delete a cocktail with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all cocktails from the database.
exports.deleteAll = (req, res) => {
  Cocktail.deleteMany()
  .then((data) => {
    res.send({message: `${data.deletedCount} cocktails were deleted`})
  })
  .catch(err => {
    res.status(500).send({message: err.message})
  })
};
