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
    $stateProvider
      .state('home',{
        url:'/',
        views:{
          '':{
            templateUrl: 'angular/views/admin/index.html'
          }
        }
      })
      .state('cate',{
        url:'/cate',
        view:{
          '':{
            templateUrl:'angular/views/admin/cate.html'
          }
        }
      })
      ;
});