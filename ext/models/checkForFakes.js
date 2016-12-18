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

var filterLinks = function(unfilteredLink) {
  var domain = unfilteredLink.replace(/^https?:\/\//,''); // Strip off https:// and/or http://
  domain = domain.replace(/^(www\.)/,''); // Strip off www.
  domain = domain.replace(/^(\/*)/, ''); // Strip off any // remaining
  domain = domain.split('/')[0]; // Get the domain and just the domain (not the path)
  domain = domain.split('.').slice(-2).join('.'); // remove prefixes ie: mail.google.com to google.com
  domain = (domain + '%').split('%')[0];
  return domain;
};

var filterFakes = function(userlist, blacklist, whitelist, links) {
  var userlist_storage = {};
  var blacklist_storage = {};
  var whitelist_storage = {};
  var results = {
    'blacklist': {},
    'whitelist': {}
  };
  // { google.com: {bias: 'hrkdkd'}}
  userlist.forEach(function(link) {
    userlist_storage[link] = {
      url: link,
      bias: 'userAdded'
    };
  });

  blacklist.forEach(function(link) {
    blacklist_storage[link.url] = {
      url: link.url,
      bias: link.rating.type
    };
  });

  whitelist.forEach(function(link) {
    whitelist_storage[link] = {
      url: link,
      bias: 'whiteList'
    };
  });

  links.forEach(function(href) {
    if (href in userlist_storage && !_.contains(whitelist, href)) {
      results.blacklist[href] = userlist_storage[href].bias;
    }
    if (href in blacklist_storage && !_.contains(whitelist, href)) {
      results.blacklist[href] = blacklist_storage[href].bias;
    }
    if (_.contains(whitelist, href)) {
      results.whitelist[href] = whitelist_storage[href].bias;
    }
  });
  // { blacklist: { google.com: 'evil' }, whitelist: { duckduckgo.com: 'whitelist'}}

  return results; // results is an object { google.com: { url: google.com, bias: 'evil' }}
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.data) {
    checkForFakes(request, function(result) {
      sendResponse(result);
    });
  }
  return true;
});


function checkForFakes(request, callback) {
  var blacklist;
  var userlist;
  var whitelist;
  getBlacklist(function(blacklistResults) {
    blacklist = blacklistResults;
    getUserlist(function(userlistResults) {
      userlist = userlistResults;
      getWhitelist(function(whitelistResults) {
        whitelist = whitelistResults;

        var fakeDOMLinks = filterFakes(userlist, blacklist, whitelist, request.data);
        fakeDomains = Object.keys(fakeDOMLinks['blacklist']).length;

        setDomainCountDataTo(fakeDomains);

        callback({ data: fakeDOMLinks });
      })
    });
  });
};

// function returnLength () {
//   return fakeDomains;
// }
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
      // console.log('SHORT URL USED IN GRABBING...', shortUrl);
    }
  });
};

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name === 'shorts');
  port.onMessage.addListener(function(request) {
    request.data.forEach(function(shortLink) {
      grabUnshortenedUrl(shortLink, function(longLink) {
        var filteredLongLink = filterLinks(longLink)
        // console.log('RUNNING CHECK FOR FAKES IN SHORT LINK');
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
