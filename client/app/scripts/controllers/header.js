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

	$scope.logout = function(){
	    $http.get('/auth/logout')
	        .success(function() {
	            $rootScope.loggeduser = {};
	            $rootScope.userSignedIn = false;
	            userInfo.setUsername("");
	            userInfo.setLoggedIn(false);
	            $scope.name = userInfo.getUsername();
				$scope.userLoggedIn = false;
	            $location.path('/login');

	        })
	        .error(function() {
	            $scope.alert = 'Logout failed';
	    });
	};
});
