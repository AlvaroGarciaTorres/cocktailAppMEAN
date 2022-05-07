module.exports = app => {
const shoppingList = require("../controllers/shoppingList.controller.js");
var router = require("express").Router();

// Retrieve shopping list by id
app.get("/api/shoppingList/:id", shoppingList.findOne);
// Update a shopping list with id
app.put("/api/shoppingList/:id", shoppingList.update);

app.use('/api/shoppingList', router);
};