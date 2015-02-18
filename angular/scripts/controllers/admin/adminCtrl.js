'use strict';

/**
 * 后台 ng-controller 总控制器
 * @name theoneApp-admin.admin.controller
 * @description
 * # theoneApp
 *
 */

/**
 * 注册 serve
 */

// 调用时，使用方法调用
// adminModalService.cateList()
angular.module('theoneApp')
  .factory('adminModalService', ['$http', '$modal', function ($http, $modal) {
    var currentId = '';
    // 获取列表
    var getCateList = function (url) {
      return $http({
        method:'GET',
        url:url,
      });
    };

    var modalShow = function (optionObj) {
      var modalInstance = $modal.open(optionObj);
      //返回函数
      modalInstance.result.then(function(data){
        console.log(data);
      });
    };


    return {
      current:function(){
        return currentId;
      },
      // 获取总列表
      cateList:function (url) {
        return getCateList(url);
      },
      // modal 开启
      modalOpen:function (optionObj, nowId) {
        currentId = '';

        if(nowId){
          currentId = nowId;
        }

        return modalShow(optionObj);
      },
      getId:function (url) {
        return getCateList(url);
      }
    };
  }]);


angular.module('theoneApp')
  .controller('CateController',['$scope','$http','$modal', 'adminModalService', function ($scope, $http, $modal, adminModalService){

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
        field:'updatetime',
        displayName:'更新时间',
        cellFilter:'date:"yyyy-MM-dd"'
      },{
        field:'_id',
        displayName:'操作',
        // ng－click 传递 对象
        cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text><a ng-href="javascript:;">操作</a>&nbsp;<a href="javascript:;" cateid={{row["entity"]["_id"]}} ng-click="delOpen(row)" >删除</a></span></div>'
      }],
      showGroupPanel:false,
      showFooter:true,
      enablePaging: true,
      enableRowSelection: false,
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
      $scope.delOpen = function (row) {
        var _id;
        if(row && row.entity && row.entity._id){
          _id = row.entity._id;
          adminModalService.modalOpen({
            templateUrl:'/angular/views/modal/cate.del.html',
            controller:'DelCateController',
            backdropClass:'heightfull'
          }, _id);
        }else{
          console.log('--- 没有找到 _id');
        }
      };

  }])
.controller('AddCateController', ['$scope','$modalInstance','$http','adminModalService', function ($scope, $modalInstance, $http, adminModalService) {
    $scope.catePid = '';
    adminModalService.cateList('/admin/cate/all')
      .success(function (data) {
        $scope.options = data;
      });

     $scope.ok = function () {
      $http.put('/admin/cate/add',{
        cateName:$scope.cateName,
        cateType:$scope.cateType,
        catePid:$scope.catePid
      })
        .success(function(data, status){
          console.log(data);
          console.log(status);
          $modalInstance.close('is_ok');
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
// 删除Cate控制器
.controller('DelCateController', ['$scope', '$modalInstance', 'adminModalService',
  function ($scope, $modalInstance, adminModalService) {
    var _id;
    _id = adminModalService.current();

    //验证
    adminModalService.getId('/admin/cate/id/'+_id)
      .success(function (data) {
        console.log(data);
      });

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
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

}]);