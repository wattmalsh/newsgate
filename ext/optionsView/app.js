angular.module('options', [
    'options.services',
    'options.general',
    'options.blacklist',
    'options.themes',
    'ngRoute'])
  .config(function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/general', {
        templateUrl: '../optionsView/general/general.html',
        controller: 'generalController'
      })
      .when('/themes', {
        templateUrl: '../optionsView/themes/themes.html',
        controller: 'themesController'
      })
      .when('/blacklist', {
        templateUrl: '../optionsView/blacklist/blacklist.html',
        controller: 'blacklistController'
      })
      .otherwise({redirectTo: '/general'});
  });
