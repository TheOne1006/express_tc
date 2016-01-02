'use strict';
/**
 * 前台 首页文章列表
 * @ngdoc theOneBlog.services
 * @name  articleService
 * @description  前台 - 服务 - 文章分类列表
 *
 * service module of theOne Blog
 */

angular
  .module('theOneBlog.services')
  .factory('articlesService', ['$resource', function ($resource) {

    var articles = [],
      // currentCateId = '',
      crrrentCateAlias = '',
      // nextPage = 1,
      // hasNextPage = true,
      resource = $resource('/api/articles/:cateId',{} , {
        queryByCateAlias: {
          url:'/api/articlesByCateAlias/:cateAlias',
          method:'get',
          params: {page:1, limit:12},
          isArray: false
        },
        countByCateId: {
          url:'/api/cate/articlesCount/:cateId',
          method:'get',
          isAarray: false
        }
      });

    // var getArticlesByCateId = function (cateId, page, cb) {
    //   return resource.query({cateId: cateId,page:page}, function (data) {
    //     console.log(data);
    //     cb(data);
    //   });
    // };

    var ajaxGetArticlesByCateAlias = function (cateAlias, page) {
      return resource
              .queryByCateAlias({cateAlias:cateAlias, page:page}, function (data) {
                console.log(data);
              });
    };


    var ajaxGetCountByCateId = function (cateId) {
      return resource
                .countByCateId({cateId:cateId}, function (data) {
                  console.log(data);
                });
    };

    var ajaxGetArticlesSearchByKeyword = function (keyWord) {
      return resource
              .sarchByKeyWord({keyWord:keyWord}, function (data) {
                console.log('search key word '+keyWord+' result :');
                console.log(data);
              });
    };




    return {
      getArticlesByCateAliasList : function (cateAlias, page) {
        return ajaxGetArticlesByCateAlias(cateAlias, page);
      },
      getArticlesByIdCount : function (cateId) {
        return ajaxGetCountByCateId(cateId);
      }
    };
  }]);

