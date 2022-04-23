
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


