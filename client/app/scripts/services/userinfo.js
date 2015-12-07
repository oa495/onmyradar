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
 	angular.element($window).on('storage', function(event) {
	    if (event.key === 'username' || event.key === 'userLoggedIn') {
	      $rootScope.$apply();
	    }
      else {
        $rootScope = $rootScope.$new(true);
      }
	});
  return {
    setUsername: function(val) {
      console.log('setting data to ', val);
      $window.localStorage && $window.localStorage.setItem('username', val);
      return this;
    },
    getUsername: function() {
      return $window.localStorage && $window.localStorage.getItem('username');
    },
    setLoggedIn: function(val) {
      console.log('setting data to ', val);
      $window.localStorage && $window.localStorage.setItem('userLoggedIn', val);
      return this;
    },
    getLoggedIn: function() {
      return $window.localStorage && $window.localStorage.getItem('userLoggedIn');
    }
  };
});
