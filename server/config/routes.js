var newsController = require('../controllers/newsController.js');
var watsonController = require('..watson/watsonController.js')

module.exports = function (app, express) {
  app.post('/api', newsController.isFakeNews);
};
