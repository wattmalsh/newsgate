angular.module('newsgate.nav', [])
.controller('NavController', function($scope, $rootScope, State, $anchorScroll, $location) {
  $scope.hideNav = State.hideNav;

  $rootScope.$on('updateNav', () => {
    $scope.hideNav = State.hideNav;
  });

  $scope.gotoAnchor = function(x) {
  	var newHash = 'anchor' + x;
  	if ($location.hash() !== newHash) {
  		// set the $location.hash to 'newHash' and 
  		// $anchorScroll will automatically scroll to it
  		$location.hash('anchor' + x);
  	} else {
  		// call $anchorScroll() explicitly, 
  		// since $location.hash hasn't change
  		$anchorScroll();
  	}
  }

});
