var newsController = require('../controllers/newsController.js');

module.exports = function (app, express) {
  app.post('/api', newsController.isFakeNews);
};
