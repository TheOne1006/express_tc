'use strict';

/**
 * 前台控制制器 - 头部ctrl
 * @ngdoc theOneBlog.controllers
 * @name  headerCtrl
 * @description  前台 - 控制器 - 头部
 *
 * controller module of theOne Blog
 */
angular
  .module('theOneBlog.controllers')
  .controller('headerCtrl', ['$scope', '$location' , 'catesService', function ($scope, $location, catesService) {

    $scope.cateList = [];

    catesService
      .getAllCates()
      .$promise
      .then(function (data) {
        $scope.cateList = data;
      });

    // search 信息
    $scope.search = {
      keyWord:''
    };

    // headerView 滑落header
    $scope.headerView = {
      isCollapsed:false
    };

    $scope.changeCollapsed = function () {
      $scope.headerView.isCollapsed = !$scope.headerView.isCollapsed;
    };

    //搜索 ,更换location.path
    $scope.goSearch = function () {
      if(!$scope.search.keyWord){
        return;
      }
      $location.path('/search/'+$scope.search.keyWord);
    };

  }])
  ;
