'use strict';

/**
 * @document theOne blog 后台 filter
 * @author theone
 * @description 自定义 filter
 *
 * #theOneAdmin
 */

angular
  .module('theoneAppAdmin.filters')
  .filter('getSingleFiled', function(){

    // 返回 过滤后的一维度数组
    return function(arr, attrName){
      var ret = [],
      length = arr.length;

      if(!length || length === 0){
        return ret;
      }

      angular.forEach(arr, function(item){
        if(item[attrName]) {
          // ret.push(item[attrName]);
          ret[ret.length] = item[attrName];
        }
      });

      return ret;

    };
  });
