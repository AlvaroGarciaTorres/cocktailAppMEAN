module.exports = app => {
    const favourites = require("../controllers/favourites.controller.js");
    var router = require("express").Router();

    // Retrieve favourites list by id
    app.get("/api/favourites/:id", favourites.findOne);
    // Update a favourites list with id
    app.put("/api/favourites/:id/:cocktail", favourites.update);
    // Update favourites list with request body
    app.put("/api/favourites/:id", favourites.updateAll);

app.use('/api/shoppingList', router);
};