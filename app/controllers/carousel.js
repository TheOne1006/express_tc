'use strict';

var mongoose = require('mongoose'),
  async = require('async'),
  Carousel = mongoose.model('Carousel');

// 首页幻灯片 需要在cloud 上有数据
exports.Indexlist = function (req, res, next) {
  async.waterfall([
    function (cb) {
      Carousel
        .where({status:true,positionKind:1,imgInCloud:{$exists: true}})
        .find()
        .limit(5)
        .exec(cb);
    }
    ],function (err,result) {
      if(err){
        return next(err);
      }
      res.json(result);
  });
};