const db = require("../models");
const Cocktail = db.cocktails;
// Create and Save a new cocktail
exports.create = (req, res) => {
  
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
  
};
