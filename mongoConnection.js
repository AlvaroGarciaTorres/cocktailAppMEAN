
var Express = require("express");
var bodyParser = require("body-parser");

var app = Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


var cors = require("cors");
app.use(cors());

app.listen(49146, () => {});

app.get("/", (request, response) => {
    response.json('Hello world');
})

var MongoClient = require("mongodb").MongoClient;
const CONNECTION_STRING = "mongodb+srv://root:root@cluster0.68gvx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var DATABASE = "testdb";
var database;

MongoClient.connect(CONNECTION_STRING, {useNewUrlParser: true}, (error, client) => {
    database = client.db(DATABASE);
    console.log("MongoDB Connection succesfull");
});

app.get('/api/department', (request, response) => {
    database.collection("Department").find({}).toArray((error, result) => {
        if(error) console.log(error);
        else response.json(result);
    })
})

app.get('/api/cocktails', (request, response) => {
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

app.post('/api/department', (request, response) => {

    database.collection('Department').count({}, function(error, numOfDocs){
        if(error) console.log(error);
        else {
            database.collection("Department").insertOne({
                DepartmentId: numOfDocs + 1,
                DepartmentName: request.body['DepartmentName']
            })

            response.json("Added succesfully");
        }
    })
})

app.put('/api/department', (request, response) => {

    database.collection("Department").updateOne(
        //Filter criteria
        {
            "DepartmentId": request.body['DepartmentId']
        },
        //Update
        {$set:
            {
                "DepartmentName": request.body['DepartmentName']
            }
        }
    )

    response.json("Updated succesfully");
})

app.delete('/api/department/:id', (request, response) => {

    database.collection("Department").deleteOne(
        {
            'DepartmentId': parseInt(request.params.id)
        }
    )

    response.json("Deleted succesfully");
})


////////////////////////////
// const mongodb = require("mongodb");

// const connectionURL = "mongodb+srv://your-connection-srv-here"
// const dbName = "your_db_name"

// //get MongoClient
// const MongoClient = mongodb.MongoClient;

// let db = null;

// MongoClient.connect(connectionURL,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// },(err,connectedClient) => {
//     if(err){
//         throw err;
//     }
//     //connectedClient will be the connected instance of MongoClient
//     db = connectedClient.db(dbName);
//     //now you can write queries

//     db.collection("your_collection").find({}).toArray()
//     .then(r => {
//         console.log(r);
//     }).catch(e => {
//         console.error(`ERROR:`,e);
//     })

// })


