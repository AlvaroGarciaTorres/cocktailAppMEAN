module.exports = app => {
    const ingredient = require("../controllers/ingredients.controller");
    var router = require("express").Router();

    //Add ingredient
    app.post("/api/ingredients/", ingredient.create);

    app.post("/api/ingredients/createMany", ingredient.createMany);

    app.use("/api/ingredients", router)
}