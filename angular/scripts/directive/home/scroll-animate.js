'use strict';

angular
  .module('theOneBlog.directives')
  .directive('scrollAnimate', [function () {
  return {
    restrict: 'A',
    link: function (scope, iElement, iAttrs) {
      var targetId = iAttrs.target;
      iElement.bind('click', function( $event){
        // 阻止冒泡
        $event.stopPropagation();

        var ele = angular.element(targetId),
          targetTop = ele.offset() && ele.offset().top;
          if( targetTop) {
            angular.element('body').animate({scrollTop: targetTop});
          }
      });
    }
  };
}]);
