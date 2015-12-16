'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('HeaderCtrl', function ($scope, $http, $location, $rootScope, userInfo) {
	$scope.name = userInfo.getUsername();
	$scope.userLoggedIn = userInfo.getLoggedIn();
	//header shows user name and logout button if user is loggen in
	$scope.logout = function(){
	    $http.get('/auth/logout')
	        .success(function() {
	        	//reset/clear all the values
	            $rootScope.loggeduser = {};
	            $rootScope.userSignedIn = false;
	            userInfo.setUsername("");
	            userInfo.setLoggedIn(false);
	            $scope.name = userInfo.getUsername();
				$scope.userLoggedIn = false;
				//send back to log in page
	            $location.path('/login');

	        })
	        .error(function() {
	            $scope.alert = 'Logout failed';
	    });
	};
});
