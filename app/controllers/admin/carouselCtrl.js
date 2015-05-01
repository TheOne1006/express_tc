'use strict';

var mongoose = require('mongoose'),
  async = require('async'),
  Carousel = mongoose.model('Carousel'),
  config = require('../../../config/config'),
  help = require(config.root+'/my_node_modules/theone-help'),
  _ = require('underscore'),
  publicCarousel = require('../carousel');

// findById
function findById (id, cb) {
  Carousel.findById(id,cb);
}

// const
var ROOT_PATH = config.root+'/';

_.extend(exports, publicCarousel);

exports.add = function (req, res, next) {
    console.log(req.body);
    console.log(req.files.carousel);

    var imgTitle = req.body.imgTitle,
      position = req.body.position,
      imgDesc = req.body.Desc,
      imgSrc = req.files && req.files.carousel && req.files.carousel.path;

    var newCarousel = null;

    // 处理imgSrc
    if(imgSrc){
      var findPoision = imgSrc.lastIndexOf('/data/carousel');
      if(findPoision > 0){
        imgSrc = imgSrc.slice(findPoision);
      }
    }


    async.waterfall([
      function (cb) {
        // 文件存在
        if(imgSrc && imgTitle){
          newCarousel = new Carousel({
            imgTitle:imgTitle,
            positionKind:position,
            imgSrc:imgSrc,
            imgDesc:imgDesc
          });
          newCarousel.save(cb);
        }else{
          return cb({err:'fail'});
        }
      }

      ],function (err) {
        if(err){
          return next(err);
        }
        res.end('ok');
    });
  };


//cloud
exports.cloud = {
  deleteById:function (req, res, next) {
    var id = req.params.id,
    carouselMe;
    
    async.waterfall([
      function (cb) {
        findById(id, cb);
      },function (carousel, cb) {
        if(!carousel.imgInCloud || !carousel.imgInCloud.public_id){
          return cb({err:'not exites'});
        }
        carouselMe = carousel;
        help.deleteFormCloudinary(carousel.imgInCloud.public_id, cb);
        //更新数据库
      },function (result, cb) {
        carouselMe.imgInCloud = null;
        carouselMe.save(cb);
      }
      ],
      function (err, result) {
        if(err){
          return next(err);
        }
        res.end('del');
      });
  },
  uploadById:function (req, res, next) {
    var id = req.params.id,
    carouselMe;

    async.waterfall([
      function (cb) {
        findById(id, cb);
      },function (carousel, cb) {
        console.log(carousel);
        var imgPath = ROOT_PATH+carousel.imgSrc;

        if(carousel.imgInCloud){
          return cb({err:'is upload'});
        }
        carouselMe = carousel;
        help.upload2Cloudinary(imgPath, cb);
      },function (cloudJson, cb) {
        carouselMe.imgInCloud = cloudJson;
        carouselMe.save(cb);
      }
      ],
      function (err, result) {
        if(err){
          return next(err);
        }
        res.end('up');
      });
  }
};

//changStatusById
exports.changStatusById = function (req, res, next) {
  var id = req.params.id;

    async.waterfall([
      function (cb) {
        findById(id, cb);

      },function (carousel, cb) {
        carousel.status = !carousel.status;
        carousel.save(cb);
      }
      ],
      function (err) {
        if(err){
          return next(err);
        }
        res.end('ok');
      });
};
