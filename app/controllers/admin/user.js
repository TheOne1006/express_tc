'use strict';

var async = require('async'),
  config = require('../../../config/config'),
  help =require(config.root+'/my_node_modules/theone-help'),
  moment = require('moment'),
  _ = require('underscore'),
  mongoose = require('mongoose'),
  Adminph = mongoose.model('Adminph'),
  User = mongoose.model('User');


  // 常量
  var ROOT_PATH = config.root;



exports.index = function (req, res) {
    // res.render('admin/user',{
    //   title:'管理员信息'
    // });
    res.end();
  };

exports.myInfo = function (req, res, next) {
    var userId = req.session.userId;
    User.findById(userId,function (err, user) {
      if(err){
        return next(err);
      }
      res.json(user);
      res.end();
    });
  };

exports.face = {
  createPower : function (req, res, next) {
    var userId = req.session.userId;
    Adminph.facePlusPower(userId,function (err, result) {
      if(err){
        return next(err);
      }
      res.json(result);
      res.end();
    });
  },
  // 创建 face++ person
  createPerson : function (req, res, next) {
    var userId = req.session.userId,
    phIdsArr = [],
    adminInfo,
    phsString;
    // 获取所有相关的ids
    async.waterfall([
      // 是否存在facePersonId
      function (cb) {
        User.findById(userId,function  (err,user) {
          if(err){
            return cb(err);
          }
          if(user.facePersonId){
            return cb({err:'is exites!'});
          }
          adminInfo = user;
          Adminph.facePlusDataReady(userId, cb);
        });
      },
      function (phs, cb) {
        if(phs){
          _.each(phs,function (item) {
            if(item && item.facePlusPlus && item.facePlusPlus.face[0]){
              phIdsArr.push(item.facePlusPlus.face[0].face_id);
            }
          });

          phsString = phIdsArr.join(',');
          help.facePersonCreate(adminInfo.name, phsString, cb);
        }
      },
      function (result, cb) {
        if(!result || !result.person_id){
          return cb({err:'undefined person_id'});
        }
        adminInfo.facePersonId = result.person_id;
        adminInfo.save(cb);
      }
      ],function (err) {
        if(err){
          return next(err);
        }
        res.end('created ok');
      });
  },
  updatePerson : function (req, res, next) {
    var userId =  req.session.userId,
    phIdsArr = [],
    phsString,
    adminInfo;

    async.waterfall([
      function (cb) {
        User.findById(userId,function (err, user) {
          if(err){
            return cb(err);
          }
          if(!user.facePersonId){
            return cb({err:'not exites'});
          }
          adminInfo = user;
          Adminph.facePlusDataReady(userId, cb);
        });
      },
      function (phs, cb) {
        if(!phs){
          return cb({err:'is null'});
        }
          _.each(phs,function (item) {
            if(item && item.facePlusPlus && item.facePlusPlus.face[0] && item.facePlusPlus.face[0].face_id){
              phIdsArr.push(item.facePlusPlus.face[0].face_id);
            }
          });

          phsString = phIdsArr.join(',');
          help.facePersonUpdate(adminInfo.facePersonId, phsString, cb);
      },
      function (result, cb) {
        if(result && result.success){
          help.faceTrainVerify(adminInfo.facePersonId);
          cb();
        }
      },
      ],function(err){
      if(err){
        return next(err);
      }
      res.end('update ok');
    });
  },
  /*
   * 上传到face＋＋
   */
  upload : function (req, res, next) {
    var _id = req.params._id,
    AdminPhoto;

    async.waterfall([
      function (cb) {
        Adminph.findById(_id,cb);
      },
      function (ph, cb) {
        // 已经存在
        if(ph.facePlusPlus){
          return cb({err:'is uploaded'});
        }
        if(!ph.cloudinary || !ph.cloudinary.url){
          return cb({err:'undefined cloudinary url'});
        }
        AdminPhoto = ph;
        cb(null,ph.cloudinary.url);
      },
      function (phCloudUrl,cb) {
        help.facePlusPlusDetect(phCloudUrl, cb);
      },
      function (detectInfo, cb) {
        console.log(detectInfo);
        if(!detectInfo || !detectInfo.face || !detectInfo.face[0] ||!detectInfo.face[0].face_id){
          return cb({err:'no face_id'});
        }
        AdminPhoto.facePlusPlus = detectInfo;
        AdminPhoto.save(function (err) {
          if(err){
            return cb(err);
          }
          cb();
        });
      }
      ],function (err) {
        if(err){
          return next(err);
        }
        res.end(_id);
      });
  },
  removeById : function  (req, res, next) {
    var _id = req.params._id;
    Adminph.findByIdAndUpdate(_id,{facePlusPlus:null},function  (err) {
      if(err){
        return next(err);
      }
      res.end('delete ok');
    });
  }

};

  /**
   * 获取自己的相册
   */
exports.myPhotoList = function (req, res, next) {
    var userId = req.session.userId;

    Adminph.find({userObjectId:userId},function (err, phs) {
      if(err){
        return next(err);
      }
      res.json(phs);
      res.end();
    });
  };


  /**
   * 批量上传图片
   * 限制图片数量 最高9张
   * 生成图片文件
   */
exports.addMyPhotos = function (req, res, next) {
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
  };

exports.cloudinary = {
  /**
   * 照片同步到Cloudinary
   */
  upload : function (req,res,next) {
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
  },
  // 删除同步文件
  removeById :  function  (req, res, next) {
    var _id =req.params._id,
    AdminPhoto;
    async.waterfall([
      function  (cb) {
        Adminph.findById(_id,cb);
      },
      function  (ph, cb) {
        if(!ph.cloudinary || !ph.cloudinary.public_id){
          return cb({err:'not exites'});
        }
        AdminPhoto = ph;
        help.deleteFormCloudinary(ph.cloudinary.public_id, cb);
      },
      // 数据库删除
      function  (result, cb) {
        if(result){
          console.log(result);
        }
        AdminPhoto.cloudinary = null;
        AdminPhoto.save(cb);
      }
      ],function (err) {
      if(err){
        return next(err);
      }
      res.end('deletet ok');
    });
  }
};

  /**
   * TEST GET SESSION
   */
  // .get('/faceSession/:sessId',function (req, res, next) {
  //   var sessId = req.params.sessId;
  //   console.log(sessId);


  //   help.faceGetSession(sessId,function (err, result){
  //     console.log(result);
  //     if(err){
  //       return next(err);
  //     }
  //     res.json(result);
  //     res.end();
  //   });
  // });
