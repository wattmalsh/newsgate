var newsController = require('../controllers/newsController.js');
var watsonController = require('../watson/watsonController.js');
const googleTrends = require('../trends/googleTrends');
const twitterSearch = require('../trends/twitterTrends');

module.exports = function (app, express) {
  app.post('/api', newsController.isFakeNews);
  app.get('/api/googleTrends', googleTrends.getGoogleTrends);
  app.get('/twitter', twitterSearch.getTweetsOnTopic);
};

// newsController.isFakeNews depends on nothing
// watson.getTitle depends on nothing
// googleTrends.getGoogleTrends (input = title from watson) depends on watson.getTitle
// twitterSearch.getTweetsOnTopic (input = title from watson) depends on watson.getTitle
