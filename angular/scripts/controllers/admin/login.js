'use strict';

/**
 * 后台登录ng-controller
 * @name theoneApp-admin.login.controller
 * @description
 * # theoneApp
 *
 */

angular.module('theoneApp')
  .controller('LoginController',function ($scope,$window) {
  $scope.user = {
    name:'',
    password:''
  };
  $scope.loginSubmit = function () {
    $window.location.href = '/admin';
  };
});