blacklist = angular.module('options.blacklist', []);

blacklist.controller('blacklistController', function($scope) {

  // GET USER BLACK LIST URLS FROM SYNC STORAGE
  // then update textarea field on blacklist.html
  chrome.extension.getBackgroundPage().getUserlist(function(userBlacklistArray) {
    $scope.userBlacklistURLs = userBlacklistArray.join('\n');
  });

  // GET WHITE LIST URLS FROM SYNC STORAGE
  // then update textarea field on blacklist.html
  // chrome.storage.sync.get('userGeneratedBlacklist')

  // $scope.userBlacklistURLs = "lolzcats\nlolzcats2";
  // NEED TO GET WHITE LIST URLS FROM SYNC STORAGE
  $scope.whiteListedURLs = "helloworld.com\nhellothere.biz";

  // ON SAVE SETTINGS BUTTON CLICK
  // Call setter functions from storageController to reset whitelist and user blacklist
  // ex: resetWhitelistTo(anArray), resetUserBlacklistTo(anArray)
});
