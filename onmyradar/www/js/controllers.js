angular.module('starter.controllers', [])

.controller('FormCtrl', function($log, $scope, pouchDB) {
  var db = pouchDB('taskList');
  $scope.createTask = function() {
      var data = $scope.task; 
      var params = {
           'day': data.day,
           'title': data.title,
           'priority': data.priority
        };
        pouchdb.post(params, function(err, res) {
          $rootScope.$apply(function() {
            if (err) {
              deferred.reject(err)
            } else {
              deferred.resolve(res)
            }
          });
        });
    }
});
