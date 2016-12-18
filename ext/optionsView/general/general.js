general = angular.module('options.general', []);

general.controller('generalController', function($scope, General) {

  // Automatically sets radio to ngvalue
  $scope.minutes = 60;

  // Watch for changes in model
  $scope.$watch('minutes', function(minutes) {
    console.log('disable in controller called', minutes);
    General.disable(minutes);
  })
});
