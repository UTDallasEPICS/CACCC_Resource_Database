const mongoose = require('mongoose');

// schema of the database
var resourceSchema = new mongoose.Schema({
    resourceType: String,
    resourceTypeDisplay: String,
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
    resourceReferrals: Number,
    resourceSuccessPercent: String, //% of referrals that are successful.
    //keys are strings for each reason, value is the number of fails for that reason.
    resourceReferralFails: {
        type: Map,
        of: Number
    },
    //  used to create search parameters for the database
    resourceSearchData: String,
    //contains names of all the uploaded files
    //keys are names, values are paths
    resourceFiles: {
        type: Map,
        of: String
    }
});

//passed the schema to a mongoose model
mongoose.model('resource', resourceSchema);
