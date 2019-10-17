var express = require("express");
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/test';
var mainDB = 'test'; // name of dataBase
var collec = 'users'; // nmae of colllection
var str = "";

str = "<table style=\"width:100%\"> \n";
str = str + " <tr><th>Resource:</th><th>Zipcode</th></tr> \n";

MongoClient.connect(url, function(err, db)  {
      var dataBase = db.db(mainDB);
      var cursor = dataBase.collection(collec).find();
      //noinspection JSDeprecatedSymbols
      cursor.each(function(err, item) {
        if (item != null) {
            str = str + "<tr> <th> " + item.resourceType + " </th> <th> " + item.resourceName +" </th> </tr>\n";
            }
        })
    db.close();
}); //Creates outputstring on running of the app

app.route('/').get(function(req, res)

    {
        str = str + " </table>\n";
        res.send(str);
    }); // prints table

var server = app.listen(3002, function() {});
