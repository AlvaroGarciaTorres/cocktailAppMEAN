const db = require("../models");
var ObjectId = require('mongodb').ObjectId; 
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

exports.getById = (req, resp) => {
    const id = req.params.id;
    const o_id = new ObjectId(id.toString());
    if(req.params.id.length === 0){
        resp.status(400).send({message: "Include an ingredient please"});
        return;
    }

    Ingredients.find({_id : ObjectId(id)})
    .then(data => {
        resp.send(data)
    })
}