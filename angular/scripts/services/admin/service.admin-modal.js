'use strict';

angular
  .module('theoneAppAdmin.services')
  .factory('adminModalService', ['$http', '$modal', function ($http, $modal) {
    var currentId = '';

    var modalShow = function (optionObj) {
      var modalInstance = $modal.open(optionObj);
      //返回函数
      modalInstance.result.then(function(data){
        console.log(data);
      });
    };

    var httpDel = function (url) {
      return $http.delete(url);
    };

    var httpPut = function (url, newObj) {
      return $http.put(url, newObj);
    };

    var httpGet = function (url) {
      return $http.get(url);
    };

    var httpPost = function (url ,data) {
      return  $http.post(url, data);
    };

    // return obj
    return {
      current:function(){
        return currentId;
      },
      // 获取总列表
      cateList:function (url) {
        return httpGet(url);
      },
      // modal 开启
      modalOpen:function (optionObj, nowId) {
        currentId = '';

        if(nowId){
          currentId = nowId;
        }

        return modalShow(optionObj);
      },
      getId:function (url) {
        return httpGet(url);
      },
      delId:function (url) {
        return httpDel(url);
      },
      putNew:function (url, newObj) {
        return httpPut(url, newObj);
      },
      getlist:function (url) {
        return httpGet(url);
      },
      postlist: function(url ,options){
        return httpPost(url, options);
      },
      doEdit: function (url, data) {
        return httpPost(url, data);
      }
    };
  }]);
