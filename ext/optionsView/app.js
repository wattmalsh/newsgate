angular.module('options', [
    'options.services',
    'options.blacklist',
    'options.themes',
    'ngRoute'])
  .config(function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/themes', {
        templateUrl: '../optionsView/themes/themes.html',
        controller: 'themesController'
      })
      .when('/blacklist', {
        templateUrl: '../optionsView/blacklist/blacklist.html',
        controller: 'blacklistController'
      })
      .otherwise({redirectTo: '/blacklist'});
  });
