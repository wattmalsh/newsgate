general = angular.module('options.general', []);

general.controller('generalController', function($scope, General) {

  // Watch for changes in model
  $scope.$watch('minutes', function(minutes) {
    console.log('disable in controller called', minutes);
    if (minutes !== undefined) {
      General.disable(minutes);
    }
  })
});
