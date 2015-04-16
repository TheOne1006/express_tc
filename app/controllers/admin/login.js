'use strict';
/**
 * 后台登陆
 */
var mongoose = require('mongoose'),
  config = require('../../../config/config'),
  help =require(config.root+'/my_node_modules/theone-help'),
  crypto = require('crypto'),
  async = require('async'),
  moment = require('moment'),
  User = mongoose.model('User');

exports.index = function (req, res) {
        res.render('admin/login', {
          title: 'Generator-Express MVC'
        });
    };

    // 验证登录 密码
exports.verify = {
  password : function (req, res, next) {
        var user = req.body.user;

        if(user.name === 'theone' && user.password === 'qqaazz123')
        {
          req.session.userId = '54ede26288d1cb84097a886e';
        }
        res.end('ok');
    },
  face : function (req, res, next) {
        // var img = req.files.webcam;
        async.waterfall([
          function (cb) {
            help.facePlusPlusDetect('http://res.cloudinary.com/theone/image/upload/v1425302230/mavjc53omfyfnngyjebw.jpg', cb);
          },
          function (detectInfo, cb) {
            if(!detectInfo || !detectInfo.face || !detectInfo.face[0] ||!detectInfo.face[0].face_id){
              return cb({err:'no face_id'});
            }
            console.log(detectInfo.face[0].face_id);
            help.faceRecongnitionVerify(detectInfo.face[0].face_id, 'ffc4dc1a7f5b117bb529a0f9509c75b7', cb);
          },
          function  (result ,cb) {
            console.log(result);
            cb();
          }
          ],function (err) {
          if(err){
            console.log(err);
            return next(err);
          }  
          res.end();
          });
      }
    };