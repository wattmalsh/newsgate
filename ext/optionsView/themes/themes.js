themes = angular.module('options.themes', []);

themes.controller('themesController', function($scope) {

  $scope.defaultTheme = { // THIS IS INITIALIZED IN STORAGE CONTROLLER
    theme: {
      fake: 'defaultTheme-fake',
      satire: 'defaultTheme-satire',
      biased: 'defaultTheme-biased',
      themeName: 'default'
    }
  };

  $scope.radioButton = { // Initialize theme button setting
    selected: 'default'
  }

  $scope.censorTheme = {
    theme: {
      fake: 'censorTheme-fake',
      satire: 'censorTheme-satire',
      biased: 'censorTheme-biased',
      themeName: 'censorTheme'
    }
  };

  // Updates theme button setting
  chrome.extension.getBackgroundPage().getTheme(function(theme) {
    // Set the state of the radio button
    $scope.radioButton = {
      selected: theme.themeName
    };
  });

  $scope.setTheme = function(theme) {
    // Use theme setter in storage controller
    chrome.extension.getBackgroundPage().setThemeTo(theme);

    chrome.tabs.query({}, function(tabs) {
      for (var i = 0; i < tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, {action: 'refresh'});
      }
    });

  };
});
