'use strict';

/**
 * 前台总控制器
 * @ngdoc theOneBlog.controllers
 * mainCtrl
 *
 */
angular
  .module('theOneBlog.controllers')
  .controller('mainCtrl', ['$scope', 'headerHelp', function ($scope ,headerHelp) {

    headerHelp.init();

    $scope.useableLeave = true;

    $scope.pageClass ='main';

  }])
  ;
