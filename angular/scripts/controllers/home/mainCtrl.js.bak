'use strict';

/**
 * 前台总控制器
 * @name theOneBlog.mainCtrl
 * # theOneBlog
 *
 */

angular.module('theOneBlog')

  // 数据存储
  .factory('dataServer', ['$http', '$q', function($http, $q){
    var mainArticles = {
      updatetime:'',
      data:[]
    };

    var indexCarList = [];

    function getList (url, sucCall, errCall) {
      $http({
        method:'GET',
        data:'JSON' ,
        url:url
      })
      .success(function  (data) {
        mainArticles.updatetime = Date.parse(new Date());
        mainArticles.data = data;
        sucCall(data);
      })
       .error(function  (data) {
         errCall(data);
       });
    }

    function indexCarousel () {
      var deferred = $q.defer();

      $http.get('/carousel/index/list')
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (data) {
          deferred.reject(data);
        });

      return deferred.promise;
    }


    return {
      getlistCall:function  (url, sucCall, errCall) {
        if(mainArticles && mainArticles.data && mainArticles.data.length > 0){
          return sucCall(mainArticles.data);
        }else{
          return getList(url, sucCall, errCall);
        }
      },

      /**
       * 获取首页carousel   server缓存
       * @return {arr}
       */
      getIndexCarousel:function () {
        var def = $q.defer();
        if(indexCarList.length){
          def.resolve(indexCarList);

        }else{
          indexCarousel()
            .then(function (data) {
              angular.forEach(data, function (item) {
                indexCarList.push({
                  img:item.imgInCloud.secure_url,
                  text:item.imgTitle
                });
              });
              def.resolve(indexCarList);
            });
        }

        return def.promise;
      }

    };
  }])
  .controller('MainCtrl',['$scope', '$location', function ($scope, $location) {
    // search 信息
    $scope.search = {
      keyWord:''
    };

    // headerView
    $scope.headerView = {
      isCollapsed:false
    };

    $scope.changeCollapsed = function () {
      $scope.headerView.isCollapsed = !$scope.headerView.isCollapsed;
    };

    //搜索 ,更换location.path
    $scope.goSearch = function () {
      if(!$scope.search.keyWord){
        return;
      }
      $location.path('/search/'+$scope.search.keyWord);
    };

  }])
  // 首页文章Ctrl
  .controller('MainArticleCtrl', ['$scope', '$filter', 'dataServer', 'indexList', function($scope, $filter, dataServer, indexList){
    // 获取main页面 文章列表
    $scope.indexList = $filter('IndexArticlesWordlimit')(indexList);
    // $scope.indexList = indexList;
  }])
  .controller('MainAffixCtrl', ['$scope', 'indexList', function ($scope, indexList) {
    $scope.cates =  indexList;
  }])
  // 滚动图片
  .controller('CarouselCtrl',['$scope', 'dataServer',function ($scope, dataServer) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];

    // 获取首页carousel
    dataServer.getIndexCarousel()
      .then(function (data) {
        if(data.length){
          // console.log(data);
          $scope.slides = data;
        }
        else{
          testSlide();
        }
      });


    //test start
    function testSlide () {
      for (var i=0; i<4; i++) {
        $scope.addSlide();
      }
    }

    $scope.addSlide = function() {
      var width = 1200;
      slides.push({
        img: 'http://lorempixel.com/' + width + '/305/nature/'+slides.length,
        text: 'test'
      });
    };
    //test end

  }])
.controller('headerCtrl', ['$scope', 'indexList', 'cateList', function ($scope, indexList, cateList) {
    $scope.cateList = cateList;
    // console.log(cateList);

}])
// 文章列表
.controller('ArticleCtrl', ['$scope', '$http', '$stateParams','$timeout', '$filter', '$templateCache', 'headerMes','article', function($scope, $http, $stateParams, $timeout, $filter, $templateCache, headerMes, article){

  // filter
  article.data.updateTime = $filter('date')(article.data.updateTime,'yyyy-MM-dd');

  $templateCache.put('article.content.html',article.data.content);

  $scope.article = article.data;

  // 通知改变 title
  headerMes.changeTitle(article.data.title);

  $scope.$watch('article.content', function () {
    $timeout(function () {
      prettyPrint();
    },0);
  });

  $scope.pageClass ='article';

}])
// 搜索
.controller('SearchCtrl', ['$scope', '$timeout', '$filter', 'result', 'searchWord', 'resultCase', function($scope, $timeout, $filter, result, searchWord, resultCase){

  $filter('keywordPointFilter')(result, searchWord);

  // 搜索关键词
  $scope.search.keyWord = searchWord;

  // 搜索结果列表
  $scope.search.resultList = result;

  // page类型
  $scope.pageClass = 'search';

  // 当前 filter
  $scope.filterCate = '';

  $scope.setFilter = function (cateId) {
    var newResult = result;

    $scope.filterCate = cateId;

    newResult = $filter('filter')(newResult, cateId);

    $scope.search.resultList = newResult;

  };


  $timeout(function () {
    $scope.search.menuKinds = resultCase;
  },0);

  // 搜索结果的种类
  // $http.get('/angular/data/search.left.json').success(function  (data) {
  //   $scope.search.menuKinds = data;
  // });

  // $http.get('/angular/data/search.right.json').success(function  (data) {
  //   $scope.search.resultList = data;
  // });

}])
  .controller('CateListCtrl', ['$scope', '$filter', '$location', '$stateParams', 'articlesByCate', 'curpage', 'totalNum', function ($scope, $filter, $location, $stateParams, articlesByCate, curpage, totalNum) {

    $scope.pageNav = {
      maxSize:5, // 展示几个pagenav button
      itemsPerPage: 12, // 每页显示数量
      bigTotalItems: totalNum.total, // cate的文章总数
      bigCurrentPage:curpage, // 当前页面
      pageChanged: function(){
        $location.path('/cate/'+ $stateParams.cate +'/'+$scope.pageNav.bigCurrentPage, false);
      }

    };

    $scope.articleList = $filter('ArticlesByCateWordLimit')(articlesByCate.articleList);

    $scope.cate = articlesByCate.alias;




  }])
  .controller('articleBannerCtrl', ['$scope', '$window', function ($scope, $window) {
  var Vivus = $window.Vivus;
  var vivusTheOne = new Vivus('vivusTheOne', {type: 'scenario-sync', duration: '20', start: 'autostart', dashGap: '20', forceRender: true,file: '/public/svg/theoneIo.svg'});

  $scope.vireset = function(){
    vivusTheOne.reset().play();
  };

  }])
  ;
