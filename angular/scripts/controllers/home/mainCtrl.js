'use strict';

/**
 * 前台总控制器
 * @name theOneBlog.mainCtrl
 * # theOneBlog
 *
 */

angular.module('theOneBlog')

  // 数据存储
  .factory('dataServer', ['$http', function($http){
    var mainArticles = {
      updatetime:'',
      data:[]
    };

    function getList (url, sucCall, errCall) {
      $http({
        method:'GET',
        data:'JSON' ,
        url:url
      })
      .success(function  (data) {
        mainArticles.updatetime = Date.parse(new Date());
        mainArticles.data = data;
        sucCall(data);
      })
       .error(function  (data) {
         errCall(data);
       });
    }


    return {
      getlistCall:function  (url, sucCall, errCall) {
        if(mainArticles && mainArticles.data && mainArticles.data.length > 0){
          return sucCall(mainArticles.data);
        }else{
          return getList(url, sucCall, errCall);
        }
      }

    };
  }])
  .controller('MainCtrl',['$scope', '$location', function ($scope, $location) {
    // VIEW 展现
    $scope.view = {
      scrollLeft : false
    };
    // search 信息
    $scope.search = {
      keyWord:''
    };

    //搜索 ,更换location.path
    $scope.goSearch = function () {
      if(!$scope.search.keyWord){
        return;
      }
      $location.path('/search/'+$scope.search.keyWord);
    };

    $scope.trunCollapsed = function () {
      $scope.view.scrollLeft = !$scope.view.scrollLeft;
    };


  }])
  // 首页文章Ctrl
  .controller('MainArticleCtrl', ['$scope', 'dataServer', 'articleList', function($scope, dataServer, articleList){
    // 获取main页面 文章列表
    $scope.articles = articleList;
  }])
  .controller('MainAffixCtrl', ['$scope', 'cateList', function ($scope, cateList) {
    $scope.cates =  cateList;
  }])
  // 滚动图片
  .controller('CarouselCtrl',['$scope',function ($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];

    $scope.addSlide = function() {
      var width = 1200;
      slides.push({
        img: 'http://lorempixel.com/' + width + '/305/nature/'+slides.length,
        text: 'test'
      });
    };
    for (var i=0; i<4; i++) {
      $scope.addSlide();
    }
  }])
// 文章列表
.controller('ArticleCtrl', ['$scope', '$http', '$stateParams','$timeout', '$filter', 'article', function($scope, $http, $stateParams, $timeout, $filter, article){

  // filter
  article.data.updateTime = $filter('date')(article.data.updateTime,'yyyy-MM-dd');

  $scope.article = article.data;

  $scope.$watch('article.content', function () {
    $timeout(function () {
      prettyPrint();
    },0);
  });

  $scope.pageClass ='page';
  
}])
// 搜索
.controller('SearchCtrl', ['$scope', '$timeout', '$filter', 'result', 'searchWord', 'resultCase', function($scope, $timeout, $filter, result, searchWord, resultCase){

  $filter('keywordPointFilter')(result, searchWord);

  // 搜索关键词
  $scope.search.keyWord = searchWord;
  
  // 搜索结果列表
  $scope.search.resultList = result;

  // page类型
  $scope.pageClass = 'search';

  // 当前 filter
  $scope.filterCate = '';

  $scope.setFilter = function (cateId) {
    var newResult = result;

    $scope.filterCate = cateId;

    newResult = $filter('filter')(newResult, cateId);

    $scope.search.resultList = newResult;

  };


  $timeout(function () {
    $scope.search.menuKinds = resultCase;
  },0);

  // 搜索结果的种类
  // $http.get('/angular/data/search.left.json').success(function  (data) {
  //   $scope.search.menuKinds = data;
  // });

  // $http.get('/angular/data/search.right.json').success(function  (data) {
  //   $scope.search.resultList = data;
  // });

}])
  ;