angular
  .module('theoneAppAdmin.controllers')
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

  }]);
