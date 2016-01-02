'use strict';

/**
 * 前台控制制器 - 首页轮播图
 * @ngdoc theOneBlog.controllers
 * @name  indexCarouselCtrl
 * @description  前台 - 首页轮播图 - 控制器
 *
 * controller module of theOne Blog
 */
angular
  .module('theOneBlog.controllers')
  .controller('indexCarouselCtrl', ['$scope', 'carouselsService', function ($scope, carouselsService) {

    $scope.slides = [];
    $scope.intervalTime = 5000;

    carouselsService
      .getIndexList()
      .$promise
      .then(function (data) {
        // console.log(data);
        $scope.slides = data;
      });




  }])
  ;
