angular
.module('theoneAppAdmin.controllers')
.controller('TagListController', ['$scope', 'adminModalService', function ($scope, adminModalService) {
  // init scope
  $scope.tableName = '标签列表';
  $scope.tags = [];

  adminModalService
   .getlist('/admin/tag/list')
   .success(function (data) {
     $scope.tags = data;
   });
}])
