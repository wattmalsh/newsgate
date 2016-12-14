var getBlacklist = function(callback) {
  // TO DO
  
  var results = [
    {
      url: 'americannews.com',
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
  var cache = {};
  var results = [];
  
  userlist.forEach(function(link) {
    userlist_storage[link.url] = link.url;
  });

  blacklist.forEach(function(link) {
    blacklist_storage[link.url] = link.url;
  });

  links.forEach(function(href) {
    if (href in userlist_storage || href in blacklist_storage && !(href in cache)) {
      results.push(href);
      cache[href] = href;
    }
  });
  console.log(userlist);
  console.log(blacklist);
  return results;
};

var sendResponse = function(request, sender, sendResponse) {
  var blacklist;
  var userlist;

  getBlacklist(function(blacklistResults) {
    blacklist = blacklistResults;
    getUserlist(function(userlistResults) {
      userlist = userlistResults;
      var fakeDOMLinks = filterFakes(userlist, blacklist, request.data);
      console.log({data: fakeDOMLinks});
    });
  });
};

// sendResponse({data: ['americannews.com', 'google.com', 'google.com']});

var shorts = [
  'bit.do', 'bit.ly', 'cutt.us', 'goo.gl', 'ht.ly', 'is.gd', 'ow.ly',
  'po.st', 'tinyurl.com', 'tr.im', 'trib.al', 'u.to', 'v.gd', 'x.co'
];
// var domain = 'http://www.//bid.do/asdsa/asdasd/asd/asdaddas/asda';
// console.log(filterLinks(domain));