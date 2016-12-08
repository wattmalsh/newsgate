var Twitter = require('twitter');
var Promise = require('bluebird');
var keys = require('./twitterAPIKey');
var bodyParser = require('body-parser');

var emerson = new Twitter({
  'consumer_key': keys.consumer_key,
  'consumer_secret': keys.consumer_secret,
  'access_token_key': keys.access_token_key,
  'access_token_secret': keys.access_token_secret
});

emerson = Promise.promisifyAll(emerson);

exports.getTweetsOnTopic = function(req, res) {
  // var keywords = req.body.keywords;
  emerson.getAsync('search/tweets', {q: 'rigged elections', result_type: 'popular', count: 100})
  .then(function(data) {
    console.log(data);
    res.send(data);
  })
  .catch(function(err) {
    console.error('Error with Twitter GET request', err);
  });
};


