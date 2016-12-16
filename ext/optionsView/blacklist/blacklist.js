blacklist = angular.module('options.blacklist', []);

blacklist.controller('blacklistController', function($scope) {

  // GET USER BLACK LIST URLS FROM SYNC STORAGE
  // then update textarea field on blacklist.html
  chrome.extension.getBackgroundPage().getUserlist(function(userBlacklistArray) {
    $scope.userBlacklistURLs = userBlacklistArray.join('\n');
  });

  // GET WHITE LIST URLS FROM SYNC STORAGE
  // then update textarea field on blacklist.html
  chrome.extension.getBackgroundPage().getWhitelist(function(whitelistArray) {
    $scope.whiteListedURLs = whitelistArray.join('\n');
  });

  // ON SAVE SETTINGS BUTTON CLICK
  // Call setter functions from storageController to reset whitelist and user blacklist
  // ex: resetWhitelistTo(anArray), resetUserBlacklistTo(anArray)
  $scope.saveSettings = function() {
    // Turn textarea text into arrays of new user data
    var newUserlist = $scope.userBlacklistURLs.length > 0 ?
                      $scope.userBlacklistURLs.split('\n') : [];
    var newWhitelist = $scope.whiteListedURLs.length > 0 ?
                       $scope.whiteListedURLs.split('\n') : [];

    // Filter user list so it doesn't have duplicate URLs on white list
    newUserlist = _.difference(newUserlist, newWhitelist);

    // Update textarea links in angular to provide nicer UX
    $scope.userBlacklistURLs = newUserlist.join('\n');
    $scope.whiteListedURLs = newWhitelist.join('\n');

    // Call setter functions from storageController to reset whitelist and user blacklist
    chrome.extension.getBackgroundPage().setUserlistTo(newUserlist, function() {
      // This is where we can put an alert message that data was saved.
      console.log('Saved new user generated black list');
    });
    chrome.extension.getBackgroundPage().setWhitelistTo(newWhitelist, function() {
      // This is where we can put an alert message that data was saved
      console.log('Saved new white list');
    });
  };
});
