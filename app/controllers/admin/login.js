'use strict';
/**
 * 后台登陆
 */
var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  config = require('../../../config/config'),
  help =require(config.root+'/my_node_modules/theone-help'),
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
        // var img = req.files.webcam;
        async.waterfall([
          function (cb) {
            help.facePlusPlusDetect('http://res.cloudinary.com/theone/image/upload/v1425302230/mavjc53omfyfnngyjebw.jpg', cb);
          },
          function (detectInfo, cb) {
            if(!detectInfo || !detectInfo.face || !detectInfo.face[0] ||!detectInfo.face[0].face_id){
              return cb({err:'no face_id'});
            }
          }
          ],function (err) {
          if(err){
            return next(err);
          }  
          res.end();
          });
    })

;


