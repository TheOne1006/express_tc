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
 .controller('AddCateController', ['$scope', '$modalInstance', 'cateService', 'catesService', function ($scope, $modalInstance, cateService, catesService) {
     $scope.cate = {
       name:'',
       alias:'',
       pid:''
     };

     catesService
      .list()
      .then(function (data) {
        $scope.parentCates = data;
      });

      $scope.save = function () {
       cateService
        .create( $scope.cate)
        .then(function (data) {
          console.log(data);
          $modalInstance.close();
        }, function ( error) {
          $modalInstance.close();
        });
     };

     $scope.cancel = function () {
       console.log('close');
       $modalInstance.dismiss();
     };

 }]);
