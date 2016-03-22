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
  .controller('DelCateController', ['$scope', '$modalInstance', 'adminModalService', 'cateService',
   function ($scope, $modalInstance, adminModalService, cateService) {
     var _id = adminModalService.current();

     $scope.cate = {};

     cateService
      .get(_id)
      .then(function (data) {
        $scope.cate = data;
      });

     $scope.confirm = function () {
       cateService
        .del(_id)
        .then(function (data) {
          console.log(data);
          $modalInstance.close();
        });
     };

     $scope.cancel = function () {
       $modalInstance.dismiss();
     };
   }]);
