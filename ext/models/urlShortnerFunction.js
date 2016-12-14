chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  //ASSUMING REQUEST WILL HAVE THE LINK PROPERTY = TO HREF
  grabUnshortenedUrl(function(unshortened) {
    sendResponse({url: unshortend});
    return true;
  });
});

// https://unshorten.me/json/{short_url}
var grabUnshortenedUrl = function(shortUrl, cb) {
  $.ajax({
    type: 'get',
    url: 'https://unshorten.me/json/' + shortUrl,
    success: function(data) {
      data
      cb(data.resolvedUrl); // located in updateStorage.js
    }
  });
}