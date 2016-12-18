general = angular.module('options.general', []);

general.controller('generalController', function($scope, General) {

  $scope.remainingTimeLeft = 'Currently enabled';

  // Watch for changes in model
  $scope.$watch('minutes', function(minutes) {
    console.log('disable in controller called', minutes);
    if (minutes !== undefined) {
      General.disable(minutes);
    }
  })

  var getTimeLeft = function() {
    chrome.extension.getBackgroundPage().chrome.alarms.getAll(function(alarms) {
      if (alarms.length > 0) {
        console.log(alarms[0].scheduledTime);
        var d = new Date();
        var ms = d.getTime();
        
        var timeLeft = Math.round((alarms[0].scheduledTime - ms) / 60000); 
        if (timeLeft > 60) {
          $scope.remainingTimeLeft = 'Disabled indefinitely'
        } else {
          $scope.remainingTimeLeft = `Fake news on the prowl for ${timeLeft} more minutes`;;
        }
      }
    }); 
  }

  getTimeLeft();
});
