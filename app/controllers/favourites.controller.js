const { send } = require("process");
const db = require("../models");
const User = require("../models/user.model");
// const User = require("../models/user.model");
const Cocktails = db.cocktails;
const Users = db.user;

exports.findOne = (req, resp) => {
    const id = req.params.id;
    Users.findById(id, { favourites: 1 })
    .then(data => {
        resp.send(data);
    })
    .catch(error => {
        resp.status(500).send({
            message : error.message || "Some error occurred while retrieving the favourites list."
        })
    })
}

exports.update = (req, resp) => {
    const id = req.params.id;
    const cocktail = req.params.cocktail;
    Users.findById(id)
    .then(user => {
        user.favourites.push(cocktail);
        user.update({ favourites: user.favourites })
        .then(data => {
            resp.send({
                message: "Favourites list updated"
            })
        })
        .catch(error => {
            resp.status(400).send({
                message: "Error when updating favourites list"
            })
        })
    })
    .catch(error => {
        resp.status(500).send({
            message: "Error when updating favourites list, maybe user doesn't exist"
        })
    })
}