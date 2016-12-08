angular.module('newsgate', [
  'newsgate.services',
  'newsgate.form',
  'ngRoute'
])
.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "app/form/form.html",
    controller: "FormController"
  });
});
