var watson = require('watson-developer-cloud');
var watsonKey = require('./watson_api_key.js');
var alchemy_language = watson.alchemy_language({
	api_key: watsonKey.watsonKey
});


module.exports.getTitle = function(req, res) {
	var parameters = {
		url: req.body.url
	}

	alchemy_language.title(parameters, function (err, response) {
	  if (err)
	    console.log('error:', err);
	  else
	    console.log(JSON.stringify(response, null, 2));
	})
}
