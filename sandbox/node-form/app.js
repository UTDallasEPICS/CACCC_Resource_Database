var express = require("express");
var app = express();
var port = 3001;

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/test");

var nameSchema = new mongoose.Schema({
 resourceType: String,
 resourceName: String,
 resourcePhone: String,
 resourceAddress: String,
 resourceCity: String,
 resourceState: String,
 resourceZip: String,
 resourceHours: String,
 resourceWebsite: String,
 resourceServices: String,
 resourceLink: String
});

var User = mongoose.model("user", nameSchema);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
 res.sendFile(__dirname + "/index.html");
});

app.post("/addname", (req, res) => {
 var myData = new User(req.body);
 myData.save()
 .then(item => {
 res.send("item saved to database");
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
});

app.listen(port, () => {
 console.log("Server listening on port " + port);
});
