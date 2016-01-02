'use strict';

/**
 * 前台控制制器 - 搜索
 * @ngdoc theOneBlog.controllers
 * @name  searchCtrl
 * @description  前台 - 控制器 - 搜索
 *
 * controller module of theOne Blog
 */
angular
  .module('theOneBlog.controllers')
  .controller('searchCtrl', ['$scope', '$timeout', '$filter', '$stateParams', 'catesService', 'searchService', function ($scope, $timeout, $filter, $stateParams, catesService, searchService) {

      var currentKeyWord = $stateParams.searchWord,
        allCatesList = [];
        // containcates = []; // 改版使用

      $scope.containCates = [];

      // page类型
      $scope.pageClass = 'search';

      // 搜索结果列表
      $scope.search = {
        originList : [],
        resultList : [],
        keyWord    : currentKeyWord  // 搜索关键词
      };

      catesService
        .getAllCates()
        .$promise
        .then(function ( cateList) {
          // 理论上应该从这里面获取
          allCatesList = cateList;

        });

      searchService
        .getListByKeyWord(currentKeyWord)
        .$promise
        .then(function (data) {
          // 搜索结果列表
          $scope.search.originList = $scope.search.resultList = data;

          // 开始处理
          $filter('keyWordPoint')( data, currentKeyWord);

          $scope.containCates = $filter('cateContain')(data);

        });

      // 当前 filter
      $scope.filterCate = '';

      $scope.setFilter = function (cateId) {
        var newResult = [];
        $scope.filterCate = cateId;
        if($scope.search.originList.length > 2) {
          newResult = $filter('filter')($scope.search.originList , cateId);
        }
        $scope.search.resultList = newResult;
      };

  }])
  ;
