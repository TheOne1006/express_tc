'use strict';

/**
 *  编辑器配置 server
 */
angular
  .module('theoneAppAdmin.services')
  .factory('tinymceService', [function(){

    return {
      options:{
        menubar: true,
        theme:'modern',
        //定义载入插件
        plugins : 'pagebreak,link,table,save,insertdatetime,preview,media,searchreplace,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking,template,code,hr,prettify,tabset,image',
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | prettify | tabset | hr',
        'content_css': '/public/css/admin/tinymceCommon.css',
        // 扩张允许标签
         'extended_valid_elements' : 'tab[heading],tabset[justified]',
         'custom_elements': 'tab,tabset',
        //-语言包
        language : 'zh_CN'
      }
    };
  }])
