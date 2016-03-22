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
   .controller('EditCateController', ['$scope', '$modalInstance', 'adminModalService', 'cateService', 'articlesService',
     function ($scope, , $modalInstance, adminModalService,  cateService, articlesService) {
       var _id = adminModalService.current();

       $scope.cate = {};

       cateService
        .get(_id)
        .then(function (data) {
          $scope.cate = data;
        });

      articlesService
        .listByCate(_id)
        .then(function (data) {
          // console.log(data);
          $scope.articles = data;
        });

       // toggle selection for id
         $scope.toggleSelection = function toggleSelection(articleId) {
           var idx = $scope.cate.topArticles.indexOf(articleId);

           // is currently selected
           if (idx > -1) {
             $scope.cate.topArticles.splice(idx, 1);
           } else {
             $scope.cate.topArticles.push(articleId);
           }

         };

       $scope.save = function () {
         cateService
          .save($scope.cate)
          .then(function (data) {
            $modalInstance.close();
          });
       };

       $scope.cancel = function () {
         $modalInstance.dismiss();
       };

   }]);
