'use strict';
/**
 * @ngdoc 轮播图
 * @name theOneBlog.services:CarouselsService
 * @description 轮播图 service
 * # CarouselsService
 * Carousels Service of the application in web.
 */

angular
  .module('theOneBlog.services')
  .factory('carouselsService', ['$q', '$resource', function ($q, $resource) {

    var carousels = [],
      resource = $resource('/api/carousels', {}, {timeout:20000});

    var ajaxGetIndexCarousels = function () {
      return resource.query({}, function (data) {
        if(data.length > 0) {
          carousels = data;
        }
      });
    };

    return {

      getIndexList: function () {
        if(angular.isArray(carousels) && carousels.length > 0) {
          var carouselsDefer = $q.defer();
          carouselsDefer.resolve(carousels);

          return {
            $promise: carouselsDefer.promise
          };
        }

        return ajaxGetIndexCarousels();
      }
    };
  }]);
