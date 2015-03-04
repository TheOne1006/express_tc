'use strict';
/**
 * 后台登陆
 */
var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  crypto = require('crypto'),
  async = require('async'),
  moment = require('moment'),
  User = mongoose.model('User');

  module.exports = function (app) {
    app.use('/admin/login', router);
  };

    router.get('/', function (req, res) {
        res.render('admin/login', {
          title: 'Generator-Express MVC'
        });
    })
    // 验证登录 密码
    .post('/verify/password', function (req, res, next) {
        res.end('ok');
    })
    .post('/verify/face', function (req, res, next) {
        console.log(req.files);
        res.end();
    })

;


