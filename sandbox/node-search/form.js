var searchKey;
var form =  document.getElementById('form_');

// var MongoClient = require('mongodb').MongoClient;
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/test");
var url = "mongodb://localhost:27017/";

form.onsubmit = function(e) {
  e.preventDefault();
  searchKey = form.resourceType.value;
  console.log(searchKey);
  this.reset();
};

console.log(searchKey);
mongoose.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  var query = { resourceType: searchkey };
  console.log(searchKey);
  dbo.collection("users").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
