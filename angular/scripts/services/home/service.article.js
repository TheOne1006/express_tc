'use strict';

/**
 * 前台 首页文章详情
 * @ngdoc theOneBlog.services
 * @name  indexArticleService
 * @description  前台 - 服务 - 首页文章详情
 *
 * service module of theOne Blog
 */

angular
  .module('theOneBlog.services')
  .factory('articleService', ['$resource', '$q', function ($resource, $q) {

    /**
     * 当前 article
     */
    var article,
      resource = $resource('/api/article/:id',{id:'@id'});

    var ajaxGetArticleById = function (id) {
      return resource.get({id:id}, function (data) {
        article = data;
      });
    };


    return {
      getById: function (id) {
        if(article !== undefined && article._id === id) {
          var articleDefer = $q.defer();
            articleDefer.resolve(article);
          return {
            $promise: articleDefer.promise
          };
        }

        return ajaxGetArticleById(id);
      }
    };

  }]);
