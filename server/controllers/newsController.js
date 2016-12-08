var News = require('../models/newsModel.js');
var url = require('url');
// var testData = require('../test/loadTestData.js');

var sendJSONresponse = function (res, status, content) {
	res.status(status);
	res.json(content);
}

module.exports = {
  isFakeNews: function (req, res, next) {
    // parse domain from url
    // just trims 
    var domain = req.body.url.slice(4);
  	domain = domain.split('/')[0];

  	if (domain) {
	  	News
	  		.find({ url: domain})
	  		.exec(function (err, url) {
	  			if (!url) {
	  				sendJSONresponse(res, 404, { 
	  					"message": "url not found"
	  				});
	  				return;
	  			} else if (err) {
	  				sendJSONresponse(res, 404, err);
	  				return;
	  			}
	  			sendJSONresponse(res, 200, url);
	  		});
  	} else {
  		console.log('No url specified');
  		sendJSONresponse(res, 404, {
  			"message": "no url in request"
  		});
  	}
  }
};