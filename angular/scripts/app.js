'use strict';

/**
 * @ngdoc overview
 * @name theoneAppAdmin
 * @description
 * # theoneAppAdmin
 *
 * Main module of the application.
 */
angular
  .module('theoneAppAdmin', [
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
    'ui.codemirror',
    'ngTagsInput',
    'ngSanitize',
    'ngTouch',
    // 图片上传
    'angularFileUpload',
    'theoneAppAdmin.services',
    'theoneAppAdmin.filters',
    'theoneAppAdmin.controllers',
    'theoneAppAdmin.route'
  ]);

angular.module('theoneAppAdmin.services', ['ngResource']);

// route
angular.module('theoneAppAdmin.route', []);

// controllers
angular.module('theoneAppAdmin.controllers', ['theoneAppAdmin.services']);

// filter
angular.module('theoneAppAdmin.filters', []);
