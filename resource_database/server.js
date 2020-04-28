const fs = require('fs');
//mongoDB executable path
var mongoPath = "C:\\Program Files\\MongoDB\\Server\\4.2\\bin\\mongod.exe";
//database directory path
var dbPath = (process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")) + "/resourceDatabase/db/";
//file uploads path
process.uploadDir = (process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")) + "/resourceDatabase/assets/attachments/";
//should we spawn a mongo process?
var startMongo = true;
//processing cmd args
process.argv.forEach((val, index, array) => {
  //changes directory for file uploads
  if (val == "-uploadPath" && process.argv.length > index + 1) {
    if (!fs.existsSync(array[index + 1])) {
      fs.mkdirSync(array[index + 1], { recursive: true });
    }
    process.uploadDir = array[index + 1];
    console.log("upload directory set to: " + array[index + 1]);
  }
  //changes path to mongoDB executable
  if (val == "-mongoPath" && process.argv.length > index + 1) {
    mongoPath = array[index + 1];
    console.log("mongo path set to: " + array[index + 1]);
  }
  //changes where the database files are stored to/read from
  if (val == "-dbPath" && process.argv.length > index + 1) {
    if (!fs.existsSync(array[index + 1])) {
      fs.mkdirSync(array[index + 1], { recursive: true });
    }
    dbPath = fs.realpathSync(array[index + 1]);
    console.log("db path set to: " + array[index + 1]);
  }
  //makes us not start a mongo process ourselves
  if (val == "-dontStartMongo") {
    startMongo = false;
    console.log("startMongo set to: false");
  }
});
//run mongoDB executable
if (startMongo) {
  const childProcess = require('child_process');
  childProcess.execFile(mongoPath, ["--dbpath", dbPath]);
  console.log("command ran: " + mongoPath + " --dbpath " + dbPath);
}


// initialize various services
require('./models/db');
require('./helpers'); //initialize handlebars helpers
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const resourceController = require('./controller/resourceController');
const targetBaseUrl = '/resource/list';
var app = express();
var router = express.Router();

// use bodyparser using express's app object
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());

// use express's object to set views and the dir it points too
app.set('views', path.join(__dirname, '/views/'));

// use express's object to use the handlebars engine for rendering the front-end
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

// express listens on port 3000 of localhost
app.listen(3000, () => {
  console.log('Express server started at port : 3000');
});

// use express's object to use resourceController as the default resource hyperlink
app.use('/resource/', resourceController);

// use express's object to set static path to CSS files
app.use(express.static(path.join(__dirname, '/')));

// any unknown url goes back to the main page
app.get('*', (req, res) => {
  res.redirect(targetBaseUrl);
});
