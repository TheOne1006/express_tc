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
  .filter('keywordEm',[function () {
    var preElement = '<em>',
      afterElement = '</em>',
      strRegExg;

      function aroundAddEm (str, keyword) {
        if(str.toLowerCase() === keyword.toLowerCase()) {
          return preElement + str + afterElement;
        }
        return str;
      }

      function replaceAddEm (str, keyword) {
      strRegExg = new RegExp(keyword,'i');

      if(str.match(strRegExg) !== -1) {
        return str.replace(strRegExg, preElement + '$&' + afterElement);
      }

      return str;

      }

    return function (str, position, keyword) {
      if(keyword === undefined) {
        return str;
      }

      switch (position) {
        case 'tag':
          return aroundAddEm(str, keyword);
        case 'title':
          return replaceAddEm(str, keyword);
        case 'content':
          return replaceAddEm(str, keyword);
        default:
          return str;
      }
    };
  }])

  ;