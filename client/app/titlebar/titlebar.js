angular.module('newsgate.titlebar', [])
.controller('TitlebarController', function($scope, $rootScope, Data) {
  $scope.title = Data.title.title;

  $rootScope.$on('updateData', () => {
    $scope.title = Data.title.title;
  });
});
