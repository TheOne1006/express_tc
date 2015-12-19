'use strict';

var mongoose = require('mongoose'),
  async = require('async'),
  Picture = mongoose.model('Picture'),
  config = require('../../../config/config'),
  help = require(config.root+'/my_node_modules/theone-help'),
  fs = require('fs');

// const
var ROOT_PATH = config.root+'/';


exports.add = function (req, res, next) {

    var imgTitle = req.body.imgTitle,
      kind = req.body.kind,
      imgSrc = req.files && req.files.picture && req.files.picture.path;

    var newPicture = null;

    // 处理imgSrc
    if(imgSrc){
      var findPoision = imgSrc.lastIndexOf('/data/picture');
      if(findPoision > 0){
        imgSrc = imgSrc.slice(findPoision);
      }
    }

    console.log(imgSrc);
    console.log(imgTitle);
    console.log(kind);

    async.waterfall([
      function (cb) {
        console.log('mark1');
        if(imgSrc && imgTitle) {
          console.log('mark2');
          newPicture = new Picture({
            imgTitle:imgTitle,
            kind: kind,
            imgSrc:imgSrc
          });

          return newPicture.save(cb);
        }else{
          return cb({err:'fail'});
        }
      }
      ],function (err) {
        console.log('mark3');
        if(err) {
          return next(err);
        }
        console.log('mark4');
        res.end('ok');
      });
  };


exports.list = function (req, res, next) {
  async.waterfall([
    function (cb) {
      Picture.find(cb);
    }
    ],function (err,result) {
      if(err){
        return next(err);
      }
      res.json(result);
  });
};

exports.cloud = {
  deleteById: function (req, res, next) {
    var _id = req.params._id,
    picCloud;

    console.log(_id);

    async
      .waterfall([
        function (cb) {
          if(!_id) {
            return cb({err:'not _id'});
          }

          return cb();
        },
        function (cb) {
          Picture.findById(_id,cb);
        },
        function (picture, cb) {
          if(!picture.imgInCloud || !picture.imgInCloud.public_id) {
            return cb({err:'not exites'});
          }

          picCloud = picture;

          help.deleteFormCloudinary(picture.imgInCloud.public_id, cb);
        },
        function (result, cb) {
          picCloud.imgInCloud = undefined;
          picCloud.save(cb);
        }
      ], function (err) {
          if(err){
            return next(err);
          }
          res.json({result:'ok'});
          res.end();
      });
  },
  uploadById: function (req, res, next) {
    var _id = req.params._id,
    picCloud;

    console.log(_id);

    async
      .waterfall([
        function (cb) {
          if(!_id) {
            return cb({err:'not _id'});
          }

          return cb();
        },
        function (cb) {
          Picture.findById(_id,cb);
        },
        function (picture, cb) {
          console.log(picture);

          var imgPath = ROOT_PATH + picture.imgSrc;

          if(picture.imgInCloud){
            return cb({err:'is upload'});
          }
          picCloud = picture;

          help.upload2Cloudinary(imgPath, cb);
        },
        function (cloudJson, cb) {
          picCloud.imgInCloud = cloudJson;
          picCloud.save(cb);
        }
      ], function (err) {
        if(err){
          return next(err);
        }
        res.json({result:'ok'});
        res.end();
      });
  }
};
