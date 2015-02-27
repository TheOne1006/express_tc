'use strict';

/**
 * 后台 ng-controller User 总控制器
 * @name theoneApp-admin.admin.Usercontroller
 * @description
 * # theoneApp
 *
 */

/**
 * 注册 serve
 */


angular.module('theoneApp')
    // 创建照片Service
    .factory('userPhotoService', ['$http', '$modal',function ($http, $modal) {
      
      var modalShow = function (optionObj) {
        var modalInstance = $modal.open(optionObj);
        //返回函数
        modalInstance.result.then(function(data){
          console.log(data);
        });
      };
    
      return {
        // modal 开启
        modalOpen:function (optionObj) {
          return modalShow(optionObj);
        }
      };
    }]);

angular.module('theoneApp')
    .controller('UserController', ['$scope', function($scope){
        $scope.name = '';
    }])
    .controller('UserPhotoController', ['$scope', 'userPhotoService', function ($scope, userPhotoService) {

      $scope.takePhoto = function (){
        userPhotoService.modalOpen({
            templateUrl:'/angular/views/modal/user.photo.add.html',
            size:'lg',
            controller:'UserPhotoAddController',
            backdropClass:'heightfull'
        });
      };
    }])
    // 添加管理员头像
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