themes = angular.module('options.themes', []);

themes.controller('themesController', function($scope) {

  $scope.defaultTheme = { // THIS IS INITIALIZED IN STORAGE CONTROLLER
    theme: {
      fake: {
        'background-color': 'red'
      },
      satire: {
        'background-color': 'orange'
      },
      biased: {
        'background-color': 'yellow'
      }
    }
  };

  $scope.censorTheme = {
    theme: {
      fake: {
        'background-color': 'black',
        'color': 'black'
      },
      satire: {
        'background-color': 'black',
        'color': 'black'
      },
      biased: {
        'background-color': 'black',
        'color': 'black'
      }
    }
  };

  $scope.testTheme = {
    theme: {
      fake: 'testTheme-fake',
      satire: 'testTheme-satire',
      biased: 'testTheme-biased'
    }
  }

  $scope.radioButton = {
    selected: 'default'
  };

  $scope.setTheme = function(theme) {
    // Use theme setter in storage controller
    chrome.extension.getBackgroundPage().setThemeTo(theme);
  };
});
