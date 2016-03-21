'use strict';

/**
 *  uiTool 工具Service
 */
angular
  .module('theoneAppAdmin.services')
  .factory('UiTool', [function () {

    return {
     // tag-input [{text:value}] => [value]
     tagInput2arr:function (sourceArr, targetArr) {

       var resultArr = [];

       if(!angular.isArray(sourceArr)){
         return false;
       }

       if(sourceArr.length > 0){
         angular.forEach(sourceArr, function (item) {
           resultArr.push(item.text);
         });
       }

       if(angular.isString(targetArr)){
         return resultArr.join();
       }

       if(angular.isArray(targetArr)){
         return resultArr;
       }

       return resultArr;
     }
    };
  }])
  ;
