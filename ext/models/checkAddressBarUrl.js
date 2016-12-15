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

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     getCurrentTabUrl(function(tabUrl) {
//       var urlData = $.ajax({
//         url: 'http://localhost:8000/api/ext',
//         type: 'POST',
//         data: {'url': tabUrl},
//         dataType: 'json'
//       })
//       .done(function (json) {
//         var rating = '';
//         if ((json.fake.rating.score + '') === '0') {
//           sendResponse({fake: false});
//         } else if ((json.fake.rating.score + '') === '100') {
//           sendResponse({fake: true});
//         }
//       })
//       .fail(function( xhr, status, errorThrown ) {
//         sendResponse({fake: false});
//         console.log( "Error: " + errorThrown );
//         console.log( "Status: " + status );
//         console.dir( xhr );
//       });
//     });
//     // allow for an asynchronoous response to alertFakeSite listener
//     return true;
//   }
// );
