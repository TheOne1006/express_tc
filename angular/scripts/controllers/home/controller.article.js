'use strict';

/**
 * 前台控制制器 - 文章详情
 * @ngdoc theOneBlog.controllers
 * @name  articleCtrl
 * @description  前台 - 控制器 - 文章详情
 *
 * controller module of theOne Blog
 */
angular
  .module('theOneBlog.controllers')
  .controller('articleCtrl', ['$scope', '$filter', 'headerHelp', 'articleService', 'article' , function ($scope, $filter, headerHelp, articleService, article) {

    headerHelp.changeTitle( article.title);
    headerHelp.changeDescription( article.descript);
    headerHelp.changekeyWord( article.keyWords.join(','));

    $scope.pageClass ='article';

    // console.log(article.descript);


    // filter
    article.updateTime = $filter('date')(article.updateTime, 'yyyy-MM-dd');

    $scope.article = article;


  }])
  ;
