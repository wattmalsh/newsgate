/////////////////////////////////////////////////////////////////////////////
// var filterLinks = function(unfilteredLink) {
//   var domain = unfilteredLink.replace(/^https?:\/\//,''); // Strip off https:// and/or http://
//   domain = domain.replace(/^(www\.)/,''); // Strip off www.
//   domain = domain.replace(/^(\/*)/, ''); // Strip off any // remaining
//   domain = domain.split('/')[0]; // Get the domain and just the domain (not the path)
//   domain = domain.split('.').slice(-2).join('.'); // remove prefixes ie: mail.google.com to google.com
//   return domain;
// };
/////////////////////////////////////////////////////////////////////////////

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
      chrome.extension.getBackgroundPage().console.log(url, '...url');
      // chrome.extension.getBackgroundPage().console.log(filterLinks);
      var domain = chrome.extension.getBackgroundPage().filterLinks(url);
      
      chrome.extension.getBackgroundPage().console.log(domain, '...domain');
      
      chrome.extension.getBackgroundPage().console.log(
        chrome.extension.getBackgroundPage().updateBlacklist, 'UPDATEBLACKLIST'
      )

      chrome.extension.getBackgroundPage().updateBlacklist([url], 'userGeneratedBlacklist');

      chrome.extension.getBackgroundPage().console.log('successfully inserted');
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
};

console.log('POPUP DONE');
