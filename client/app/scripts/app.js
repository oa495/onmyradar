'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngStorage',
    'ngTouch', 'todoService'
  ])
  /*
  .factory('user', function() {
  })*/
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
        // Authenticated
        if (user !== '0') {
          /*$timeout(deferred.resolve, 0);*/
          deferred.resolve();
        }
        // Not Authenticated
        else {
          $rootScope.message = 'You need to log in.';
          //$timeout(function(){deferred.reject();}, 0);
          deferred.reject();
          $location.url('/login');
        }
      });

      return deferred.promise;
    };
    //================================================
    
    //================================================
    // Add an interceptor for AJAX errors
    //================================================
    $httpProvider.interceptors.push(function($q, $location) {
      return {
        response: function(response) {
          // do something on success
          return response;
        },
        responseError: function(response) {
          if (response.status === 401) {
            $location.url('/login');
          }
          return $q.reject(response);
        }
      };
    });

    $routeProvider
      .when('/', {
        templateUrl: 'views/dashboard.html',
        controller: 'TodoCtrl',
        controllerAs: 'todo',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/radar', {
        templateUrl: 'views/radar.html',
        controller: 'RadarCtrl',
        controllerAs: 'radar',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .otherwise({
        redirectTo: '/'
      });
      // use the HTML5 History API
     // $locationProvider.html5Mode(true);
  });
