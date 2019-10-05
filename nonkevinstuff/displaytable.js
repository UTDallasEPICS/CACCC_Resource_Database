var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/resData';
var str = "";

str = "<table style=\"width:100%\"> \n";
str = str + " <tr><th>Resource:</th><th>Zipcode</th></tr> \n";
MongoClient.connect(url, function(err, db)  {
      var dataBase = db.db('resData');
      var cursor = dataBase.collection('resource').find();
      //noinspection JSDeprecatedSymbols
      cursor.each(function(err, item) {
        if (item != null) {
            str = str + "<tr> <th> " + item.name + " </th> <th> " + item.zip +" </th> </tr>\n";
            }
        })
    db.close();
}); //Creates outputstring on running of the app

app.route('/resource').get(function(req, res)

    {
        str = str + " </table>\n";
        res.send(str);
    }); // prints table

var server = app.listen(3000, function() {});
