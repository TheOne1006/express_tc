'use strict';

/**
 * 前台 首页文章列表
 * @ngdoc theOneBlog.services
 * @name  indexArticlesService
 * @description  前台 - 服务 - 首页推荐文章
 *
 * service module of theOne Blog
 */
angular
  .module('theOneBlog.services')
  .factory('indexArticlesService', ['$resource', '$q' , function ($resource, $q) {

    /**
     * 首页 列表资源
     */
    var recommendArticlesByCate = [],
      resource = $resource('/home/index/list');


      /**
       * 获取首页每个类别的推荐文章
       * @return defer Object
       */
    function getIndexArticlesList () {
      return resource.query({},{},function (data) {
        if(data.length > 0) {
          recommendArticlesByCate = data;
        }
      });
    }

    return {
      // 当缓存存在时模拟返回一个defer 对象
      getList: function () {
        if(recommendArticlesByCate !== undefined && recommendArticlesByCate.length !== 0) {
            var articleDefer = $q.defer();

            articleDefer.resolve(recommendArticlesByCate);

            return {
              $promise : articleDefer.promise
            };
        }

        return getIndexArticlesList();
      }
    };
  }]);
