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
    var response = {fake: false};
    getCurrentTabUrl(function(tabUrl) {
      var url = filterLinks(tabUrl);
      console.log("URL", url);
      getBlacklist(function(blackList) {
        getUserlist(function(userList) {
          getWhitelist(function(whiteList) {
            userList.concat(blackList).filter(function(obj) {return whiteList.indexOf(obj) === -1;}).forEach(function(obj) {
              if (obj.url === url) {
                sendResponse({fake: true});
              }
            });
          });
        });
      });
      // allow for an asynchronoous response to alertFakeSite listener
      return true;
    });
  }
);
