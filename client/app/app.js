angular.module('newsgate', [
  'newsgate.services',
  'newsgate.form',
  'newsgate.trends',
  'newsgate.test',
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
  })
  .when('/test', {
    templateUrl : 'app/test/test.html'
  });
});
