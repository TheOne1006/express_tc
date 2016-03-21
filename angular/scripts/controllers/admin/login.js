'use strict';

/**
 * 后台登录ng-controller
 * @name theOneBlogLogin
 * @description
 * # theOneBlogLogin
 */
angular.module('theOneBlogLogin.controllers')
  .controller('LoginController',['$scope', '$window', '$http',function ($scope, $window, $http) {
    $scope.user = {
      name:'',
      password:'',
      rember:''
    };
    $scope.loginSubmit = function () {
      $http.post('/admin/login/verify/password',{user:$scope.user}).success(function  (data) {
        console.log(data);
      });
    };
  }])
  .controller('LoginWebcamController',['$scope','$timeout','$window', 'webcamService', function($scope, $timeout, $window, webcamService) {

    $scope.phListArr = [];

    $timeout(function () {
      webcamService.readyWebcam(null, '#photo');
    },1000);

  }]);
