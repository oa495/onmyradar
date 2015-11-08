'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TodoCtrl
 * @description
 * # TodoCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('TodoCtrl', function ($scope, $http, Todos) {
    $scope.formData = {};
        $scope.loading = true;

        // GET =====================================================================
        // when landing on the page, get all todos and show them
        // use the service to get all the todos
        Todos.get()
            .success(function(data) {
                $scope.todos = data;
                $scope.loading = false;
            });

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createTodo = function() {
            console.log('creating')
            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if ($scope.formData.title != undefined) {
                $scope.loading = true;

                // call the create function from our service (returns a promise object)
                Todos.create($scope.formData)
                    // if successful creation, call our get function to get all the new todos
                    .success(function(data) {
                        $scope.loading = false;
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.todos = data; // assign our new list of todos
                    });
            }
        };

        // DELETE ==================================================================
        // delete a todo after checking it
        $scope.deleteTodo = function(id) {
            $scope.loading = true;
            console.log('deleting')
            Todos.delete(id)
                // if successful creation, call our get function to get all the new todos
                .success(function(data) {
                    $scope.loading = false;
                    $scope.todos = data; // assign our new list of todos
                });
        };
  });
