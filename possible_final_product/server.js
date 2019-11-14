// initialize various services
require('./models/db');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const resourceController = require('./controller/resourceController');
var app = express();

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
app.use('/resource',resourceController);

// use express's object to set static path to CSS files
app.use(express.static(path.join(__dirname, '/')));