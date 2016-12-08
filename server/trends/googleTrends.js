var googleTrends = require('google-trends-api');
//API documentation: https://www.npmjs.com/package/google-trends-api
var bodyParser = require('body-parser');


exports.getGoogleTrends = function(request, response, next) {
  console.log('got request');
  // var keywords = request.body.keywords //array of words
  var keywords = 'trump';
  var timePeriod = {
    // date: '201601', //YYYYMM starting date for how far back to retrieve data
    type: 'day',   //resolution of returned data
    value: 5       //need to figure out what this is...
  }
  googleTrends.trendData({keywords: ['donald trump', 'is obama muslim'], timePeriod: timePeriod})
  .then(function(results) {
    console.log(results);
    response.send(results);
  })
  .catch(function(err) {
    console.error('Error with google trends get request', err);
  });
};
