'use strict';


/**
 * 后台控制制器 - 文章类别编辑
 * @ngdoc theoneAppAdmin.controllers
 * @name  CateController
 * @description  后台 - 控制器 - 文章类别编辑
 *
 * controller module of theoneAppAdmin
 */
 angular
   .module('theoneAppAdmin.controllers')
   .controller('EditCateController', ['$scope', '$http', '$modalInstance', 'adminModalService',
     function ($scope, $http, $modalInstance, adminModalService) {
       var _id = adminModalService.current();

       $scope.cate = {};

       //验证
       adminModalService.getId('/admin/cate/id/'+_id)
         .success(function (data) {
           $scope.cate = data;
         });

       // article list
       $http.get('/admin/article/cate/'+_id)
         .success(function (data) {
           $scope.articles = data;
         });

       // toggle selection for id
         $scope.toggleSelection = function toggleSelection(articleId) {
           var idx = $scope.cate.topArticles.indexOf(articleId);

           // is currently selected
           if (idx > -1) {
             $scope.cate.topArticles.splice(idx, 1);
           }

           // is newly selected
           else {
             $scope.cate.topArticles.push(articleId);
           }
         };

       $scope.save = function () {
         $http.post('/admin/cate/edit/id/'+_id,{cate:$scope.cate})
           .success(function(data) {
             $modalInstance.close();
           });
       };

       $scope.cancel = function () {
         $modalInstance.dismiss();
       };

   }]);
