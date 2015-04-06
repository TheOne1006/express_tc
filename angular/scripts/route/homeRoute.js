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
  // 数据存储 service
  .factory('dataSave', ['$http', '$q', function ($http, $q) {

    // angular 延迟对象
    
    function articleSearch (searchWord) {
      // 声明延后执行，表示要去监控后面的执行 
      var deferred = $q.defer(); 

      $http.get('/search/'+searchWord)
                .success(function (data) {

                  //声明执行成功，即http请求数据成功，可以返回数据了
                  deferred.resolve(data);
                })
                .error(function (data) {

                  //声明执行失败，即服务器返回错误 
                  deferred.reject(data);   
                });

      // 返回承诺，这里并不是最终数据，而是访问最终数据的API
      return deferred.promise;
    }


    return {
      search:function (searchWord) {
        return articleSearch(searchWord);
      }
    };
  }])

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
          abstract: true,
          url:'search',
          views:{
            'banner@':{
              templateUrl: '/angular/views/home/article/article.banner.html'
            }
          }
        })
        .state('main.search.goanything',{
          url:'/:searchWord',
          views:{
            'bodyer@':{
              templateUrl: '/angular/views/home/search/search.bodyer.html',
              controller:'SearchCtrl'
            }
          },
          // 数据
          // resolve 解决器 不能在view 中再次 定义 controller
          resolve:{
            result: ['$stateParams', '$http', 'dataSave', function ($stateParams, $http, dataSave) {
              return dataSave.search($stateParams.searchWord);
            }],
            searchWord:['$stateParams', function ($stateParams) {
              return $stateParams.searchWord;
            }],
            resultCase:['result', function (result) {
              console.log(result);
              console.log('--in resultCase--');
              return {};
            }]
          }
        })
        ;
  }]);