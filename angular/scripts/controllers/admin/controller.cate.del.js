'use strict';


/**
 * 后台控制制器 - 文章类别删除
 * @ngdoc theoneAppAdmin.controllers
 * @name  CateController
 * @description  后台 - 控制器 - 文章类别删除
 *
 * controller module of theoneAppAdmin
 */
angular
  .module('theoneAppAdmin.controllers')
  .controller('DelCateController', ['$scope', '$modalInstance', 'adminModalService',
   function ($scope, $modalInstance, adminModalService) {
     var _id = adminModalService.current();

     $scope.cate = {};

     //验证
     adminModalService.getId('/admin/cate/id/'+_id)
       .success(function (data) {
         $scope.cate = data;
       });

     $scope.ok = function () {
       adminModalService.delId('/admin/cate/id/'+_id)
         .success(function (data) {

           $modalInstance.close();
         });
     };

     $scope.cancel = function () {
       $modalInstance.dismiss();
     };
   }]);
