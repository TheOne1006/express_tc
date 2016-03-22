'use strict';
/**
 * 后台 分类列表信息
 * @ngdoc theOneBlog.services
 * @name  catesService
 * @description  后台 - 服务 - 分类列表信息
 *
 * service module of theOne Blog
 */
 angular
   .module('theoneAppAdmin.services')
   .factory('catesService', ['$resource', function ($resource) {
     var resource = $resource('/admin/api/cates',{page:1, limit:10, keyword:'@keyword'});


     return {
       list: function ( options) {
         return resource.query(options).$promise;
       }
     };
   }]);
