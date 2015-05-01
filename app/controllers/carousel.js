'use strict';

var mongoose = require('mongoose'),
  async = require('async'),
  Carousel = mongoose.model('Carousel');


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
