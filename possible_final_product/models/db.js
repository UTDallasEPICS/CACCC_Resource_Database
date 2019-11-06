const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true}, (err) => {
    if(!err) { console.log("Mongo started up")}
    else { console.log("Error in DB Connection : " + err)}
});

require('./resource.model');
