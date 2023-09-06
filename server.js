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
  app.get("/", (req, res) => {
    res.sendFile("/Users/timmy/crudApp" + "/index.html");
    db.collection("quotes")
      .find()
      .toArray()
      .then((results) => {
        console.log(results);
      })
      .catch((error) => console.log(error));
    res.render("index.ejs", {});
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
