'use strict';


/**
 * @ngdoc theOneBlog - directive
 * @name directive
 * @author theone
 * @description 自定义指令, 手动渲染 html
 * # theOneBlog
 *
 * self filter of the application in web.
 */

angular
  .module('theOneBlog.directives')
  .directive('compileHtml',['$compile',function($compile) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        scope.$watch(
          function(scope) {
            return scope.$eval(attrs.compileHtml);
          },
          function(value) {
            element.html(value);
            $compile(element.contents())(scope);
          }
        );
      }
    };
  }]);
