var express = require("express");
var app = express();
var port = 3005;

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/test");



app.get("/", (req, res) => {
 res.sendFile(__dirname + "/index.html");
});


app.listen(port, () => {
 console.log("Server listening on port " + port);
});
