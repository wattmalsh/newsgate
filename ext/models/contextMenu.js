
var clickHandler = function(word) {
  var domain = filterLinks(word.linkUrl) === 'google.com' ? filterGoogleDomain(word.linkUrl) : filterLinks(word.linkUrl);
  if (_.contains(whitelist, domain)) {
      chrome.contextMenus.update(menu, {"title": "Remove from Whitelist", "onclick": removeFromWhitelist});
  } else {
    chrome.contextMenus.update(menu, {"onclick": addToWhitelist});
  }
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
};

var filterGoogleDomain = function(unfilteredLink) {
  var domain = unfilteredLink.split('url=');
  domain = filterLinks(domain[1]);
  domain = domain.split('%')[0];
  return domain;
};

chrome.runtime.onInstalled.addListener(function() {
  var context = "link";
  var title = "Add to Whitelist";
  var menu = chrome.contextMenus.create({
    "id":
    "title": title,
    "contexts": [context],
    "onclick" : clickHandler
  });
  console.log('INSTALLED');
});

// add click event
// The onClicked callback function.
