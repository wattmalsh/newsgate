////////////////////////////////////////////////////////////////////////////////
// BACKGROUND SCRIPT
// Listens for page loading on all tabs and sends the tab (via
// checkUrlAddressContentScript.js) whether the address bar
// url is in the fake site list (but not in the user whitelist)
////////////////////////////////////////////////////////////////////////////////


// DISABLER /////////////////////////////////////////////////////////////////////////////
// Tells content scripts to not kick off process if in disabled state
/////////////////////////////////////////////////////////////////////////////////////////
getDisabledState(function(isDisabled) {
  if (!isDisabled) {
    listener();
  }
});

var listener = function() {
// Listen for any changes to a tab
chrome.tabs.onUpdated.addListener(function (loadTabId, loadChangeInfo) {
  // If it is a 'loading' change.
  if (loadChangeInfo.status === 'loading') {
    console.log('loadChangeInfo', loadChangeInfo);
    // Listen again for any changes to a tab
    chrome.tabs.onUpdated.addListener(function listener(completeTabId, completeChangeInfo) {
      // If the tabId is the same from earlier and it is a 'complete' change.
      if ( completeChangeInfo.status === 'complete' && loadTabId === completeTabId ) {
        console.log('completeChangeInfo', completeChangeInfo);
        // Get the url of this tab.
        chrome.tabs.get(completeTabId, function(tab) {
          var url = filterLinks(tab.url);
          // Grab data from blacklist, userlist and whitelist. Concat blacklist and userlist,
          // filter out data from the whitelist, and check (reduce) if the url is in the
          // resulting list. Send the result to the correct tab via checkUrlContentScript.
          getBlacklist(function(blackList) {
            getUserlist(function(userList) {
             getWhitelist(function(whiteList) {
                chrome.tabs.sendMessage(completeTabId, userList.concat(blackList)
                  .filter(function(obj) {return whiteList.indexOf(obj) === -1;})
                  .reduce(function(pre, cur) {
                    return cur.url === url ? {fake: true, urlObj: cur} : pre;
                  }, {fake: false}));
              });
            });
          });
        // Close the original listener to prevent duplicate responses.
        chrome.tabs.onUpdated.removeListener(listener);
        });
      }
    });
  }
});
};
