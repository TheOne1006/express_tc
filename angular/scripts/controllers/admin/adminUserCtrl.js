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
      
      var getUserInfo = function () {
        return $http.get('/admin/user/myInfo');
      };
      var getMyPhotos = function () {
        return $http.get('/admin/user/myPhotoList');
      };

      var modalShow = function (optionObj) {
        var modalInstance = $modal.open(optionObj);
        //返回函数
        modalInstance.result.then(function(data){
          console.log(data);
        });
      };

      var upload2Cloud = function (url,_id) {
        return $http.get(url+'/'+_id);
      };
    
      return {
        // modal 开启
        modalOpen:function (optionObj) {
          return modalShow(optionObj);
        },
        getMyPhotos:function () {
          return getMyPhotos();
        },
        upload2Cloud:function(url, _id) {
          return upload2Cloud(url, _id);
        },
        getUserInfo:function () {
          return getUserInfo();
        }

      };
    }]);

angular.module('theoneApp')
    .controller('UserController', ['$scope', function($scope){
        $scope.name = '';
    }])
    .controller('UserPhotoController', ['$scope', '$http', 'userPhotoService', function ($scope, $http, userPhotoService) {
      $scope.photos = [];
      $scope.user = '';
      $scope.facePpPower ={
        create:false,
        upset:false
      };

      userPhotoService.getMyPhotos()
        .success(function (data) {
          $scope.photos = data;
        });

      userPhotoService.getUserInfo()
        .success(function (user) {
          $scope.user = user;
          if(user.facePersonId){
            $scope.facePpPower.upset = true;
          }else{
            $http.get('/admin/user/createFacePower')
              .success(function (power) {
                if(power && power.hasCreatePower){
                  $scope.facePpPower.create = power.hasCreatePower;
                }
              });
          }
        });




      $scope.takePhoto = function (){
        userPhotoService.modalOpen({
            templateUrl:'/angular/views/modal/user.photo.add.html',
            size:'lg',
            controller:'UserPhotoAddController',
            backdropClass:'heightfull'
        });
      };


      /**
       * 同步到 cloud 端
       */
      $scope.up2Cloud = function (_id) {
        userPhotoService.upload2Cloud('/admin/user/up2cloud', _id)
          .success(function (data) {
            console.log(data);
          });
      };

      /**
       * 上传到facePlusPlus
       */
      $scope.up2facePP = function (_id) {
        userPhotoService.upload2Cloud('/admin/user/up2facePP', _id)
          .success(function (data) {
            console.log(data);
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