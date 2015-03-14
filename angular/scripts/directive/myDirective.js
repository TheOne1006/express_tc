'use strict';

/**
 * @ngdoc theOneBlog - directive
 * @name myDirective
 * @author theone
 * @description 自定义指令
 * # theOneBlog
 *
 * self directive of the application in web.
 */

angular.module('theOneBlog')
  .directive('toggleSide', ['$rootScope', function ($rootScope) {
    return {
      restrict: 'A',
      link: function (scope, iElement) {
        iElement.bind('click',function () {
          $rootScope.view.offCanvas = !$rootScope.view.offCanvas;
        });
      }
    };
  }]);