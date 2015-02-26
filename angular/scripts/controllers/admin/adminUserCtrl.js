'use strict';

/**
 * 后台 ng-controller User 总控制器
 * @name theoneApp-admin.admin.Usercontroller
 * @description
 * # theoneApp
 *
 */

/**
 * 注册 serve
 */

// 调用时，使用方法调用
angular.module('theoneApp')
    .controller('UserController', ['$scope', function($scope){
        $scope.name = '';
    }]);