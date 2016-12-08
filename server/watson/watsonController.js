var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
	api_key: '/* YOUR API KEY HERE*/'
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

module.exports.getKeywords = function(req, res) {
	var parameters = {
		url: req.body.url, 
		emotion: 1
	}

	alchemy_language.keywords(parameters, function (err, response) {
	  if (err)
	    console.log('error:', err);
	  else
	    console.log(JSON.stringify(response, null, 2));
	})
}