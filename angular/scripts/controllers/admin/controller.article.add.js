angular
  .module('theoneAppAdmin.controllers')
  .controller('ArticleAddController', ['$scope', 'adminModalService', 'tinymceService', 'UiTool', function ($scope, adminModalService, tinymceService, UiTool) {

    // init scope
    $scope.tableName = '添加文章';
    $scope.keyWords = [];

    // init 函数
    function initArticle () {
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
    adminModalService.cateList('/admin/cate/all').
      success(function (data) {
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
    $scope.ok = function () {

      // 处理 cate
      if($scope.newArticle.cate){
        $scope.newArticle.cate = $scope.newArticle.cate._id;
      }

      if($scope.newArticle.type === 'html') {
        $scope.newArticle.content = $scope.newArticle.contentHtml;
      } else {
        $scope.newArticle.content = $scope.newArticle.contentMd;
      }

      // 处理 keywords
      $scope.newArticle.keyWords = UiTool.tagInput2arr($scope.keyWords, []);

      adminModalService.putNew('/admin/article/add',{article:$scope.newArticle})
        .success(function (data) {

          console.log(data);

          initArticle();
        });
    };

    //编辑器
    $scope.tinymceOptions = tinymceService.options;
}]);
