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
  /*!
   * headroom.js v0.7.0 - Give your page some headroom. Hide your header until you need it
   * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
   * License: MIT
   */
  .directive('headroom',['$window', function($window) {
      var Headroom = $window.Headroom;
      
      if($window.innerWidth < 767){

      return {
        restrict: 'EA',
        scope: {
          tolerance: '=',
          offset: '=',
          classes: '=',
          scroller: '='
        },
        link: function(scope, element) {
          var options = {};
          angular.forEach(Headroom.options, function(value, key) {
            options[key] = scope[key] || Headroom.options[key];
          });
          if (options.scroller) {
            options.scroller = angular.element(options.scroller)[0];
          }
          var headroom = new Headroom(element[0], options);
          headroom.init();
          scope.$on('destroy', function() {
            headroom.destroy();
          });
        }
      };

      }
      return {};
    }])
    //ng-repeat end callback
    .directive('onFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        }
    })

  ;