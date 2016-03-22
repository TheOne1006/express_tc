angular
  .module('theoneAppAdmin.controllers')
  .controller('DelArticleController', ['$scope', '$modalInstance', 'adminModalService', 'articleService', function ($scope, $modalInstance, adminModalService, articleService) {

    var _id = adminModalService.current();

    articleService
      .get(_id)
      .then( function (data) {
        $scope.article = data;
      })

    $scope.confirm = function () {
      articleService
        .del(_id)
        .then(function (data) {
          console.log(data);
          $modalInstance.close();
        });

    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  }]);
