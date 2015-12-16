'use strict';

/**
 * @ngdoc service
 * @name clientApp.userInfo
 * @description
 * # userInfo
 * Service in the clientApp.
 */
angular.module('clientApp')
  .service('userInfo', function ($window, $rootScope) {
    //this service stores the user's data and authentication state with local storage. has functions to set & get the username and to get and set
    //authentication state
 	angular.element($window).on('storage', function(event) {
	    if (event.key === 'username' || event.key === 'userLoggedIn') {
	      $rootScope.$apply(); //rootscope makes variables accessible everywhere
	    }
      else {
        $rootScope = $rootScope.$new(true);
      }
	});
  return {
    setUsername: function(val) {
      $window.localStorage && $window.localStorage.setItem('username', val);
      return this;
    },
    getUsername: function() {
      return $window.localStorage && $window.localStorage.getItem('username');
    },
    setLoggedIn: function(val) {
      $window.localStorage && $window.localStorage.setItem('userLoggedIn', val);
      return this;
    },
    getLoggedIn: function() {
      return $window.localStorage && $window.localStorage.getItem('userLoggedIn');
    }
  };
});
