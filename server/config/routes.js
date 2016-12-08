var newsController = require('../controllers/newsController.js');
var watsonController = require('../watson/watsonController.js');
const googleTrends = require('../trends/googleTrends');
const twitterSearch = require('../trends/twitterTrends');

module.exports = function (app, express) {
  app.post('/api', newsController.isFakeNews);
  app.get('/api/googleTrends', googleTrends.getGoogleTrends);
  app.get('/twitter', twitterSearch.getTweetsOnTopic);
};
