angular.module('newsgate', [
  'newsgate.services',
  'newsgate.submit',
  'newsgate.trends',
  'newsgate.test',
  'newsgate.testEmerson',
  'ngRoute'
])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'app/submit/submit.html',
    controller: 'SubmitController'
  })
  .when('/trends', {
    templateUrl : 'app/trends/trends.html',
    controller: 'TrendsController'
  })
  .when('/tweets', {
    templateUrl : 'app/tweets/tweets.html',
    controller: 'TweetsController'
  })
  .when('/test', {
    templateUrl : 'app/test/test.html'
  })
});
