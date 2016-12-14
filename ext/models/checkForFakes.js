// expects two arrays: client and blacklist 
/*
[
  {
    url: String,
    rating: ratingSchema,
    createdAt: ISODate object,
    updatedAt: ISODate object
  }
]
*/

// get sites array from renderBlacklistedDOM

chrome.tabs.executeScript(null, { file: '../lib/jquery.min.js'});

var test = function(userlist, blacklist, links) {
  var userlist_storage = {};
  var blacklist_storage = {};
  
  userlist.forEach(function(link) {
    userlist_storage[link] = link;
  });

  blacklist.forEach(function(link) {});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  console.log('BACKGROUND AND CHECK FOR FAKE HAS RECEIVED');
    var x = test();
    sendResponse({data: request.data, test: x});
  }
);



    // console.log(sender.tab ?
    //             "from a content script:" + sender.tab.url :
    //             "from the extension");
    // console.log(request.data);