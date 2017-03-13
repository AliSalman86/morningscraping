// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");

var Article = require("./models/Article.js");
var Comment = require("./models/Comment.js")

// set mongoose promise
mongoose.Promise = Promise;

// Initialize Express
var app = express();
var PORT = process.env.PORT || 3030;

// Use of morgan and body-parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Configure the public static directory
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:/dealscrapperdb");
var db = mongoose.connection;

// log any error with mongoose
db.on("error", function(error) {
    console.log(error);
});

db.once("open", function() {
    console.log("Mongoose Connection is Successful!")
});

// Routes:
//========

require("./routes/html-routes.js")(app);
require("./routes/app-routes.js")(app);


app.listen(PORT, function() {
    console.log("Application is listening on port: " + PORT);
});