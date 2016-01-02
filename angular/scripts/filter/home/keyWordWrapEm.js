'use strict';


/**
 * @ngdoc theOneBlog - filters
 * @name filters
 * @author theone
 * @description 自定义过滤器,,关键字增加<em>标签
 * # theOneBlog
 *
 * self filter of the application in web.
 *  在$digest过程中，filter会执行很多次，至少两次。
 *  所以要避免在filter中执行耗时, 所以多在ctrl 中执行操作
 */

angular
  .module('theOneBlog.filters')
  .filter('keyordEm',['browserHelp', function (browserHelp) {
    var preElement = '<em>',
      afterElement = '</em>',
      defultlimit = browserHelp.defultContentWidth,
      strRegExg;

      function aroundAddEm (str, keyword) {
        if(str.toLowerCase() === keyword.toLowerCase()) {
          return preElement + str + afterElement;
        }
        return str;
      }

      function replaceAddEm (str, keyword, limit) {
        var firstPosition = -1;

        strRegExg = new RegExp(keyword,'i');

        firstPosition = str.search(strRegExg);

        if(limit) {
          str =  wordsLimit(str, firstPosition, limit);
        }

        if(firstPosition !== -1) {
          return str.replace(strRegExg, preElement + '$&' + afterElement);
        }

        return str;
      }

      function wordsLimit (str, keyWordposition, limit) {
        var maxLen = str.length,
          halfLimit;

          if(maxLen <= limit) {
            return str;
          }

          halfLimit = Math.floor(limit/2);

          if(keyWordposition - halfLimit <= 0) {
            return str.slice(0,limit)+'...';
          }else if(keyWordposition + halfLimit >= maxLen) {
            return '...'+str.slice(-limit);
          }else {
            return '...'+str.slice(keyWordposition - halfLimit ,keyWordposition + halfLimit )+'...';
          }

      }

    return function (str, position, keyword, limit) {

      // init
      if(keyword === undefined) {
        return str;
      }

      if(!limit || isNaN(limit)) {
        limit = defultlimit;
      }

      switch (position) {
        case 'tag':
          str = aroundAddEm(str, keyword);
          break;
        case 'title':
          str = replaceAddEm(str, keyword);
          break;
        case 'content':
          str = replaceAddEm(str, keyword, limit);
          break;

        default:
          break;
      }

      return str;
    };
  }]);
