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
          abstract: true,
          url:'article',
          views: {
            'banner@':{
              templateUrl: '/angular/views/home/article/article.banner.html'
            }
          }

        })
        .state('main.article.single',{
          url:'/:id',
          views:{
            'bodyer@':{
              templateUrl: '/angular/views/home/article/article.html',
              controller:'ArticleCtrl'
            }
          },
          // resolve: 解决器
          resolve:{
            article: ['$stateParams', '$http', function ($stateParams, $http) {
              return $http.get('/article/id/'+$stateParams.id)
                .success(function (data) {
                  return data;
                });
            }]
          }
        })
        .state('main.search',{
          url:'search/:keywords',
          views:{
            'bodyer@':{
              templateUrl: '/angular/views/home/search/search.bodyer.html',
              controller:'SearchCtrl'
            },
            'banner@':{
              templateUrl: '/angular/views/home/article/article.banner.html'
            }
          }
        })
        ;
  }]);