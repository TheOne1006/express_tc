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

      $http.get('/h/search/'+searchWord)
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


    //  获取结果的 cates
    function getCates (resultArr) {
      var CateArr = [];

      if(!angular.isArray(resultArr)) {
        return CateArr;
      }
      
      angular.forEach(resultArr, function (item) {
        if(item.cate && item.cate._id) {

          for (var i = 0;  i < CateArr.length; i++) {
            if(item.cate._id === CateArr[i]._id) {
              CateArr[i].resultNum++;
              return;
            }
          }

          item.cate.resultNum = 1;
          CateArr.push(item.cate);
          return;

        }
      });
      
      return CateArr;
    }

    // 获取 分类 文章 列表
    function getArticleByCateList (cate, page) {

      if(!page || isNaN(page)) {
        page = 1;
      }
      // 声明延后执行，表示要去监控后面的执行 
      var deferred = $q.defer(); 

       $http.get('/h/article/cate/'+cate+'/'+page)
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

    function getHomeList () {
      // 声明延后执行，表示要去监控后面的执行 
      var deferred = $q.defer(); 

       $http.get('/home/index/list')
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

    //获取类别列表
    function getIndexCates () {

      var deferred = $q.defer(); 
      $http.get('/home/cate/index')
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


    // 获取 分类带总数量
    function getArticleTotalNum (cate) {

      // 声明延后执行，表示要去监控后面的执行 
      var deferred = $q.defer(); 

       $http.get('/h/article/total/cate/'+cate)
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
      },
      getCates: function (resultArr) {
        return getCates(resultArr);
      },
      getHomeList: function () {
         return getHomeList();
      },
      getIndexCates: function () {
        return getIndexCates();
      },
      getArticleByCateList: function (cate, page) {
        return getArticleByCateList(cate, page);
      },
      getArticleTotalNum: function(cate) {
        return getArticleTotalNum(cate);
      }
    };
  }])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider ,$locationProvider) {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
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
              templateUrl: '/angular/views/home/main.html',
              controller: 'MainArticleCtrl'
            },
            'affix@main':{
              templateUrl: '/angular/views/home/affix.html',
              controller: 'MainAffixCtrl'
            },
            'mobileRight':{
              templateUrl: '/angular/views/home/mobile/right.html'
            }
          },
          // resolve: index
          resolve:{
            indexList:['dataSave', function (dataSave) {
              return dataSave.getHomeList();
            }],
            cateList:['dataSave', function (dataSave) {
              return dataSave.getIndexCates();
            }]
          }
        })
        // 分类列表
        .state('main.cate',{
          url:'cate/:cate/:page',
          views:{
            'banner@':{
              templateUrl: '/angular/views/home/article/article.banner.html'
            },
            'bodyer@':{
              templateUrl:'/angular/views/home/cate/cate.list.html',
              controller:'CateListCtrl'
            }
          },
          resolve:{
            articlesByCate:['$stateParams', 'dataSave', function ($stateParams, dataSave) {
              return dataSave
                      .getArticleByCateList($stateParams.cate, $stateParams.page);
            }],
            curpage:['$stateParams', function ($stateParams) {
              return isNaN($stateParams.page)?1:$stateParams.page;
            }],
            totalNum:[ '$stateParams', 'dataSave', function( $stateParams, dataSave ){
              return dataSave
                      .getArticleTotalNum($stateParams.cate);

            }]
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
          url:'/id/:id',
          views:{
            'bodyer@':{
              templateUrl: '/angular/views/home/article/article.html',
              controller:'ArticleCtrl'
            }
          },
          // resolve: 解决器
          resolve:{
            article: ['$stateParams', '$http', function ($stateParams, $http) {
              return $http.get('/h/article/id/'+$stateParams.id)
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
            result: ['$stateParams', 'dataSave', function ($stateParams, dataSave) {
              return dataSave.search($stateParams.searchWord);
            }],
            searchWord:['$stateParams', function ($stateParams) {
              return $stateParams.searchWord;
            }],
            resultCase:['result', 'dataSave', function (result, dataSave) {
              var resultCateArr = dataSave.getCates(result);
              return resultCateArr;
            }]
          }
        })
        ;
  }]);