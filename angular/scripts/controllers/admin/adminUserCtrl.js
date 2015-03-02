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

      var httpGet =function(url) {
        return $http.get(url);
      };

      var httpDel = function (url, data) {
        return $http.delete(url ,data);
      };

      var modalShow = function (optionObj) {
        var modalInstance = $modal.open(optionObj);
        //返回函数
        modalInstance.result.then(function(data){
          console.log(data);
        });
      };

      return {
        // modal 开启
        modalOpen : function (optionObj) {
          return modalShow(optionObj);
        },
        getMyPhotos : function () {
          return httpGet('/admin/user/myPhotoList');
        },
        // 同步到cloud
        upload2Cloud : function(url, _id) {
          return httpGet(url+'/'+_id);
        },
        // 获取用户详情
        getUserInfo : function () {
          return httpGet('/admin/user/myInfo');
        },
        // 创建 face++ Pserson
        createPerson : function() {
          return httpGet('/admin/user/createFacePerson');
        },
        updatePerson : function() {
          return httpGet('/admin/user/updateFacePerson');
        },
        delete4Cloud : function (url, data) {
          return httpDel(url ,data);
        },
        delete4FacePP : function (url, data) {
          return httpDel(url, data);
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
        update:false
      };

      userPhotoService.getMyPhotos()
        .success(function (data) {
          $scope.photos = data;
        });

      userPhotoService.getUserInfo()
        .success(function (user) {
          $scope.user = user;
          if(user.facePersonId){
            $scope.facePpPower.update = true;
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

      //上传
      $scope.uploader = {
        // 上传到 cloud
        cloud:function (_id) {
          console.log('111');
          userPhotoService.upload2Cloud('/admin/user/up2cloud', _id)
            .success(function (data) {
              console.log(data);
            });
        },
        // face++
        facePP:function (_id) {
          userPhotoService.upload2Cloud('/admin/user/up2facePP', _id)
            .success(function (data) {
              console.log(data);
            });
        },
        createPerson:function () {
          if(!$scope.facePpPower.create){
            return false;
          }
          userPhotoService.createPerson()
            .success(function(data) {
              console.log(data);
            });
        },
        updatePerson:function() {
          if(!$scope.facePpPower.update){
            return false;
          }
          userPhotoService.updatePerson()
            .success(function (data) {
              console.log(data);
            });
        }

      };

      // 删除
      $scope.deleter = {
        cloud:function  (_id) {
          userPhotoService.delete4Cloud('/admin/user/cloudSingle/'+_id);
        },
        facePP:function  (_id) {
          userPhotoService.delete4FacePP('/admin/user/faceSingle/'+_id);
        }
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