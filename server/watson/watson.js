var AlchemyAPI = require('./alchemyapi');
var Promise = require('bluebird');
var alchemyapi = new AlchemyAPI();

var demo_url = 'http://www.clickhole.com/article/ladies-and-gentlemen-please-log-your-computers-dra-5211';

exports.watsonTitle = function(req, res, output) {
  alchemyapi.title('url', demo_url, {}, function(response) {
    output['title'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
  });
};

