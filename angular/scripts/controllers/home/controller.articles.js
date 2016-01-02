'use strict';

/**
 * 前台控制制器 - 文章列表
 * @ngdoc theOneBlog.controllers
 * @name  articlesCtrl
 * @description  前台 - 控制器 - 文章列表
 *
 * controller module of theOne Blog
 */
angular
  .module('theOneBlog.controllers')
  .controller('articlesCtrl', ['$scope', '$filter', '$location', 'articlesService', 'articlesByCateName', function ($scope, $filter, $location, articlesService, articlesByCateName) {

    // console.log(articlesByCateName.articleList);
    $scope.articleList = $filter('ArticlesByCateWordLimit')(articlesByCateName.articleList);

    $scope.cate = articlesByCateName.cate;
    $scope.currentPage = articlesByCateName.curPage;

    articlesService
      .getArticlesByIdCount(articlesByCateName.cate._id)
      .$promise
      .then(function (data) {
        $scope.articlesTotal = data.total;
      });

    $scope.pageNav = {
      maxSize:5, // 展示几个pagenav button
      itemsPerPage: 12, // 每页显示数量
      bigTotalItems: $scope.articlesTotal , // cate的文章总数
      curPage: $scope.currentPage, // 当前页面
      pageChanged: function(){
        $location.path('/cate/'+ $scope.cate.alias +'/'+ $scope.currentPage, false);
      }

    };



  }])
  ;
