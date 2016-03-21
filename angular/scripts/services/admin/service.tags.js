'use strict';

/**
 * 禁用缓存
 * 后台 tags service
 * @ngdoc theoneAppAdmin.services
 * @name  theoneAppAdmin.services
 * @description   后台 tags service
 *
 * service module of theOne Blog
 */

angular
  .module('theoneAppAdmin.services')
  .factory('tagsService', ['$resource', function ($resource) {
    var resource = $resource('/admin/api/tags',{});

    return {
      allList: function () {
        return resource.query();
      }
    }
  }]);
