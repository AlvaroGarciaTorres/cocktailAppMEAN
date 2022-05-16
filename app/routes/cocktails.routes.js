module.exports = app => {
  const cocktails = require("../controllers/cocktails.controller.js");
  var router = require("express").Router();
  // Create a new cocktail
  router.post("/", cocktails.create);
  // Retrieve all cocktails
  app.get("/api/cocktails", cocktails.findAll);
  // Retrieve a single Tutorial with id
  //router.get("/:id", tutorials.findOne);
  // Update a Tutorial with id
  //router.put("/:id", tutorials.update);
  // Delete a Tutorial with id
  //router.delete("/:id", tutorials.delete);
  // Delete all cocktails
  router.delete("/", cocktails.deleteAll);
  app.use('/api/cocktails', router);
};