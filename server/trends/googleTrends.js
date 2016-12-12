var googleTrends = require('google-trends-api');
//API documentation: https://www.npmjs.com/package/google-trends-api
var bodyParser = require('body-parser');


exports.getGoogleTrends = function(req, res, next) {
  console.log('got request');
  // var keywords = request.body.keywords //array of words
  var searchWords = res.compoundContent.keywords.keywords.map(function(word) { return word.text; }).slice(0,4);
  var articleTitle = searchWords.join(' ');

  console.log(searchWords);

  var timePeriod = {
    type: 'day',   //resolution of returned data
    value: 7       //goes back 7 days
  }
  googleTrends.trendData({keywords: [articleTitle].concat(searchWords), timePeriod: timePeriod})
  .then(function(data) {
    res.compoundContent['google'] = data;
    // console.log(data);
    next();
  })
  .catch(function(err) {
    console.error('Error with google trends get request', err);
  });
};
