angular.module('newsgate.nav', [])
.controller('NavController', function($scope, $rootScope, State) {
  $scope.hideNav = State.hideNav;

  $rootScope.$on('updateNav', () => {
    $scope.hideNav = State.hideNav;
  });
});
