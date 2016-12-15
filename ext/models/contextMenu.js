
var clickHandler = function(word) {
  if (filterLinks(word.linkUrl) === 'google.com') {
    var domain = filterGoogleDomain(word.linkUrl);
  } else {
    var domain = filterLinks(word.linkUrl);
  }
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
  chrome.contextMenus.create({
    "title": title,
    "contexts": [context],
    "onclick" : clickHandler
  });
  console.log('INSTALLED');
});

// add click event
// The onClicked callback function.
