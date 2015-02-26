'use strict';

var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');

  module.exports = function (app) {
    app.use('/admin/user', router);
  };

  router.get('/', function (req, res) {
      res.render('admin/user',{
        title:'管理员信息'
      });
  });