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
      resource = $resource('/admin/api/article/:id',{id:'@id'},{create: {
        method : 'PUT'
      }});

    return {
      create: function ( newArticle , keys) {
        var article = angular.extend({}, articleBase, newArticle),
          defer = $q.defer();

        if(article.type === 'html') {
          article.content = article.contentHtml;
        }else {
          article.content = article.contentMd;
        }

        if(article.cate && article.cate._id) {
          article.cate = article.cate._id;
        }

        article.keyWords = tool.tagInput2arr(keys, []);

        resource
          .create({article: article}, function  (data) {
            defer.resolve(data);
          }, function ( res) {
            defer.reject( res);
          });

        return defer.promise;
      },
      save: function ( article) {

        /**
         * 处理数据信息
         * cate
         * type & content
         * keywords
         * author
         */
        if(article.cate && article.cate._id) {
          article.cate = article.cate._id;
        }

        if(article.type === 'html') {
          article.content = article.contentHtml;
        } else {
          article.content = article.contentMd;
        }

        article.keyWords = tool.tagInput2arr(article.keyWords, []);

        if(article.author && article.author._id) {
          article.author = article.author._id;
        }

        return resource
          .save({id:article._id, article: article})
          .$promise;
      },
      get: function ( _id ) {
        return resource.get({id:_id}).$promise;
      },
      del: function ( _id ) {
        return resource.delete({id:_id}).$promise;
      }


    };
  }]);
