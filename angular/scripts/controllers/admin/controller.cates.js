'use strict';


/**
 * 后台控制制器 - 文章类别
 * @ngdoc theoneAppAdmin.controllers
 * @name  CateController
 * @description  后台 - 控制器 - 文章类别
 *
 * controller module of theoneAppAdmin
 */

angular
  .module('theoneAppAdmin.controllers')
  .controller('CateController',['$scope','$http','$modal', 'adminModalService', function ($scope, $http, $modal, adminModalService) {

     $scope.tableName = '类别表';
     // 定义 ngGrid
     // 过滤文本
     $scope.filterOptions = {
       filterText:'',  // 过滤文字
       useExternalFilter:true
     };
     $scope.totalServerItems = 0; // 总个数
     //分页设置
     $scope.pagingOptions = {
         pageSizes: [5, 10, 20],
         pageSize: 6,
         currentPage: 1
     };

     //  －－固定写法
     $scope.setPagingData = function(data, page, pageSize) {
       var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
       $scope.myData = pagedData;
       $scope.totalServerItems = data.length;
       if (!$scope.$$phase) {
           $scope.$apply();
       }
     };
     // 根据路由传递过来的参数
     $scope.getPagedDataAsync = function (pageSize, page, searchText) {
       setTimeout(function () {
           var data;
           if (searchText) {
               var ft = searchText.toLowerCase();
               $http.get('/angular/data/typeList.json')
               .success(function (largeLoad) {
                   data = largeLoad.filter(function(item) {
                       return JSON.stringify(item).toLowerCase().indexOf(ft) !== -1;
                   });
                   $scope.setPagingData(data,page,pageSize);
               });
           } else {
             // 获取json 最后一行不应有 ,
               $http.get('/admin/cate')
                 .success(function (largeLoad) {
                   $scope.setPagingData(largeLoad,page,pageSize);
                 });
           }
       }, 100);
     };

     $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

     $scope.$watch('pagingOptions', function (newVal, oldVal) {
         if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
           $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
         }
     }, true);

     $scope.gridOptions = {
       data:'myData',
       columnDefs: [{
         displayName:'ID',
         width: 60,
         pinnable: false,
         sortable: false,
         // cell 显示 id 顺序
         cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><span>{{row.rowIndex+1}}</span></div>'
       }, {
         field:'name',
         displayName:'名称'
       },{
         field:'articleNum',
         displayName:'文章数量',
       },{
         field:'updateTime',
         displayName:'更新时间',
         cellFilter:'date:"yyyy-MM-dd"'
       },{
         field:'_id',
         displayName:'操作',
         // ng－click 传递 对象
         cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text><a href="javascript:;" ng-click="editOpen(row.entity._id)" >操作</a>&nbsp;<a href="javascript:;" cateid={{row["entity"]["_id"]}} ng-click="delOpen(row.entity._id)" >删除</a></span></div>'
       }],
       showGroupPanel:false,
       showFooter:true,
       enablePaging: true,
       enableRowSelection: true,
       multiSelect:false,
       pagingOptions: $scope.pagingOptions,
       filterOptions: $scope.filterOptions
       };


       //modal
       //打开
       $scope.open = function(size){
         //adminModalService 封装
         adminModalService.modalOpen({
             templateUrl:'/angular/views/modal/cate.add.html',
             size:size,
             controller:'AddCateController',
             backdropClass:'heightfull'
         });
       };

       // 删除信息
       $scope.delOpen = function (_id) {
           adminModalService.modalOpen({
             templateUrl:'/angular/views/modal/cate.del.html',
             controller:'DelCateController',
             backdropClass:'heightfull'
           }, _id);
       };

       // 操作cate
       $scope.editOpen = function (_id) {
         adminModalService.modalOpen({
           templateUrl:'/angular/views/modal/cate.edit.html',
           controller:'EditCateController',
           size:'large',
           backdropClass:'heightfull'
         },_id);
       };

   }]);
