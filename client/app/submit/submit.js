angular.module('newsgate.submit', [])
.controller('SubmitController', function($scope, Response) {

  // Invoke get request to server
  $scope.sendLink = function() {
    console.log('Getting Link:', $scope.inputLink);
    Response.sendLink($scope.inputLink);
  }
});
