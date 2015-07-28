angular.module('starter.controllers', [])

.controller('FormCtrl', ['$scope', '$http', function($scope) {
   $scope.createTask = function() {
      console.log('x');
      var data = $scope.task; 
      var params = {
           'day': data.day,
           'title': data.title,
           'priority': data.priority
        };
      //$http.post(url, data); 
    }
}]);
