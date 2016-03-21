'use strict';
/**
 * 后台 文章信息
 * @ngdoc theOneBlog.services
 * @name  articlesService
 * @description  后台 - 服务 - 文章信息
 *
 * service module of theOne Blog
 */
angular
  .module('theoneAppAdmin.services')
  .factory('articleService', ['$resource', '$q', 'UiTool', function ($resource, $q, tool) {

    var articleBase = {
        title:'',
        cate:'',
        keyWords:[],
        contentHtml:'',
        contentMd:'',
        content:'',
        type:'html'
      },
      allowTypes = ['md', 'html'],
      resource = $resource('admin/api/article/:id',{id:'@id'},{create: {
        method : 'PUT'
      }});

    return {
      save: function ( newArticle , keys) {
        var article = angular.extend({}, articleBase, newArticle),
          defer = $q.defer();

        if(article.type === 'html') {
          article.content = article.contentHtml;
        }else {
          article.content = article.contentMd;
        }
        article.cate = article.cate._id;
        article.keyWords = tool.tagInput2arr(keys, []);

        resource
          .create({article: article}, function  (data) {
            defer.resolve(data);
          }, function ( res) {
            defer.reject( res);
          });

        return defer.promise;
      }


    };
  }]);
