const mongoose = require('mongoose');

// connect to the local mongoDB at port 27017
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true}, (err) => {
    if(!err) { console.log("Mongo started up!")}
    else { console.log("Error in DB Connection : " + err)}
});

//the schema file is required for mongoDB
require('./resource.model');
