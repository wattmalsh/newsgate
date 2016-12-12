angular.module('newsgate.submit', [])
.controller('SubmitController', function($scope, $rootScope, Response, State) {
  $scope.hideSpinner = State.hideSpinner;
  // Invoke get request to server
  $scope.sendLink = function() {
    console.log('Getting Link:', $scope.inputLink);
    Response.sendLink($scope.inputLink);
  }

  $rootScope.$on('updateSpinner', function() {
    console.log('updating spinner!');
    $scope.hideSpinner = State.hideSpinner;
  });

});
