// app.js

// set up ======================================================================
// get all the tools we need
'use strict';
var express    = require('express');
var fs         = require ('fs');
var app        = express();
var operation = require('./main/operation');
var port       = process.env.PORT || 8080;

app.configure(function() {
	// set up our express application
	app.use(express.logger('dev'));
	app.use(express.static(__dirname + '/images'));
	app.use(express.cookieParser());
	app.use(express.urlencoded())
	app.use(express.json())
	app.set('view engine', 'ejs');
});

app.enable('trust proxy');

//BOT HOME PAGE
app.get('/', function (req, res) {
	res.render('index.ejs');
});

//WIZYROOM CHATBOT URL : Data will be posted to this url from Wizyroom (your server url will look like : www.example.com/weather)
app.post('/weather', function(req, res){
	operation.getWeather(req, res)
})

// launch in local ==============================
app.listen(port);
console.log('The magic happens on port ' + port);