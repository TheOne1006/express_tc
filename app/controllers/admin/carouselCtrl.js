'use strict';

var mongoose = require('mongoose'),
  async = require('async'),
  Carousel = mongoose.model('Carousel'),
  config = require('../../../config/config'),
  help = require(config.root+'/my_node_modules/theone-help'),
  fs = require('fs');

// findById
function findById (id, cb) {
  Carousel.findById(id,cb);
}

// const
var ROOT_PATH = config.root+'/';


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
        carouselMe.imgInCloud = undefined;
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

//列表
exports.list = function (req, res, next) {
  async.waterfall([
    function (cb) {
      Carousel.find(cb);
    }
    ],function (err,result) {
      if(err){
        return next(err);
      }
      res.json(result);
  });
};


// single By Id
exports.singleById = function (req, res, next) {
  var id = req.params.id;
  findById(id, function (err, carousel) {
    if(err){
      return next(err);
    }

    res.json(carousel);
  });
  
};

//removeById
exports.removeById = function (req, res, next) {
  var id = req.params.id,
    carouselMe;

    async.waterfall([
      function (cb) {
        findById(id, cb);
      },
      // 删除cloud
      function (carousel, cb) {
        carouselMe = carousel;

        if(carousel.imgInCloud && carousel.imgInCloud.public_id){
          help.deleteFormCloudinary(carousel.imgInCloud.public_id, cb);
        }else{
          cb();
        }
        //删除文件
      },function  (cb) {
        fs.unlink(ROOT_PATH+carouselMe.imgSrc,function () {
          cb();
        });
      },
      // 数据删除
      function (cb) {
        carouselMe.remove(cb);
      }
      ],function (err) {
        if(err){
          return next(err);
        }
        res.end('ok');
    });

};

//editById
exports.updateById = function (req, res, next) {
  var id = req.params.id,
    carouselMe;
    res.end('end');
};