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

// get sites array from renderBlacklistedDOM

chrome.tabs.executeScript(null, { file: '../lib/jquery.min.js'});

var filterFakes = function(userlist, blacklist, links) {
  var userlist_storage = {};
  var blacklist_storage = {};
  var results = [];
  
  userlist.forEach(function(link) {
    userlist_storage[link] = link;
  });

  blacklist.forEach(function(link) {
    blacklist_storage[link] = link;
  });

  links.forEach(function(href) {
    if (href in userlist_storage || href in blacklist_storage) {
      results.push(href);
    }
  });

  return results;
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  console.log('BACKGROUND AND CHECK FOR FAKE HAS RECEIVED');
    var x = test();
    sendResponse({data: request.data, test: x});
  }
);