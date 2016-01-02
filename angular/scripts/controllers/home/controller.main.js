'use strict';

/**
 * 前台总控制器
 * @ngdoc theOneBlog.controllers
 * mainCtrl
 *
 */
angular
  .module('theOneBlog.controllers')
  .controller('mainCtrl', ['$scope', function ($scope) {
    $scope.useableLeave = true;

    $scope.pageClass ='main';

  }])
  ;
