angular.module('newsgate', [
  'newsgate.services',
  'newsgate.form',
  'newsgate.trends',
  'ngRoute'
])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'app/form/form.html',
    controller: 'FormController'
  })
  .when('/trends', {
    templateUrl : 'app/trends/trends.html',
    controller: 'TrendsController'
  });
});
