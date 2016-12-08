angular.module('newsgate.form', [])
.controller('FormController', function($scope, FormFactory) {

  // Invoke get request to server
  $scope.sendLink = function() {
    console.log('Getting Link:', $scope.inputLink);
    FormFactory.sendLink($scope.inputLink);
  }
});
