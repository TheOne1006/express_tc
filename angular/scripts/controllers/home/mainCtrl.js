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
  .controller('MainArticleCtrl', ['$scope', 'dataServer', function($scope, dataServer){
    // 获取main页面 文章列表
    dataServer.getlistCall('/article/list', function  (data) {
      $scope.articles = data;
      console.log(data);
    });

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
.controller('ArticleCtrl', ['$scope', '$http', '$stateParams','$timeout', 'article', function($scope, $http, $stateParams, $timeout, article){

  $scope.article = article.data;

  $scope.$watch('article.content', function () {
    $timeout(function () {
      prettyPrint();
    },0);
  });

  $scope.pageClass ='page';
  
}])
// 搜索
.controller('SearchCtrl', ['$scope', '$http', 'result', 'searchWord', function($scope, $http, result, searchWord){
  $scope.search.keyWord = searchWord;
  
  $scope.search.resultList = result;


  $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
      console.log(ngRepeatFinishedEvent);
      console.log('end');
  });


  $scope.pageClass = 'search';

  // 搜索结果的种类
  $http.get('/angular/data/search.left.json').success(function  (data) {
    $scope.search.menuKinds = data;
  });

  // $http.get('/angular/data/search.right.json').success(function  (data) {
  //   $scope.search.resultList = data;
  // });

}])
  ;