'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('UserCtrl', function ($scope, $http, $location) {
	  	$scope.user  = {username:'',password:''};
	    $scope.alert = '';
	 
	    $scope.login = function(user){
	    	console.log(user);
	    	console.log('logging in');
	        $http.post('/login', user).
	            success(function(data) {
	            	console.log('SUCCESS');
	            	console.log(data);
	                $scope.loggeduser = data;
	                $location.path('/dashboard');
	            }).
	            error(function(err) {
	            	console.log('error: ', err);
	            	console.log('login failed');
	                $scope.alert = 'Login failed';
	            });
	 
	    };
	 
	    $scope.signup = function(user){
	    	console.log(user);
	    	console.log('registering');
	        $http.post('/register', user).
	            success(function(data) {
	            	console.log('SUCCESS');
	            	console.log(data);
	                $scope.alert = data.alert;
	                $location.path('/dashboard');
	             }).
	            error(function(err) {
	                $scope.alert = 'Registration failed';
	                console.log('failed');
	                console.log('error: ', err);
	            });
	    };
	    $scope.logout = function(){
        $http.get('/auth/logout')
            .success(function() {
                $scope.loggeduser = {};
                $location.path('/signin');
 
            })
            .error(function() {
                $scope.alert = 'Logout failed';
            });
   		};
  });
