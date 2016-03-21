'use strict';

/**
 * @ngdoc theoneApp 后台 - directive
 * @name adminExtDirective
 * @author theone
 * @description 自定义指令
 * # theoneApp
 *
 * self directive of the application in web.
 */

angular.module('theoneApp')
    /**
     * imgUploadPreview
     */
.directive('fileChange', ['$parse', function($parse) {

    return {
      restrict: 'A',
      link: function ($scope, element, attrs) {
        var attrHandler = $parse(attrs.fileChange);

        var handler = function (e) {

          $scope.$apply(function () {
            attrHandler($scope, { $event: e, files: e.target.files });
          });
        };
        element[0].addEventListener('change', handler, false);
      }
    };
  }])
  ;
