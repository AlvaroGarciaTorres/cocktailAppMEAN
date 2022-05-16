module.exports = app => {
    const ingredient = require("../controllers/ingredients.controller");
    var router = require("express").Router();

    //Add ingredient
    app.post("/api/ingredients/", ingredient.create);
    app.post("/api/ingredients/createMany", ingredient.createMany);

    //Get ingredient
    router.get("/:id", ingredient.getById);

    app.use("/api/ingredients", router)
}