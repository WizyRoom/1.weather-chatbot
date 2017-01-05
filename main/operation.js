'use strict';

var request = require('request');

function getWeather(req, res){

	console.log(req.body)
	//INIT VAR
	var data = 	   req.body;     // Data sent from WizyRoom When Bot mentioned
	var message =  data.message; // Object that contain wizyRoom message details (id, body, owner_id, owner_name, owner_mention_name, domain_id, workroom_id, workroom_name, created, is_reply)
	var bot =      data.bot;     // Chatbot properties (id, mention_text)
	var token =    data.token;   // Chatbot_server.token, used for authorization on Chatbot server
	var apiKey =   'cacdf29dc2be47d484a105606152306'; //Weather API key change it with yours
	var is_reply = true; //if true the message sent by the bot will be a reply to the message recieved

	var country = message.body.replace(bot.mention_text , ""); //Get the country name from message recieved
	
	console.log(country);

	//Prepare path for weather request
	var path = 'http://api.apixu.com/v1/current.json?key=' + apiKey + '&q=' + country.trim();

	//Send request to apixu API and handel response to send result back to Wizyroom
	request.get(
	    path,
	    { 
	    	json: {},   //NO json needed
	    	headers: {} //NO header needed
	    },
	    function (error, response, body) {
	    	console.log(response.statusCode) //IF 200 it mean request worked
	        if (!error && response.statusCode == 200) {
	            console.log(body.current) //This is the response returned from apixu for the country name entred by the user in Wizyroom
	            var replyMsg = "Weather for "+country.trim()+" is: \n"+
	            			   " • Temp(°C) = " + body.current.temp_c + "°\n"+
	            			   " • Condition = " + body.current.condition.text + "\n"+
	            			   " • Humidity  = " + body.current.humidity +"%";
	            res.status(200).send({'body': replyMsg, 'is_reply':is_reply});
	        }else{
	        	console.log("error");
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