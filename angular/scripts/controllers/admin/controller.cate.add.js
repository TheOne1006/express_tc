'use strict';


/**
 * 后台控制制器 - 文章类别添加
 * @ngdoc theoneAppAdmin.controllers
 * @name  CateController
 * @description  后台 - 控制器 - 文章类别添加
 *
 * controller module of theoneAppAdmin
 */
 angular.module('theoneAppAdmin.controllers')
 .controller('AddCateController', ['$scope', '$modalInstance', '$http', 'adminModalService', function ($scope, $modalInstance, $http, adminModalService) {
     $scope.cate = {
       name:'',
       alias:'',
       pid:''
     };

     adminModalService.cateList('/admin/cate/all')
       .success(function (data) {
         $scope.parentCates = data;
       });

      $scope.ok = function () {
       // 初始化 alias

       if($scope.pid && $scope.pid._id){
         $scope.pid = $scope.pid._id;
       }

       $http.put('/admin/cate/add',{
         cate:$scope.cate
       })
         .success(function(data, status){
           console.log(data);
           console.log(status);
           $modalInstance.close('is_ok');
         })
         .error(function(data, status){
           console.log(data);
           console.log(status);
           $modalInstance.close();
         });
     };

     $scope.cancel = function () {
       console.log('close');
       $modalInstance.dismiss();
     };

 }]);
