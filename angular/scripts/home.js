'use strict';

/**
 * @ngdoc theOneBlog前台
 * @name theOne Blog
 * @description module 加载
 * # theOneBlog
 *
 * Main module of the application.
 */
 var ngApp;
ngApp = angular
  .module('theOneBlog', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ui.router', // 加载 ui.router
    'ui.bootstrap',
    'ngSanitize',
    'ngTouch',
    'mgcrea.ngStrap', // 类似ui.bootstrap
    'angular-carousel'//拖拽banner
  ])
  .factory('browserHelp', ['$window', function ($window) {
      var initWidth = $window.innerWidth,
      mobileScreenMaxWidth = 768; 
  
      return {
        isMobile: initWidth < mobileScreenMaxWidth
      };
      
  }])

  ;