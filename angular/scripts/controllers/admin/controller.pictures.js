angular
  .module('theoneAppAdmin.controllers')
  .controller('PicturesList', ['$scope', 'adminModalService', 'PictureService', function($scope, adminModalService, PictureService){
  $scope.h1Title = '图片管理';

  $scope.pictures = [];
  PictureService.list(function (data) {
    console.log(data);
    $scope.pictures = data;
  });


  /**
   * open
   */
  $scope.open = function (size) {
    //adminModalService 封装
    adminModalService.modalOpen({
        templateUrl:'/angular/views/modal/picture.add.html',
        size:size,
        controller:'AddPictureCtrl',
        backdropClass:'heightfull'
    });
  };

  // 上传到could
  $scope.uploadCloud = function (id) {
    PictureService
      .upClould(id, function (data) {
        console.log(data);
      });
  };

  // 从could 删除
  $scope.delCloud = function (id) {
    PictureService
      .delClould(id, function (data) {
        console.log(data);
      });
  };



}]);
