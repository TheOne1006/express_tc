'use strict';

angular
  .module('theOneBlog.directives')
  .directive('prettyprint', ['$window', function ($window) {
    return {
      restrict: 'C',
      link: function postLink(scope, element) {

            var printFun = $window.prettyPrintOne;

            if(printFun && angular.isFunction(printFun)) {
              element.html(printFun((element.html()),'',true));
            }
      }
    };
  }]
);
