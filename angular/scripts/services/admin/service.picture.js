'use strict';
/**
 * 后台 图片管理服务
 * @ngdoc function
 * @name theOne.services:PictureService
 * @description
 * # PictureService
 * Picture Service of the theOne app
 */
angular
  .module('theOneBlog.service')
  .factory('PictureService', ['$resource',function ($resource) {

    var pictures,
      resourceList = $resource('/admin/pictures'),
      picResource = $resource('/admin/picture/clould/:id', null, {
        upload: {
          method: 'get',
          isArray: false,
          url: '/admin/picture/upClould/:id'
        },
        delClould:{
          method: 'delete',
          isArray: false,
          url: '/admin/picture/upClould/:id'
        },
        timeout: 20000
      });

    var getPictures = function (cb) {
      return resourceList.query({},function (data) {
        // console.log(data);
        if(cb) {
          cb(data);
        }
      }).$promise;
    };

    var upClould = function (id, cb) {
      return picResource.upload({id:id},function (data) {
        if(cb) {
          cb(data);
        }
      }).$promise;
    };

    var delClould = function (id, cb) {
      return picResource.delClould({id:id},function (data) {
        if(cb) {
          cb(data);
        }
      }).$promise;
    };

    return {
      list: function ( cb) {
        return getPictures( cb);
      },
      upClould : function (id, cb) {
        return upClould(id, cb);
      },
      delClould: function (id, cb) {
        return delClould(id, cb);
      }
    };
  }]);

