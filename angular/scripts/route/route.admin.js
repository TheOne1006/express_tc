'use strict';

/**
 * @ngdoc 后台路由
 * @name theoneApp
 * @description
 * # theoneApp
 *
 * Main module of the application.
 */
angular
  .module('theoneAppAdmin.route')
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('main', {
        abstract : true,
        url : '',
        views : {
          'lefter': {
            templateUrl : '/angular/views/admin/lefter.main.html'
          }
        }
      })
      .state('main.home',{
        url:'/',
        views:{
          '@': {
            templateUrl: '/angular/views/admin/main.html'
          }
        }
      })
      .state('main.cate',{
        url:'/cate',
        views:{
          '@':{
            templateUrl:'/angular/views/admin/cate.html'
          }
        }
      })
      .state('main.article',{
        url:'/article',
        views:{
          '@':{
            templateUrl:'/angular/views/admin/article_list.html'
          }
        }
      })
      .state('main.article.add',{
        url:'/add',
        views:{
          '@':{
            templateUrl:'/angular/views/admin/article.add.html'
          }
        }
      })
      .state('main.article.edit',{
        url:'/edit/:id',
        views:{
          '@':{
            templateUrl:'/angular/views/admin/article.edit.html',
            controller:'ArticleEditController'
          }
        }
      })
      // Tag 列表
      .state('main.tag',{
        url:'/tag',
        views:{
          '@':{
            templateUrl:'/angular/views/admin/tag.list.html',
            controller: 'TagListController'
          }
        }
      })

      // Carousel
      .state('main.carousel',{
        url:'/carousel',
        views:{
          '@':{
            templateUrl:'/angular/views/admin/carousel.list.html',
            controller:'CarouselCtrl'
          }
        }
      })
      /**
       * 图片管理
       */
      .state('main.pictures',{
        url:'/pictures',
        views: {
          '@':{
            templateUrl:'/angular/views/admin/pictures.list.html',
            controller:'PicturesList'
          }
        }
      })
      /**
       * 用户
       */
      .state('user', {
        abstract : true,
        url : '/user',
        views : {
          'lefter': {
            templateUrl : '/angular/views/admin/lefter.user.html'
          }
        }
      })
      .state('user.index',{
        url:'',
        views: {
          '@': {
            templateUrl: '/angular/views/admin/user/main.html'
          }
        }
      })
      .state('user.photo', {
        url:'/photo',
        views:{
          '@':{
            templateUrl:'/angular/views/admin/user/user.photo.html'
          }
        }
      })
      ;
}]);
