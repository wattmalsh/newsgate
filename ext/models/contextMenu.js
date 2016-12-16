chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.text === 'sending element') {
    // console.log(request.href);
    // var domain = filterLinks(request.href) === 'google.com' ? filterGoogleDomain(request.href) : filterLinks(request.href);
    var domain = filterLinks(request.href);
    getWhitelist(function(whitelist) {
      if (_.contains(whitelist, domain)) {
        chrome.contextMenus.update("menu", {'title': 'Remove from Whitelist', 'onclick':removeUrlWhiteListParse});
      } else {
        chrome.contextMenus.update("menu", {'title': 'Add to Whitelist' , 'onclick':addUrlWhiteListParse});
      }
    });
    sendResponse({text: 'yolo'});
  }
  return true;
});

function clickHandler() {
  console.log('OOPS');
};

function removeUrlWhiteListParse(word) {
  var domain = filterLinks(word.linkUrl) === 'google.com' ? filterGoogleDomain(word.linkUrl) : filterLinks(word.linkUrl);
  getWhitelist(function(whitelist) {
    setWhitelistTo(_.filter(whitelist, function(item) {
      return item !== domain;
    })/* optional callback here*/);
  });
};

function addUrlWhiteListParse(word) {
  var domain = filterLinks(word.linkUrl) === 'google.com' ? filterGoogleDomain(word.linkUrl) : filterLinks(word.linkUrl);
  unBlacklist(domain);
};

function filterGoogleDomain(unfilteredLink) {
  var domain = unfilteredLink.split('url=');
  domain = filterLinks(domain[1]);
  domain = domain.split('%')[0];
  return domain;
};

var menu;

chrome.runtime.onInstalled.addListener(function() {
  var context = "link";
  var title = "Add to Whitelist";
  chrome.contextMenus.create({
    "id": "menu",
    "title": title,
    "contexts": [context],
    "onclick" : clickHandler
  });
});



