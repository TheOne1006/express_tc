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

    var modalShow = function (optionObj) {
      var modalInstance = $modal.open(optionObj);
      //返回函数
      modalInstance.result.then(function(data){
        console.log(data);
      });
    };

    var httpDel = function (url) {
      return $http.delete(url);
    };

    var httpPut = function (url, newObj) {
      return $http.put(url, newObj);
    };

    var httpGet = function (url) {
      return $http.get(url);
    };

    // return obj
    return {
      current:function(){
        return currentId;
      },
      // 获取总列表
      cateList:function (url) {
        return httpGet(url);
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
        return httpGet(url);
      },
      delId:function (url) {
        return httpDel(url);
      },
      putNew:function (url, newObj) {
        return httpPut(url, newObj);
      },
      getlist:function (url) {
        return httpGet(url);
      }
    };
  }])
// 编辑器配置 server
    .factory('tinymceService', [function(){

      return {
        options:{
          menubar: true,
          theme:'modern',
          //定义载入插件
          plugins : 'spellchecker,pagebreak,link,table,save,insertdatetime,preview,media,searchreplace,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking,template,code',
          //-语言包
          language : 'zh_CN'
        }
      };
    }])

;


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
        field:'updateTime',
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
// addcate
.controller('AddCateController', ['$scope', '$modalInstance', '$http', 'adminModalService', function ($scope, $modalInstance, $http, adminModalService) {
    $scope.aliasArr = [];
    $scope.cate = {
      name:'',
      alias:[],
      pid:''
    };

    adminModalService.cateList('/admin/cate/all')
      .success(function (data) {
        $scope.parentCates = data;
      });

     $scope.ok = function () {

      // 初始化 alias
      $scope.cate.alias = [];

      // 处理 alias 数组
      if($scope.aliasArr.length > 0){
        angular.forEach($scope.aliasArr, function (item) {
          $scope.cate.alias.push(item.text);
        });
      }

      if($scope.pid && $scope.pid._id){
        $scope.pid = $scope.pid._id;
      }

      $http.put('/admin/cate/add',{
        cate:$scope.cate
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
    var _id = adminModalService.current();

    $scope.cate = {};

    //验证
    adminModalService.getId('/admin/cate/id/'+_id)
      .success(function (data) {
        $scope.cate = data;
      });

    $scope.ok = function () {
      adminModalService.delId('/admin/cate/id/'+$scope.cateOid)
        .success(function (data) {
          
        });
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };

  }])
// 文章控制器
// url: /admin#/article
.controller('ArticleController', ['$scope', '$http', 'adminModalService', function ($scope, $http, adminModalService) {
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
                  adminModalService.getlist('/admin/article/list')
                  .success(function (largeLoad) {    
                      data = largeLoad.filter(function(item) {
                          return JSON.stringify(item).toLowerCase().indexOf(ft) !== -1;
                      });
                      $scope.setPagingData(data,page,pageSize);
                  });            
              } else {
                  adminModalService.getlist('/admin/article/list')
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

}])
// 删除文章
  .controller('DelArticleController', ['$scope', '$modalInstance', 'adminModalService', function ($scope, $modalInstance, adminModalService) {

    var _id;
    _id = adminModalService.current();


    adminModalService.getId('/admin/article/id/'+_id)
      .success(function (data) {
        $scope.article = data;
      });

    $scope.ok = function () {
      adminModalService.delId('/admin/article/id/'+_id)
        .success(function (data) {
          console.log(data);
        });
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  }])
// 增加文章
  .controller('ArticleAddController', ['$scope', 'adminModalService', 'tinymceService', function ($scope, adminModalService, tinymceService) {

    // init scope
    $scope.tableName = '添加文章';
    $scope.newArticle = {
      title:'',
      type:'',
      keyWords:[],
      content:''
    };
    
    // 获取所有cate
    adminModalService.cateList('/admin/cate/all').
      success(function (data) {
        $scope.cates = data;
      });

    // 提交表单
    $scope.ok = function () {
      if($scope.newArticle.type){
        $scope.newArticle.type = $scope.newArticle.type._id;
      }
      adminModalService.putNew('/admin/article/add',{article:$scope.newArticle})
        .success(function (data) {
          console.log(data);
        });
    };

    //编辑器
    $scope.tinymceOptions = tinymceService.options;
}])
// 编辑文章
  .controller('ArticleEditController', ['$scope', '$stateParams', 'adminModalService', 'tinymceService', function($scope, $stateParams, adminModalService, tinymceService){
    $scope.tableName = '编辑文章';
    $scope.article = {};
    
    // 获取所有cate
    adminModalService.cateList('/admin/cate/all')
      .success(function (data) {
        $scope.cates = data;
      });

    adminModalService.getId('/admin/article/id/'+$stateParams.id)
      .success(function (data) {
        $scope.article = data;
      });

      //编辑器
      $scope.tinymceOptions = tinymceService.options;
  }])
  ;