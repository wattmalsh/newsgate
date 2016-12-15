function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    getCurrentTabUrl(function(tabUrl) {
      var url = filterLinks(tabUrl);
      getBlacklist(function(mainList) {
        getUserlist(function(userList) {
          userList.concat(mainList).forEach(function(obj) {
            if (obj.url === url) {
              sendResponse({fake: true});
            }
          });
          sendResponse({fake: false});
        });
      });
      // allow for an asynchronoous response to alertFakeSite listener
      return true;
    });
  }
);
