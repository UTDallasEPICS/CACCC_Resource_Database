// requires for outside libs
const http = require('http');
const Express = require('express');

const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

// constant values
const cookie_secret = 'take a hit of this smoke stack';
const cookie_maxAge = 3 * 60 * 60 * 1000; // 3 hours, as milliseconds

const ConfigManager = require('./ConfigManager.js');

// running variables
var sessionParser;
var app;

var http_server;

exports.initialize = async function()
{
	sessionParser = cookieSession({
		name: 'session',
		secret: cookie_secret,
		maxAge: cookie_maxAge
	});

	app = Express();
	app.use(Express.static(rootDirectory + '/public'));
	app.use(sessionParser);	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.set('view engine', 'ejs');

	app.use(function(error, req, res, next) {
		console.log(error);
		res.send("Error 500");
	});

	exports.initializeControllers();

	app.use(function(req, res) {
		res.send("Error 404");
	});

	http_server = http.createServer(app);
	http_server.listen(ConfigManager.get('http_port'));
	console.log("HTTP Server listening on port", ConfigManager.get('http_port'));
};

exports.initializeControllers = function()
{
	var ClientController = require(rootDirectory + '/controllers/ClientController.js');

	app.get('/clientpages', [
		ClientController.fetch
	]);

	app.post('/clients/add', [
		ClientController.add
	]);
};