//helper function to properly format blacklist
var mongoose = require('mongoose');
var fs = require('fs');
mongoose.connect('mongodb://heroku_z3pg5nvm:b6bla21nua9a0opbmvju1ub1pa@ds133378.mlab.com:33378/heroku_z3pg5nvm/newsgate');var News = require('../server/models/newsModel.js');
var deduped = {};
fs.readFile('./blacklist/blacklist.js', function(err, data){
  if (err) {
    console.log('Error reading from blacklist file: ' + err);
    process.exit();
  } else {
    var blacklist = JSON.parse(data);
    var newsToAdd = blacklist.length;
    var newsAdded = 0;
    blacklist.forEach(function(badSite){
      deduped[badSite.url] = badSite.rating;
      badSite.rating.type = 'fake';
    });
    fs.writeFile('blacklistNew.js', JSON.stringify(deduped), (err) => {
      if (err) throw err;
      console.log('It\'s saved!');
      process.exit();
    });
  }
});
