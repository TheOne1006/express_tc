'use strict';

/**
 * @ngdoc 后台登陆路由
 * @name theOneBlog
 * @description 后台登陆路由
 * # theOneAdmin.login
 *
 * Main route of the application in web.
 */
 angular
   .module('theOneBlogLogin.route')
   .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

       $stateProvider
         .state('webcam',{
           url:'/webcam',
           views:{
             '@':{
               templateUrl: '/angular/views/admin/login/webcam.html',
               controller: 'LoginWebcamController'
             }
           }
         });

      $urlRouterProvider.otherwise('/');

    }
  ]);
