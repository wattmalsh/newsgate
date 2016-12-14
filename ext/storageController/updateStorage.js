
/*
{ blackListedURLs: [{
    url: String,
    rating: ratingSchema,
    createdAt: ISODate object,
    updatedAt: ISODate object
  }]
}
*/

////////////////////////////////////////////////////////////////////////////////
// UPDATE BLACK LIST: (updates the current persisted blacklist)
// @input: An array of new URL objects to append to current black list
////////////////////////////////////////////////////////////////////////////////
var updateBlacklist = function(newURLs) {
  var combineBlackList = function(newURLs, currentURLs) {
    var newBlackList = currentURLs.concat(newURLs);
    chrome.storage.local.set({ 'blackListedURLs': newBlackList }, function() {
      alert('Successfully updated black list!');
    });
  };

  chrome.storage.local.get('blackListedURLs', function(currentURLs) {
    updateBlacklist(newURLs, currentURLs);
  });
};
