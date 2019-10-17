var express = require("express");
const bodyParser = require('body-parser');
var app = express();
var port = 3000;
var searchKey1;
var searchKey2;
var MongoClient;
var url = "mongodb://localhost:27017/test";
var str = "";

str = "<table style=\"width:100%\"> \n";
str = str + " <tr><th>Resource Type</th><th>Name</th></tr> \n";

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
 res.sendFile(__dirname + "/index.html");
});

app.post('/search', (req, res) => {
  searchKey1 = req.body.resourceType;
  searchKey2 = req.body.resourceName;
  searchKey3 = req.body.resourcePhone;
  searchKey4 = req.body.resourceAddress;
  searchKey5 = req.body.resourceCity;
  searchKey6 = req.body.resourceState;
  searchKey7 = req.body.resourceZip;
  searchKey8 = req.body.resourceHours;
  searchKey9 = req.body.resourceWebsite;
  searchKey10 = req.body.resourceServices;
  searchKey11 = req.body.resourceLink;
  MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    if (searchKey1 != 0) var query = {resourceType: searchKey1};
    else if (searchKey2 != 0) var query = {resourceName: searchKey2};
    dbo.collection("users").find(query).toArray(function(err, result) {
      if (err) throw err;
      str = str + "<tr> <th> " + result.resourceType + " </th> <th> " + result.resourceName +" </th> </tr>\n";
      res.send(str);
      // res.send(result);
      console.log(result);
      db.close();
    });
  });

});


app.listen(port, () => {
 console.log("Server listening on port " + port);
});
