'use strict';

var mongoose = require('mongoose'),
  async = require('async'),
  Carousel = mongoose.model('Carousel');


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
          cb({err:'fail'});
        }
      }

      ],function (err) {
        if(err){
          next(err);
        }
        res.end('ok');
    });

    // Carousel.find(function (err, tags) {
    //   if(err){
    //     return next(err);
    //   }
    //   res.json(tags);
    //   res.end();
    // });
  };