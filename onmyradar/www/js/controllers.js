angular.module('starter.controllers', [])

.controller('FormCtrl', ['$scope', '$http', function($scope, $http) {
   $scope.createTask = function() {
      console.log('x');
      var data = $scope.task; 
      var params = {
           'day': data.day,
           'title': data.title,
           'priority': data.priority
        };
      $http.post('/someUrl', params).
        success(function(data, status, headers, config) {
          // this callback will be called asynchronously
          // when the response is available
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    }
}]);
