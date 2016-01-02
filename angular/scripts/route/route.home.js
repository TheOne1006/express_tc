'use strict';

/**
 * @ngdoc 前台路由
 * @name theOneBlog
 * @description 前台路由
 * # theOneBlog
 *
 * Main route of the application in web.
 */
angular
  .module('theOneBlog')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider ,$locationProvider) {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });

      $stateProvider
        .state('main',{
          abstract: true,
          url:'',
          views:{
            '@':{
              templateUrl: '/angular/views/home/main.html',
              controller: 'mainCtrl'
            },
            'header@main':{
              templateUrl: '/angular/views/home/header.html',
              controller: 'headerCtrl'
            }
          }
        })
        .state('main.index', {
          url:'/',
          views:{
            'banner':{
              templateUrl: '/angular/views/home/banner.html',
              controller: 'indexCarouselCtrl'
            },
            'bodyer':{
              templateUrl: '/angular/views/home/main.content.html',
              controller: 'indexArticlesCtrl'
            },
            'affix@main.index':{
              templateUrl: '/angular/views/home/affix.html',
              controller: 'indexAffixCtrl'
            }
          },
          resolve:{
            indexList: ['indexArticlesService', function (indexArticlesService) {

              return indexArticlesService
                        .getList()
                        .$promise
                        ;
            }]
          }
        })
        // 分类列表
        .state('main.cate',{
          url:'/cate/:cateAlias/:page',
          views:{
            'banner':{
              templateUrl: '/angular/views/home/article/article.banner.html'
            },
            'bodyer':{
              templateUrl:'/angular/views/home/articles/articles.list.html',
              controller: 'articlesCtrl'
            }
          },
          resolve:{
            articlesByCateName: ['$stateParams' , 'articlesService', function ($stateParams, articlesService) {

              var curpage = !($stateParams.page)? '1' : $stateParams.page,
                cateAliasName = $stateParams.cateAlias;

              return articlesService.getArticlesByCateAliasList(cateAliasName, curpage)
                .$promise;
            }]
          }
        })
        .state('main.article',{
          abstract: true,
          url:'/article',
          views: {
            'banner':{
              templateUrl: '/angular/views/home/article/article.banner.html'
            }
          }
        })
        .state('main.article.single',{
          url:'/id/:articleId',
          views:{
            'bodyer@main':{
              templateUrl: '/angular/views/home/article/article.html',
              controller: 'articleCtrl'
            }
          },
          resolve:{
            article: ['$stateParams', 'articleService', function ($stateParams, articleService) {
              return articleService
                      .getById($stateParams.articleId)
                      .$promise;
            }]
          }
        })
        .state('main.search',{
          abstract: true,
          url:'/search',
          views:{
            'banner':{
              templateUrl: '/angular/views/home/article/article.banner.html'
            }
          }
        })
        .state('main.search.goanything',{
          url:'/:searchWord',
          views:{
            'bodyer@main':{
              templateUrl: '/angular/views/home/search/search.bodyer.html',
              controller: 'searchCtrl'
            }
          }
        })
        ;

      // 不知道名连接跳转
      $urlRouterProvider.otherwise('/');
  }]);
