'use strict';

var express = require('express'),
  router = express.Router(),
  async = require('async'),
  config = require('../../../config/config'),
  help =require(config.root+'/my_node_modules/theone-help'),
  moment = require('moment'),
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
  .post('/addUserPhotos',function (req, res, next) {
    var dataPath = config.root+'/data/'+req.session.userId+'/webcan';
    var itemArr = req.body.photos;
    var i =0;

    help.autoPath(dataPath,function  (err) {
      if(err){
        return next(err);
      }

      async.each(itemArr,function  (item, callback) {
        i++;
        var phName = dataPath+'/'+moment().format('x')+i+'.jpeg';
        var base64 = item.replace(/^data:image\/jpeg;base64,/, '');
        fs.writeFile(phName,base64,'base64',function  (err) {
          if(err){
            return callback(err);
          }
          callback();
        });

      },function  (err) {
        if(err){
          return next(err);
        }
        res.end('ok');
      });
    });
  }) ;


  