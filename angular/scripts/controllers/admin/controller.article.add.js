'use strict';

angular
  .module('theoneAppAdmin.controllers')
  .controller('ArticleAddController', ['$scope', 'tinymceService', 'articleService' , 'catesService', function ($scope, tinymceService, articleService, catesService) {
    // init scope
    $scope.tableName = '添加文章';
    $scope.keyWords = [];

    // init 函数
    function initArticle () {
      $scope.keyWords = [];
      $scope.newArticle = {
        title:'',
        cate:'',
        keyWords:[],
        contentHtml:'',
        contentMd:'',
        content:'',
        type:'html'
      };
    }

    // 初始化 Ariticle
    initArticle();

    // 获取所有cate
    catesService
      .allList()
      .$promise
      .then(function (data) {
        console.log(data);
        $scope.cates = data;
      });

    // ui-codemiror
    $scope.editorOptions = {
      lineWrapping : true,
      lineNumbers: true,
      matchBrackets: true,
      // mode: 'markdown',
      mode: 'gfm',
      theme:'base16-light'
    };

    // 提交表单
    $scope.save = function () {

      articleService
        .save($scope.newArticle, $scope.keyWords)
        .then(function (data) {
          console.log('success');
          console.log(data);

          initArticle();

        }, function (data) {
          console.log('fail');
          console.log(data);
        });
    };

    //编辑器
    $scope.tinymceOptions = tinymceService.options;
}]);
