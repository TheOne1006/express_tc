'use strict';

/**
 * 前台 搜索服务
 * @ngdoc theOneBlog.services
 * @name  indexArticleService
 * @description  前台 - 服务 - 搜索服务
 *
 * service module of theOne Blog
 */

angular
  .module('theOneBlog.services')
  .factory('searchService', ['$resource', function ($resource) {

    var articles,
      resource = $resource('/api/search/articles/:keyWord');

    var ajaxGetArticlesByKeyWord= function (keyWord) {
      return resource.query({keyWord:keyWord}, function (data) {
        console.log(data);
      });
    };


    return {
      getListByKeyWord: function ( keyWord) {
        return ajaxGetArticlesByKeyWord(keyWord);
      }
    };


  }]);
