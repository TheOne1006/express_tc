'use strict';

/**
 * 前台控制制器 - 首页右侧affix区域
 * @ngdoc theOneBlog.controllers
 * @name  indexCtrl
 * @description  前台 - 首页右侧affix区域 - 控制器
 *
 * controller module of theOne Blog
 */
angular
  .module('theOneBlog.controllers')
  .controller('indexAffixCtrl', ['$scope' , 'indexList', function ($scope, indexList) {
    $scope.cates =  indexList;
  }])
  ;
