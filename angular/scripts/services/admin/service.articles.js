'use strict';
/**
 * 后台 文章列表信息
 * @ngdoc theOneBlog.services
 * @name  articlesService
 * @description  后台 - 服务 - 文章列表信息
 *
 * service module of theOne Blog
 */
 angular
   .module('theoneAppAdmin.services')
   .factory('articlesService', ['$resource', function ($resource) {
     var resource = $resource('/admin/api/articles',{page:1, limit:10, keyword:'@keyword',cate: '@cateId'});


     return {
       list: function ( options ) {
         return resource.query(options);
       },
       listByCate: function (cateId) {
        return resource.query({cate:cateId, limit: 100}).$promise;
       }
     };
   }]);
