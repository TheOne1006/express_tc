'use strict';

/**
 * 后台 ng-controller 总控制器
 * @name theoneApp-admin.admin.controller
 * @description
 * # theoneApp
 *
 */

angular.module('theoneApp')
  .controller('CateController',['$scope','$http','$modal',function ($scope, $http, $modal){

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
    $scope.setPagingData = function(data, page, pageSize){  
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
        field:'id',
        displayName:'ID',
        width: 60,
        pinnable: false,
        sortable: false
      }, {
        field:'name',
        displayName:'名称'
      },{
        field:'article_num',
        displayName:'文章数量',
      },{
        field:'updatetime',
        displayName:'更新时间',
        cellFilter:'date:"yyyy-MM-dd"'
      },{
        displayName:'操作',
        cellTemplate:'<div><a id="{{row.getProperty(col.field)}}">编辑</a></div>'
      }],
      showGroupPanel:false,
      showFooter:true,
      enablePaging: true,
      pagingOptions: $scope.pagingOptions,
      filterOptions: $scope.filterOptions
      };


      //modal
      //打开
      $scope.open = function(size){
        var modalInstance = $modal.open({
          templateUrl:'/angular/views/modal/addCate.html',
          size:size,
          controller:'AddCateController',
          backdropClass:'heightfull'
        });
        //返回函数
        modalInstance.result.then(function(){});
      };

  }])
.controller('AddCateController', ['$scope','$modalInstance','$http', function ($scope, $modalInstance, $http) {

     $scope.ok = function () {
      $http.put('/admin/cate/add',{cateName:$scope.cateName,cateType:$scope.cateType})
        .success(function(data, status){
          console.log(data);
          console.log(status);
          $modalInstance.close();
        })
        .error(function(data, status){
          console.log(data);
          console.log(status);
          $modalInstance.close();
        });
    };

    $scope.cancel = function () {
      console.log('close');
      $modalInstance.dismiss();
    };
  
}])
// 文章控制器
.controller('ArticleController', ['$scope','$http', function ($scope, $http) {
  $scope.tableName = '文章列表';
  //预输入
  $scope.anywords = ['PHP','angular','javascript','mysql'];

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
  $scope.setPagingData = function(data, page, pageSize){  
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
                  $http.get('/angular/data/typeList.json')
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
      field:'id',
      displayName:'ID',
      width: 60,
      pinnable: false,
      sortable: false
    }, {
      field:'name',
      displayName:'名称'
    },{
      field:'article_num',
      displayName:'文章数量',
    },{
      field:'updatetime',
      displayName:'更新时间',
      cellFilter:'date:"yyyy-MM-dd"'
    },{
      displayName:'操作',
      cellTemplate:'<div><a id="{{row.getProperty(col.field)}}">编辑</a></div>'
    }],
    showGroupPanel:false,
    showFooter:true,
    enablePaging: true,
    pagingOptions: $scope.pagingOptions,
    filterOptions: $scope.filterOptions
    };

}])
  .controller('ArticleAddController', ['$scope', function ($scope) {
    $scope.tableName = '添加文章';
    //编辑器
    $scope.tinymceModel = '';
    $scope.tinymceOptions = { 
      menubar: true,
      theme:'modern',
      //定义载入插件
      plugins : 'spellchecker,pagebreak,link,table,save,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking,template',
      //-语言包
      language : 'zh_CN'
      };

}])
;