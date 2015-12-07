'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('UserCtrl', function ($scope, $http, $location, $rootScope, userInfo) {
	  	$scope.user  = {username:'',password:''};
	    $scope.signinAlert = '';
	    $scope.registerAlert = '';
	    $scope.login = function(user){
			if (user.username && user.password) {
		    	console.log(user);
		    	console.log('logging in');
		        $http.post('/login', user).
		            success(function(data) {
		                $rootScope.loggedUser = data;
		                $rootScope.userSignedIn = true;
		                userInfo.setUsername(data.username);
		                userInfo.setLoggedIn(true);
		                $location.path('/dashboard');
		            }).
		            error(function(err) {
		            	console.log('error: ', err);
		            	console.log('login failed');
		                $scope.signinAlert = 'Incorrect username/password.';
		            });
		    }
	        else {
		    	$scope.signinAlert = 'You need a username and password to login...';
		    }
	 
	    };
	 
	    $scope.signup = function(user){
	    	if (user.username && user.password) {
		    	console.log(user);
		    	console.log('registering');
		        $http.post('/register', user).
		            success(function(data) {
		            	console.log('SUCCESS');
		            	console.log(data);
		            	userInfo.setUsername(data.username);
		            	$rootScope.userSignedIn = true;
		                $location.path('/dashboard');
		             }).
		            error(function(err) {
		                $scope.registerAlert = 'Username already taken.';
		                console.log('failed');
		                console.log('error: ', err);
		            });
		    }
		    else {
		    	$scope.registerAlert = 'You need a username and password to signup ...';
		    }
	    };
	    $('.switch').click(function() {
	    	if ($('.login').css('display') === 'none') {
	    		$('.login').show();
	    		$('.signup').hide();
	    	}
	    	else if ($('.signup').css('display') === 'none') {
	    		$('.login').hide();
	    		$('.signup').show();
	    	}
	    });
  });
