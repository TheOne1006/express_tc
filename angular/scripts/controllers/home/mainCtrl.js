'use strict';

/**
 * 前台总控制器
 * @name theOneBlog.mainCtrl
 * # theOneBlog
 *
 */

angular.module('theOneBlog')
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
.controller('ArticleCtrl', ['$scope', function($scope){
  $scope.pageClass ='page';
  $scope.articles = {
    title:'标题',
    content:'内容'
  };



}])
// 搜索
.controller('SearchCtrl', ['$scope', '$http', function($scope, $http){
  $scope.pageClass = 'search';

  // 搜索结果的种类
  $http.get('/angular/data/search.left.json').success(function  (data) {
    $scope.search.menuKinds = data;
  });

}])
  ;