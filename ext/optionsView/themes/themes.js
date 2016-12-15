themes = angular.module('options.themes', []);

themes.controller('themesController', function($scope) {
  $scope.defaultTheme = {
    theme: {
      default: 'stuff'
    }
  };

  $scope.censorTheme = {
    theme: {
      censor: 'more stuff'
    }
  }

  $scope.setTheme = function(theme) {
    console.log('GOT HERE', theme);
    chrome.storage.sync.set(theme, function() {
      console.log('Theme successfully saved');
    });
  };
});
