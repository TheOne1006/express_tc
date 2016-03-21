angular
  .module('theoneAppAdmin.controllers')
// 编辑文章
  .controller('ArticleEditController', ['$scope', '$stateParams', 'adminModalService', 'tinymceService', 'UiTool', function($scope, $stateParams, adminModalService, tinymceService, UiTool){
    var resetArticle;
    $scope.tableName = '编辑文章';
    $scope.article = {};

    // 获取所有cate
    adminModalService.cateList('/admin/cate/all')
      .success(function (data) {
        $scope.cates = data;
      });

    adminModalService.getId('/admin/article/id/'+$stateParams.id)
      .success(function (data) {
        if(data.type === 'html') {
          data.contentHtml = data.content;
        } else {
          data.contentMd = data.content;
        }

        $scope.article = data;
        resetArticle = data;

        // 刷新 md 编辑器
        $scope.needRefresh = 1;


        console.log('end');
      });

      //编辑器
      $scope.tinymceOptions = tinymceService.options;

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
      $scope.ok = function () {
        // 处理 cate
        if($scope.article.cate){
          $scope.article.cate = $scope.article.cate._id;
        }

        // 处理 type
        if($scope.article.type === 'html') {
          $scope.article.content = $scope.article.contentHtml;
        } else {
          $scope.article.content = $scope.article.contentMd;
        }

        // 处理 keywords
        $scope.article.keyWords = UiTool.tagInput2arr($scope.article.keyWords, []);
        $scope.article.author = $scope.article.author._id;

        adminModalService.doEdit('/admin/article/edit',{article:$scope.article})
          .success(function (data) {
            console.log(data);
          });

      };
  }]);
