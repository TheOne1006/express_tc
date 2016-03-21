'use strict';
/**
 * 后台 创建照片Service
 * @ngdoc function
 * @name theOne.services:PictureService
 * @description
 * # PictureService
 * Picture Service of the theOne app
 */
angular
  .module('theoneAppAdmin.services')
  .factory('userPhotoService', ['$http', '$modal',function ($http, $modal) {

    var httpGet =function(url) {
      return $http.get(url);
    };

    var httpDel = function (url, data) {
      return $http.delete(url ,data);
    };

    var modalShow = function (optionObj) {
      var modalInstance = $modal.open(optionObj);
      //返回函数
      modalInstance.result.then(function(data){
        console.log(data);
      });
    };

    return {
      // modal 开启
      modalOpen : function (optionObj) {
        return modalShow(optionObj);
      },
      getMyPhotos : function () {
        return httpGet('/admin/user/myPhotoList');
      },
      // 同步到cloud
      upload2Cloud : function(url, _id) {
        return httpGet(url+'/'+_id);
      },
      // 获取用户详情
      getUserInfo : function () {
        return httpGet('/admin/user/myInfo');
      },
      // 创建 face++ Pserson
      createPerson : function() {
        return httpGet('/admin/user/createFacePerson');
      },
      updatePerson : function() {
        return httpGet('/admin/user/updateFacePerson');
      },
      delete4Cloud : function (url, data) {
        return httpDel(url ,data);
      },
      delete4FacePP : function (url, data) {
        return httpDel(url, data);
      }

    };
  }]);
