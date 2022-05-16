const dbConfig = require('../config/db.config')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.CONNECTION_STRING;
db.user = require("./user.model");
db.role = require("./role.model");
db.ROLES = ["user", "admin", "moderator"];
db.cocktail = require("./cocktails.model");
db.cocktails = require("./cocktails.model.js");
db.ingredients = require("./ingredients.model");
module.exports = db;