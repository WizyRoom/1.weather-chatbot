// Copyright 2015-2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';
var request = require('request');



function getWeather(req, res){

	//console.log(req.body)

	var apiKey = 'cacdf29dc2be47d484a105606152306'


	//INIT VAR
	var message =  req.body.message;
	var bot =      req.body.bot;
	var token =    req.body.token;

	//console.log(bot.mention_text);

	var country = message.body.replace(bot.mention_text , "");
	
	console.log(country);

	var path = 'http://api.apixu.com/v1/current.json?key=' + apiKey + '&q=' + country.trim();

	request.get(
	    path,
	    { 
	    	json: {},
	    	headers: {}
	    },function (error, response, body) {
	    	console.log(response.statusCode)
	    	console.log(error)
	        if (!error && response.statusCode == 200) {
	            console.log(body.current.temp_c)
	            res.status(200).send({'body': "Temp (°C) = " + body.current.temp_c + "°", 'is_reply':true, 'open_sidebar':false});
	        }else{
	        	console.log("error")
	        	res.status(500).send({'body': "server error, conversation not updated", 'status': "error"});
	        }
	    }
	);

}


// [START exports]
module.exports = {
	getWeather: getWeather
};
// [END exports]