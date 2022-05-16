const express = require("express");
var bodyParser = require("body-parser");
var app = express();
var corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200 
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var cors = require('cors');

app.use(cors());

// parse requests of content-type - application/json
//app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/shoppingList.routes')(app);
require('./app/routes/favourites.routes')(app);
require('./app/routes/cocktails.routes')(app);
require('./app/routes/ingredients.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const dbConfig = require("./app/config/db.config");
const db = require("./app/models");
const Role = db.role;
db.mongoose
.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(dbConfig.CONNECTION_STRING)
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

/*
app.get('/api/cocktails', (request, response) => {
  console.log(request.headers)
    database.collection("Cocktails").find({}).toArray((error, result) => {
        if(error) console.log(error);
        else response.json(result);
    })
})

app.post('/api/cocktails', (request, response) => {

    database.collection('Cocktails').count({}, function(error, numOfDocs){
        if(error) {
            console.log(request.body)
            console.log(error);
        }
        else {
            database.collection("Cocktails").insertOne({
                dateModified: request.body['dateModified'],
                idDrink: request.body['idDrink'],
                strAlcoholic: request.body['strAlcoholic'],
                strCategory: request.body['strCategory'],
                strCreativeCommonsConfirmed: request.body['strCreativeCommonsConfirmed'],
                strDrink: request.body['strDrink'],
                strDrinkAlternate: request.body['strDrinkAlternate'],
                strDrinkThumb: request.body['strDrinkThumb'],
                strGlass: request.body['strGlass'],
                strIBA: request.body['strIBA'],
                strImageAttribution: request.body['strImageAttribution'],
                strImageSource: request.body['strImageSource'],
                strIngredient1: request.body['strIngredient1'],
                strIngredient2: request.body['strIngredient2'],
                strIngredient3: request.body['strIngredient3'],
                strIngredient4: request.body['strIngredient4'],
                strIngredient5: request.body['strIngredient5'],
                strIngredient6: request.body['strIngredient6'],
                strIngredient7: request.body['strIngredient7'],
                strIngredient8: request.body['strIngredient8'],
                strIngredient9: request.body['strIngredient9'],
                strIngredient10: request.body['strIngredient10'],
                strIngredient11: request.body['strIngredient11'],
                strIngredient12: request.body['strIngredient12'],
                strIngredient13: request.body['strIngredient13'],
                strIngredient14: request.body['strIngredient14'],
                strIngredient15: request.body['strIngredient15'],
                strInstructions: request.body['strInstructions'],
                strInstructionsDE: request.body['strInstructionsDE'], 
                strInstructionsES: request.body['strInstructionsES'],
                strInstructionsFR: request.body['strInstructionsFR'],
                strInstructionsIT: request.body['strInstructionsIT'],
                strInstructionsZHHANS: request.body['strInstructionsZHHANS'],
                strInstructionsZHHANT: request.body['strInstructionsZHHANT'],
                strMeasure1: request.body['strMeasure1'],
                strMeasure2: request.body['strMeasure2'],
                strMeasure3: request.body['strMeasure3'],
                strMeasure4: request.body['strMeasure4'],
                strMeasure5: request.body['strMeasure5'],
                strMeasure6: request.body['strMeasure6'],
                strMeasure7: request.body['strMeasure7'],
                strMeasure8: request.body['strMeasure8'],
                strMeasure9: request.body['strMeasure9'],
                strMeasure10: request.body['strMeasure10'],
                strMeasure11: request.body['strMeasure11'],
                strMeasure12: request.body['strMeasure12'],
                strMeasure13: request.body['strMeasure13'],
                strMeasure14: request.body['strMeasure14'],
                strMeasure15: request.body['strMeasure15'],
                strTags: request.body['strTags'],
                strVideo: request.body['strVideo'],
            })
            console.log("Added succesfully");
            response.json("Added succesfully");
        }
    })
})
*/