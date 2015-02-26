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
    .controller('UserPhotoAddController', ['$scope','$modalInstance', function ($scope, $modalInstance) {
      
      $scope.ok = function () {
        $modalInstance.close();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss();
      };
      
    }]);