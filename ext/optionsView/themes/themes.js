themes = angular.module('options.themes', []);

themes.controller('themesController', function($scope) {
  $scope.defaultTheme = {
    theme: {
      'background-color': 'red'
    }
  };

  $scope.censorTheme = {
    theme: {
      'background-color': 'black',
      'color': 'black'
    }
  };

  $scope.radioButton = {
    selected: 'default'
  };

  $scope.setTheme = function(theme) {
    // Use theme setter in storage controller
    chrome.extension.getBackgroundPage().setThemeTo(theme);
  };
});
