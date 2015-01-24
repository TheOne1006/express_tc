'use strict';

/**
 * @ngdoc overview
 * @name theoneApp
 * @description
 * # theoneApp
 *
 * Main module of the application.
 */
 var ngApp;
ngApp = angular
  .module('theoneApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    //'ngRoute',
    'ui.router', // 加载 ui.router
    'ngSanitize',
    'ngTouch'
  ]);