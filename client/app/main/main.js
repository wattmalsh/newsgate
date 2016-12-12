angular.module('newsgate.main', [])
.controller('MainController', function($scope, $rootScope) {
  $scope.isLoaded = false;

  $rootScope.$on('updateData', () => {
    $scope.isLoaded = true;
  });
});
