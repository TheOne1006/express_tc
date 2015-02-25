'use strict';

/**
 * 后台登录ng-controller
 * @name theoneApp-admin.login.controller
 * @description
 * # theoneApp
 *
 */

angular.module('theoneApp')
  .controller('LoginController',['$scope', '$window', '$http',function ($scope, $window, $http) {
  $scope.user = {
    name:'',
    password:'',
    rember:''
  };
  $scope.loginSubmit = function () {
    $http.post('/admin/verify/password',{user:$scope.user}).success(function  (data) {
      console.log(data);
    });

  };
}]);