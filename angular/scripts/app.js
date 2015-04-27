'use strict';

/**
 * @ngdoc overview
 * @name theoneApp
 * @description
 * # theoneApp
 *
 * Main module of the application.
 */
 var ngApp;
ngApp = angular
  .module('theoneApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    //'ngRoute',
    'ui.router', // 加载 ui.router
    'ngGrid', //加载 grid 需要加载ngGrid
    'ui.bootstrap',
    'ui.tinymce',
    'ngTagsInput',
    'ngSanitize',
    'ngTouch',
    // 图片上传
    'angularFileUpload'
  ]);