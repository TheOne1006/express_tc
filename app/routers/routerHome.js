'use strict';
/**
 * 前台router
 */
var express = require('express'),
  homeR = express.Router();

// 加载 控制器
var homeCtrl = require('../controllers/home/home');


module.exports = function (app) {
  app.use('/',homeR);
  homeR.get('/',homeCtrl.index);
};