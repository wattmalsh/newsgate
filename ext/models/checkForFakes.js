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

var getBlacklist = function(callback) {
  // TO DO
  
  var results = [
    {
      url: 'stackoverflow.com',
      rating: '',
      createdAt: '',
      updatedAt: ''
    }, {
      url: 'stackoverflow.com',
      rating: '',
      createdAt: '',
      updatedAt: ''
    }
  ];

  if (callback) {
    callback(results);
  }
};

var getUserlist = function(callback) {
  // TO DO

  var results = [
    {
      url: 'google.com',
      rating: '',
      createdAt: '',
      updatedAt: ''
    }
  ];

  if (callback) {
    callback(results);
  }
};

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
    if (href in userlist_storage || href in blacklist_storage || href in shorts) {
      results.push(href);
    }
  });

  return results;
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var blacklist;
  var userlist;

  getBlacklist(function(blacklistResults) {
    blacklist = blacklistResults;
    getUserlist(function(userlistResults) {
      userlist = userlistResults;
      var fakeDOMLinks = filterFakes(userlist, blacklist, request.data);
      sendResponse({data: fakeDOMLinks});
    });
  });
});

///////////////////////////////////////////////////////////////////////////////////////////
// Listener for Shortened Links
///////////////////////////////////////////////////////////////////////////////////////////

// https://unshorten.me/json/{short_url}
// var grabUnshortenedUrl = function(shortUrl, cb) {
//   $.ajax({
//     type: 'get',
//     url: 'https://unshorten.me/json/' + shortUrl,
//     success: function(data) {
//       data
//       cb(data.resolvedUrl); // located in updateStorage.js
//     }
//   });
// };

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   //ASSUMING REQUEST WILL HAVE THE LINK PROPERTY = TO HREF
//   grabUnshortenedUrl(function(unshortened) {
//     sendResponse({url: unshortend});
//     return true;
//   });
// });

