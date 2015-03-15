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
      var newWidth = 600 + slides.length + 1;
      slides.push({
        image: 'http://placekitten.com/' + newWidth + '/300',
        text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
          ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
      });
    };
    for (var i=0; i<4; i++) {
      $scope.addSlide();
    }
  }])

  ;