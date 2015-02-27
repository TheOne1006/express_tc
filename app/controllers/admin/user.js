'use strict';

var express = require('express'),
  router = express.Router(),
  fs = require('fs'),
  mongoose = require('mongoose');

  module.exports = function (app) {
    app.use('/admin/user', router);
  };

  router.get('/', function (req, res) {
      res.render('admin/user',{
        title:'管理员信息'
      });
  })
  /**
   * 批量上传图片
   * 限制图片数量 最高9张
   * 生成图片文件
   */
  .post('/addUserPhotos',function (req, res) {
    // console.log(req.body.photos);
    
    res.end('ok');
  })
  ;


  