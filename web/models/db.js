// can just move this into server.js
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

// connect to the local mongoDB at port 27017
mongoose.connect('mongodb://database:27017/test', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) { 
        console.log("Mongo started up!") 
    }
    else { 
        console.log("Error in DB Connection : " + err) 
    }
});

// the schema file is required for mongoDB
require('./resource.model');