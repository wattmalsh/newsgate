var fs = require('fs');
var request = require('request');
var mongoose = require('mongoose');
var News = require('../server/models/newsModel.js');

mongoose.connect('mongodb://heroku_z3pg5nvm:b6bla21nua9a0opbmvju1ub1pa@ds133378.mlab.com:33378/heroku_z3pg5nvm/newsgate');

var blacklistFile = './blacklist/blacklist.js';
var blacklistFileOut = './blacklist/blacklist.js';
var blacklistURL = 'https://raw.githubusercontent.com/bs-detector/bs-detector/dev/ext/data/data.json';

request(blacklistURL, function(error, response, body) {
  if (error) {
    console.log('Unable to retrieve blacklist from url ' + error);
    process.exit();
  } else {
    var blacklistFromURL = JSON.parse(body);
    fs.readFile(blacklistFile, function(err, data){
      if (err) {
        console.log('Error reading from blacklist file: ' + err);
        process.exit();
      } else {
        var blacklistFromFile = JSON.parse(data);
        var blacklistURLS = Object.keys(blacklistFromURL);
        var newsToAdd = blacklistURLS.length;
        console.log(newsToAdd + " blacklisted sites found at: \"" + blacklistURL + "\"");
        var newsAdded = 0;
        var newsUpdated = 0;
        blacklistURLS.forEach(function(url){
          if (!blacklistFromFile[url]) {
            // add new to db and to file
            //console.log('new blacklisted site: ' + url);
            var item = {
                          url: url,
                          rating: {
                              "score" : '100',
                              "type" : blacklistFromURL[url].type,
                              "algorithm" : 'v0'
                          }
                       };
            News.create(item, function(err){
              if (err) {
                console.log('Error writing to DB: ' + err);
                process.exit();
              }
              newsToAdd--;
              newsAdded++;
              if (newsToAdd === 0) {
                console.log(newsAdded + ' new fake blacklisted sites added.');
                console.log(newsUpdated + ' blacklisted sites updated.');
                News.find(function(err, data){
                  console.log(data.length + ' blacklisted sites in the database');
                  process.exit();
                });
              }
            });
          } else {
            //udpate update in DB and in file
            News.findOne({ url: url }, function(err, data){
              if (err) {
                console.log('Error reading from DB: ' + err);
                process.exit();
              } else {
                data.rating.score = '100';
                data.rating.type = blacklistFromURL[url].type;
                data.rating.algorithm = 'v0';
                data.save(function (err) {
                  if (err) {
                    console.log('Error saving to DB: ' + err);
                    process.exit();
                  } else {
                    newsToAdd--;
                    newsUpdated++;
                    if (newsToAdd === 0) {
                      console.log(newsAdded + ' new fake blacklisted sites added.');
                      console.log(newsUpdated + ' blacklisted sites updated.');
                      News.find(function(err, newsItems){
                        console.log(newsItems.length + ' blacklisted sites in the database');
                        var outdata = {};
                        newsItems.forEach(function(item){
                          outdata[item.url] = {
                            "score" : item.rating.score,
                            "type" : item.rating.type,
                            "algorithm" : item.rating.algorithm
                          };
                        });
                        fs.writeFile(blacklistFileOut, JSON.stringify(outdata), function(err){
                          if (err) {
                            console.log('error writing blacklist to file: ' + err);
                            process.exit();
                          } else {
                            console.log("Blacklist Updated.");
                            process.exit();
                          }
                        });
                      });
                    }
                  }
                });
              }
            });
          }
        });
      }
    });
  }
});
