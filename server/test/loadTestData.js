var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/newsgate');
var News = require('../models/newsModel.js');



for (var i = 0; i < 25; i++) {
  var test = {
    "url": "someurl" + i,
    "rating": {
      "score": (i%2===0) ? 0 | 100,
      "algorithm": "v0"
    }
  };
  News.create( test );
}
