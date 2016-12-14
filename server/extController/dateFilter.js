var News = require('../models/newsModel.js');

module.exports.dateFilter = function(req, res) {
  // Plug in the new Date(isotime) with req.body.date
  var date = new Date(JSON.parse(req.body.date));
  News.find({"createdAt" : { $gt : date }})
  .then(function(value) {
    console.log('DONE');
    res.json(value);
  });
};

//"2016-12-14T00:57:22.959Z"