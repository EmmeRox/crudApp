const express = require("express");
//Body-parser is a middleware
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://emmeocampo:RC0jmoo19apzRu1y@cluster0.ofk6hxs.mongodb.net/?retryWrites=true&w=majority";

//The urlencoded method tells the body-parser to extract date from the form and add them to the body property in the request object. Now you can see the values from the form element inside req.body now

// using callbacks below
//MongoClient.connect(url, (err, client) => {
//  if (err) return console.log(err);
//  console.log("Connected to database");
//});

//Using promises
MongoClient.connect(url).then((client) => {
  console.log("Connected to Database");
  const db = client.db("quote-app");
  const quotesCollection = db.collection("quotes");
  //express request handlers go here bc this is where the db variable is and it is necessary
  //Below tells Express that we will be using EJS as the template engine
  app.set("view engine", "ejs");
  //Make sure to have the body-parser before the CRUD handlers
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(bodyParser.json());
  app.put("/quotes", (req, res) => {
    //the findOneAndUpdate method lets us find and change one item in the database
    //query lets us filter the collaction with key-value pairs
    //update tells mongo what to change
    //options tells mongo to define additional options for this update request
    quotesCollection
      .findOneAndUpdate(
        { name: "Yoda" },
        //$set is a mongo update operator, also there's $inc and $push
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote,
          },
        },
        //below, we are telling mongo to insert a document if no documents can be update, i.e no quotes exist in the database
        {
          upsert: true,
        }
      )
      .then((result) => {
        //STOPPED BELOW, need to figure out why change isn't happening
        console.log(result);
      })
      .catch((error) => console.error(error));
  });
  app.get("/", (req, res) => {
    db.collection("quotes")
      .find()
      .toArray()
      .then((results) => {
        return res.render("index.ejs", { quotes: results });
      })
      .catch((error) => {
        console.log(error);
        return res.sendStatus(500);
      });
  });
  app.post("/quotes", (req, res) => {
    quotesCollection
      .insertOne(req.body)
      .then((result) => {
        res.redirect("/");
      })
      .catch((error) => console.log(error));
  });
  app.listen(3000, function () {
    console.log("listening on 3000");
  });
});
