'use strict';
/**
 * login router
 */
 angular.module('theoneApp')
   .config(function($stateProvider,$urlRouterProvider) {
     $urlRouterProvider.otherwise('/');
     $stateProvider
       .state('webcam',{
         url:'/webcam',
         views:{
           '@':{
             templateUrl: '/angular/views/admin/login/webcam.html'
           }
         }
       });
     });

/**
 * 后台登录ng-controller
 * @name theoneApp-admin.login.controller
 * @description
 * # theoneApp
 *
 */
angular.module('theoneApp')
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

    var intervalGetPhoto = function  () {
      takePhotoInterval = $interval(function  () {
        if(webcam.container){
          webcam.snap(function (data) {
            phsListArr.push(data);
            console.log(data);
          });
        }else{
          takePhotoInterval.cancel();
        }
      },5000);
    };



    return {
      readyWebcam:function (options, domId) {
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
  }])
  .controller('LoginController',['$scope', '$window', '$http',function ($scope, $window, $http) {
  $scope.user = {
    name:'',
    password:'',
    rember:''
  };
  $scope.loginSubmit = function () {
    $http.post('/admin/verify/password',{user:$scope.user}).success(function  (data) {
      console.log(data);
    });
  };
}])
  .controller('LoginWebcamController',['$scope','$timeout','$window', 'webcamService', function($scope, $timeout, $window, webcamService){

    $scope.phListArr = [];

    $timeout(function () {
      webcamService.readyWebcam(null, '#photo');
    },1000);



  }])
  ;