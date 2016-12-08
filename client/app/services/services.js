angular.module('newsgate.services', [])
.factory('FormFactory', function($http) {
  var url = 'http://localhost:8000';

  var sendLink = function(url) {
    let apiPath = '/';
    let message = {
        url: url
    };

    // $http({
    //   url: url.concat(apiPath);
    //   type: 'GET',
    //   data: message
    // })
    // .then((res) => {
    //   console.log('SERVER:', res);
    // });

    console.log('CLIENT SEND MESSAGE:', message);
  };

  return {
    sendLink: sendLink
  }
});
