angular.module('newsgate', [
  'newsgate.services',
  'newsgate.submit',
  'newsgate.trends',
  'newsgate.bubble',
  'newsgate.tweets',
  'newsgate.nav',
  'ngRoute'
])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    // leave this empty
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
  });
});
