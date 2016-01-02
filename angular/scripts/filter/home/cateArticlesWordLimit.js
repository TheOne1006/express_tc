'use strict';


/**
 * @ngdoc theOneBlog - filters
 * @name filters
 * @author theone
 * @description 自定义过滤器, 分类列表页 文章限制
 * # theOneBlog
 *
 * self filter of the application in web.
 *  在$digest过程中，filter会执行很多次，至少两次。
 *  所以要避免在filter中执行耗时, 所以多在ctrl 中执行操作
 */

angular
  .module('theOneBlog.filters')
  .filter('ArticlesByCateWordLimit',['browserHelp', function (browserHelp) {
    var defultlimit = browserHelp.defultContentWidth;

    function wordsLimit (str, limit) {
      if(str.length > limit){
        return str.slice(0, limit)+'...';
      }
      return str;
    }

    return function  (dataArr, limit) {
      var arrLeng = dataArr.length;

      if(!limit || isNaN(limit)) {
        limit = defultlimit;
      }

      if(arrLeng === 0) {
        return dataArr;
      }
      angular.forEach(dataArr, function(item, key) {
        dataArr[key].contentText = wordsLimit(item.contentText, limit);
      });

      return dataArr;

    };


  }])
  ;
