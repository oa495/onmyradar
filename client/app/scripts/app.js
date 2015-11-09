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
    'ngTouch', 'todoService'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/radar', {
        templateUrl: 'views/radar.html',
        controller: 'RadarCtrl',
        controllerAs: 'radar'
      })
      .otherwise({
        redirectTo: '/'
      });
      // use the HTML5 History API
     // $locationProvider.html5Mode(true);
  });
