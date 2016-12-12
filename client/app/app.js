angular.module('newsgate', [
  'newsgate.services',
  'newsgate.main',
  'newsgate.titlebar',
  'newsgate.submit',
  'newsgate.trends',
  'newsgate.bubble',
  'newsgate.tweets',
  'newsgate.nav',
  'ngRoute'
])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    // leave this empty
  })
  .when('/main', {
    templateUrl: 'app/main/main.html'
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

  $locationProvider.html5Mode(true);
});
