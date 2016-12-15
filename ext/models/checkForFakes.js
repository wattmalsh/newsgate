// expects two arrays: client and blacklist 
/*
[
  {
    url: 'String',
    rating: ratingSchema,
    createdAt: ISODate object,
    updatedAt: ISODate object
  }
]
*/
var shorts = {
  'bit.do': 'bit.do',
  'bit.ly': 'bit.ly',
  'cutt.us': 'cutt.us',
  'goo.gl': 'goo.gl',
  'ht.ly': 'ht.ly',
  'is.gd': 'is.gd',
  'ow.ly': 'ow.ly',
  'po.st': 'po.st',
  'tinyurl.com': 'tinyurl.com',
  'tr.im': 'tr.im',
  'trib.al': 'trib.al',
  'u.to': 'u.to',
  'v.gd': 'v.gd',
  'x.co': 'x.co'
};

console.log(getBlacklist, 'getBlacklist FUNCTION');
// var getBlacklist = function(callback) {
//   // TO DO
  
//   var results = [
//     {
//       url: 'stackoverflow.com',
//       rating: '',
//       createdAt: '',
//       updatedAt: ''
//     }, {
//       url: 'stackoverflow.com',
//       rating: '',
//       createdAt: '',
//       updatedAt: ''
//     }, {
//       url: 'twitch.tv',
//       rating: '',
//       createdAt: '',
//       updatedAt: ''
//     }
//   ];

//   if (callback) {
//     callback(results);
//   }
// };

// var getUserlist = function(callback) {
//   // TO DO

//   var results = [
//     {
//       url: 'google.com',
//       rating: '',
//       createdAt: '',
//       updatedAt: ''
//     }, {
//       url: 'twitch.com',
//       rating: '',
//       createdAt: '',
//       updatedAt: ''
//     }    
//   ];

//   if (callback) {
//     callback(results);
//   }
// };

var filterLinks = function(unfilteredLink) {
  var domain = unfilteredLink.replace(/^https?:\/\//,''); // Strip off https:// and/or http://
  domain = domain.replace(/^(www\.)/,''); // Strip off www.
  domain = domain.replace(/^(\/*)/, ''); // Strip off any // remaining
  domain = domain.split('/')[0]; // Get the domain and just the domain (not the path)
  domain = domain.split('.').slice(-2).join('.'); // remove prefixes ie: mail.google.com to google.com
  return domain;
};

var filterFakes = function(userlist, blacklist, links) {
  var userlist_storage = {};
  var blacklist_storage = {};
  var results = [];
  userlist.forEach(function(link) {
    userlist_storage[link.url] = link.url;
  });

  blacklist.forEach(function(link) {
    blacklist_storage[link.url] = link.url;
  });
  links.forEach(function(href) {
    if (href in userlist_storage || href in blacklist_storage) {
      results.push(href);
    }
  });
  return results;
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('INSIDE RUNTIME ADDLISTENER', request);
  if (request.data) {
    checkForFakes(request, function(result) {
      sendResponse(result);
    });
    return true;
  }
});

function checkForFakes(request, callback) {
  var blacklist;
  var userlist;

  getBlacklist(function(blacklistResults) {
    blacklist = blacklistResults;
    getUserlist(function(userlistResults) {
      userlist = userlistResults;
      var fakeDOMLinks = filterFakes(userlist, blacklist, request.data);
      console.log(blacklist, '...BLACKLIST');
      console.log(fakeDOMLinks, '...fakeDOMLINKS');
      callback({data: fakeDOMLinks})
      // callback({data: ['google.com']})
    });
  });
}

///////////////////////////////////////////////////////////////////
// Listener for Shortened Links
///////////////////////////////////////////////////////////////////
// https://unshorten.me/json/{short_url}
var grabUnshortenedUrl = function(shortUrl, cb) {
  $.ajax({
    type: 'GET',
    url: 'https://unshorten.me/json/' + shortUrl,
    success: function(data) {
      cb(JSON.parse(data).resolvedURL); // located in updateStorage.js
    },
    error: function(data) {
      console.log('SHORT URL USED IN GRABBING...', shortUrl);
    }
  });
};

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name === 'shorts');
  port.onMessage.addListener(function(request) {
    request.data.forEach(function(shortLink) {
      grabUnshortenedUrl(shortLink, function(longLink) {
        var filteredLongLink = filterLinks(longLink)
        console.log('RUNNING CHECK FOR FAKES IN SHORT LINK');
        checkForFakes({data: [filteredLongLink]}, function(fakeDOMLinks) {
          // check if link was fake (will only be one)
          if (fakeDOMLinks.data[0]) {
            port.postMessage({ data: shortLink });
          }
        })
      });
    });
  });
  return true;
});

