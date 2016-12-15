var News = require('../models/newsModel.js');
var url = require('url');

var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports = {
  isFakeNews: function (req, res, next) {
    if (req.body.url) {
      var domain = req.body.url.replace(/^https?:\/\//,''); // Strip off https:// and/or http://
      domain = domain.replace(/^www\./,''); // Strip off www.
      domain = domain.split('/')[0]; // Get the domain and just the domain (not the path)
      if (domain) {
        News
        .find({ url: domain})
        .exec(function (err, url) {
          if (err) {
            sendJSONresponse(res, 500, err);
            return;
          } else if (url.length === 0) {
            url.push( {
              url: domain,
              rating: {
                  "score" : 0,
                  "type" : "ok",
                  "algorithm" : "v0"
              }
            });
          }
          //sendJSONresponse(res, 200, url);
          res.compoundContent = res.compoundContent || {};
          res.compoundContent['fake'] = url[0];
          next();
        });
      } else {
        console.log('No url specified');
        sendJSONresponse(res, 404, {
          "message": "Malformed url in request"
        });
      }
    } else {
      sendJSONresponse(res, 400, { "message": "no url in request" });
      return;
    }

  }
};
