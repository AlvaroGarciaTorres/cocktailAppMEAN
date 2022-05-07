module.exports = app => {
  const cocktails = require("../controllers/cocktails.controller.js");
  var router = require("express").Router();
  // Create a new Tutorial
  //router.post("/", tutorials.create);
  // Retrieve all cocktails
  app.get("/api/cocktails", cocktails.findAll);
  // Retrieve a single Tutorial with id
  //router.get("/:id", tutorials.findOne);
  // Update a Tutorial with id
  //router.put("/:id", tutorials.update);
  // Delete a Tutorial with id
  //router.delete("/:id", tutorials.delete);
  // Create a new Tutorial
  //router.delete("/", tutorials.deleteAll);
  app.use('/api/cocktails', router);
};