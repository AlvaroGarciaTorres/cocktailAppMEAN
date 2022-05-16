const db = require("../models");
const Ingredients = db.ingredients;

exports.create = (req, resp) => {
    if(Object.keys(req.body).length === 0 || req.body.strIngredient === undefined){
        resp.status(400).send({message: "Include an ingredient please"});
        return;
    }

    const ingredient = new Ingredients({
        strIngredient: req.body.strIngredient
    });

    ingredient.save((err) => {
        if(err){
            resp.status(500).send({message: err.message});
            return;
        }

        resp.send({message: "Ingredient added succesfully"});
    })
}


exports.createMany = (req, resp) => {
    if(req.body.length === 0){
        resp.status(400).send({message: "Include an ingredient please"});
        return;
    }

    Ingredients.insertMany(req.body);
    resp.send({message: "Ingredient added succesfully"});
}