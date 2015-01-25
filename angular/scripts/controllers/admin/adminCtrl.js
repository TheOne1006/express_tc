'use strict';

/**
 * 后台 ng-controller 总控制器
 * @name theoneApp-admin.admin.controller
 * @description
 * # theoneApp
 *
 */

angular.module('theoneApp')
  .controller('CateController',['$scope',function ($scope){
    $scope.tableName = '类别表';
    // 案例
    $scope.myData = [{name: 'Moroni', age: 50},
                     {name: 'Tiancum', age: 43},
                     {name: 'Jacob', age: 27},
                     {name: 'Nephi', age: 29},
                     {name: 'Enos', age: 34}];
    $scope.gridOptions = {data:'myData' };
  }]);