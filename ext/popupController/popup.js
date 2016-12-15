$(document).ready(function(){
   
  // Navigate to settings page in next tab
  $('body').on('click', '#settings', function(){
    chrome.tabs.query({
      active: true
    }, tabs => {
      let index = tabs[0].index;
      chrome.tabs.create({
        url: $(this).attr('href'),
        index: index + 1
      });
    });
    return false;
  });

  // Add current url in active tab to userlist
  $('body').on('click', '#addToBlacklist', function() {
    getCurrentTabUrl(function(url) {
      var domain = filterLinks(url);
      updateBlacklist([domain], 'userGeneratedBlacklist');
    });
  });

  $('body').on('click', '#removeFromBlacklist', function(){
   
  });
});

function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // One tab available in active window array
    var tab = tabs[0];
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // tabs is required to see info for other tabs
    callback(url);
  });
}
