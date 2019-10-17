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

    resource.save((err, doc) => {
        if (!err)
            res.redirect('resource/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("resource/addOrEdit", {
                    viewTitle: "Insert Resource",
                    resource: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
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

router.get('/list/educational-resources', (req, res) => {
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

router.get('/list/community-resource-contacts', (req, res) => {
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
