'use strict';

/**
 * @ngdoc theOneBlog - filter
 * @name myDirective
 * @author theone
 * @description 自定义filter
 * # theOneBlog
 *
 * self filter of the application in web.
 */

angular.module('theOneBlog')

  // 在$digest过程中，filter会执行很多次，至少两次。
  // 所以要避免在filter中执行耗时操作
  .filter('keywordEm',[function () {
    var preElement = '<em>',
      afterElement = '</em>',
      defultlimit = 90,
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
  }])
  // 在controller 中对 searchResult 进行渲染
  .filter('keywordPointFilter',['$filter', function ($filter) {
    return  function (resultArray, keyword) {

      if(!angular.isArray(resultArray)) {
        return resultArray;
      }

      if(resultArray.length === 0) {
        return [];
      }

      angular.forEach(resultArray, function (item, key) {
        resultArray[key].title = $filter('keywordEm')(item.title, 'title', keyword);
        resultArray[key].contentText = $filter('keywordEm')(item.contentText, 'content', keyword);

        // 遍历 keyWords
        angular.forEach(item.keyWords, function (word, idx) {
          resultArray[key].keyWords[idx] = $filter('keywordEm')(word, 'tag', keyword);
        });
      });

      return resultArray;
    };
  }])
  ;