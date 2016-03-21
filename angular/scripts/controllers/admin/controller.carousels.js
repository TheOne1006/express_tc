angular
.module('theoneAppAdmin.controllers')
/**
 * carousel Controller
 */
.controller('CarouselCtrl', ['$scope','$http', 'adminModalService', function($scope, $http, adminModalService){
  $scope.h1Title = '首页Carsouel设置';
  $scope.tableName = '首页幻灯片列表';

  $scope.carouselList = [];

  //modal
  //打开
  $scope.open = function(size){
    //adminModalService 封装
    adminModalService.modalOpen({
        templateUrl:'/angular/views/modal/carousel.add.html',
        size:size,
        controller:'AddCarouselCtrl',
        backdropClass:'heightfull'
    });
  };


  // 上传到could
  $scope.uploadCloud = function (id) {
    $http.get('/admin/carousel/upClould/'+id)
      .success(function (data) {
        getCarouselList();
      });
  };

  // 删除could
  $scope.delCloud = function (id) {
    $http.get('/admin/carousel/delClould/'+id)
      .success(function (data) {
        getCarouselList();
      });
  };

  // 激活
  $scope.changeStatus = function (id) {
    $http.get('/admin/carousel/changStatus/'+id)
      .success(function (data) {
        getCarouselList();
      });
  };

  // 删除数据
  $scope.singleRemove = function (id) {
    $http.delete('/admin/carousel/del/'+id)
      .success(function (data) {
        getCarouselList();
      });
  };


  function getCarouselList() {
    $http.get('/admin/carousel/list')
      .success(function (data) {
        $scope.carouselList = data;
      });
  }

  getCarouselList();

}])
