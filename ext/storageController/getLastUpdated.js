/*

   sample date format
  { date: "2012-12-21T00:57:22.959Z" } // Arbitrary date before app creation date
  /dateFilter is the endpoint
*/

var server = 'http://localhost:8000';

var makePostReq = function(dateObj) {
  $.ajax({
    type: 'POST',
    url: server + '/dateFilter',
    data: dateObj,
    dataType: 'json', // data type expected back from server
    success: function(data) {
      // DATA IS AN ARRAY OF NEW BLACKLISTED URL objects
      updateBlacklist(data, 'blackListedURLs'); // located in updateStorage.js
    }
  });
};

var getLastUpdated = function() {
  chrome.storage.local.get('blackListedURLs', function(currentURLs) {
    if (currentURLs.length === 0) {
      // send a post request for an arbitrary date before the extension was made
      var arbitraryDate = { date: "2012-12-21T00:57:22.959Z" };
      makePostReq(arbitraryDate);
    } else {
      // get last url in currentURLs
      var lastURLobj = currentURLs[currentURLs.length - 1];
      var lastURLdate = lastURLobj.createdAt;
      makePostReq({ date: lastURLdate });
    }
  });
};
