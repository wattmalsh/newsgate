var AlchemyAPI = require('./alchemyapi');
var Promise = require('bluebird');
var alchemyapi = new AlchemyAPI();

exports.watsonTitle = function(req, res, output) {
  alchemyapi.title('url', demo_url, {}, function(response) {
    output['title'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
    relations(req, res, output);
  });
};

