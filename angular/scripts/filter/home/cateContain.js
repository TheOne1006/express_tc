'use strict';


/**
 * @ngdoc theOneBlog - filters
 * @name filters
 * @author theone
 * @description 自定义过滤器, 目标数组含有先关类型的 cates 数组
 * # theOneBlog
 *
 * self filter of the application in web.
 *  在$digest过程中，filter会执行很多次，至少两次。
 *  所以要避免在filter中执行耗时, 所以多在ctrl 中执行操作
 */

angular
  .module('theOneBlog.filters')
  .filter('cateContain', [function () {

    return function ( targetArr ) {
      var cateArr = [];

      if(!angular.isArray(targetArr)) {
        return cateArr;
      }

      angular.forEach(targetArr, function (item) {
        if(item.cate && item.cate._id) {

          for (var i = 0;  i < cateArr.length; i++) {
            if(item.cate._id === cateArr[i]._id) {
              cateArr[i].resultNum++;
              return;
            }
          }

          item.cate.resultNum = 1;
          cateArr.push(item.cate);

          return;
        }
      });

      return cateArr;
    };


  }])
  ;
