'use strict';

/**
 * @ngdoc 前台路由
 * @name theOneBlog
 * @description 前台路由
 * # theOneBlog
 *
 * Main route of the application in web.
 */
angular.module('theOneBlog')
  .config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('main',{
          url:'/',
          views:{
            'header':{
              templateUrl: '/angular/views/home/header.html'
            },
            'banner':{
              templateUrl: '/angular/views/home/banner.html'
            },
            'bodyer':{
              templateUrl: '/angular/views/home/main.html'
            },
            'affix@main':{
              templateUrl: '/angular/views/home/affix.html'
            },
            'mobileRight':{
              templateUrl: '/angular/views/home/mobile/right.html'
            }
          }
        })
        .state('main.article',{
          url:'article/:id',
          views:{
            'bodyer@':{
              templateUrl: '/angular/views/home/article/article.html',
              controller:'ArticleCtrl'
            },
            'banner@':{
              templateUrl: '/angular/views/home/article/article.banner.html'
            }
          }
        })
        .state('main.search',{
          url:'search/:keywords',
          views:{
            'bodyer@':{
              templateUrl: '/angular/views/home/search/search.bodyer.html',
              controller:'SearchCtrl'
            }
          }
        })
        ;
  }]);