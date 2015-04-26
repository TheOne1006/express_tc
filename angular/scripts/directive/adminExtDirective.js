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
    .directive('previewImg', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            scope:{
              mypreview:'='
            },
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                var reader = new FileReader();
                var canvas = element.find('canvas');
                var params = scope.$eval(attributes.previewImg);

                var iscanvas = true;

                if (!helper.support) {
                  iscanvas = false;
                }

                if(!iscanvas) {
                  element.empty().html('<img />');
                  canvas = element.find('img');
                }


                scope.$watch('mypreview', function () {

                  if (!helper.isFile(scope.mypreview)) {return;}
                  if (!helper.isImage(scope.mypreview)) {return;}

                  reader.onload = onLoadFile;
                  reader.readAsDataURL(scope.mypreview);

                });

                function onLoadFile(e) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = e.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    if(iscanvas){ 
                      canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                    }else{
                      canvas.attr({src:angular.element(this).attr('src')});
                    }
                }
            }
        };
    }])
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