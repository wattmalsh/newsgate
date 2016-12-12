angular.module('newsgate.titlebar', [])
.controller('TitlebarController', function($scope, $rootScope, Data) {
  $scope.title = Data.title.title;
  if (Data.fake.rating.score === 0) {
    $scope.fake = false;
  } else if (Data.fake.rating.score === 100) {
    $scope.fake = true;
  }

  $rootScope.$on('updateData', () => {
    $scope.title = Data.title.title;
    if (Data.fake.rating.score === 0) {
      $scope.fake = false;
    } else if (Data.fake.rating.score === 100) {
      $scope.fake = true;
    }
  });
});
