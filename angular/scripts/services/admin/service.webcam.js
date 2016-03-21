

/**
 * @ngdoc overview
 * @name theOneBlogLogin
 * @description
 * # theOneBlogLogin
 * theOne blog 后台 登陆 app services
 */
angular
  .module('theOneBlogLogin.services')
  .factory('webcamService', ['$http', '$window', '$interval', function($http, $window, $interval){
    var webcam = $window.Webcam,
    phsListArr = [],
    takePhotoInterval,

    webcamParams = {
      width: 360,
      height: 280,
      'dest_width': 180,
      'dest_height': 140,
      'image_format': 'jpeg',
      'jpeg_quality': 90
    };

    var setWebcam = function  (options) {
      angular.extend(webcamParams, options);
      webcam.set(webcamParams);
    };

    var startWebcam = function  (domId) {
      webcam.attach(domId);
      webcam.on('live',function  () {
        intervalGetPhoto();
      });
    };

    var httpPost = function (url, data) {
      return $http.post(url, {img:data});
    };

    var intervalGetPhoto = function  () {
      takePhotoInterval = $interval(function  () {
        if(webcam.container){
          webcam.snap(function (data) {
            phsListArr.push(data);
            webcam.upload(data,'/admin/login/verify/face',checkImage);
          });
        }else{
          takePhotoInterval.cancel();
        }
      },5000);
    };

    // 检测图片
    var checkImage = function  (status, data) {
      // 临时规划
      if(status === 200 && data) {
        data = JSON.parse(data);
        if(data.is_login) {
          $window.location = '/admin';
        }
      }
    };

    return {
      readyWebcam:function (options, domId) {
        options = options || {};
        setWebcam(options);
        startWebcam(domId);
      },
      takePhotos : function () {
        if(!webcam.container){
          return;
        }
      },
      getWebcam:function  () {
        return webcam.container;
      }
    };
  }]);
