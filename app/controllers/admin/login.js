'use strict';
/**
 * 后台登陆
 */
var mongoose = require('mongoose'),
  config = require('../../../config/config'),
  help =require(config.root+'/my_node_modules/theone-help'),
  crypto = require('crypto'),
  async = require('async'),
  env = process.env.NODE_ENV || 'development',
  moment = require('moment'),
  User = mongoose.model('User');

var fs = require('fs');

exports.index = function (req, res) {
  res.sendFile(config.root + '/angular/views/admin/login/index.html');
};


exports.test = function( req, res ) {
  console.log('test');
  res.end('end');
};

    // 验证登录 密码
exports.verify = {
  password : function (req, res, next) {
        var user = req.body.user;

        if( user &&  typeof( user.password) === 'string' ) {
          user.password = crypto.createHash('md5').update( user.password ).digest('hex');
        }

        if(user.name === 'theone' && user.password === 'c6dc214288121ef9c5a8b5e7893f6e07') {
          req.session.userId = '54ede26288d1cb84097a886e';
        }
        res.end('ok');
    },
  face : function (req, res, next) {
        var img = req.files && req.files.webcam;

        /**
         * 简单的错误处理
         */
        if(!img.name) {
          res.end();
          return;
        }

        async.waterfall([
          function (cb) {
            if(env === 'development') {
              //- 测试
              help.facePlusPlusDetect('http://res.cloudinary.com/theone/image/upload/v1425302230/mavjc53omfyfnngyjebw.jpg', cb);
            }else {
              //- theone.io
              help.facePlusPlusDetect('http://www.theone.io/data/tmp/'+img.name , cb);
            }
          },
          function (detectInfo, cb) {
            if(!detectInfo || !detectInfo.face || !detectInfo.face[0] ||!detectInfo.face[0].face_id){
              return cb({err:'no face_id'});
            }
            console.log(detectInfo.face[0].face_id);
            help.faceRecongnitionVerify(detectInfo.face[0].face_id, 'ffc4dc1a7f5b117bb529a0f9509c75b7', cb);
          },
          function  (result ,cb) {

            // 返回对比差异
            if (result.confidence > 60 && result.is_same_person ) {
              req.session.userId = '54ede26288d1cb84097a886e';
              cb(null, {is_login:true});
            } else {
              cb(null, {is_login:false});
            }
          }
/*
          ,function (cb) {
            // 清空文件夹
            //********** 临时同步方法
            var tmpfiles,
            dirPath = config.root+'/data/tmp/';
            try {
              tmpfiles = fs.readdirSync(dirPath);
              }catch(e) {
                 cb({'clear':'error'});
              }

            if (tmpfiles.length > 0){
              for (var i = 0; i < tmpfiles.length; i++) {
                var filePath = dirPath + '/' + tmpfiles[i];
                if (fs.statSync(filePath).isFile()) {
                  fs.unlinkSync(filePath);
                }
              }
            }
            cb();
          }
*/
          ],function (err, result) {
          if(err){
            res.json({is_login:false});
            return next(err);
          }
          res.json(result);
          res.end();
        });


      }
    };
