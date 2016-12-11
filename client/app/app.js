angular.module('newsgate', [
  'newsgate.services',
  'newsgate.submit',
  'newsgate.trends',
  'newsgate.bubble',
  'newsgate.test',
  'newsgate.testEmerson',
  'ngRoute'
])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'app/submit/submit.html'
  })
  .when('/trends', {
    templateUrl : 'app/trends/trends.html',
    controller: 'TrendsController'
  })
  .when('/bubble', {
    templateUrl : 'app/bubble/bubble.html',
    controller: 'BubbleController'
  })
  .when('/tweets', {
    templateUrl : 'app/tweets/tweets.html',
    controller: 'TweetsController'
  })
  .when('/test', {
    templateUrl : 'app/test/test.html'
  })
});
