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
  // .directive('headroom',['$window', 'browserHelp', function($window, browserHelp) {
  //     var Headroom = $window.Headroom;

  //     if(browserHelp.isMobile){

  //     return {
  //       restrict: 'EA',
  //       scope: {
  //         tolerance: '=',
  //         offset: '=',
  //         classes: '=',
  //         scroller: '='
  //       },
  //       link: function(scope, element) {
  //         var options = {};
  //         angular.forEach(Headroom.options, function(value, key) {
  //           options[key] = scope[key] || Headroom.options[key];
  //         });
  //         if (options.scroller) {
  //           options.scroller = angular.element(options.scroller)[0];
  //         }
  //         var headroom = new Headroom(element[0], options);
  //         headroom.init();
  //         scope.$on('destroy', function() {
  //           headroom.destroy();
  //         });
  //       }
  //     };

  //     }
  //     return {};
  //   }])
    //ng-repeat end callback
    .directive('onFinishRender',['$timeout',function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        };
    }])
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
      require: 'ngModel',
      restrict: 'A',
      link: function ($scope, element, attrs, ngModel) {

        // Get the function provided in the file-change attribute.
        // Note the attribute has become an angular expression,
        // which is what we are parsing. The provided handler is
        // wrapped up in an outer function (attrHandler) - we'll
        // call the provided event handler inside the handler()
        // function below.
        var attrHandler = $parse(attrs["fileChange"]);

        // This is a wrapper handler which will be attached to the
        // HTML change event.
        var handler = function (e) {

          $scope.$apply(function () {

            // Execute the provided handler in the directive's scope.
            // The files variable will be available for consumption
            // by the event handler.
            attrHandler($scope, { $event: e, files: e.target.files });
          });
        };

        // Attach the handler to the HTML change event
        element[0].addEventListener('change', handler, false);
      }
    };
  }])
.directive('scrollAnimate', [function () {
  return {
    restrict: 'A',
    link: function (scope, iElement, iAttrs) {
      var targetId = iAttrs.target;
      iElement.bind('click', function($event){
        // 阻止冒泡
        $event.stopPropagation();
        var targetTop = angular.element(targetId).offset().top;
        angular.element('body').animate({scrollTop: targetTop});
      });
    }
  };
}])
  ;
