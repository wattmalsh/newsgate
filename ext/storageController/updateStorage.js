
/*
{ blackListedURLs: [{
    url: String,
    rating: ratingSchema,
    createdAt: ISODate object,
    updatedAt: ISODate object
  }]
}
*/

// Abstracted helper function
var combineBlackList = function(newURLs, currentURLs, blackListToUpdate) {
  var newBlackList = currentURLs.concat(newURLs);
  chrome.storage.local.set({ blackListToUpdate: newBlackList }, function() {
    alert('Successfully updated black list!');
  });
};

////////////////////////////////////////////////////////////////////////////////
// UPDATE BLACK LIST:
// @input1: An array of new URL objects to append to current black list
// @input2: Name of blackList to be updated ('blackListedURLs' or 'userGeneratedBlacklist')
////////////////////////////////////////////////////////////////////////////////
var updateBlacklist = function(newURLs, blackListToUpdate) {
  chrome.storage.local.get(nameOfBlacklist, function(currentURLs) {
    combineBlackList(newURLs, currentURLs, blackListToUpdate);
  });
};
