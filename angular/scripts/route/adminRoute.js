'use strict';

/**
 * @ngdoc 后台路由
 * @name theoneApp
 * @description
 * # theoneApp
 *
 * Main module of the application.
 */
angular.module('theoneApp')
  .config(function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
});