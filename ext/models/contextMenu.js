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
function clickHandler(info, tab) {
  console.log('I GOT CLICKED BABY');
};
