// initializing various services
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Resource = mongoose.model('resource');
const formidable = require('formidable');
var http = require('http');
const fs = require('fs');
const path = require('path');
var uploadDir = process.uploadDir;

var processedResourceTypes = [];
//processing resource types array (removing spaces and forcing lowercase)
//we dont do this in the array to begin with for readability on the dropdown box
process.resourceTypes.forEach(value => {
  processedResourceTypes.push(processResourceType(value));
});

function processResourceType(type) {
  return type.replace(/ /g, '').toLowerCase(); //removing all spaces from the requested type & making it non case sensitive
}

//GET request for Uploads
router.get('/uploads/:id', (req, res) => {
  Resource.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("resource/uploads", {
        viewTitle: "Uploads",
        resource: doc,
      });
    }
  });
});
//POST request for Uploads (multipart form needs formidable)
//attachments are saved in the path given by the commandline arg (deafult is "%appdata%/resourceDatabase/assets/attachments")
//each resource creates a folder in that directory with its id as the name
router.post('/uploads', (req, res) => {
  var id;
  var filePath;
  if (!fs.existsSync("tmp")) {
    fs.mkdirSync("tmp");
  }
  const form = formidable.IncomingForm({
    keepExtensions: true,
    uploadDir: "tmp/"
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log("error during attachment form parsing: " + err);
      res.redirect('/uploads/' + id);
    }
    const uploadDirectory = uploadDir + "/" + fields._id;
    id = fields._id;

    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory);
    }

    filePath = uploadDirectory + "/" + files.fileUpload.name;
    const tmpFile = files.fileUpload.path;
    fs.renameSync(tmpFile, filePath);

    //add the new uploaded filename to the record
    Resource.findById(id, (err, resource) => {
      if (err) {
        console.log("error during attachment resource finding (id: " + id + "): " + err);
      }
      else if (resource == null) {
        console.log("resource not found");
      } else {
        resource.resourceFiles.set(files.fileUpload.name.replace(".", ":"), filePath); //mongoose maps cannot have '.' in a key
        resource.save((err, doc) => {
          if (err)
            console.log('Error during attachment insertion: ' + err);
          res.redirect('/resource/uploads/' + id);
        });
      }
    });


  });
});
// GET request for downloading an attachment
router.get('/attachments/:id/:filename', (req, res) => {
  Resource.findById(req.params.id, (err, doc) => {
    if (err) {
      console.log(err);
      return;
    }
    res.download(doc.resourceFiles.get(req.params.filename), (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
});

// GET request for Insert Resource
router.get('/', (req, res) => {
  res.render("resource/addOrEdit", {
    viewTitle: "Insert Resource",
    types: process.resourceTypes
  });
});

// POST request for Insert Resource
router.post('/', (req, res) => {
  if (req.body._id == '')
    insertRecord(req, res);
  else
    updateRecord(req, res);
});

// method to insert record into the database
function insertRecord(req, res) {
  var resource = new Resource();
  resource.resourceType = processResourceType(req.body.resourceType);
  resource.resourceTypeDisplay = req.body.resourceType;
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
  resource.resourceReferrals = 0;
  resource.resourceSuccessPercent = "0%";
  resource.resourceReferralFails = {};
  resource.resourceFiles = {};
  resource.resourceSearchData = req.body.resourceAddress + " " + req.body.resourceWebsite + " " + req.body.resourceName + " " + req.body.resourceType + " " + req.body.resourceZip + " " + req.body.resourceCity;
  resource.save((err, doc) => {
    if (!err)
      res.redirect('resource/list');
    else {
      if (err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render("resource/addOrEdit", {
          resource: req.body,
          types: process.resourceTypes
        });
      }
      else
        console.log('Error during record insertion : ' + err);
    }
  });
}

// method to update a record in the database
function updateRecord(req, res) {
  req.body.resourceSearchData = req.body.resourceAddress + " " + req.body.resourceWebsite + " " + req.body.resourceName + " " + req.body.resourceType + " " + req.body.resourceZip + " " + req.body.resourceCity;


  //updating all normal fields
  req.body.resourceTypeDisplay = req.body.resourceType;
  req.body.resourceType = processResourceType(req.body.resourceType);
  Resource.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
    if (!err) {
      //updating referrals
      //if for some reason the referrals gets corrupted, we will set it back to 0.
      if (isNaN(doc.resourceReferrals)) {
        doc.resourceReferrals = 0;
      }
      if (req.body.resourceReferral != "") {
        //update referrals based on the input
        doc.resourceReferrals += 1;
        if (req.body.resourceReferral != "Successful") {
          if (doc.resourceReferralFails.has(req.body.resourceReferral)) {
            doc.resourceReferralFails.set(req.body.resourceReferral, doc.resourceReferralFails.get(req.body.resourceReferral) + 1);
          }
          else {
            doc.resourceReferralFails.set(req.body.resourceReferral, 1); //first instance of this reason.
          }
        }
        var totalFails = 0;
        for (const fail of doc.resourceReferralFails.values()) {
          totalFails += fail;
        }
        doc.resourceSuccessPercent = (100 - 100 * totalFails / doc.resourceReferrals).toFixed(0) + "%";
      }
      doc.save();
      res.redirect('resource/list');
    }
    else {
      if (err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render("resource/addOrEdit", {
          viewTitle: 'Update Resource',
          resource: req.body,
          types: process.resourceTypes
        });
      }
      else
        console.log('Error during record update : ' + err);
    }
  });


}

// GET request for the full list of resources
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

// GET request for filtering by a resource type
router.get('/list/:type', (req, res) => {
  const type = processResourceType(req.params.type)
  if (!processedResourceTypes.includes(type)) {
    console.log("invalid resource type: " + type);
    return;
  }
  Resource.find({ resourceType: type }, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    else {
      res.render("resource/list", {
        list: result
      });
    }
  })
});

// POST request for searching the mongo database
router.post('/list/search', (req, res) => {
  Resource.find({ resourceSearchData: new RegExp(req.body.resourceSearchData, 'i') }, function (err, docs) { //search is a string that the funcition is searching for, edit as needed
    if (err) {
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

// GET request to update the selected resource
router.get('/:id', (req, res) => {
  Resource.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("resource/addOrEdit", {
        viewTitle: "Update Resource",
        resource: doc,
        types: process.resourceTypes
      });
    }
  });
});

// GET request to delete the selected resource
router.get('/delete/:id', (req, res) => {
  Resource.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      //delete attachments folder for it too
      const folder = uploadDir + "/" + req.params.id;
      //we have to delete all files in the directory before removing it.
      //there will be no nested folders, so only need to worry about files.
      fs.readdirSync(folder).forEach(value => {
        try {
          const filePath = path.join(folder, value);
          fs.unlinkSync(filePath);
        } catch (error) {
          console.log("error in deleting resource file (" + path.join(folder, value) + "): " + error);
        }
      });
      try {
        fs.rmdirSync(folder);
      } catch (error) {
        console.log("error in removing resource directory (" + folder + "): " + error);
      }
      res.redirect('/resource/list');
    }
    else { console.log('Error in resource delete :' + err); }
  });
});

module.exports = router;
