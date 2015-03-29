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
            templateUrl: '/angular/views/admin/index.html'
          }
        }
      })
      .state('cate',{
        url:'/cate',
        views:{
          '':{
            templateUrl:'/angular/views/admin/cate.html'
          }
        }
      })
      .state('article',{
        url:'/article',
        views:{
          '':{
            templateUrl:'/angular/views/admin/article_list.html'
          }
        }
      })
      .state('article.add',{
        url:'/add',
        views:{
          '@':{
            templateUrl:'/angular/views/admin/article.add.html'
          }
        }
      })
      .state('article.edit',{
        url:'/edit/:id',
        views:{
          '@':{
            templateUrl:'/angular/views/admin/article.edit.html',
            controller:'ArticleEditController'
          }
        }
      })
      // Tag 列表
      .state('tag',{
        url:'/tag',
        views:{
          '@':{
            templateUrl:'/angular/views/admin/tag.list.html',
            controller: 'TagListController'
          }
        }
      })
      ;
});