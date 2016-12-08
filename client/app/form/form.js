angular.module('newsgate.form', [])
.controller('FormController', function($scope) {

  // Invoke get request to server
  $scope.sendLink = function() {
    console.log('Getting Link:', $scope.inputLink);
  }
});
