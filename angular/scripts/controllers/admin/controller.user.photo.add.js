angular
  .module('theoneAppAdmin.controllers')
  .controller('UserPhotoAddController', ['$scope', '$http', '$modalInstance','$window', function ($scope, $http,  $modalInstance, $window) {
    // 监控 windows.Webcam
    var webcam = $window.Webcam;
    // 照片列表
    $scope.photoList = [];

    if(webcam){
        webcam.set({
          width: 360,
          height: 280,
          'image_format': 'jpeg',
          'jpeg_quality': 90
        });
    }

    $scope.begin = function () {
        webcam.attach('#modalMovie');
    };

    $scope.cancel = function () {
      if(webcam.container){
        webcam.reset();
      }
      $modalInstance.dismiss();
    };

    $scope.delphoto = function  (key) {
      $scope.photoList.splice(key,1);
    };

    $scope.ok = function () {
      if(webcam.container){
        webcam.snap(function (data) {
          $scope.photoList.push(data);
        });
      }
    };

    $scope.upload = function () {
      if(!$scope.photoList){
        return;
      }
      $http.post('/admin/user/addUserPhotos',{photos:$scope.photoList})
        .success(function (data) {
          console.log(data);
        });

    };





  }]);
