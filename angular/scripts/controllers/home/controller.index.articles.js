'use strict';

/**
 * 前台控制制器 - 首页文章列表
 * @ngdoc theOneBlog.controllers
 * @name  indexArticlesCtrl
 * @description  前台 - 控制器 - 首页文章列表
 *
 * controller module of theOne Blog
 */
angular
  .module('theOneBlog.controllers')
  .controller('indexArticlesCtrl', ['$scope', '$filter', 'indexArticlesService', 'headerHelp', 'indexList', function ($scope, $filter, indexArticlesService, headerHelp, indexList) {

    headerHelp.resetAll();

    $scope.indexList =  $filter('IndexArticlesWordlimit')(indexList);
    // $scope.indexList = [];

    // indexArticlesService
    //   .getList()
    //   .$promise
    //   .then(function (data) {
    //     // console.log(data);
    //     $scope.indexList = $filter('IndexArticlesWordlimit')(data);
    //   });

  }])
  ;
