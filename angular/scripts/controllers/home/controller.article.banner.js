'use strict';

/**
 * 前台控制制器 - 文章详情banner
 * @ngdoc theOneBlog.controllers
 * @name  articleBannerCtrl
 * @description  前台 - 控制器 - 文章详情banner
 *
 * controller module of theOne Blog
 */
angular
  .module('theOneBlog.controllers')
  .controller('articleBannerCtrl', ['$scope', '$window', function ($scope, $window) {

    var Vivus = $window.Vivus;
    var vivusTheOne = new Vivus('vivusTheOne', {type: 'scenario-sync', duration: '20', start: 'autostart', dashGap: '20', forceRender: true,file: '/public/svg/theoneIo.svg'});

    $scope.vireset = function(){
      vivusTheOne.reset().play();
    };
  }])
  ;
