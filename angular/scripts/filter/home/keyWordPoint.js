'use strict';


/**
 * @ngdoc theOneBlog - filters
 * @name filters
 * @author theone
 * @description 自定义过滤器,关键词高亮,在tag 数组中
 * # theOneBlog
 *
 * self filter of the application in web.
 *  在$digest过程中，filter会执行很多次，至少两次。
 *  所以要避免在filter中执行耗时, 所以多在ctrl 中执行操作
 */

angular
  .module('theOneBlog.filters')
  .filter('keyWordPoint',['$filter', function ($filter) {
    return  function (resultArray, keyword) {

      if(!angular.isArray(resultArray)) {
        return resultArray;
      }

      if(resultArray.length === 0) {
        return [];
      }

      angular.forEach(resultArray, function (item, key) {
        resultArray[key].title = $filter('keyordEm')(item.title, 'title', keyword);
        resultArray[key].contentText = $filter('keyordEm')(item.contentText, 'content', keyword);

        // 遍历 keyWords
        angular.forEach(item.keyWords, function (word, idx) {
          resultArray[key].keyWords[idx] = $filter('keyordEm')(word, 'tag', keyword);
        });
      });

      return resultArray;
    };
  }]);

