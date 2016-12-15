
const extControllerDateFilter = require('../extController/dateFilter.js');

module.exports = function (app, express) {

  //CHROME EXTENSION REQUEST HANDLERS
  app.post('/dateFilter', extControllerDateFilter.dateFilter);
};
