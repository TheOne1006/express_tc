angular
  .module('theoneAppAdmin.controllers')
// 编辑文章
  .controller('ArticleEditController', ['$scope', '$stateParams', 'adminModalService', 'tinymceService', 'UiTool', 'catesService', 'articleService', function($scope, $stateParams, adminModalService, tinymceService, UiTool, catesService, articleService){
    var resetArticle;

    $scope.tableName = '编辑文章';
    $scope.article = {};

    // 获取所有cate
    catesService
      .list()
      .then(function (data) {
        $scope.cates = data;
      });

    articleService
      .get($stateParams.id)
      .then(function (data) {
        if(data.type === 'html') {
          data.contentHtml = data.content;
        } else {
          data.contentMd = data.content;
        }

        $scope.article = data;
        resetArticle = data;

        // 刷新 md 编辑器
        $scope.needRefresh = 1;

      });

      //编辑器
      $scope.tinymceOptions = tinymceService.options;

      // ui-codemiror
      $scope.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        matchBrackets: true,
        mode: 'gfm',
        theme:'base16-light'
      };


      // 提交表单
      $scope.save = function () {
        articleService
          .save($scope.article)
          .then(function (data) {
            console.log(data);
          });

      };
  }]);
