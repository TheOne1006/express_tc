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
   .module('theOneBlog.services')
   .factory('articlesService', ['$resource', function ($resource) {
     var resource = $resource('/admin/api/articles',{page:1, limit:10, keyword:''});


     return {
       list: function ( keyword ) {
         return resource.query({ keyword: keyword});
       }
     }
   });
