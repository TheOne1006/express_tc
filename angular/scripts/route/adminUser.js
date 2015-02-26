'use strict';

/**
 * @ngdoc 后台用户路由
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
       .state('user',{
         url:'/',
         views:{
           '':{
             templateUrl: '/angular/views/admin/user/index.html'
           }
         }
       });
   });