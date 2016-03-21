'use strict';

/**
 * @ngdoc overview
 * @name theOneBlogLogin
 * @description
 * # theOneBlogLogin
 * theOne blog 后台 登陆 app
 *
 */
 angular
   .module('theOneBlogLogin', [
     'ngAnimate',
     'ngAria',
     'ngCookies',
     'ngMessages',
     'ngResource',
     'ui.router', // 加载 ui.router
     // 图片上传
     'angularFileUpload',
     'theOneBlogLogin.route',
     'theOneBlogLogin.controllers',
     'theOneBlogLogin.services'
   ]);


// router
angular.module('theOneBlogLogin.route', []);

// services
angular.module('theOneBlogLogin.services', []);

// controllers
angular.module('theOneBlogLogin.controllers', ['theOneBlogLogin.services']);
