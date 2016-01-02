'use strict';

/**
 * 前台 维护title ,descript, keywords, 利用生成html 更好的seo
 * @ngdoc theOneBlog.services
 * @name  headerHelp
 * @description  前台 维护head 中的title ,descript, keywords
 *
 * service module of theOne Blog
 */

angular
  .module('theOneBlog.services')
  .factory('headerHelp', [function () {

    var titleDomObj = angular.element('title'),
    descriptDomObj = angular.element('meta[name=description]'),
    keyWordDomObj = angular.element('meta[name=keywords]'),
    initTitleText,
    initDescriptText,
    initKeyWordsText;


    var getTitleText = function () {
      return titleDomObj.text();
    };

    var getDescriptText = function () {
      return descriptDomObj.attr('content');
    };

    var getKeyWordsText = function () {
      return keyWordDomObj.attr('content');
    };


    initTitleText    = getTitleText();
    initDescriptText = getDescriptText();
    initKeyWordsText = getKeyWordsText();

    /**
     * @param  {[string]} str ''&非字符串还原initTitleText
     */
    function changeTitle (str) {
      var curTitleText;

      // 满足更改
      if(str !== '' && angular.isString(str)) {
        titleDomObj.text(str);
      }else{
        curTitleText = getTitleText();
        // 没有必要重新改变
        if(curTitleText !== initTitleText) {
          titleDomObj.text(initTitleText);
        }
      }
      return true;
    }

    function changeDescription (str) {
      var curDescriptionText;

      // 满足更改
      if(str !== '' && angular.isString(str)) {
          descriptDomObj.attr('content', str);
      }else{
        curDescriptionText = getDescriptText();
        // 没有必要重新改变
        if(curDescriptionText !== initDescriptText) {
          descriptDomObj.attr('content', initDescriptText);
        }
      }
      return true;
    }

    function changekeyWord (str) {
      var curkeyWordsText;

      // 满足更改
      if(str !== '' && angular.isString(str)) {
        keyWordDomObj.attr('content', str);
      }else{
        curkeyWordsText = getKeyWordsText();
        // 没有必要重新改变
        if(curkeyWordsText !== initKeyWordsText) {
          keyWordDomObj.attr('content', initKeyWordsText);
        }
      }
      return true;
    }



    return {
      changeTitle: changeTitle,
      changeDescription : changeDescription,
      changekeyWord : changekeyWord,
      resetAll : function () {
        var curTitle = getTitleText(),
          curDescription = getDescriptText(),
          curKeyWordsText = getKeyWordsText();

        if(curTitle !== initTitleText) {
          titleDomObj.text(initTitleText);
        }

        // console.log('initDescriptText: '+initDescriptText);
        // console.log('curDescription: '+curDescription);

        if(curDescription !== initDescriptText) {
          descriptDomObj.attr('content', initDescriptText);
        }

        if(curKeyWordsText !== initKeyWordsText) {
          keyWordDomObj.attr('content', initDescriptText);
        }

      },
      init : function () {

      }
    };

  }]);
