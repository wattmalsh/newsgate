// Loads a blacklist to the database
// Run this file via "npm run blacklist"
var mongoose = require('mongoose');
var fs = require('fs');
mongoose.connect('mongodb://localhost/newsgate');
var News = require('../server/models/newsModel.js');

fs.readFile('./blacklist/blacklist.js', function(err, data){
  if (err) {
    console.log('Error reading from blacklist file: ' + err);
    process.exit();
  } else {
    var blacklist = JSON.parse(data);
    var newsToAdd = blacklist.length;
    var newsAdded = 0;
    console.log(newsToAdd + ' known fake news sites to add...');
    blacklist.forEach(function(badSite){
      News.create(badSite, function(err){
        if (err) {
          console.log('Error writing to DB: ' + err);
          process.exit();
        }
        newsToAdd--;
        newsAdded++;
        if (newsToAdd === 0) {
          console.log(newsAdded + ' fake news sites added.');
          News.find(function(err, data){
            process.exit();
          });
        }
      });
    });
  }
});
