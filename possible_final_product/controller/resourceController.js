const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Resource = mongoose.model('resource');
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/test";

router.get('/', (req, res) => {
    res.render("resource/addOrEdit", {
        viewTitle: "Insert Resource"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var resource = new Resource();
    resource.resourceType = req.body.resourceType;
    resource.resourceName = req.body.resourceName;
    resource.resourcePhone = req.body.resourcePhone;
    resource.resourceAddress = req.body.resourceAddress;
    resource.resourceCity = req.body.resourceCity;
    resource.resourceState = req.body.resourceState;
    resource.resourceZip = req.body.resourceZip;
    resource.resourceHours = req.body.resourceHours;
    resource.resourceWebsite = req.body.resourceWebsite;
    resource.resourceServices = req.body.resourceServices;
    resource.resourceLink = req.body.resourceLink;
    resource.resourceSearchData = req.body.resourceAddress + " " + req.body.resourceWebsite + " "  + req.body.resourceName + " " + req.body.resourceType + " " + req.body.resourceZip + " " + req.body.resourceCity;

    resource.save((err, doc) => {
        if (!err)
            res.redirect('resource/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("resource/addOrEdit", {
                    resource: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    req.body.resourceSearchData = req.body.resourceAddress + " " + req.body.resourceWebsite + " "  + req.body.resourceName + " " + req.body.resourceType + " " + req.body.resourceZip + " " + req.body.resourceCity;
    Resource.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('resource/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("resource/addOrEdit", {
                    viewTitle: 'Update Resource',
                    resource: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Resource.find((err, docs) => {
        if (!err) {
            res.render("resource/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving resource list :' + err);
        }
    });
});

router.get('/list/AdoptionServices', (req, res) => {
Resource.find({resourceType: "Adoption Services"}, function(err, docs){
    if(err){
        console.log(err);
        return
    }
    else {
      res.render("resource/list", {
          list: docs
      });
    }
  })
});

router.get('/list/BasicCareGroups', (req, res) => {
Resource.find({resourceType: "Basic Care Groups"}, function(err, docs){
    if(err){
        console.log(err);
        return
    }
    else {
      res.render("resource/list", {
          list: docs
      });
    }
  })
});

router.get('/list/BehavorialHealth', (req, res) => {
Resource.find({resourceType: "Behavorial Health"}, function(err, docs){
    if(err){
        console.log(err);
        return
    }
    else {
      res.render("resource/list", {
          list: docs
      });
    }
  })
});

router.get('/list/ChildCare', (req, res) => {
Resource.find({resourceType: "Child Care"}, function(err, docs){
    if(err){
        console.log(err);
        return
    }
    else {
      res.render("resource/list", {
          list: docs
      });
    }
  })
});

router.get('/list/ChildSupport', (req, res) => {
Resource.find({resourceType: "Child Support"}, function(err, docs){
    if(err){
        console.log(err);
        return
    }
    else {
      res.render("resource/list", {
          list: docs
      });
    }
  })
});

router.get('/list/CommunityResourceContacts', (req, res) => {
Resource.find({resourceType: "Community Resource Contacts"}, function(err, docs){
    if(err){
        console.log(err);
        return
    }
    else {
      res.render("resource/list", {
          list: docs
      });
    }
  })
});

router.get('/list/DisabilityAssistance', (req, res) => {
Resource.find({resourceType: "Disability Assistance"}, function(err, docs){
    if(err){
        console.log(err);
        return
    }
    else {
      res.render("resource/list", {
          list: docs
      });
    }
  })
});

router.get('/list/DrugsAndAlcohol', (req, res) => {
Resource.find({resourceType: "Drug & Alcohol Resources"}, function(err, docs){
    if(err){
        console.log(err);
        return
    }
    else {
      res.render("resource/list", {
          list: docs
      });
    }
  })
});

router.get('/list/EducationalResources', (req, res) => {
Resource.find({resourceType: "Educational Resources"}, function(err, docs){
    if(err){
        console.log(err);
        return
    }
    else {
      res.render("resource/list", {
          list: docs
      });
    }
  })
});

router.get('/list/EmergencyHousing', (req, res) => {
Resource.find({resourceType: "Emergency Housing"}, function(err, docs){
    if(err){
        console.log(err);
        return
    }
    else {
      res.render("resource/list", {
          list: docs
      });
    }
  })
});

router.get('/list/EthnicAndDiversityResources', (req, res) => {
Resource.find({resourceType: "Ethnic & Diversity Resources"}, function(err, docs){
    if(err){
        console.log(err);
        return
    }
    else {
      res.render("resource/list", {
          list: docs
      });
    }
  })
});

router.get('/list/FinancialAssistance', (req, res) => {
Resource.find({resourceType: "Financial Assistance"}, function(err, docs){
    if(err){
        console.log(err);
        return
    }
    else {
      res.render("resource/list", {
          list: docs
      });
    }
  })
});

router.get('/list/FoodPantries', (req, res) => {
Resource.find({resourceType: "Food Pantries"}, function(err, docs){
    if(err){
        console.log(err);
        return
    }
    else {
      res.render("resource/list", {
          list: docs
      });
    }
  })
});

router.get('/list/JobAssistance', (req, res) => {
Resource.find({resourceType: "Job Assistance"}, function(err, docs){
    if(err){
        console.log(err);
        return
    }
    else {
      res.render("resource/list", {
          list: docs
      });
    }
  })
});

router.get('/list/LegalInformation', (req, res) => {
Resource.find({resourceType: "Legal Information"}, function(err, docs){
    if(err){
        console.log(err);
        return
    }
    else {
      res.render("resource/list", {
          list: docs
      });
    }
  })
});

router.get('/list/ParentingClasses', (req, res) => {
Resource.find({resourceType: "Parenting Classes"}, function(err, docs){
    if(err){
        console.log(err);
        return
    }
    else {
      res.render("resource/list", {
          list: docs
      });
    }
  })
});

router.get('/list/PetServices', (req, res) => {
Resource.find({resourceType: "Pet Services"}, function(err, docs){
    if(err){
        console.log(err);
        return
    }
    else {
      res.render("resource/list", {
          list: docs
      });
    }
  })
});

router.get('/list/TransportationResources', (req, res) => {
Resource.find({resourceType: "Transportation Resources"}, function(err, docs){
    if(err){
        console.log(err);
        return
    }
    else {
      res.render("resource/list", {
          list: docs
      });
    }
  })
});

router.post('/list/search', (req, res) => {
Resource.find({resourceSearchData: new RegExp(req.body.resourceSearchData, 'i')}, function(err, docs){ //search is a string that the funcition is searching for, edit as needed
    if(err){
        console.log(err);
        return
    }
    else {
      res.render("resource/list", {
          list: docs
      });
    }
  })
});

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Resource.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("resource/addOrEdit", {
                viewTitle: "Update Resource",
                resource: doc
            });
        }
    });
});


router.get('/delete/:id', (req, res) => {
    Resource.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/resource/list');
        }
        else { console.log('Error in resource delete :' + err); }
    });
});

module.exports = router;
