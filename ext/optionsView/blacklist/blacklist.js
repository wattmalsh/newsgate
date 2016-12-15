blacklist = angular.module('options.blacklist', []);

blacklist.controller('blacklistController', function($scope) {

  // GET USER BLACK LIST URLS FROM SYNC STORAGE
  // then update textarea field on blacklist.html
  chrome.storage.sync.get('userGeneratedBlacklist', function(syncStore) {
    var userBlacklistArray = syncStore['userGeneratedBlacklist'];
    $scope.userBlacklistURLs = userBlacklistArray.join('\n');
  });
  
  // $scope.userBlacklistURLs = "lolzcats\nlolzcats2";
  // NEED TO GET WHITE LIST URLS FROM SYNC STORAGE
  $scope.whiteListedURLs = "helloworld.com\nhellothere.biz";
});
