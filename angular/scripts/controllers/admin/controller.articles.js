'use strict';


/**
 * 后台控制制器 - 文章列表
 * @ngdoc theoneAppAdmin.controllers
 * @name  CateController
 * @description  后台 - 控制器 - 文章列表
 *
 * controller module of theoneAppAdmin
 */
angular
 .module('theoneAppAdmin.controllers')
 .controller('ArticleController', ['$scope', '$http', '$filter', '$timeout', 'adminModalService', 'tagsService', function ($scope, $http, $filter, $timeout, adminModalService, tagsService) {

   var watchForGoany = '';

   $scope.tableName = '文章列表';

   $scope.anywords = [];

   tagsService
    .allList()
    .$promise
    .then(function ( tags ) {
      $scope.anywords = $filter('getSingleFiled')( tags, 'name');
    });

   //预输入
   // $scope.anywords = ['PHP','angular','javascript','mysql'];

   // 定义 ngGrid
   // 过滤文本
   $scope.filterOptions = {
     filterText:'',  // 过滤文字
     useExternalFilter:true
   };

   // $scope.totalServerItems = 0; // 总个数
   //分页设置
   $scope.pagingOptions = {
       pageSizes: [10, 15, 20],
       currentPage: 1,
       pageSize:10
   };

   //  －－固定写法
   $scope.setPagingData = function(data, page, pageSize){
       // var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
       var pagedData = data;
       $scope.myData = pagedData;
       // $scope.totalServerItems = data.length;
       if (!$scope.$$phase) {
           $scope.$apply();
       }
   };
   // 根据路由传递过来的参数
   $scope.getPagedDataAsync = function (pageSize, page, searchText) {
               var data,
                 options = {
                   page: page,
                   pageSize: pageSize,
                   searchText: searchText
                 };

               if (searchText) {
                   var ft = searchText.toLowerCase();
                   adminModalService.postlist('/admin/article/list',options)
                   .success(function (largeLoad) {
                       data = largeLoad.filter(function(item) {
                           return JSON.stringify(item).toLowerCase().indexOf(ft) !== -1;
                       });
                       $scope.setPagingData(data,page,pageSize);
                   });
               } else {
                   adminModalService.postlist('/admin/article/list', options)
                     .success(function (largeLoad) {
                       $scope.setPagingData(largeLoad,page,pageSize);
                     });
               }
       };

   $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

   $scope.$watch('pagingOptions', function (newVal, oldVal) {
       if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
         $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
       }
   }, true);


   $scope.$watch('goany', function(newVal, oldVal){

     if(typeof newVal === 'string'){
       newVal = newVal.toLowerCase();
     }

     if(typeof oldVal === 'string'){
       oldVal = oldVal.toLowerCase();
     }

     if(newVal === oldVal){
       return;
     }

     if(watchForGoany) {
        $timeout.cancel(watchForGoany);
     }

     watchForGoany = $timeout(function() {
       $scope.filterOptions.filterText = newVal;
       // 设置pagingOption  and 获取数据
       $scope.pagingOptions.currentPage = 1;

       $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
     }, 500);


   }, false);

   $scope.filterOptions ={
     name:'123'
   };

   $scope.gridOptions = {
     data:'myData',
     columnDefs: [{
       field:'_id',
       displayName:'ID',
       width: 60,
       pinnable: false,
       sortable: false,
       // cell 显示 id 顺序
       cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><span>{{row.rowIndex+1}}</span></div>'
     }, {
       field:'title',
       displayName:'标题'
     },{
       field:'keyWords',
       displayName:'关键词',
     },{
       field:'updateTime',
       displayName:'更新时间',
       cellFilter:'date:"yyyy-MM-dd"'
     },{
       displayName:'操作',
       cellTemplate:'<div class="ngCellText"><a ng-href="#/article/edit/{{row.entity._id}}">编辑</a> &nbsp; <a href="javascript:;" ng-click="delOpen(row.entity._id)">删除</a></div>'
     }],
     showGroupPanel:false,
     showFooter:true,
     enablePaging: true,
     enableRowSelection: true,
     multiSelect:false,
     pagingOptions: $scope.pagingOptions,
     filterOptions: $scope.filterOptions
     };

   // 删除信息
   $scope.delOpen = function (_id) {
     adminModalService.modalOpen({
       templateUrl:'/angular/views/modal/article.del.html',
       controller:'DelArticleController',
       backdropClass:'heightfull'
     }, _id);
   };

 }]);
