const db = require("../models");
const Users = db.user;

exports.findOne = (req, res) => {
    const id = req.params.id;
    Users.findById(id, { shoppingList: 1 })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving the shopping list."
        });
    })
}

exports.update = (req, resp) => {
    if(Object.keys(req.body).length === 0){
        return resp.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if(!data){
            resp.status(400).send({
                message: "Could not update shopping list"
            })
        }else{
            resp.send({
                message: "Shopping list updated successfully!"
            })
        }
    })
    .catch(error => {
        resp.status(500).send({
            message:
                error.message || "Some error occurred while updating the shopping list"
        });
    })
}