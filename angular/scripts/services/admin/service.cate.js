'use strict';
/**
 * 后台 分类信息
 * @ngdoc theOneBlog.services
 * @name  articlesService
 * @description  后台 - 服务 - 分类信息
 *
 * service module of theOne Blog
 */
 angular
   .module('theoneAppAdmin.services')
   .factory('cateService', ['$resource', function ($resource) {

     var cateBase = {
       name :'',
       alias:'',
       pid  :''
     },
     resource = $resource('/admin/api/cate/:id', {id:'@id'},{create:{
       method: 'PUT'
     }});

     return {
       create: function ( newCate ) {
         var cate = angular.extend({}, cateBase, newCate);

         if(cate.pid && cate.pid._id) {
           cate.pid = cate.pid._id;
         }

         return resource
                  .create({cate:cate})
                  .$promise;

       },
       del: function ( _id ) {
         return resource.delete({id:_id}).$promise;
       },
       get: function (_id) {
         return resource.get({id:_id}).$promise;
       },
       save: function ( editCate ) {
         var cate = angular.extend({}, cateBase, editCate);

         return resource.save({id:editCate._id, cate: cate}).$promise;

       }
     }
   }]);
