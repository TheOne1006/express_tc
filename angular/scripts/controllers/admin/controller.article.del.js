angular
  .module('theoneAppAdmin.controllers')
  .controller('DelArticleController', ['$scope', '$modalInstance', 'adminModalService', function ($scope, $modalInstance, adminModalService) {

    var _id;
    _id = adminModalService.current();


    adminModalService.getId('/admin/article/id/'+_id)
      .success(function (data) {
        $scope.article = data;
      });

    $scope.ok = function () {
      adminModalService.delId('/admin/article/id/'+_id)
        .success(function (data) {
          console.log(data);
        });
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  }]);
