'use strict';

var express = require('express'),
  router = express.Router(),
  async = require('async'),
  config = require('../../../config/config'),
  help =require(config.root+'/my_node_modules/theone-help'),
  moment = require('moment'),
  mongoose = require('mongoose'),
  Adminph = mongoose.model('Adminph');


  // 常量
  var ROOT_PATH = config.root;



  module.exports = function (app) {
    app.use('/admin/user', router);
  };

  router.get('/', function (req, res) {
    res.render('admin/user',{
      title:'管理员信息'
    });
  })
  .get('/myPhotoList',function (req, res, next) {
    var userId = req.session.userId;

    Adminph.find({userObjectId:userId},function (err, phs) {
      if(err){
        return next(err);
      }
      res.json(phs);
      res.end();
    });

  })
  /**
   * 批量上传图片
   * 限制图片数量 最高9张
   * 生成图片文件
   */
  .post('/addUserPhotos',function (req, res, next) {
    var savePath = ROOT_PATH+'/data/'+req.session.userId+'/webcan';
    var viewPath = '/data/'+req.session.userId+'/webcan/';
    var itemArr = req.body.photos;
    var i =0;

    help.autoPath(savePath,function  (err) {
      if(err){
        return next(err);
      }

      async.mapLimit(itemArr, 3 ,function  (item, callback) {
        i++;
        var phPath = viewPath+moment().format('x')+i+'.jpeg';
        help.base64Save2image(ROOT_PATH, phPath, item, callback);
        //处理结果
      },function  (err, picPathArr) {
        if(err){
          return next(err);
        }
        
        Adminph.arraySave(picPathArr,req.session.userId,function (err) {
          if(err){
            return next(err);
          }
          res.end('ok');
        });

      });
    });
  })
  /**
   * 照片同步到Cloudinary
   */
  .get('/up2cloud/:id',function (req,res,next) {
    var _id = req.params.id,
    adminPhoto,
    photoPath;

    async.waterfall([
      function (cb) {
        Adminph.findById(_id,cb);
      },
      function (ph, cb) {
        // 已经存在
        if(ph.cloudinary){
          return cb({err:'is uploaded'}); 
        }
        photoPath = ROOT_PATH+'/'+ph.path;
        adminPhoto = ph;
        help.upload2Cloudinary(photoPath, cb);
      },
      function (cloudJson, cb) {
        adminPhoto.cloudinary = cloudJson;
        adminPhoto.save(cb);
      }],
      // 结果处理函数
      function (err) {
      if(err){
        return next(err);
      }
      res.end(_id);
    });
  })
  ;


  