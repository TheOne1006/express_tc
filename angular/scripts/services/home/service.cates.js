'use strict';

/**
 * @ngdoc 前台 catesService
 * @name theOneBlog
 * @description 前台分类 Service
 * # theOneBlog
 *
 * cates service of the application in web.
 */
angular
  .module('theOneBlog.services')
  .factory('catesService', ['$resource', '$q' , function ($resource, $q) {

    var cates = [],
    resource = $resource('/api/cates/all', null,{
      timeout: 20000
    });

    var ajaxGetCates = function () {
      return resource.query( null, function (data) {
        if(data.length > 0) {
          cates = data;
        }
      });
    };


    return {
      getAllCates: function() {
        if(cates !== undefined && cates.length !== 0) {

          var catesDefer = $q.defer();
          catesDefer.resolve(cates);

          return {
            $promise: catesDefer.promise
          };
        }else{
          return ajaxGetCates();
        }
      },
    };

}]);
