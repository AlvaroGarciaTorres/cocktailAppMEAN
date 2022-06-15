module.exports = app => {
  const cocktails = require("../controllers/cocktails.controller.js");
  var router = require("express").Router();
  // Create a new cocktail
  router.post("/", cocktails.create);
  // Retrieve all cocktails
  app.get("/api/cocktails", cocktails.findAll);
  router.delete("/", cocktails.deleteAll);
  app.use('/api/cocktails', router);
};