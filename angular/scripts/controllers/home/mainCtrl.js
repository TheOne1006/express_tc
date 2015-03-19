'use strict';

/**
 * 前台总控制器
 * @name theOneBlog.mainCtrl
 * # theOneBlog
 *
 */

angular.module('theOneBlog')
  .run(function () {

  })
  .controller('MainCtrl',['$scope',function ($scope) {
    // VIEW 展现
    $scope.view = {
      scrollLeft : false
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
  $scope.articles = {
    title:'标题',
    content:'内容'
  };
}])
  ;