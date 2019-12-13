const mongoose = require('mongoose');

// schema of the database
var resourceSchema = new mongoose.Schema({
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
 resourceLink: String,
//  used to create search parameters for the database
 resourceSearchData: String 
});

//passed the schema to a mongoose model
mongoose.model('resource',resourceSchema);
