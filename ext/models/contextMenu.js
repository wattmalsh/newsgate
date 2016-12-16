

var clickHandler = function() {
  console.log('YYAY');
};

var removeFromWhitelist = function(word) {
  var domain = filterLinks(word.linkUrl) === 'google.com' ? filterGoogleDomain(word.linkUrl) : filterLinks(word.linkUrl);
  getWhitelist(function(whitelist) {
    setWhitelistTo(_.filter(whitelist, function(item) {
      return item !== domain;
    })/* optional callback here*/);
  });
};

var addToWhitelist = function(word) {
  var domain = filterLinks(word.linkUrl) === 'google.com' ? filterGoogleDomain(word.linkUrl) : filterLinks(word.linkUrl);
  unBlacklist(domain);
};

var filterGoogleDomain = function(unfilteredLink) {
  var domain = unfilteredLink.split('url=');
  domain = filterLinks(domain[1]);
  domain = domain.split('%')[0];
  return domain;
};

var menu;

chrome.runtime.onInstalled.addListener(function() {
  var context = "link";
  var title = "Add to Whitelist";
  menu = chrome.contextMenus.create({
    "title": title,
    "contexts": [context],
    "onclick" : clickHandler
  });
  console.log('INSTALLED');
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // console.log('GOT MESSAGE');
  if (request.text === 'sending element') {
    // console.log(request.href);
    var domain = filterLinks(request.href) !== 'google.com' ? filterGoogleDomain(request.href) : filterLinks(request.href);
    getWhitelist(function(whitelist) {
      console.log('THIS IS DOMAIN', domain);
      console.log('THIS IS WHITELIST', whitelist);
      if (_.contains(whitelist, domain)) {
        console.log('IT CONTAINS!');
        chrome.contextMenus.update(menu, {'title': 'Remove from Whitelist', 'onclick':removeFromWhitelist});
      } else {
        chrome.contextMenus.update(menu, {'title': 'Add to Whitelist' , 'onclick':addToWhitelist});
      }
    });
    sendResponse({text: 'yolo'});
  }
});


