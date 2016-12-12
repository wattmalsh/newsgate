var expanderController = require('../controllers/expanderController.js');
var newsController = require('../controllers/newsController.js');
var watsonController = require('../watson/watsonController.js');
const googleTrends = require('../trends/googleTrends');
const twitterSearch = require('../trends/twitterTrends');

module.exports = function (app, express) {

  app.post('/api', [expanderController.expandURL,
                    newsController.isFakeNews,
                    watsonController.getTitle,
                    watsonController.getKeywords,
                    twitterSearch.getTweetsOnTopic,
                    googleTrends.getGoogleTrends
                    ], function(req,res,next){
    res.json(res.compoundContent);
  });
  app.post('/api/ext', newsController.isFakeNews , function(req,res,next){
    res.json(res.compoundContent);
  });
  app.post('/apitest', watsonController.getTitle);
  app.get('/api/googleTrends', googleTrends.getGoogleTrends);
  app.get('/twitter', twitterSearch.getTweetsOnTopic);
};

// newsController.isFakeNews depends on nothing
// watson.getTitle depends on nothing
// googleTrends.getGoogleTrends (input = title from watson) depends on watson.getTitle
// twitterSearch.getTweetsOnTopic (input = title from watson) depends on watson.getTitle
